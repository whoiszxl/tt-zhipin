package com.whoiszxl.zhipin.member.service;

import com.whoiszxl.zhipin.member.cqrs.command.AttachmentResumeSaveCommand;
import com.whoiszxl.zhipin.member.entity.MemberAttachmentResume;
import com.baomidou.mybatisplus.extension.service.IService;

/**
 * <p>
 * 会员附件简历表 服务类
 * </p>
 *
 * @author whoiszxl
 * @since 2023-12-21
 */
public interface IMemberAttachmentResumeService extends IService<MemberAttachmentResume> {

    /**
     * 保存用户的附件简历
     * @param saveCommand 保存参数
     * @return
     */
    Boolean saveResume(AttachmentResumeSaveCommand saveCommand);
}
