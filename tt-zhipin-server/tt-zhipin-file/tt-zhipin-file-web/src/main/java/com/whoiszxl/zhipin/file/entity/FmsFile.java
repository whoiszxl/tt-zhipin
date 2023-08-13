package com.whoiszxl.zhipin.file.entity;

import com.baomidou.mybatisplus.annotation.*;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * <p>
 * 文件表
 * </p>
 *
 * @author whoiszxl
 * @since 2022-03-23
 */
@Data
@TableName("fms_file")
@Schema(description = "文件表")
public class FmsFile implements Serializable {

    private static final long serialVersionUID = 1L;

    @Schema(description = "文件主键id")
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    @Schema(description = "平台类型: 1-阿里云 2-七牛云 3-百度云 4-AmazonS3 5-minio")
    private Integer platformType;

    @Schema(description = "业务ID")
    private String bizId;

    @Schema(description = "业务类型: 1-会员在线简历 2-会员头像 3-头头头像 4-营业执照 5-企业图片 6-企业视频")
    private Integer bizType;

    @Schema(description = "数据类型: 1-目录 2-图片 3-视频 4-音频 5-文档 6-其他")
    private Integer dataType;

    @Schema(description = "原始文件名")
    private String originalFileName;

    @Schema(description = "最终文件名")
    private String finalFileName;

    @Schema(description = "相对路径")
    private String relativePath;

    @Schema(description = "访问地址")
    private String url;

    @Schema(description = "md5值")
    private String md5;

    @Schema(description = "文件后缀")
    private String ext;

    @Schema(description = "文件大小")
    private Long size;

    @Schema(description = "创建年份: yyyy")
    private String createdYear;

    @Schema(description = "创建年月: yyyy-MM")
    private String createdMonth;

    @Schema(description = "创建年月日: yyyy-MM-dd")
    private String createdDay;

    @Schema(description = "乐观锁")
    @Version
    private Long version;

    @Schema(description = "逻辑删除 1: 已删除, 0: 未删除")
    @TableLogic
    private Integer isDeleted;

    @Schema(description = "创建时间")
    private LocalDateTime createdAt;

    @Schema(description = "更新时间")
    private LocalDateTime updatedAt;

}
