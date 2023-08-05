package com.whoiszxl.zhipin.member.service.impl;

import com.whoiszxl.zhipin.member.entity.Member;
import com.whoiszxl.zhipin.member.mapper.MemberMapper;
import com.whoiszxl.zhipin.member.service.IMemberService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 会员表 服务实现类
 * </p>
 *
 * @author whoiszxl
 * @since 2023-08-04
 */
@Service
@RequiredArgsConstructor
public class MemberServiceImpl extends ServiceImpl<MemberMapper, Member> implements IMemberService {

}
