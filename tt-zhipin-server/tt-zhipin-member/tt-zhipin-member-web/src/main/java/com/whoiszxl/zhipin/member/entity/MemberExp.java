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
 * 会员经历表
 * </p>
 *
 * @author whoiszxl
 * @since 2023-08-04
 */
@Data
@TableName("ums_member_exp")
@Schema(description = "会员经历表")
public class MemberExp implements Serializable {

    private static final long serialVersionUID = 1L;

    @Schema(description = "会员ID")
    private Long memberId;

    @Schema(description = "个人优势")
    private String advantage;

    @Schema(description = "求职期望, 对象数组, 最多两个")
    private String workExpect;

    @Schema(description = "工作经历, 对象数组, 暂定无上限")
    private String workExperience;

    @Schema(description = "项目经历, 对象数组, 暂定无上限")
    private String projectExperience;

    @Schema(description = "教育经历, 对象数组, 暂定无上限")
    private String eduExperience;

    @Schema(description = "资格证书")
    private String qualification;

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
