package com.whoiszxl.zhipin.admin.service.impl;

import cn.dev33.satoken.stp.StpUtil;
import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.lang.Assert;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.whoiszxl.zhipin.admin.entity.Admin;
import com.whoiszxl.zhipin.admin.service.IAdminService;
import com.whoiszxl.zhipin.admin.service.LoginService;
import com.whoiszxl.zhipin.admin.service.PermissionService;
import com.whoiszxl.zhipin.tools.common.constants.CommonConstants;
import com.whoiszxl.zhipin.tools.common.token.TokenHelper;
import com.whoiszxl.zhipin.tools.common.token.entity.LoginMember;
import com.whoiszxl.zhipin.tools.common.utils.SecureUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author whoiszxl
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class LoginServiceImpl implements LoginService {

    private final IAdminService adminService;

    private final TokenHelper tokenHelper;

    private final PermissionService permissionService;

    @Override
    public String login(String username, String password) {
        //1. 校验管理员是否存在
        Admin admin = adminService.getOne(Wrappers.<Admin>lambdaQuery()
                .eq(Admin::getUsername, username));
        Assert.notNull(admin, "管理员不存在");

        //2. 校验密码是否正确
        if(!SecureUtils.passwordMd5(password, CommonConstants.PASSWORD_SALT).equals(admin.getPassword())) {
            throw new RuntimeException();
        }

        //3. 进行登录，并设置权限
        LoginMember loginMember = BeanUtil.copyProperties(admin, LoginMember.class);
        loginMember.setPermissions(permissionService.listPermissionsByAdminId(admin.getId()));
        loginMember.setRoles(permissionService.listRoleByAdminId(admin.getId()));
        tokenHelper.login(loginMember);
        return StpUtil.getTokenValue();
    }
}
