package com.whoiszxl.zhipin.member.controller;


import com.whoiszxl.zhipin.member.cqrs.command.ToutouSubmitCommand;
import com.whoiszxl.zhipin.member.service.IMemberToutouService;
import com.whoiszxl.zhipin.tools.common.entity.ResponseResult;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

/**
 * <p>
 * 头头表 前端控制器
 * </p>
 *
 * @author whoiszxl
 * @since 2023-08-04
 */
@Tag(name = "C端: 头头 API")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/member-toutou")
public class MemberToutouApiController {

    private final IMemberToutouService memberToutouService;

    @Operation(summary = "注册头头", description = "提交公司名和营业执照，审核通过后成为头头")
    @PostMapping("/submit")
    public ResponseResult<Boolean> toutouSubmit(@RequestBody ToutouSubmitCommand toutouSubmitCommand) {
        memberToutouService.toutouSubmit(toutouSubmitCommand);
        return ResponseResult.buildSuccess();
    }
}

