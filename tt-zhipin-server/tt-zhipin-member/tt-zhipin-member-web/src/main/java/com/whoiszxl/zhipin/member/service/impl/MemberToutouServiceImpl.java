package com.whoiszxl.zhipin.member.service.impl;

import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.whoiszxl.zhipin.member.cqrs.command.ToutouSubmitCommand;
import com.whoiszxl.zhipin.member.entity.MemberToutou;
import com.whoiszxl.zhipin.member.mapper.MemberToutouMapper;
import com.whoiszxl.zhipin.member.service.IMemberToutouService;
import com.whoiszxl.zhipin.tools.common.exception.ExceptionCatcher;
import com.whoiszxl.zhipin.tools.common.token.TokenHelper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 头头表 服务实现类
 * </p>
 *
 * @author whoiszxl
 * @since 2023-08-04
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class MemberToutouServiceImpl extends ServiceImpl<MemberToutouMapper, MemberToutou> implements IMemberToutouService {

    private final MemberToutouMapper memberToutouMapper;

    private final TokenHelper tokenHelper;

    @Override
    public void toutouSubmit(ToutouSubmitCommand toutouSubmitCommand) {
        Long memberId = tokenHelper.getMemberId();
        MemberToutou memberToutou = memberToutouMapper
                .selectOne(Wrappers.<MemberToutou>lambdaQuery().eq(MemberToutou::getMemberId, memberId));
        if(memberToutou != null) {
            ExceptionCatcher.catchServiceEx("你已经是头头了");
        }

        MemberToutou toutou = new MemberToutou();
        toutou.setMemberId(memberId);
        //toutou.setCompany(toutouSubmitCommand.getCompany());
        toutou.setBusinessLicense(toutouSubmitCommand.getBusinessLicense());
        memberToutouMapper.insert(toutou);
    }
}
