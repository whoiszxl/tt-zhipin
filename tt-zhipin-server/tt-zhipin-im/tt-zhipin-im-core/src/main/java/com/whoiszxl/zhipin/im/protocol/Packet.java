package com.whoiszxl.zhipin.im.protocol;

import com.whoiszxl.zhipin.im.pack.AddFriendPack;
import com.whoiszxl.zhipin.im.pack.LoginPack;
import com.whoiszxl.zhipin.im.pack.LogoutPack;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * 协议包
 * @author whoiszxl
 */
public abstract class Packet {

    /**
     * packet类型map
     */
    private final static Map<Byte, Class<? extends Packet>> PACKET_TYPE_MAP = new ConcurrentHashMap<>();

    static {
        PACKET_TYPE_MAP.put(Command.ADD_FRIEND, AddFriendPack.class);
        PACKET_TYPE_MAP.put(Command.Login, LoginPack.class);
        PACKET_TYPE_MAP.put(Command.LOGOUT, LogoutPack.class);
        PACKET_TYPE_MAP.put(Command.HEART_BEAT, LogoutPack.class);
    }

    public static Class<? extends Packet> get(byte command) {
        return PACKET_TYPE_MAP.get(command);
    }

    /**
     * 获取命令
     * @return 命令
     */
    public abstract Byte getCommand();

}
