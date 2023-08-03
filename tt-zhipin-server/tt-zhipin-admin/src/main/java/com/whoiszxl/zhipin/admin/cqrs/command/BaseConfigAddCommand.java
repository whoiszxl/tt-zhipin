package com.whoiszxl.zhipin.admin.cqrs.command;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.io.Serializable;

/**
 * <p>
 * 基础配置表
 * </p>
 *
 * @author whoiszxl
 * @since 2023-03-11
 */
@Data
@Schema(description = "基础配置表")
public class BaseConfigAddCommand implements Serializable {

    private static final long serialVersionUID = 1L;

    @Schema(description = "组件名")
    private String configKey;

    @Schema(description = "组件文件名")
    private String configValue;

    @Schema(description = "业务状态")
    private Integer status;

}
