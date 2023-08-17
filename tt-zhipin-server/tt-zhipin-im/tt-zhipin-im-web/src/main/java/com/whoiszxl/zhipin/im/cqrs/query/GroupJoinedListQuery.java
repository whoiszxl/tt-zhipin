package com.whoiszxl.zhipin.im.cqrs.query;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import javax.validation.constraints.NotBlank;

/**
 * 成员加入群组列表查询参数
 * @author whoiszxl
 */
@Data
@Schema(description = "成员加入群组列表查询参数")
public class GroupJoinedListQuery {

    @Schema(description = "账号ID")
    @NotBlank(message = "账号ID不能为空")
    private String memberId;

}
