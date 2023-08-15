package com.whoiszxl.zhipin.member.cqrs.command;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import javax.validation.constraints.Pattern;

/**
 * 初始化基础用户信息命令
 * @author whoiszxl
 */
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
@Schema(description = "初始化基础用户信息命令")
public class InitBaseInfoCommand {

    @Pattern(regexp = "[12]", message = "身份状态参数无效")
    @Schema(description = "身份状态")
    private String identityStatus;

    @Pattern(regexp = "[12345678]", message = "求职状态参数无效")
    @Schema(description = "求职状态")
    private String workStatus;

    @Pattern(regexp = "[123456]", message = "最高学历参数无效")
    @Schema(description = "最高学历")
    private String highestQualification;

    @Pattern(regexp = "[12]", message = "最高学历类型参数无效")
    @Schema(description = "最高学历类型")
    private String highestQualificationType;

    @Schema(description = "姓名")
    private String fullName;

    @Pattern(regexp = "[12]", message = "性别状态无效")
    @Schema(description = "性别: 1-男 2-女")
    private String gender;

    @Schema(description = "生日")
    private String birthday;

    @Schema(description = "头像")
    private String avatar;

}
