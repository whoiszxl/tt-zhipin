package com.whoiszxl.zhipin.member.cqrs.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Schema(description = "项目经验实体")
public class ProjectExperienceDto {

    @Schema(description = "项目名称")
    private String projectName;

    @Schema(description = "担任角色")
    private String projectRole;

    @Schema(description = "项目时间起始值")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private LocalDateTime projectDateStart;

    @Schema(description = "项目时间结束值")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private LocalDateTime projectDateEnd;

    @Schema(description = "项目业绩")
    private String projectResult;

    @Schema(description = "项目链接")
    private String projectLink;

}
