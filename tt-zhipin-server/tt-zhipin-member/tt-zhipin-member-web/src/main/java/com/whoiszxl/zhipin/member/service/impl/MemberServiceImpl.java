package com.whoiszxl.zhipin.member.service.impl;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.date.DateUtil;
import cn.hutool.core.lang.Assert;
import cn.hutool.core.util.ObjUtil;
import com.whoiszxl.zhipin.member.cqrs.command.InitBaseInfoCommand;
import com.whoiszxl.zhipin.member.entity.Member;
import com.whoiszxl.zhipin.member.entity.MemberToutou;
import com.whoiszxl.zhipin.member.enums.ToutouStatusEnum;
import com.whoiszxl.zhipin.member.mapper.MemberMapper;
import com.whoiszxl.zhipin.member.service.IMemberService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.whoiszxl.zhipin.member.service.IMemberToutouService;
import com.whoiszxl.zhipin.tools.common.exception.ExceptionCatcher;
import com.whoiszxl.zhipin.tools.common.token.TokenHelper;
import com.whoiszxl.zhipin.tools.common.token.entity.AppLoginMember;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * <p>
 * 会员表 服务实现类
 * </p>
 *
 * @author whoiszxl
 * @since 2023-08-04
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class MemberServiceImpl extends ServiceImpl<MemberMapper, Member> implements IMemberService {

    private final TokenHelper tokenHelper;

    private final IMemberToutouService memberToutouService;

    @Override
    public void initBaseInfo(InitBaseInfoCommand initBaseInfoCommand) {
        //获取当前登录用户并校验
        AppLoginMember appLoginMember = tokenHelper.getAppLoginMember();
        Assert.isTrue(ObjUtil.isNotNull(appLoginMember), "用户登录无效");

        Member updateMember = new Member();
        updateMember.setId(appLoginMember.getId());

        //姓名性别出生年月基本信息更新
        if(ObjUtil.isNotNull(initBaseInfoCommand.getFullName())
            && ObjUtil.isNotNull(initBaseInfoCommand.getGender())
            && ObjUtil.isNotNull(initBaseInfoCommand.getBirthday())) {
            appLoginMember.setFullName(initBaseInfoCommand.getFullName());
            appLoginMember.setGender(Integer.valueOf(initBaseInfoCommand.getGender()));
            appLoginMember.setBirthday(DateUtil.parseLocalDateTime(initBaseInfoCommand.getBirthday()));

            updateMember.setFullName(initBaseInfoCommand.getFullName());
            updateMember.setGender(Integer.valueOf(initBaseInfoCommand.getGender()));
            updateMember.setBirthday(DateUtil.parseLocalDateTime(initBaseInfoCommand.getBirthday()));

            tokenHelper.updateAppLoginMember(appLoginMember);
            this.updateById(updateMember);
            return;
        }


        //身份状态和求职状态更新
        if(ObjUtil.isNotNull(initBaseInfoCommand.getIdentityStatus())
                && ObjUtil.isNotNull(initBaseInfoCommand.getWorkStatus())) {
            appLoginMember.setIdentityStatus(Integer.valueOf(initBaseInfoCommand.getIdentityStatus()));
            appLoginMember.setWorkStatus(Integer.valueOf(initBaseInfoCommand.getWorkStatus()));

            updateMember.setIdentityStatus(Integer.valueOf(initBaseInfoCommand.getIdentityStatus()));
            updateMember.setWorkStatus(Integer.valueOf(initBaseInfoCommand.getWorkStatus()));

            tokenHelper.updateAppLoginMember(appLoginMember);
            this.updateById(updateMember);
            return;
        }

        //最高学历和最高学历类型更新
        if(ObjUtil.isNotNull(initBaseInfoCommand.getHighestQualification())
                && ObjUtil.isNotNull(initBaseInfoCommand.getHighestQualificationType())) {
            appLoginMember.setHighestQualification(Integer.valueOf(initBaseInfoCommand.getHighestQualification()));
            appLoginMember.setHighestQualificationType(Integer.valueOf(initBaseInfoCommand.getHighestQualificationType()));

            updateMember.setHighestQualification(Integer.valueOf(initBaseInfoCommand.getHighestQualification()));
            updateMember.setHighestQualificationType(Integer.valueOf(initBaseInfoCommand.getHighestQualificationType()));

            tokenHelper.updateAppLoginMember(appLoginMember);
            this.updateById(updateMember);
            return;
        }

        if(ObjUtil.isNotNull(initBaseInfoCommand.getAvatar())) {
            appLoginMember.setAvatar(initBaseInfoCommand.getAvatar());
            updateMember.setAvatar(initBaseInfoCommand.getAvatar());

            tokenHelper.updateAppLoginMember(appLoginMember);
            this.updateById(updateMember);
            return;
        }


        ExceptionCatcher.catchServiceEx("更新错误");
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Boolean becomeBoss() {
        Long memberId = tokenHelper.getAppMemberId();
        Member member = this.getById(memberId);
        if(ToutouStatusEnum.YES.getCode().equals(member.getIsToutou())) {
            ExceptionCatcher.catchServiceEx("已经是头头了");
        }

        // 更新头头状态
        member.setIsToutou(ToutouStatusEnum.YES.getCode());
        boolean flag = this.updateById(member);
        Assert.isTrue(flag, "更新状态失败");

        // 向头头表同步字段
        MemberToutou memberToutou = BeanUtil.copyProperties(member, MemberToutou.class);
        flag = memberToutouService.save(memberToutou);
        Assert.isTrue(flag, "新增头头失败");

        return true;
    }
}
