package com.whoiszxl.zhipin.im.cqrs.command;

import com.whoiszxl.zhipin.im.entity.BaseRequest;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

/**
 * 对话添加命令
 * @author whoiszxl
 */
@Data
@Schema(description = "对话添加命令")
public class TalkAddCommand extends BaseRequest {

    @Schema(description = "对话类型: 1-单聊 2-群聊 3-ChatGPT 4-机器人")
    private Integer talkType;

    @Schema(description = "接收会话的用户ID")
    private Long toMemberId;
}
