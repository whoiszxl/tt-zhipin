package com.whoiszxl.zhipin.admin.cqrs.command;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.io.Serializable;

/**
 * <p>
 * 服务器表
 * </p>
 *
 * @author whoiszxl
 * @since 2023-03-11
 */
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
@Schema(description = "服务器表")
public class ServerAddCommand implements Serializable {

    private static final long serialVersionUID = 1L;

    @Schema(description = "管理员ID")
    private Integer adminId;

    @Schema(description = "服务器名称")
    private String serverName;

    @Schema(description = "服务器外网IP")
    private String serverOuterIp;

    @Schema(description = "服务器内网IP")
    private String serverInnerIp;

    @Schema(description = "服务器端口")
    private String serverPort;

    @Schema(description = "服务器用户名")
    private String serverUsername;

    @Schema(description = "服务器密码")
    private String serverPassword;

    @Schema(description = "服务器类型: 1-自建 2-阿里云 3-腾讯云")
    private Integer platformType;

    @Schema(description = "业务状态")
    private Integer status;


}
