package com.whoiszxl.zhipin.im.service.impl;

import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.util.IdUtil;
import cn.hutool.json.JSONUtil;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.whoiszxl.zhipin.im.entity.GroupMessage;
import com.whoiszxl.zhipin.im.entity.Message;
import com.whoiszxl.zhipin.im.entity.MessageContent;
import com.whoiszxl.zhipin.im.mapper.MessageMapper;
import com.whoiszxl.zhipin.im.pack.GroupChatPack;
import com.whoiszxl.zhipin.im.pack.MessagePack;
import com.whoiszxl.zhipin.im.pack.PrivateChatPack;
import com.whoiszxl.zhipin.im.service.IGroupMessageService;
import com.whoiszxl.zhipin.im.service.IMessageContentService;
import com.whoiszxl.zhipin.im.service.IMessageService;
import com.whoiszxl.zhipin.tools.common.token.TokenHelper;
import com.whoiszxl.zhipin.tools.common.utils.RedisUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;

/**
 * <p>
 * 消息表 服务实现类
 * </p>
 *
 * @author whoiszxl
 * @since 2023-08-17
 */
@Service
@Slf4j
@RequiredArgsConstructor
public class MessageServiceImpl extends ServiceImpl<MessageMapper, Message> implements IMessageService {

    private final IMessageContentService messageContentService;

    private final IGroupMessageService groupMessageService;

    private final TokenHelper tokenHelper;

    private final RedisUtils redisUtils;

    @Value("${im.offlineMessageMaxCount}")
    private Integer offlineMessageMaxCount;

    @Override
    @Transactional
    public Long savePrivateChatMessage(MessagePack messagePack) {
        PrivateChatPack privateChatPack = (PrivateChatPack) messagePack.getDataPack();

        // 消息体持久化
        long contentId = IdUtil.getSnowflakeNextId();
        MessageContent messageContent = new MessageContent();
        messageContent.setId(contentId);
        messageContent.setMessageContent(privateChatPack.getBody());
        messageContentService.save(messageContent);

        //消息记录持久化
        Message messageOne = buildPrivateMessage(privateChatPack.getFromMemberId(), privateChatPack, contentId);
        Message messageTwo = buildPrivateMessage(privateChatPack.getToMemberId(), privateChatPack, contentId);
        this.saveBatch(CollUtil.newArrayList(messageOne, messageTwo));

        return contentId;
    }

    private Message buildPrivateMessage(Long ownerId, PrivateChatPack privateChatPack, Long contentId) {
        Message message = new Message();
        message.setContentId(contentId);
        message.setFromMemberId(privateChatPack.getFromMemberId());
        message.setToMemberId(privateChatPack.getToMemberId());
        message.setOwnerId(ownerId);
        message.setMessageType(0); //TODO 待实现图片类型、语音类型
        message.setSequence(privateChatPack.getSequence());
        return message;
    }


    @Override
    public void saveGroupChatMessage(MessagePack messagePack) {
        GroupChatPack groupChatPack = (GroupChatPack) messagePack.getDataPack();

        // 消息体持久化
        long contentId = IdUtil.getSnowflakeNextId();
        MessageContent messageContent = new MessageContent();
        messageContent.setId(contentId);
        messageContent.setMessageContent(groupChatPack.getBody());
        messageContentService.save(messageContent);

        //消息记录持久化
        GroupMessage groupMessage = buildGroupMessage(groupChatPack, contentId);
        groupMessageService.save(groupMessage);

    }

    @Override
    public void saveOfflineMessage(MessagePack messagePack, Long contentId) {
        PrivateChatPack privateChatPack = (PrivateChatPack) messagePack.getDataPack();
        String key = String.format("%s:%s", "offlineMessage", privateChatPack.getToMemberId());
        Long size = redisUtils.zSize(key);
        if(size > offlineMessageMaxCount) {
            redisUtils.zRemoveRange(key, 0, 0);
        }

        redisUtils.zAdd(key, JSONUtil.toJsonStr(privateChatPack), contentId);
    }

    @Override
    public Set listOfflineMessage() {
        String key = String.format("%s:%s", "offlineMessage", tokenHelper.getAppMemberId());
        return redisUtils.zrange(key, 0, -1);
    }

    private GroupMessage buildGroupMessage(GroupChatPack groupChatPack, long contentId) {
        GroupMessage groupMessage = new GroupMessage();
        groupMessage.setId(IdUtil.getSnowflakeNextId());
        groupMessage.setGroupId(groupChatPack.getGroupId());
        groupMessage.setContentId(contentId);
        groupMessage.setOwnerMemberId(groupChatPack.getFromMemberId());
        groupMessage.setMessageType(0);  //TODO 待实现图片类型、语音类型
        groupMessage.setSequence(groupMessage.getSequence());
        return groupMessage;
    }
}
