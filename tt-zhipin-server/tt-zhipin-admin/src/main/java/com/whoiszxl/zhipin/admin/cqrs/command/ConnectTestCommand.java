package com.whoiszxl.zhipin.admin.cqrs.command;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

/**
 * @author whoiszxl
 */
@Data
@Schema(description = "服务器连接测试命令")
@JsonIgnoreProperties(ignoreUnknown = true)
public class ConnectTestCommand {

    @Schema(description = "服务器外网IP")
    private String serverOuterIp;

    @Schema(description = "服务器端口")
    private String serverPort;

    @Schema(description = "服务器用户名")
    private String serverUsername;

    @Schema(description = "服务器密码")
    private String serverPassword;
}