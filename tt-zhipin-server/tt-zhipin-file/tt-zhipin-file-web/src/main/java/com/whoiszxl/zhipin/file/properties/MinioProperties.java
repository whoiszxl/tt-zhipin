package com.whoiszxl.zhipin.file.properties;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

/**
 * minio配置
 */
@Data
@Component
@ConfigurationProperties(prefix = "tt-zhipin-file.minio")
public class MinioProperties {

    private String domainUrl;

    private String accessKey;

    private String secretKey;

    private String endpoint;

    private String bucketName;
}