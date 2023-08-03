package com.whoiszxl.zhipin.admin.cqrs.command;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.io.Serializable;

/**
 * <p>
 * 基础组件配置表
 * </p>
 *
 * @author whoiszxl
 * @since 2023-03-11
 */
@Data
@Schema(description = "基础组件配置表")
@JsonIgnoreProperties(ignoreUnknown = true)
public class SoftwareConfigUpdateCommand implements Serializable {

    private static final long serialVersionUID = 1L;

    @Schema(description = "主键")
    private Integer softwareId;

    @Schema(description = "组件名")
    private String softwareName;

    @Schema(description = "组件文件名")
    private String configName;

    @Schema(description = "组件文件路径")
    private String configPath;

    @Schema(description = "组件文件模板")
    private String configTemplate;

    @Schema(description = "组件文件模板参数")
    private String configTemplateParams;

    @Schema(description = "业务状态")
    private Integer status;

}
