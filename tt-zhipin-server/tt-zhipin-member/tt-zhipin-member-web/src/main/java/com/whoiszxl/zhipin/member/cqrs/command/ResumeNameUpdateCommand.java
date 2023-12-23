package com.whoiszxl.zhipin.member.cqrs.command;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@Schema(description = "附件简历名称更新命令")
public class ResumeNameUpdateCommand {

    @Schema(description = "附件简历id")
    private String id;

    @Schema(description = "附件简历新名称")
    private String newFilename;
}
