package com.whoiszxl.zhipin.im.cqrs.command;

import com.whoiszxl.zhipin.im.entity.BaseRequest;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

/**
 * 对话删除命令
 * @author whoiszxl
 */
@Data
@Schema(description = "对话删除命令")
public class TalkDeleteCommand extends BaseRequest {

    @Schema(description = "对话ID")
    private Long talkId;
}
