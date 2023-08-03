package com.whoiszxl.zhipin.tools.common.properties;

import cn.hutool.extra.spring.SpringUtil;

/**
 * rsa配置
 * @author whoiszxl
 */
public class RsaProperties {

    public static final String PRIVATE_KEY;

    static {
        PRIVATE_KEY = SpringUtil.getProperty("zhipin.rsa.privateKey");
    }
}
