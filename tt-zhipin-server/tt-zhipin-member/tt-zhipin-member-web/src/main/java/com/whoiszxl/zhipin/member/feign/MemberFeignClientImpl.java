package com.whoiszxl.zhipin.member.feign;

import cn.hutool.core.bean.BeanUtil;
import com.whoiszxl.zhipin.member.dto.MemberDTO;
import com.whoiszxl.zhipin.member.entity.Member;
import com.whoiszxl.zhipin.member.service.IMemberService;
import com.whoiszxl.zhipin.tools.common.entity.ResponseResult;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class MemberFeignClientImpl implements MemberFeignClient {

    private final IMemberService memberService;

    @Override
    public ResponseResult<MemberDTO> getMemberInfoById(Long memberId) {
        Member member = memberService.getById(memberId);
        if(member == null) {
            return ResponseResult.buildError();
        }
        return ResponseResult.buildSuccess(BeanUtil.copyProperties(member, MemberDTO.class));
    }
}
