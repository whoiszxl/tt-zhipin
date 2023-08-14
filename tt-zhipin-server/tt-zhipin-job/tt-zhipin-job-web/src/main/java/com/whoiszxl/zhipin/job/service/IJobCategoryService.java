package com.whoiszxl.zhipin.job.service;

import com.whoiszxl.zhipin.job.cqrs.response.JobCategoryTreeResponse;
import com.whoiszxl.zhipin.job.entity.JobCategory;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.List;

/**
 * <p>
 * 职位三级分类表 服务类
 * </p>
 *
 * @author whoiszxl
 * @since 2023-08-14
 */
public interface IJobCategoryService extends IService<JobCategory> {

    /**
     * 获取职位列表
     * @return
     */
    List<JobCategoryTreeResponse> listWithTree();

}
