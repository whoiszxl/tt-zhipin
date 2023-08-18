package com.whoiszxl.zhipin.im.codec;

import cn.hutool.json.JSONUtil;
import com.whoiszxl.zhipin.im.protocol.Message;
import com.whoiszxl.zhipin.im.protocol.Packet;
import io.netty.buffer.ByteBuf;
import io.netty.channel.ChannelHandlerContext;
import io.netty.handler.codec.ByteToMessageDecoder;

import java.util.List;


/**
 * 消息解码器
 * clientType
 * imei length
 * 接收客户端发送过来的二进制消息进行解码
 * [    byte   ] [    byte  ] [    byte   ] [    int   ] [    int   ] [    int    ]
 * [commandType] [clientType] [messageType] [tokenLength] [imeiLength] [bodyLength] [tokenData] [imeiData] [bodyData]
 * @author whoiszxl
 */
public class MessageDecoder extends ByteToMessageDecoder {

    private final static Integer MESSAGE_MIN_LENGTH = 15;

    /**
     * 当客户端连接到当前TCP服务，发送一段消息之后，此方法会首先接收到客户端发送过来的消息。
     * 收到消息之后，需要对消息进行读取解析，先获取消息头，再获取消息体。
     * 然后封装为 Message 对象，以便后续进行业务处理。
     */
    @Override
    protected void decode(ChannelHandlerContext ctx, ByteBuf in, List<Object> out) throws Exception {
        if(in.readableBytes() < MESSAGE_MIN_LENGTH) {
            return;
        }

        //1. 获取消息头信息
        byte commandType = in.readByte();
        byte clientType = in.readByte();
        byte messageType = in.readByte();
        int tokenLength = in.readInt();
        int imeiLength = in.readInt();
        int bodyLength = in.readInt();

        // 如果消息体的长度小于imei+body的长度，则将读取索引更新为之前标记的地方
        if(in.readableBytes() < tokenLength + imeiLength + bodyLength) {
            in.resetReaderIndex();
            return;
        }

        // 获取 TOKEN 信息
        byte[] tokenData = new byte[tokenLength];
        in.readBytes(tokenData);
        String token = new String(tokenData);

        //2. 获取 IMEI 信息
        byte[] imeiData = new byte[imeiLength];
        in.readBytes(imeiData);
        String imei = new String(imeiData);

        //3. 获取消息体信息
        byte[] bodyData = new byte[bodyLength];
        in.readBytes(bodyData);
        String body = new String(bodyData);

        //4. 将获取的JSON消息体转为Packet对象，方面后续处理
        Packet packet = JSONUtil.toBean(body, Packet.get(commandType));

        //5. 包装为Message返回
        Message message = new Message();
        message.setCommandType(commandType);
        message.setClientType(clientType);
        message.setToken(token);
        message.setImei(imei);
        message.setMessageType(messageType);
        message.setMessagePacket(packet);

        // 标记读取到了什么位置
        in.markReaderIndex();
        out.add(message);
    }
}
