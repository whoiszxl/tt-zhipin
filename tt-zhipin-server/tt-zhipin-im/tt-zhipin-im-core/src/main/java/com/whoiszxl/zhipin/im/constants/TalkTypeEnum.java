package com.whoiszxl.zhipin.im.constants;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * 对话类型枚举
 * @author whoiszxl
 */
@Getter
@AllArgsConstructor
public enum TalkTypeEnum {

    /**
     * 私聊
     */
    PRIVATE_CHAT(1, "私聊"),

    /**
     * 群聊
     */
    GROUP_CHAT(2, "群聊"),

    /**
     * CHAT GPT
     */
    GPT_CHAT(2, "CHAT GPT"),

    /**
     * 机器人
     */
    ROBOT_CHAT(2, "机器人"),
    ;

    private final Integer code;
    private final String desc;
}