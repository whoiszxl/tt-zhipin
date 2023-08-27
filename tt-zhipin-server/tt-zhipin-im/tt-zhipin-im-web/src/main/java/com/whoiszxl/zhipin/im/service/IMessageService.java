package com.whoiszxl.zhipin.im.service;

import com.whoiszxl.zhipin.im.entity.Message;
import com.baomidou.mybatisplus.extension.service.IService;
import com.whoiszxl.zhipin.im.pack.MessagePack;
import com.whoiszxl.zhipin.im.protocol.ChatMessage;

import java.util.Set;

/**
 * <p>
 * 消息表 服务类
 * </p>
 *
 * @author whoiszxl
 * @since 2023-08-17
 */
public interface IMessageService extends IService<Message> {


    /**
     * 持久化私聊消息
     * @param messagePack 消息体
     */
    Long savePrivateChatMessage(MessagePack messagePack);

    /**
     * 持久化群聊消息
     * @param messagePack 消息体
     */
    void saveGroupChatMessage(MessagePack messagePack);

    /**
     * 离线消息持久化
     * @param messagePack 消息体
     * @param contentId 私聊消息体的ID
     */
    void saveOfflineMessage(MessagePack messagePack, Long contentId);

    /**
     * 获取离线消息列表
     */
    Set listOfflineMessage();

}
