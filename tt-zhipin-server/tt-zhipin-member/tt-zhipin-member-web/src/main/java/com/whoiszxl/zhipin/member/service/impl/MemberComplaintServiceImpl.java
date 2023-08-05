package com.whoiszxl.zhipin.member.service.impl;

import com.whoiszxl.zhipin.member.entity.MemberComplaint;
import com.whoiszxl.zhipin.member.mapper.MemberComplaintMapper;
import com.whoiszxl.zhipin.member.service.IMemberComplaintService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 会员投诉表 服务实现类
 * </p>
 *
 * @author whoiszxl
 * @since 2023-08-04
 */
@Service
@RequiredArgsConstructor
public class MemberComplaintServiceImpl extends ServiceImpl<MemberComplaintMapper, MemberComplaint> implements IMemberComplaintService {

}
