package com.whoiszxl.zhipin.im.protocol;

import lombok.Data;

/**
 * 消息
 * @author whoiszxl
 */
@Data
public class Message {

    private byte commandType;

    private byte clientType;

    private byte messageType;

    private String imei;

    private String token;

    private Packet messagePacket;
}
