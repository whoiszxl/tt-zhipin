package com.whoiszxl.zhipin.member.controller;


import com.baomidou.mybatisplus.core.conditions.update.LambdaUpdateWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.whoiszxl.zhipin.member.cqrs.command.AttachmentResumeSaveCommand;
import com.whoiszxl.zhipin.member.cqrs.command.InitBaseInfoCommand;
import com.whoiszxl.zhipin.member.cqrs.command.ResumeNameUpdateCommand;
import com.whoiszxl.zhipin.member.entity.MemberAttachmentResume;
import com.whoiszxl.zhipin.member.service.IMemberAttachmentResumeService;
import com.whoiszxl.zhipin.tools.common.entity.ResponseResult;
import com.whoiszxl.zhipin.tools.common.token.TokenHelper;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * <p>
 * 会员附件简历表 前端控制器
 * </p>
 *
 * @author whoiszxl
 * @since 2023-12-21
 */
@Tag(name = "C端: 附件简历 API")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/member-attachment-resume")
public class MemberAttachmentResumeController {

    private final IMemberAttachmentResumeService memberAttachmentResumeService;

    private final TokenHelper tokenHelper;


    @Operation(summary = "获取用户附件简历列表", description = "获取用户附件简历列表")
    @GetMapping("/list")
    public ResponseResult<List<MemberAttachmentResume>> list() {
        List<MemberAttachmentResume> result = memberAttachmentResumeService.list(Wrappers.<MemberAttachmentResume>lambdaQuery()
                .eq(MemberAttachmentResume::getMemberId, tokenHelper.getAppMemberId()));
        return ResponseResult.buildSuccess(result);
    }

    @Operation(summary = "保存用户的附件简历", description = "保存用户的附件简历")
    @PostMapping("/save")
    public ResponseResult<Boolean> save(@RequestBody @Validated AttachmentResumeSaveCommand saveCommand) {
        Boolean flag = memberAttachmentResumeService.saveResume(saveCommand);
        return ResponseResult.buildByFlag(flag);
    }


    @Operation(summary = "删除用户的附件简历", description = "删除用户的附件简历")
    @PostMapping("/delete/{id}")
    public ResponseResult<Boolean> delete(@PathVariable String id) {
        Boolean flag = memberAttachmentResumeService
                .remove(Wrappers.<MemberAttachmentResume>lambdaQuery()
                        .eq(MemberAttachmentResume::getMemberId, tokenHelper.getAppMemberId())
                        .eq(MemberAttachmentResume::getId, id));
        return ResponseResult.buildByFlag(flag);
    }


    @Operation(summary = "更新简历名称", description = "更新简历名称")
    @PostMapping("/update/resume-name")
    public ResponseResult<Boolean> update(@RequestBody ResumeNameUpdateCommand updateCommand) {
        LambdaUpdateWrapper<MemberAttachmentResume> wrapper = Wrappers.<MemberAttachmentResume>lambdaUpdate()
                .set(MemberAttachmentResume::getFilename, updateCommand.getNewFilename())
                .eq(MemberAttachmentResume::getMemberId, tokenHelper.getAppMemberId())
                .eq(MemberAttachmentResume::getId, updateCommand.getId());
        boolean flag = memberAttachmentResumeService.update(wrapper);
        return ResponseResult.buildByFlag(flag);
    }

}

