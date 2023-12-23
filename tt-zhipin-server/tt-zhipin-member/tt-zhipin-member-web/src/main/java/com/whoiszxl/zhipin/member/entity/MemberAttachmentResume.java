package com.whoiszxl.zhipin.member.entity;

import com.baomidou.mybatisplus.annotation.*;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * <p>
 * 会员附件简历表
 * </p>
 *
 * @author whoiszxl
 * @since 2023-12-21
 */
@Getter
@Setter
@TableName("ums_member_attachment_resume")
@Schema(description = "会员附件简历表")
public class MemberAttachmentResume implements Serializable {

    private static final long serialVersionUID = 1L;

    @Schema(description = "主键ID")
    @TableId(value = "id", type = IdType.ASSIGN_ID)
    private Long id;

    @Schema(description = "用户ID")
    private Long memberId;

    @Schema(description = "文件名")
    private String filename;

    @Schema(description = "访问地址")
    private String url;

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
