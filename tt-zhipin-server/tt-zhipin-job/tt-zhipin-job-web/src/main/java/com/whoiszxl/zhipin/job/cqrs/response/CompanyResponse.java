package com.whoiszxl.zhipin.job.cqrs.response;

import com.baomidou.mybatisplus.annotation.TableLogic;
import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.annotation.Version;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * <p>
 * 公司表
 * </p>
 *
 * @author whoiszxl
 * @since 2023-08-09
 */
@Data
@Schema(description = "公司返回实体对象")
public class CompanyResponse implements Serializable {

    private static final long serialVersionUID = 1L;

    @Schema(description = "主键ID")
    private Long id;

    @Schema(description = "申请用户ID")
    private Long applyMemberId;

    @Schema(description = "公司全称")
    private String companyFullName;

    @Schema(description = "公司缩略名")
    private String companyAbbrName;

    @Schema(description = "公司LOGO")
    private String companyLogo;

    @Schema(description = "公司描述")
    private String companyDescription;

    @Schema(description = "上班时间")
    private LocalDateTime workDateStart;

    @Schema(description = "下班时间")
    private LocalDateTime workDateEnd;

    @Schema(description = "休息时间: 1-双休 2-排班轮休")
    private Integer restWay;

    @Schema(description = "加班情况: 1-不加班 2-偶尔加班 3-弹性工作")
    private Integer overtime;

    @Schema(description = "公司照片, 数组保存")
    private String photo;

    @Schema(description = "员工福利, 数组保存, 对象为title+subTitle")
    private String employeeWelfare;

    @Schema(description = "主营业务, 数组保存")
    private String mainBusiness;

    @Schema(description = "公司经度")
    private BigDecimal longitude;

    @Schema(description = "公司纬度")
    private BigDecimal latitude;

    @Schema(description = "公司所在国家")
    private String country;

    @Schema(description = "公司所在省份")
    private String province;

    @Schema(description = "公司所在城市")
    private String city;

    @Schema(description = "公司所在区域")
    private String district;

    @Schema(description = "公司地址详情")
    private String addressDetail;

}
