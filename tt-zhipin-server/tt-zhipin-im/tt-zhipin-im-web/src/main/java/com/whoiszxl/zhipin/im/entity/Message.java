package com.whoiszxl.zhipin.im.entity;

import com.baomidou.mybatisplus.annotation.TableLogic;
import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.annotation.Version;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * <p>
 * 消息表
 * </p>
 *
 * @author whoiszxl
 * @since 2023-08-17
 */
@Data
@TableName("im_message")
@Schema(description = "消息表")
public class Message implements Serializable {

    private static final long serialVersionUID = 1L;

    @Schema(description = "消息内容ID")
    private Long contentId;

    @Schema(description = "应用ID")
    private Long appId;

    @Schema(description = "发送用户的ID")
    private String fromAccountId;

    @Schema(description = "接收用户的ID")
    private String toAccountId;

    @Schema(description = "消息所属用户的ID")
    private Long ownerId;

    @Schema(description = "消息类型")
    private Boolean messageType;

    @Schema(description = "消息序列号")
    private Long sequence;

    @Schema(description = "乐观锁")
    @Version
    private Long version;

    @Schema(description = "业务状态")
    private Boolean status;

    @Schema(description = "逻辑删除 1: 已删除， 0: 未删除")
    @TableLogic
    private Boolean isDeleted;

    @Schema(description = "创建者")
    private String createdBy;

    @Schema(description = "更新者")
    private String updatedBy;

    @Schema(description = "创建时间")
    private LocalDateTime createdAt;

    @Schema(description = "更新时间")
    private LocalDateTime updatedAt;


}
