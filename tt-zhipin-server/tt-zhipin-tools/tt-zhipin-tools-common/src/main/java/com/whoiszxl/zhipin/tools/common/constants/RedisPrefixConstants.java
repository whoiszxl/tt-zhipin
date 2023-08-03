package com.whoiszxl.zhipin.tools.common.constants;

/**
 * Redis Key 前缀常量
 *
 * @author whoiszxl
 */
public class RedisPrefixConstants {


    public interface Admin {
        String ADMIN_CAPTCHA_IMAGE_KEY = "admin:captcha:image:key";
    }


    public static String format(String... keys) {
        return String.join(":", keys);
    }

}
