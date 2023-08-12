package com.whoiszxl.zhipin.job.service;

import com.whoiszxl.zhipin.job.cqrs.query.JobQuery;
import com.whoiszxl.zhipin.job.cqrs.response.JobResponse;
import com.whoiszxl.zhipin.job.entity.Job;
import com.baomidou.mybatisplus.extension.service.IService;
import com.whoiszxl.zhipin.tools.common.entity.PageQuery;
import com.whoiszxl.zhipin.tools.common.entity.response.PageResponse;

/**
 * <p>
 * 职位表 服务类
 * </p>
 *
 * @author whoiszxl
 * @since 2023-08-09
 */
public interface IJobService extends IService<Job> {

    /**
     * 获取最新的职位列表
     * @param query 查询参数
     * @return 最新的职位列表
     */
    PageResponse<JobResponse> latestList(JobQuery query);

    /**
     * 通过职位ID获取职位详情
     * @param jobId 职位ID
     * @return职位详情
     */
    JobResponse jobDetail(Long jobId);
}
