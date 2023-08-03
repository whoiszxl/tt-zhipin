package com.whoiszxl.zhipin.tools.doc;

import com.whoiszxl.zhipin.tools.common.properties.ZhipinProperties;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * @author whoiszxl
 */
@Configuration
@RequiredArgsConstructor
@ConditionalOnProperty(name = "zhipin.docs.enabled", havingValue = "true", matchIfMissing = true)
public class SwaggerConfiguration {

    private final ZhipinProperties zhipinProperties;

    @Bean
    public OpenAPI openApi() {
        return new OpenAPI().info(new Info()
                .title(zhipinProperties.getProjectName() + "接口文档")
                .version(zhipinProperties.getVersion())
                .description(zhipinProperties.getDescription())
                .contact(zhipinProperties.getContact())
                .license(zhipinProperties.getLicense())
        );
    }

}
