package com.whoiszxl.zhipin.member.cqrs.command;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@Schema(description = "附件简历保存命令")
public class AttachmentResumeSaveCommand {

    @Schema(description = "文件名称")
    private String filename;

    @Schema(description = "文件路径")
    private String url;
}
