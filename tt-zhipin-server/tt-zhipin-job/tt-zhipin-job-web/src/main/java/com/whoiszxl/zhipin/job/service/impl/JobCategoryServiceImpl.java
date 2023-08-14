package com.whoiszxl.zhipin.job.service.impl;

import cn.hutool.core.bean.BeanUtil;
import com.whoiszxl.zhipin.job.cqrs.response.JobCategoryTreeResponse;
import com.whoiszxl.zhipin.job.entity.JobCategory;
import com.whoiszxl.zhipin.job.mapper.JobCategoryMapper;
import com.whoiszxl.zhipin.job.service.IJobCategoryService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

/**
 * <p>
 * 职位三级分类表 服务实现类
 * </p>
 *
 * @author whoiszxl
 * @since 2023-08-14
 */
@Service
public class JobCategoryServiceImpl extends ServiceImpl<JobCategoryMapper, JobCategory> implements IJobCategoryService {

    @Override
    public List<JobCategoryTreeResponse> listWithTree() {
        List<JobCategory> categoryList = super.list();
        List<JobCategoryTreeResponse> categoryTreeResponseList = BeanUtil.copyToList(categoryList, JobCategoryTreeResponse.class);

        List<JobCategoryTreeResponse> collect = categoryTreeResponseList.stream().filter(item -> item.getParentId() == 0)
                .peek(menu -> menu.setSubCategoryList(getChildren(menu, categoryTreeResponseList)))
                .sorted(Comparator.comparingInt(menu -> menu.getSort() == null ? 0 : menu.getSort()))
                .collect(Collectors.toList());
        return collect;
    }

    /**
     * 在所有分类中查询到categoryApiResponse的所有子分类
     * @param categoryApiResponse 需要查询子分类的父类
     * @param categoryApiResponseList 所有分类
     * @return
     */
    private List<JobCategoryTreeResponse> getChildren(JobCategoryTreeResponse categoryApiResponse, List<JobCategoryTreeResponse> categoryApiResponseList) {
        List<JobCategoryTreeResponse> collect = categoryApiResponseList.stream().filter(item -> item.getParentId().equals(categoryApiResponse.getId()))
                .peek(menu -> menu.setSubCategoryList(getChildren(menu, categoryApiResponseList)))
                .sorted(Comparator.comparingInt(menu -> (menu.getSort() == null ? 0 : menu.getSort()))).collect(Collectors.toList());
        return collect;
    }
}
