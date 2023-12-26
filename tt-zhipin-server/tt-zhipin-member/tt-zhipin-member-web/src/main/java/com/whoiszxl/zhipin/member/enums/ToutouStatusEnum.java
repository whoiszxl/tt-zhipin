package com.whoiszxl.zhipin.member.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * 头头状态枚举
 * 业务状态: 1-是 0-否
 * @author whoiszxl
 */
@Getter
@AllArgsConstructor
public enum ToutouStatusEnum {

    /**
     * 是
     */
    YES(1, "是"),

    /**
     * 否
     */
    NO(0, "否"),
    ;

    private final Integer code;
    private final String desc;
}