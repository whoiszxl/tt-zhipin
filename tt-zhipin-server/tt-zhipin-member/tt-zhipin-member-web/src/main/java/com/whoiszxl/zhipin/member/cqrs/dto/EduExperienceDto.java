package com.whoiszxl.zhipin.member.cqrs.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@Schema(description = "教育经历实体")
public class EduExperienceDto {

    @Schema(description = "学校")
    private String schoolName;

    @Schema(description = "学历")
    private String educationAttainment;

    @Schema(description = "专业")
    private String major;

    @Schema(description = "时间段起始值，以年份为单位")
    private Integer yearStart;

    @Schema(description = "时间段结束值，以年份为单位")
    private Integer yearEnd;

    @Schema(description = "在校经历")
    private String schoolExp;

    @Schema(description = "毕业设计/论文")
    private String paper;

}
