package com.whoiszxl.zhipin.admin.cqrs.command;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.io.Serializable;

/**
 * <p>
 * 项目表
 * </p>
 *
 * @author whoiszxl
 * @since 2023-03-11
 */
@Data
@Schema(description = "项目更新命令")
@JsonIgnoreProperties(ignoreUnknown = true)
public class ProjectUpdateCommand implements Serializable {

    private static final long serialVersionUID = 1L;

    @Schema(description = "主键")
    private Integer id;

    @Schema(description = "项目名称")
    private String name;

    @Schema(description = "项目描述")
    private String description;

    @Schema(description = "项目文档")
    private String markdown;

    @Schema(description = "服务器类型: 1-自建 2-阿里云 3-腾讯云")
    private Integer platformType;

    @Schema(description = "生成服务器平台的参数(json格式)")
    private String platformParams;

    @Schema(description = "业务状态")
    private Integer status;

}
