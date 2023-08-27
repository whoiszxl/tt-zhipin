package com.whoiszxl.zhipin.im.controller;


import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

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

}
