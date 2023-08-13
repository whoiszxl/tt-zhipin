package com.whoiszxl.zhipin.file.properties;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

/**
 * 阿里云OSS配置
 *
 * @author whoiszxl
 * @date 2022/3/24
 */
@Data
@Component
@ConfigurationProperties(prefix = "tt-zhipin-file.oss")
public class AliOssProperties {

    private String domainUrl;

    private String accessKey;

    private String secretKey;

    private String endpoint;

    private String bucketName;

}
