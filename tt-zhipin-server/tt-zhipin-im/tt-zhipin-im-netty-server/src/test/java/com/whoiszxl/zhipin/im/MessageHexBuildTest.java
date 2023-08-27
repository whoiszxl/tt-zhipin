package com.whoiszxl.zhipin.im;

import cn.hutool.json.JSONUtil;
import com.whoiszxl.zhipin.im.constants.FieldConstants;
import com.whoiszxl.zhipin.im.pack.GroupChatPack;
import com.whoiszxl.zhipin.im.pack.PrivateChatPack;
import com.whoiszxl.zhipin.im.protocol.Command;
import com.whoiszxl.zhipin.tools.common.utils.HexUtils;
import lombok.extern.slf4j.Slf4j;
import org.junit.Before;
import org.junit.Test;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.boot.configurationprocessor.json.JSONObject;

import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;

@Slf4j
public class MessageHexBuildTest {

    String user1_token;
    String user2_token;

    //设备号
    String imei = "imei-100";
    Integer commandType = Command.LOGIN;
    byte clientType = 1;

    @Before
    public void init() throws IOException {
        user1_token = "dbfd226d-0cb4-4390-b49c-dab30cc9f97d";
        user2_token = "e8a257a1-211d-47f9-89dc-2202250791d6";
    }

    /**
     * user1 token 二进制: 000003ea0100000024000000080000003064626664323236642d306362342d343339302d623439632d646162333063633966393764696d65692d3130307b22746f6b656e223a2264626664323236642d306362342d343339302d623439632d646162333063633966393764227d
     *
     * user2 token 二进制: 000003ea0100000024000000080000003065386132353761312d323131642d343766392d383964632d323230323235303739316436696d65692d3130307b22746f6b656e223a2265386132353761312d323131642d343766392d383964632d323230323235303739316436227d
     * @throws JSONException
     */
    @Test
    public void buildLogin() throws JSONException {
        JSONObject data = new JSONObject();
        data.put(FieldConstants.TOKEN, user1_token);
        String jsonData = data.toString();
        String user1Token = build(user1_token, this.commandType, jsonData);

        data.put(FieldConstants.TOKEN, user2_token);
        jsonData = data.toString();
        String user2Token = build(user2_token, this.commandType, jsonData);
        log.info("user1 token 二进制: {}", user1Token);
        log.info("user2 token 二进制: {}", user2Token);
    }


    /**
     * 1 -> 2 的二进制消息：00000bb90100000024000000080000005064626664323236642d306362342d343339302d623439632d646162333063633966393764696d65692d3130307b2267726f75704964223a3130302c226d6573736167654964223a226d73672d303031222c2266726f6d4d656d6265724964223a312c22626f6479223a2268656c6c6f2065766572796f6e652121227d
     * @throws JSONException
     */
    @Test
    public void buildGroupChat() throws JSONException {
        GroupChatPack groupChatPack = GroupChatPack.builder()
                .groupId(100L)
                .fromMemberId(1L)
                .messageId("msg-001")
                .body("hello everyone!!")
                .build();
        String jsonData = JSONUtil.toJsonStr(groupChatPack);
        String message = build(user1_token, Command.GroupCommand.GROUP_CHAT, jsonData);

        log.info("消息体 二进制: {}", message);
    }

    /**
     * 1 -> 2 的二进制消息：000007d10100000024000000080000004864626664323236642d306362342d343339302d623439632d646162333063633966393764696d65692d3130307b226d6573736167654964223a226d73672d303031222c2266726f6d4d656d6265724964223a312c22746f4d656d6265724964223a322c22626f6479223a2268656c6c6f2121227d
     * @throws JSONException
     */
    @Test
    public void buildPrivateChat() throws JSONException {
        PrivateChatPack privateChatPack = PrivateChatPack.builder()
                .messageId("msg-001")
                .fromMemberId(1L)
                .toMemberId(2L)
                .body("hello!!")
                .build();
        String jsonData = JSONUtil.toJsonStr(privateChatPack);
        String message = build(user1_token, Command.MessageCommand.PRIVATE_CHAT, jsonData);

        log.info("消息体 二进制: {}", message);
    }

    /**
     * 心跳二进制包：000003ec0100000024000000080000001564626664323236642d306362342d343339302d623439632d646162333063633966393764696d65692d3130307b2274657374223a2268656172745f62656174227d
     * @throws JSONException
     */
    @Test
    public void buildHeartBeat() throws JSONException {
        HashMap<String, String> map = new HashMap<>();
        map.put("test", "heart_beat");
        String jsonData = JSONUtil.toJsonStr(map);
        String message = build(user1_token, Command.HEART_BEAT, jsonData);

        log.info("消息体 二进制: {}", message);
    }

    private String build(String userToken, Integer userCommand, String jsonData) throws JSONException {
        //获取消息头信息
        byte[] imei = this.imei.getBytes();
        int imeiLength = imei.length;
        byte[] imeiLengthBytes = ByteBuffer.allocate(4).putInt(imeiLength).array();

        byte[] token = userToken.getBytes();
        int tokenLength = token.length;
        byte[] tokenLengthBytes = ByteBuffer.allocate(4).putInt(tokenLength).array();

        byte[] command = ByteBuffer.allocate(4).putInt(userCommand).array();
        byte[] clientType = ByteBuffer.allocate(1).put(this.clientType).array();

        byte[] body = jsonData.getBytes(StandardCharsets.UTF_8);
        int bodyLength = body.length;
        byte[] bodyLengthBytes = ByteBuffer.allocate(4).putInt(bodyLength).array();

        return HexUtils.bytesToHexString(
                command,
                clientType,
                tokenLengthBytes,
                imeiLengthBytes,
                bodyLengthBytes,
                token,
                imei,
                body);
    }



}

