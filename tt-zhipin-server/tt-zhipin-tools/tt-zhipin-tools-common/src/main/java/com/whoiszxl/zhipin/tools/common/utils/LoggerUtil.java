package com.whoiszxl.zhipin.tools.common.utils;

import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;

/**
 * 日志输出工具
 */
@Slf4j
public class LoggerUtil {

    /**
     * 日志格式化样式
     */
    private static final String FORMAT = "%s|%s|%s";

    /**
     * 日志格式化
     * @param module 模块名
     * @param desc 日志描述
     * @param params 日志参数
     * @return 格式化后的日志
     */
    public static String format(String module, String desc, Object... params) {
        if(params != null && params.length > 0) {
            String paramsStr = StringUtils.join(params, ",");
            return String.format(FORMAT, module, desc, paramsStr);
        }
        return null;
    }


    public static void info(String module, String desc, Object... params) {
        log.info(format(module, desc, params));
    }

    public static void warn(String module, String desc, Object... params) {
        log.warn(format(module, desc, params));
    }

    public static void debug(String module, String desc, Object... params) {
        log.debug(format(module, desc, params));
    }

    public static void error(String module, String desc, Object... params) {
        log.error(format(module, desc, params));
    }

}
