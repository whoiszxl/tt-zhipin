package com.whoiszxl.zhipin.job.controller;


import cn.hutool.core.bean.BeanUtil;
import com.whoiszxl.zhipin.job.cqrs.query.JobQuery;
import com.whoiszxl.zhipin.job.cqrs.response.JobResponse;
import com.whoiszxl.zhipin.job.service.IJobService;
import com.whoiszxl.zhipin.tools.common.entity.PageQuery;
import com.whoiszxl.zhipin.tools.common.entity.ResponseResult;
import com.whoiszxl.zhipin.tools.common.entity.response.PageResponse;
import com.whoiszxl.zhipin.tools.common.token.entity.AppLoginMember;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * <p>
 * 职位表 前端控制器
 * </p>
 *
 * @author whoiszxl
 * @since 2023-08-09
 */
@Tag(name = "C端: 职位 API")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/job")
public class JobController {

    private final IJobService jobService;

    @Operation(summary = "首页推荐岗位列表", description = "获取推荐的岗位列表")
    @GetMapping("/recommend/list")
    public ResponseResult<PageResponse<JobResponse>> recommendList(@Validated JobQuery query) {
        //TODO 首页推荐岗位列表
        PageResponse<JobResponse> pageResponse = jobService.latestList(query);
        return ResponseResult.buildSuccess(pageResponse);
    }

    @Operation(summary = "首页附近岗位列表", description = "获取附近的岗位列表")
    @GetMapping("/nearby/list")
    public ResponseResult<PageResponse<JobResponse>> nearbyList(@Validated JobQuery query) {
        //TODO 首页附近岗位列表
        PageResponse<JobResponse> pageResponse = jobService.latestList(query);
        return ResponseResult.buildSuccess(pageResponse);
    }

    @Operation(summary = "首页最新岗位列表", description = "获取最新的岗位列表")
    @GetMapping("/latest/list")
    public ResponseResult<PageResponse<JobResponse>> latestList(@Validated JobQuery query) {
        PageResponse<JobResponse> pageResponse = jobService.latestList(query);
        return ResponseResult.buildSuccess(pageResponse);
    }

    @Operation(summary = "获取职位详情", description = "通过职位ID获取职位详情")
    @GetMapping("/{jobId}")
    public ResponseResult<JobResponse> jobDetail(@PathVariable Long jobId) {
        JobResponse pageResponse = jobService.jobDetail(jobId);
        return ResponseResult.buildSuccess(pageResponse);
    }
}

