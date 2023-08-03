package com.whoiszxl.zhipin.tools.common.token.impl;

import cn.dev33.satoken.context.SaHolder;
import cn.dev33.satoken.stp.StpUtil;
import cn.hutool.extra.servlet.ServletUtil;
import com.whoiszxl.zhipin.tools.common.constants.LoginConstants;
import com.whoiszxl.zhipin.tools.common.token.TokenHelper;
import com.whoiszxl.zhipin.tools.common.token.entity.LoginMember;
import com.whoiszxl.zhipin.tools.common.utils.IpUtils;
import com.whoiszxl.zhipin.tools.common.utils.MyServletUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;

/**
 * sa-token的helper
 * @author whoiszxl
 */
@Slf4j
@Component
@ConditionalOnProperty(name = "zhipin.token-active", havingValue = "sa-token")
public class SaTokenHelper implements TokenHelper {


    @Override
    public void login(LoginMember loginMember) {
        if(loginMember == null) {
            return;
        }

        HttpServletRequest request = MyServletUtil.getRequest();
        loginMember.setIp(ServletUtil.getClientIP(request));
        loginMember.setLocation(IpUtils.getCityInfo(loginMember.getIp()));
        loginMember.setBrowser(MyServletUtil.getBrowser(request));

        StpUtil.login(loginMember.getId());
        loginMember.setToken(StpUtil.getTokenValue());
        SaHolder.getStorage().set(LoginConstants.LOGIN_MEMBER_KEY, loginMember);
        StpUtil.getTokenSession().set(LoginConstants.LOGIN_MEMBER_KEY, loginMember);
    }

    @Override
    public LoginMember getLoginMember() {
        LoginMember loginMember = (LoginMember) SaHolder.getStorage().get(LoginConstants.LOGIN_MEMBER_KEY);
        if(loginMember != null) {
            return loginMember;
        }
        loginMember = (LoginMember) StpUtil.getTokenSession().get(LoginConstants.LOGIN_MEMBER_KEY);
        SaHolder.getStorage().set(LoginConstants.LOGIN_MEMBER_KEY, loginMember);

        return loginMember;
    }

    @Override
    public void updateLoginMember(LoginMember loginMember) {
        SaHolder.getStorage().set(LoginConstants.LOGIN_MEMBER_KEY, loginMember);
        StpUtil.getTokenSession().set(LoginConstants.LOGIN_MEMBER_KEY, loginMember);
    }

    @Override
    public Long getMemberId() {
        return getLoginMember().getId();
    }

    @Override
    public String getUsername() {
        return getLoginMember().getUsername();
    }
}
