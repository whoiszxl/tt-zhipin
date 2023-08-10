package com.whoiszxl.zhipin.member.cqrs.command;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@Schema(description = "公司提交审核条件")
public class ToutouSubmitCommand {

    @Schema(description = "公司名称")
    private String company;

    @Schema(description = "营业执照")
    private String businessLicense;

}
