package com.whoiszxl.zhipin.im.pack;

import com.whoiszxl.zhipin.im.protocol.Command;
import com.whoiszxl.zhipin.im.protocol.Packet;
import lombok.Data;

/**
 * 登录的数据包
 * @author whoiszxl
 */
@Data
public class LoginPack extends Packet {

    private String token;
    @Override
    public Integer getCommand() {
        return Command.LOGIN;
    }
}
