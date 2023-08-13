package com.whoiszxl.zhipin.file.config;

import com.aliyun.oss.OSS;
import com.aliyun.oss.OSSClientBuilder;
import com.whoiszxl.zhipin.file.properties.AliOssProperties;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@RequiredArgsConstructor
public class AliyunOssConfig {

    private final AliOssProperties aliOssProperties;

    @Bean
    public OSS ossClient() {
        return new OSSClientBuilder()
                .build(aliOssProperties.getEndpoint(),
                        aliOssProperties.getAccessKey(),
                        aliOssProperties.getSecretKey());
    }
}