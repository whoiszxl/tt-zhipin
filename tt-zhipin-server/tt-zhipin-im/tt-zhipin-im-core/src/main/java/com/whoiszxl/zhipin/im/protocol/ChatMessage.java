package com.whoiszxl.zhipin.im.protocol;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * 消息
 * @author whoiszxl
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "聊天消息")
public class ChatMessage<T> implements Serializable {

    @Schema(description = "接收者")
    private Long fromMemberId;

    @Schema(description = "接收者")
    private Long toMemberId;

    @Schema(description = "客户端类型")
    private byte clientType;

    @Schema(description = "命令")
    private Integer command;

    @Schema(description = "设备号")
    private String imei;

    @Schema(description = "token秘钥")
    private String token;

    @Schema(description = "消息体")
    private T data;

    @Schema(description = "发送时间")
    private LocalDateTime sendAt;

    @Schema(description = "扩展信息")
    private String extra;

    @Schema(description = "ack状态: 1-成功 0-失败")
    private byte ackStatus;
}
