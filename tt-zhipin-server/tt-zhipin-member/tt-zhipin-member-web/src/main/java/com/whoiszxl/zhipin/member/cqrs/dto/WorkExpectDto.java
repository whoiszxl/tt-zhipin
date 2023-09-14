package com.whoiszxl.zhipin.member.cqrs.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@Schema(description = "求职期望实体")
public class WorkExpectDto {

    @Schema(description = "求职类型：1-全职 2-兼职")
    private Integer type;

    @Schema(description = "工作城市")
    private String city;

    @Schema(description = "期望职位")
    private String job;

    @Schema(description = "薪资要求-起始值")
    private Integer salaryRangeStart;

    @Schema(description = "薪资要求-结束值")
    private Integer salaryRangeEnd;

    @Schema(description = "期望行业")
    private String[] industryArr;


}
