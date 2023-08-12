package com.whoiszxl.zhipin.job.service.impl;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.util.StrUtil;
import cn.hutool.json.JSON;
import cn.hutool.json.JSONUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.whoiszxl.zhipin.job.cqrs.query.JobQuery;
import com.whoiszxl.zhipin.job.cqrs.response.CompanyResponse;
import com.whoiszxl.zhipin.job.cqrs.response.JobResponse;
import com.whoiszxl.zhipin.job.entity.Company;
import com.whoiszxl.zhipin.job.entity.Job;
import com.whoiszxl.zhipin.job.mapper.JobMapper;
import com.whoiszxl.zhipin.job.service.ICompanyService;
import com.whoiszxl.zhipin.job.service.IJobService;
import com.whoiszxl.zhipin.tools.common.entity.PageQuery;
import com.whoiszxl.zhipin.tools.common.entity.response.PageResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * <p>
 * 职位表 服务实现类
 * </p>
 *
 * @author whoiszxl
 * @since 2023-08-09
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class JobServiceImpl extends ServiceImpl<JobMapper, Job> implements IJobService {

    private final JobMapper jobMapper;

    private final ICompanyService companyService;

    @Override
    public PageResponse<JobResponse> latestList(JobQuery query) {
        LambdaQueryWrapper<Job> wrapper = Wrappers.<Job>lambdaQuery();
        if(StrUtil.isNotBlank(query.getEducationAttainment())) {
            wrapper.eq(Job::getEducationAttainment, query.getEducationAttainment());
        }
        if(CollUtil.isNotEmpty(query.getSalary()) && query.getSalary().size() == 2) {
            wrapper.ge(Job::getSalaryRangeStart, query.getSalary().get(0)).and((w) -> {
                w.lt(Job::getSalaryRangeEnd, query.getSalary().get(1));
            });
        }
        wrapper.orderByDesc(Job::getCreatedAt);
        query.setSort(null);
        IPage<Job> jobPage = jobMapper.selectPage(query.toPage(), wrapper);
        PageResponse<JobResponse> pageResponse = PageResponse.convert(jobPage, JobResponse.class);

        //填充公司信息
        List<Long> companyIdList = pageResponse.getList().stream().map(JobResponse::getCompanyId).collect(Collectors.toList());
        List<Company> companyList = companyService.listByIds(companyIdList);
        List<CompanyResponse> companyResponseList = BeanUtil.copyToList(companyList, CompanyResponse.class);

        Map<Long, CompanyResponse> companyMap = companyResponseList.stream()
                .collect(Collectors.toMap(CompanyResponse::getId, company -> company));

        pageResponse.getList().forEach(job -> {
            CompanyResponse company = companyMap.get(job.getCompanyId());
            if (company != null) {
                job.setCompanyResponse(company);
            }
        });
        return pageResponse;
    }

    @Override
    public JobResponse jobDetail(Long jobId) {
        Job job = jobMapper.selectById(jobId);
        Company company = companyService.getById(job.getCompanyId());
        JobResponse jobResponse = BeanUtil.copyProperties(job, JobResponse.class);
        jobResponse.setCompanyResponse(BeanUtil.copyProperties(company, CompanyResponse.class));
        return jobResponse;
    }
}
