package com.whoiszxl.zhipin.job.cqrs.response;

import com.baomidou.mybatisplus.annotation.TableLogic;
import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.annotation.Version;
import com.fasterxml.jackson.annotation.JsonView;
import com.whoiszxl.zhipin.job.cqrs.dto.SalaryOptionalDTO;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * <p>
 * 职位表
 * </p>
 *
 * @author whoiszxl
 * @since 2023-08-09
 */
@Data
@Schema(description = "职位返回实体")
public class JobResponse implements Serializable {

    @Schema(description = "主键ID")
    private Long id;

    @Schema(description = "职位发布人ID")
    private Long memberId;

    @Schema(description = "职位所属公司ID")
    private Long companyId;

    @Schema(description = "职位名称")
    private String jobName;

    @Schema(description = "薪资范围起始值")
    private Integer salaryRangeStart;

    @Schema(description = "薪资范围结束值")
    private Integer salaryRangeEnd;

    @Schema(description = "薪资可选项: 发薪日|底薪|社保类型|提成|奖金补贴")
    private String salaryOptional;

    @Schema(description = "工作年限范围起始值")
    private Integer workYearRangeStart;

    @Schema(description = "工作年限范围结束值")
    private Integer workYearRangeEnd;

    @Schema(description = "年龄范围起始值")
    private Integer ageRangeStart;

    @Schema(description = "年龄范围结束值")
    private Integer ageRangeEnd;

    @Schema(description = "学历")
    private String educationAttainment;

    @Schema(description = "职位标签")
    private String jobTags;

    @Schema(description = "职位描述")
    private String jobDescription;

    @Schema(description = "回复次数")
    private Integer replyCount;

    @Schema(description = "工作地址经度")
    private BigDecimal longitude;

    @Schema(description = "工作地址纬度")
    private BigDecimal latitude;

    @Schema(description = "国家")
    private String country;

    @Schema(description = "省份")
    private String province;

    @Schema(description = "城市")
    private String city;

    @Schema(description = "区域")
    private String district;

    @Schema(description = "地址详情")
    private String addressDetail;

    @Schema(description = "创建时间")
    private LocalDateTime createdAt;

    @Schema(description = "更新时间")
    private LocalDateTime updatedAt;

    @Schema(description = "主键ID")
    private CompanyResponse companyResponse;

}
