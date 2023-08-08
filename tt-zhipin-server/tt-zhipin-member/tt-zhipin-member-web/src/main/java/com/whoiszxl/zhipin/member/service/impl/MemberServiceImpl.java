package com.whoiszxl.zhipin.member.service.impl;

import cn.hutool.core.lang.Assert;
import cn.hutool.core.util.ObjUtil;
import com.whoiszxl.zhipin.member.cqrs.command.InitBaseInfoCommand;
import com.whoiszxl.zhipin.member.entity.Member;
import com.whoiszxl.zhipin.member.mapper.MemberMapper;
import com.whoiszxl.zhipin.member.service.IMemberService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.whoiszxl.zhipin.tools.common.exception.ExceptionCatcher;
import com.whoiszxl.zhipin.tools.common.token.TokenHelper;
import com.whoiszxl.zhipin.tools.common.token.entity.AppLoginMember;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

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

    @Override
    public void initBaseInfo(InitBaseInfoCommand initBaseInfoCommand) {
        //获取当前登录用户并校验
        AppLoginMember appLoginMember = tokenHelper.getAppLoginMember();
        Assert.isTrue(ObjUtil.isNotNull(appLoginMember), "用户登录无效");

        Member updateMember = new Member();
        updateMember.setId(appLoginMember.getId());

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

        ExceptionCatcher.catchServiceEx("更新错误");
    }
}
