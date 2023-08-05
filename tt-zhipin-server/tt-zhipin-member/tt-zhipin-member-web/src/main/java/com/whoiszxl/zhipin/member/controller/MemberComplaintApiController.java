package com.whoiszxl.zhipin.member.controller;


import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

/**
 * <p>
 * 会员投诉表 前端控制器
 * </p>
 *
 * @author whoiszxl
 * @since 2023-08-04
 */
@Tag(name = "C端: 会员投诉 API")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/member-complaint")
public class MemberComplaintApiController {

}

