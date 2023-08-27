package com.whoiszxl.zhipin.im.controller;


import com.whoiszxl.zhipin.im.cqrs.command.GroupCreateCommand;
import com.whoiszxl.zhipin.im.cqrs.response.FriendImportMultiResultResponse;
import com.whoiszxl.zhipin.im.service.IMessageService;
import com.whoiszxl.zhipin.tools.common.entity.ResponseResult;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import java.util.Set;

/**
 * <p>
 * 消息表 前端控制器
 * </p>
 *
 * @author whoiszxl
 * @since 2023-08-17
 */
@Tag(name = "IM消息 API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/message")
public class MessageController {

    private final IMessageService messageService;

    @PostMapping("/offline/list")
    @Operation(summary = "获取离线消息列表", description = "messageService")
    public ResponseResult<Set> offlineList() {
        Set set = messageService.listOfflineMessage();
        return ResponseResult.buildSuccess(set);
    }
}

