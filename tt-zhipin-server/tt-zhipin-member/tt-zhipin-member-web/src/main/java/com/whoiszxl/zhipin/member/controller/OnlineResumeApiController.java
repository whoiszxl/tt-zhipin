package com.whoiszxl.zhipin.member.controller;


import cn.dev33.satoken.annotation.SaIgnore;
import com.whoiszxl.zhipin.member.cqrs.command.OnlineResumeSaveCommand;
import com.whoiszxl.zhipin.member.cqrs.command.SendSmsCaptchaCommand;
import com.whoiszxl.zhipin.member.cqrs.command.SmsLoginCommand;
import com.whoiszxl.zhipin.member.cqrs.response.OnlineResumeResponse;
import com.whoiszxl.zhipin.member.service.ILoginService;
import com.whoiszxl.zhipin.member.service.IOnlineResumeService;
import com.whoiszxl.zhipin.tools.common.entity.ResponseResult;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * <p>
 * 在线简历 前端控制器
 * </p>
 *
 * @author whoiszxl
 * @since 2023-08-04
 */
@Tag(name = "C端: 在线简历 API")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/online/resume")
public class OnlineResumeApiController {

    private final IOnlineResumeService onlineResumeService;

    @PostMapping("/info")
    @Operation(summary = "获取当前用户的在线简历信息", description = "获取当前用户的在线简历信息")
    public ResponseResult<OnlineResumeResponse> onlineResume() {
        return ResponseResult.buildSuccess(onlineResumeService.info());
    }

    @PostMapping("/save")
    @Operation(summary = "更新用户的在线简历", description = "更新用户的在线简历")
    public ResponseResult<Boolean> save(@RequestBody OnlineResumeSaveCommand saveCommand) {
        return ResponseResult.buildSuccess(onlineResumeService.save(saveCommand));
    }


}

