package com.whoiszxl.zhipin.im.pack;

import com.whoiszxl.zhipin.im.protocol.Command;
import com.whoiszxl.zhipin.im.protocol.Packet;
import lombok.Data;

/**
 * 登出的数据包
 * @author whoiszxl
 */
@Data
public class LogoutPack extends Packet {

    /**
     * 登录的账号ID
     */
    private String memberId;

    @Override
    public Byte getCommand() {
        return Command.LOGOUT;
    }
}
