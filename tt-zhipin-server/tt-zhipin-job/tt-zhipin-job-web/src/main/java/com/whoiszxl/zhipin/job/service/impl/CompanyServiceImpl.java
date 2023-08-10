package com.whoiszxl.zhipin.job.service.impl;

import com.whoiszxl.zhipin.job.entity.Company;
import com.whoiszxl.zhipin.job.mapper.CompanyMapper;
import com.whoiszxl.zhipin.job.service.ICompanyService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 公司表 服务实现类
 * </p>
 *
 * @author whoiszxl
 * @since 2023-08-09
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class CompanyServiceImpl extends ServiceImpl<CompanyMapper, Company> implements ICompanyService {

}
