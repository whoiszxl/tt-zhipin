package com.whoiszxl.zhipin.job.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * <p>
 * 职位三级分类表
 * </p>
 *
 * @author whoiszxl
 * @since 2023-08-14
 */
@Getter
@Setter
@TableName("jms_job_category")
public class JobCategory implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    private String name;

    private Long parentId;

    private Integer level;

    private Integer status;

    private Integer sort;

    @Version
    private Long version;

    @TableLogic
    private Integer isDeleted;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;


}
