package com.whoiszxl.zhipin.job.cqrs.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.util.List;

/**
 * @author whoiszxl
 */
@Data
@Schema(description = "薪资可选项DTO")
public class SalaryOptionalDTO {

    @Schema(description = "发薪日")
    private String payDay;

    @Schema(description = "奖金补贴")
    private List<String> subsidy;

    @Schema(description = "底薪")
    private Integer basicSalary;

    @Schema(description = "社保类型")
    private String socialSecurity;

}
