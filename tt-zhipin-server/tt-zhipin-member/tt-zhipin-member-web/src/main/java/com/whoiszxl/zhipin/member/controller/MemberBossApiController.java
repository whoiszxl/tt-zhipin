package com.whoiszxl.zhipin.member.controller;

import cn.hutool.core.bean.BeanUtil;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.whoiszxl.zhipin.member.cqrs.response.MemberRecommandResponse;
import com.whoiszxl.zhipin.member.entity.Member;
import com.whoiszxl.zhipin.member.service.IMemberService;
import com.whoiszxl.zhipin.tools.common.entity.PageQuery;
import com.whoiszxl.zhipin.tools.common.entity.ResponseResult;
import com.whoiszxl.zhipin.tools.common.entity.response.PageResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "C端-头头端: 用户 API")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/boss/member")
public class MemberBossApiController {

    private final IMemberService memberService;

    @Operation(summary = "成为boss", description = "成为boss")
    @GetMapping("/become-boss")
    public ResponseResult<Boolean> becomeBoss() {
        return ResponseResult.buildByFlag(memberService.becomeBoss());
    }


    @Operation(summary = "获取推荐用户列表", description = "获取推荐用户列表")
    @PostMapping("/list")
    public ResponseResult<PageResponse<MemberRecommandResponse>> memberList(@RequestBody PageQuery pageQuery) {
        IPage<Member> page = memberService.page(pageQuery.toPage(), Wrappers.<Member>lambdaQuery().orderByDesc(Member::getUpdatedAt));

        PageResponse<MemberRecommandResponse> pageResponse = PageResponse.convert(page, MemberRecommandResponse.class);

        //TODO: 推荐系统实现
        return ResponseResult.buildSuccess(pageResponse);
    }

}
