package com.whoiszxl.zhipin.job.cqrs.response;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

/**
 * <p>
 * 职位三级分类表
 * </p>
 *
 * @author whoiszxl
 * @since 2023-08-14
 */
@Data
public class JobCategoryTreeResponse implements Serializable {

    private Long id;

    private String name;

    private Long parentId;

    private Integer level;

    private Integer status;

    private Integer sort;

    private List<JobCategoryTreeResponse> subCategoryList;

}
