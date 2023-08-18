package com.whoiszxl.zhipin.im.mq.consumer;

import com.whoiszxl.zhipin.im.constants.RocketMqConstants;
import lombok.extern.slf4j.Slf4j;
import org.apache.rocketmq.spring.annotation.RocketMQMessageListener;
import org.apache.rocketmq.spring.core.RocketMQListener;
import org.springframework.stereotype.Component;


/**
 * IM消费者
 * @author whoiszxl
 */
@Slf4j
@Component
@RocketMQMessageListener(topic = RocketMqConstants.MESSAGE_TOPIC + "${netty.nodeId}", consumerGroup = "im-group")
public class ImConsumer implements RocketMQListener<String> {

    @Override
    public void onMessage(String s) {
        System.out.println(s);
    }
}
