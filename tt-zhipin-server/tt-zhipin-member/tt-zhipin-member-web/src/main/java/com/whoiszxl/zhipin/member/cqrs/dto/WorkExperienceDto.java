package com.whoiszxl.zhipin.member.cqrs.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Schema(description = "工作经验实体")
public class WorkExperienceDto {

    @Schema(description = "公司名称")
    private String companyFullName;

    @Schema(description = "所在行业")
    private String industry;

    @Schema(description = "在职时间起始值")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private LocalDateTime workDateStart;

    @Schema(description = "在职时间结束值")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private LocalDateTime workDateEnd;

    @Schema(description = "职位名称")
    private String jobName;

    @Schema(description = "工作内容")
    private String workDetail;
}
