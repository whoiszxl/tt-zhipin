package com.whoiszxl.zhipin.im.feign;

import com.whoiszxl.zhipin.im.dto.CheckGroupChatPermissionQuery;
import com.whoiszxl.zhipin.im.dto.CheckPrivateChatPermissionQuery;
import com.whoiszxl.zhipin.tools.common.entity.ResponseResult;
import com.whoiszxl.zhipin.tools.common.feign.FeignTokenConfig;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "tt-zhipin-im", contextId = "ImFeign", configuration = FeignTokenConfig.class)
public interface PermissionCheckFeign {

    /**
     * 校验私聊消息是否可以发送
     * @param query 查询参数
     * @return 是否可发送
     */
    @PostMapping("/checkPrivateChatPermission")
    ResponseResult<Boolean> checkPrivateChatPermission(@RequestBody CheckPrivateChatPermissionQuery query);

    /**
     * 校验群聊消息是否可以发送
     * @param query 查询参数
     * @return 是否可发送
     */
    @PostMapping("/checkGroupChatPermission")
    ResponseResult<Boolean> checkGroupChatPermission(@RequestBody CheckGroupChatPermissionQuery query);
}

