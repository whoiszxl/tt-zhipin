package com.whoiszxl.zhipin.job.controller;


import com.whoiszxl.zhipin.job.service.ICompanyService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * <p>
 * 公司表 前端控制器
 * </p>
 *
 * @author whoiszxl
 * @since 2023-08-09
 */
@Tag(name = "C端: 公司 API")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/company")
public class CompanyController {

    private final ICompanyService companyService;

}

