package com.whoiszxl.zhipin.member.entity;

import com.baomidou.mybatisplus.annotation.TableLogic;
import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.annotation.Version;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * <p>
 * 头头表
 * </p>
 *
 * @author whoiszxl
 * @since 2023-08-04
 */
@Data
@TableName("ums_member_toutou")
@Schema(description = "头头表")
public class MemberToutou implements Serializable {

    private static final long serialVersionUID = 1L;

    @Schema(description = "会员ID")
    private Long memberId;

    @Schema(description = "手机")
    private String phone;

    @Schema(description = "接收简历邮箱(选填)")
    private String resumeEmail;

    @Schema(description = "公司名称")
    private String company;

    @Schema(description = "公司规模")
    private String companyScale;

    @Schema(description = "融资阶段")
    private String financingStage;

    @Schema(description = "所属行业")
    private String industry;

    @Schema(description = "营业执照")
    private String businessLicense;

    @Schema(description = "全名")
    private String fullName;

    @Schema(description = "微信号")
    private String wxCode;

    @Schema(description = "头像")
    private String avatar;

    @Schema(description = "IP地址")
    private String ip;

    @Schema(description = "状态(0:无效 1:有效)")
    private Integer status;

    @Schema(description = "乐观锁")
    @Version
    private Long version;

    @Schema(description = "逻辑删除 1: 已删除, 0: 未删除")
    @TableLogic
    private Integer isDeleted;

    @Schema(description = "创建时间")
    private LocalDateTime createdAt;

    @Schema(description = "更新时间")
    private LocalDateTime updatedAt;


}
