package com.whoiszxl.zhipin.member.cqrs.command;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import javax.validation.constraints.Pattern;

/**
 * 初始化基础用户信息命令
 * @author whoiszxl
 */
@Data
@Schema(description = "初始化基础用户信息命令")
public class InitBaseInfoCommand {

    @Pattern(regexp = "[12]", message = "身份状态参数无效")
    @Schema(description = "身份状态")
    private String identityStatus;

    @Pattern(regexp = "[1234]", message = "求职状态参数无效")
    @Schema(description = "求职状态")
    private String workStatus;

    @Pattern(regexp = "[1234567]", message = "最高学历参数无效")
    @Schema(description = "最高学历")
    private String highestQualification;

    @Pattern(regexp = "[12]", message = "最高学历类型参数无效")
    @Schema(description = "最高学历类型")
    private String highestQualificationType;

}
