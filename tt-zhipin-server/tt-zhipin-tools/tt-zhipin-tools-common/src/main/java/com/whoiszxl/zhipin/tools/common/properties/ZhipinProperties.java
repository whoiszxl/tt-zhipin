package com.whoiszxl.zhipin.tools.common.properties;

import cn.hutool.core.convert.Convert;
import cn.hutool.extra.spring.SpringUtil;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.License;
import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.NestedConfigurationProperty;
import org.springframework.stereotype.Component;

/**
 * zhipin 配置类
 * @author whoiszxl
 */
@Data
@Component
@ConfigurationProperties(prefix = "zhipin.info")
public class ZhipinProperties {

    /**
     * 项目名称
     */
    private String projectName;

    /**
     * 项目版本
     */
    private String version;

    /**
     * 项目描述
     */
    private String description;

    /**
     * 联系方式
     */
    @NestedConfigurationProperty
    private Contact contact;

    /**
     * 许可
     */
    @NestedConfigurationProperty
    private License license;

    public static final Boolean PARSE_LOCAL_ADDR;

    static {
        PARSE_LOCAL_ADDR = Convert.toBool(SpringUtil.getProperty("zhipin.info.parseLocalAddr"));
    }
}
