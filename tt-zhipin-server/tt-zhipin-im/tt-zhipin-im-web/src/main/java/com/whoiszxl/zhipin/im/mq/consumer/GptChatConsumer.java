package com.whoiszxl.zhipin.im.mq.consumer;

import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.util.ObjUtil;
import cn.hutool.json.JSONObject;
import cn.hutool.json.JSONUtil;
import com.whoiszxl.zhipin.im.constants.AckStatusEnum;
import com.whoiszxl.zhipin.im.constants.KafkaMQConstants;
import com.whoiszxl.zhipin.im.constants.SequenceConstants;
import com.whoiszxl.zhipin.im.entity.MemberSession;
import com.whoiszxl.zhipin.im.idempotent.MessageIdempotentService;
import com.whoiszxl.zhipin.im.pack.MessagePack;
import com.whoiszxl.zhipin.im.pack.PrivateChatPack;
import com.whoiszxl.zhipin.im.processor.GptChatProcessor;
import com.whoiszxl.zhipin.im.processor.PrivateChatProcessor;
import com.whoiszxl.zhipin.im.protocol.Command;
import com.whoiszxl.zhipin.im.sequence.SequenceService;
import com.whoiszxl.zhipin.tools.gpt.cqrs.dto.Message;
import com.whoiszxl.zhipin.tools.gpt.cqrs.request.ChatCommand;
import com.whoiszxl.zhipin.tools.gpt.cqrs.response.ChatResponse;
import com.whoiszxl.zhipin.tools.gpt.session.GptSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class GptChatConsumer {


    private final GptChatProcessor gptChatProcessor;

    private final SequenceService sequenceService;



    @KafkaListener(topics = KafkaMQConstants.IM_NETTY_TO_GPT_TOPIC , groupId = "im-group")
    public void onMessage(String s) {

        if(StringUtils.isBlank(s)) {
            log.info("ImConsumer|消息消费失败|{}", s);
            return;
        }

        JSONObject jsonObject = JSONUtil.parseObj(s);
        Object dataPackObj = jsonObject.get("dataPack");
        jsonObject.remove("dataPack");

        MessagePack messagePack = JSONUtil.toBean(jsonObject, MessagePack.class);
        PrivateChatPack privateChatPack = JSONUtil.toBean(dataPackObj.toString(), PrivateChatPack.class);
        messagePack.setDataPack(privateChatPack);

        gptChatProcessor.process(messagePack);

    }


}