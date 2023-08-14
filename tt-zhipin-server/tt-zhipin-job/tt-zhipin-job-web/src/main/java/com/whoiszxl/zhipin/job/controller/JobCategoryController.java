package com.whoiszxl.zhipin.job.controller;


import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.util.ObjUtil;
import cn.hutool.core.util.StrUtil;
import cn.hutool.json.JSONUtil;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.google.common.io.Files;
import com.whoiszxl.zhipin.job.cqrs.response.JobCategoryTreeResponse;
import com.whoiszxl.zhipin.job.cqrs.response.JobResponse;
import com.whoiszxl.zhipin.job.entity.JobCategory;
import com.whoiszxl.zhipin.job.service.IJobCategoryService;
import com.whoiszxl.zhipin.job.service.IJobService;
import com.whoiszxl.zhipin.tools.common.entity.ResponseResult;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicLong;

/**
 * <p>
 * 职位三级分类表 前端控制器
 * </p>
 *
 * @author whoiszxl
 * @since 2023-08-14
 */
@Tag(name = "C端: 职位分类 API")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/job-category")
public class JobCategoryController {

    private final IJobCategoryService jobCategoryService;

    @Operation(summary = "获取树状职位列表", description = "获取树状职位列表")
    @GetMapping("/tree")
    public ResponseResult<List<JobCategoryTreeResponse>> tree() {
        List<JobCategoryTreeResponse> result = jobCategoryService.listWithTree();
        return ResponseResult.buildSuccess(result);
    }
}

