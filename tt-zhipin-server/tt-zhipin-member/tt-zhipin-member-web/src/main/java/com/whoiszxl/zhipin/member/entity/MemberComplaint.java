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
 * 会员投诉表
 * </p>
 *
 * @author whoiszxl
 * @since 2023-08-04
 */
@Data
@TableName("ums_member_complaint")
@Schema(description = "会员投诉表")
public class MemberComplaint implements Serializable {

    private static final long serialVersionUID = 1L;

    @Schema(description = "主键ID")
    private Long id;

    @Schema(description = "举报人的用户ID")
    private Long memberId;

    @Schema(description = "被举报的用户ID")
    private Long complaintMemberId;

    @Schema(description = "被举报的JD的ID")
    private Long reportJdId;

    @Schema(description = "举报标题")
    private String title;

    @Schema(description = "举报内容")
    private String content;

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
