package com.whoiszxl.zhipin.job.cqrs.query;

import com.whoiszxl.zhipin.tools.common.entity.PageQuery;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import org.springdoc.api.annotations.ParameterObject;

import java.util.ArrayList;

/**
 * @author whoiszxl
 */
@Data
@ParameterObject
@Schema(description = "岗位查询条件")
public class JobQuery extends PageQuery {

    @Schema(description = "学历")
    private String educationAttainment;

    @Schema(description = "薪资范围")
    private ArrayList<Integer> salary;
}
