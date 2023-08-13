package com.whoiszxl.zhipin.file.cqrs.query;

import com.whoiszxl.zhipin.tools.common.entity.PageQuery;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

/**
 * <p>
 * 文件表
 * </p>
 *
 * @author whoiszxl
 * @since 2022-03-23
 */
@Data
@Schema(description = "文件表")
public class FmsFileQuery extends PageQuery {

    @Schema(description = "平台类型: 1-阿里云 2-七牛云 3-百度云 4-AmazonS3")
    private Integer platformType;

    @Schema(description = "业务ID")
    private String bizId;

    @Schema(description = "业务类型: 1-商品 2-会员 3-wms")
    private Integer bizType;

    @Schema(description = "数据类型: 1-目录 2-图片 3-视频 4-音频 5-文档 6-其他")
    private Integer dataType;

}
