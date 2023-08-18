package com.whoiszxl.zhipin.im.handler;

import cn.dev33.satoken.stp.StpUtil;
import cn.hutool.core.util.ObjUtil;
import cn.hutool.json.JSONUtil;
import com.whoiszxl.zhipin.im.bean.ChannelAttrDto;
import com.whoiszxl.zhipin.im.constants.ConnectStatusEnum;
import com.whoiszxl.zhipin.im.constants.FieldConstants;
import com.whoiszxl.zhipin.im.constants.ImRedisKeysEnum;
import com.whoiszxl.zhipin.im.mq.MqSenderService;
import com.whoiszxl.zhipin.im.pack.LoginPack;
import com.whoiszxl.zhipin.im.protocol.Command;
import com.whoiszxl.zhipin.im.protocol.Message;
import com.whoiszxl.zhipin.im.session.MemberSession;
import com.whoiszxl.zhipin.im.session.ChannelHolder;
import com.whoiszxl.zhipin.tools.common.utils.RedisUtils;
import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.SimpleChannelInboundHandler;
import io.netty.channel.socket.nio.NioSocketChannel;
import io.netty.util.AttributeKey;
import lombok.extern.slf4j.Slf4j;

import java.net.InetAddress;

/**
 * netty im聊天处理器
 * @author whoiszxl
 */
@Slf4j
public class NettyServerHandler extends SimpleChannelInboundHandler<Message> {

    private final RedisUtils redisUtils;

    private final MqSenderService mqSenderService;

    private final String nodeId;

    public NettyServerHandler(RedisUtils redisUtils, MqSenderService mqSenderService, String nodeId) {
        this.redisUtils = redisUtils;
        this.mqSenderService = mqSenderService;
        this.nodeId = nodeId;
    }

    @Override
    protected void channelRead0(ChannelHandlerContext ctx, Message msg) throws Exception {
        Byte commandType = msg.getCommandType();

        String token = msg.getToken();
        Object loginIdByToken = StpUtil.getLoginIdByToken(token);
        if(loginIdByToken == null) {
            log.info("token鉴权错误");
            return;
        }
        String memberId = (String)loginIdByToken;

        if(ObjUtil.equal(Command.Login, commandType)) {
            LoginPack loginPack = (LoginPack) msg.getMessagePacket();

            //将账号相关信息设置到channel attr
            setInfoToChannel(ctx, memberId, msg.getClientType(), msg.getImei());

            InetAddress localHost = InetAddress.getLocalHost();
            MemberSession memberSession = MemberSession.builder()
                    .memberId(memberId)
                    .clientType(msg.getClientType())
                    .imei(msg.getImei())
                    .nodeId(nodeId)
                    .nodeHost(localHost.getHostAddress())
                    .connectStatus(ConnectStatusEnum.ONLINE.getCode()).build();

            redisUtils.hPut(
                    String.format(ImRedisKeysEnum.MEMBER_SESSION_KEY.getPrefix(), loginPack.getMemberId()),
                    String.valueOf(msg.getClientType()),
                    JSONUtil.toJsonStr(memberSession));

            ChannelAttrDto channelAttrDto = ChannelHolder.getInfoFromChannel(ctx);
            ChannelHolder.put(channelAttrDto, (NioSocketChannel) ctx.channel());
        }


        if(ObjUtil.equal(Command.LOGOUT, commandType)) {
            ChannelHolder.logoutSession(redisUtils, ctx);
        }

        if(ObjUtil.equal(Command.HEART_BEAT, commandType)) {
            mqSenderService.sendMessage("test_topic", "666");

            ctx.channel().attr(AttributeKey.valueOf(FieldConstants.HEART_BEAT))
                    .set(System.currentTimeMillis());
        }

    }

    @Override
    public void userEventTriggered(ChannelHandlerContext ctx, Object evt) throws Exception {
        super.userEventTriggered(ctx, evt);
    }

    private void setInfoToChannel(ChannelHandlerContext ctx, String memberId, Byte clientType, String imei) {
        ctx.channel().attr(AttributeKey.valueOf(FieldConstants.MEMBER_ID)).set(memberId);
        ctx.channel().attr(AttributeKey.valueOf(FieldConstants.CLIENT_TYPE)).set(clientType);
        ctx.channel().attr(AttributeKey.valueOf(FieldConstants.IMEI)).set(imei);
    }
}
