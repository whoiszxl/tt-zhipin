package com.whoiszxl.zhipin.file.controller;


import cn.dev33.satoken.annotation.SaCheckLogin;
import cn.dev33.satoken.annotation.SaIgnore;
import cn.hutool.core.bean.BeanUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.whoiszxl.zhipin.file.cqrs.query.FmsFileQuery;
import com.whoiszxl.zhipin.file.cqrs.response.FmsFileResponse;
import com.whoiszxl.zhipin.file.entity.FmsFile;
import com.whoiszxl.zhipin.file.service.FileService;
import com.whoiszxl.zhipin.tools.common.entity.ResponseResult;
import com.whoiszxl.zhipin.tools.common.entity.response.PageResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

/**
 * <p>
 * 文件表 前端控制器
 * </p>
 *
 * @author whoiszxl
 * @since 2022-03-23
 */
@RestController
@RequestMapping("/api/file")
@Tag(name = "文件上传 API")
@SaIgnore
@RequiredArgsConstructor
public class FileController {

    private final FileService fileService;

    @SaCheckLogin
    @PostMapping("/upload")
    @Operation(summary = "上传文件", description = "上传文件")
    public ResponseResult<String> upload(
            @RequestParam(value = "file") MultipartFile file,
            @RequestParam(value = "id", required = false) Long id,
            @RequestParam(value = "bizId", required = false) String bizId,
            @RequestParam(value = "bizType", required = false) Integer bizType
            ) {

        if(file.isEmpty()) {
            return ResponseResult.buildError("文件内容为空");
        }

        String url = fileService.upload(id, bizId, bizType, file);
        return ResponseResult.buildSuccess(url);
    }

    @SaCheckLogin
    @PostMapping("/delete")
    @Operation(summary = "删除文件", description = "删除文件")
    public ResponseResult<Boolean> delete(@RequestParam(value = "ids[]") Long[] ids) {
        fileService.delete(ids);
        return ResponseResult.buildSuccess();
    }

    @SaCheckLogin
    @PostMapping("/list")
    @Operation(summary = "分页获取文件列表", description = "分页获取文件列表")
    public ResponseResult<PageResponse<FmsFileResponse>> list(@RequestBody @Validated FmsFileQuery query) {
        LambdaQueryWrapper<FmsFile> wrapper = new LambdaQueryWrapper<>();
        if(query.getPlatformType() != null) {
            wrapper.like(FmsFile::getPlatformType, query.getPlatformType());
        }
        if(StringUtils.isNotBlank(query.getBizId())) {
            wrapper.eq(FmsFile::getBizId, query.getBizId());
        }
        if(query.getBizType() != null) {
            wrapper.like(FmsFile::getBizType, query.getBizType());
        }
        if(query.getDataType() != null) {
            wrapper.like(FmsFile::getDataType, query.getDataType());
        }

        IPage<FmsFile> result = fileService.page(new Page<>(query.getPage(), query.getSize()), wrapper);
        return ResponseResult.buildSuccess(PageResponse.convert(result, FmsFileResponse.class));
    }

    @SaCheckLogin
    @GetMapping("/{id}")
    @Operation(summary = "通过主键ID获取文件", description = "通过主键ID获取文件")
    public ResponseResult<FmsFileResponse> getSupplierById(@PathVariable Long id) {
        FmsFile file = fileService.getById(id);
        return file == null ? ResponseResult.buildSuccess() : ResponseResult.buildSuccess(BeanUtil.copyProperties(file, FmsFileResponse.class));
    }
    
}

