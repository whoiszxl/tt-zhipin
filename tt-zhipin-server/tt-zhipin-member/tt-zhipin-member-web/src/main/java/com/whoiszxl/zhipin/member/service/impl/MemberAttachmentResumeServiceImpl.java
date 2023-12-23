package com.whoiszxl.zhipin.member.service.impl;

import cn.hutool.core.lang.Assert;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.whoiszxl.zhipin.member.cqrs.command.AttachmentResumeSaveCommand;
import com.whoiszxl.zhipin.member.entity.MemberAttachmentResume;
import com.whoiszxl.zhipin.member.mapper.MemberAttachmentResumeMapper;
import com.whoiszxl.zhipin.member.service.IMemberAttachmentResumeService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.whoiszxl.zhipin.tools.common.token.TokenHelper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 会员附件简历表 服务实现类
 * </p>
 *
 * @author whoiszxl
 * @since 2023-12-21
 */
@Service
@RequiredArgsConstructor
public class MemberAttachmentResumeServiceImpl extends ServiceImpl<MemberAttachmentResumeMapper, MemberAttachmentResume> implements IMemberAttachmentResumeService {

    private final TokenHelper tokenHelper;

    @Override
    public Boolean saveResume(AttachmentResumeSaveCommand saveCommand) {
        Long memberId = tokenHelper.getAppMemberId();

        // 校验附件简历数量，不允许超过三个
        LambdaQueryWrapper<MemberAttachmentResume> queryWrapper = Wrappers.<MemberAttachmentResume>lambdaQuery()
                .eq(MemberAttachmentResume::getMemberId, memberId);
        long count = this.count(queryWrapper);
        Assert.isTrue(count < 3, "超过了附件简历数量上限");

        MemberAttachmentResume memberAttachmentResume = new MemberAttachmentResume();
        memberAttachmentResume.setMemberId(memberId);
        memberAttachmentResume.setFilename(saveCommand.getFilename());
        memberAttachmentResume.setUrl(saveCommand.getUrl());
        // TODO: 此处可校验文件是否是本平台上传的，防止用户恶意上传

        return this.save(memberAttachmentResume);
    }
}
