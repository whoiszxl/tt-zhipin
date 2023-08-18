package com.whoiszxl.zhipin.member.feign;

import com.whoiszxl.zhipin.member.dto.MemberDTO;
import com.whoiszxl.zhipin.tools.common.entity.ResponseResult;
import com.whoiszxl.zhipin.tools.common.feign.FeignTokenConfig;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * 会员feign接口
 *
 * @author whoiszxl
 * @date 2021/7/30
 */
@FeignClient(name = "tt-zhipin-member", contextId = "memberFeign", configuration = FeignTokenConfig.class)
public interface MemberFeignClient {

    /**
     * 通过memberId获取member信息
     * @param memberId
     * @return
     */
    @GetMapping("/member/info")
    ResponseResult<MemberDTO> getMemberInfoById(@RequestParam Long memberId);
}
