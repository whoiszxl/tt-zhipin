package com.whoiszxl.zhipin.im.pack;

import com.whoiszxl.zhipin.im.protocol.Command;
import com.whoiszxl.zhipin.im.protocol.Packet;
import lombok.Data;

/**
 * 添加好友的数据包
 * @author whoiszxl
 */
@Data
public class AddFriendPack extends Packet {

    /**
     * to的账号ID
     */
    private String toMemberId;


    @Override
    public Byte getCommand() {
        return Command.ADD_FRIEND;
    }
}
