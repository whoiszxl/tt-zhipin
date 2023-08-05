package com.whoiszxl.zhipin.member.service.impl;

import com.whoiszxl.zhipin.member.entity.MemberExp;
import com.whoiszxl.zhipin.member.mapper.MemberExpMapper;
import com.whoiszxl.zhipin.member.service.IMemberExpService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 会员经历表 服务实现类
 * </p>
 *
 * @author whoiszxl
 * @since 2023-08-04
 */
@Service
@RequiredArgsConstructor
public class MemberExpServiceImpl extends ServiceImpl<MemberExpMapper, MemberExp> implements IMemberExpService {

}
