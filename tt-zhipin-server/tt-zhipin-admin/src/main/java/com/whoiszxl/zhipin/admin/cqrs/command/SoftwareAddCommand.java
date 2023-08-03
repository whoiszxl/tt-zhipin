package com.whoiszxl.zhipin.admin.cqrs.command;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.io.Serializable;

/**
 * <p>
 * 基础组件表
 * </p>
 *
 * @author whoiszxl
 * @since 2023-03-11
 */
@Data
@Schema(description = "基础组件表")
public class SoftwareAddCommand implements Serializable {

    private static final long serialVersionUID = 1L;

    @Schema(description = "组件名")
    private String softwareName;

    @Schema(description = "组件文件名")
    private String softwareFilename;

    @Schema(description = "组件文件路径")
    private String softwarePath;

    @Schema(description = "组件安装路径")
    private String installPath;

    @Schema(description = "环境变量路径")
    private String envPath;

    @Schema(description = "环境变量内容")
    private String envContent;

    @Schema(description = "安装脚本路径")
    private String installScriptPath;

    @Schema(description = "启动脚本路径")
    private String startScriptPath;

    @Schema(description = "状态脚本路径")
    private String statusScriptPath;

    @Schema(description = "业务状态")
    private Integer status;

}
