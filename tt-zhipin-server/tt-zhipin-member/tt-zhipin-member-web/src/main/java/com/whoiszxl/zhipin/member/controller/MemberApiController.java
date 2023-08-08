package com.whoiszxl.zhipin.member.controller;


import cn.hutool.core.bean.BeanUtil;
import com.whoiszxl.zhipin.member.cqrs.command.InitBaseInfoCommand;
import com.whoiszxl.zhipin.member.cqrs.response.MemberInfoResponse;
import com.whoiszxl.zhipin.member.service.IMemberService;
import com.whoiszxl.zhipin.tools.common.entity.ResponseResult;
import com.whoiszxl.zhipin.tools.common.token.TokenHelper;
import com.whoiszxl.zhipin.tools.common.token.entity.AppLoginMember;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

/**
 * <p>
 * 会员表 前端控制器
 * </p>
 *
 * @author whoiszxl
 * @since 2023-08-04
 */
@Tag(name = "C端: 会员 API")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/member")
public class MemberApiController {

    private final TokenHelper tokenHelper;

    private final IMemberService memberService;

    @Operation(summary = "获取会员基本信息", description = "获取会员基本信息")
    @GetMapping("/info")
    public ResponseResult<MemberInfoResponse> memberInfo() {
        AppLoginMember appLoginMember = tokenHelper.getAppLoginMember();
        MemberInfoResponse adminDetailResponse = BeanUtil.copyProperties(appLoginMember, MemberInfoResponse.class);
        return ResponseResult.buildSuccess(adminDetailResponse);
    }

    @Operation(summary = "初始化用户的基本信息", description = "在用户第一次注册登录进APP的时候，需要判断一下用户是否初始化了身份状态、求职状态、最高学历以及最高学历类型，如果未初始化则需要调用此接口进行设置")
    @PostMapping("/init/base-info")
    public ResponseResult<Boolean> initBaseInfo(@RequestBody @Validated InitBaseInfoCommand initBaseInfoCommand) {
        memberService.initBaseInfo(initBaseInfoCommand);
        return ResponseResult.buildSuccess();
    }

}

