package com.whoiszxl.zhipin.im.cqrs.query;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import javax.validation.constraints.NotBlank;

/**
 * 好友请求审批命令
 * @author whoiszxl
 */
@Data
@Schema(description = "好友请求审批命令")
public class FriendRequestListQuery {

    @Schema(description = "自身的账号ID")
    @NotBlank(message = "自身的账号ID不能为空")
    private Long fromMemberId;
}
