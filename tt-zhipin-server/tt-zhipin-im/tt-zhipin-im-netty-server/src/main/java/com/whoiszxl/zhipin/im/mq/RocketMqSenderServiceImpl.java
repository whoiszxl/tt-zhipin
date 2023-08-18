package com.whoiszxl.zhipin.im.mq;

import lombok.extern.slf4j.Slf4j;
import org.apache.rocketmq.client.producer.DefaultMQProducer;
import org.apache.rocketmq.client.producer.SendResult;
import org.apache.rocketmq.client.producer.SendStatus;
import org.apache.rocketmq.common.message.Message;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.nio.charset.StandardCharsets;

/**
 * RocketMQ消息发送服务
 * @author whoiszxl
 */
@Slf4j
@Service
@ConditionalOnProperty(name = "rocketmq.enabled", havingValue = "true")
public class RocketMqSenderServiceImpl implements MqSenderService {

    @Value("${rocketmq.name-server}")
    private String nameServer;

    @Value("${rocketmq.im.group}")
    private String imGroup;

    private DefaultMQProducer defaultMqProducer;

    @PostConstruct
    public void init() {
        try {
            defaultMqProducer = new DefaultMQProducer(imGroup);
            defaultMqProducer.setNamesrvAddr(nameServer);
            defaultMqProducer.start();
            log.info("RocketMqSenderServiceImpl.init|IM服务生产者初始化成功|{},{}", nameServer, imGroup);
        }catch (Exception e) {
            log.error("RocketMqSenderServiceImpl.init|IM服务生产者初始化失败|{},{}", nameServer, imGroup, e);
        }
    }

    @Override
    public void shutdown() {
        defaultMqProducer.shutdown();
    }

    @Override
    public boolean sendMessage(String topic, String message) {
        return sendMessage(topic, message, -1);
    }

    @Override
    public boolean sendMessage(String topic, String message, Integer delayTimeLevel) {
        Message msg = new Message(topic, message.getBytes(StandardCharsets.UTF_8));
        try {
            if (delayTimeLevel > 0) {
                msg.setDelayTimeLevel(delayTimeLevel);
            }
            SendResult sendResult = defaultMqProducer.send(msg);
            if (SendStatus.SEND_OK.equals(sendResult.getSendStatus())) {
                log.info("RocketMqSenderServiceImpl.sendMessage|发送MQ消息成功|{}", message);
                return true;
            } else {
                log.info("RocketMqSenderServiceImpl.sendMessage|发送MQ消息失败|{}", message);
                return false;
            }
        } catch (Exception e) {
            log.error("RocketMqSenderServiceImpl.sendMessage|发送MQ消息发生异常|{}", message, e);
            return false;
        }
    }
}
