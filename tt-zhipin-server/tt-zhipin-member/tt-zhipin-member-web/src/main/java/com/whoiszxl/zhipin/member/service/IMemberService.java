package com.whoiszxl.zhipin.member.service;

import com.whoiszxl.zhipin.member.cqrs.command.InitBaseInfoCommand;
import com.whoiszxl.zhipin.member.entity.Member;
import com.baomidou.mybatisplus.extension.service.IService;

/**
 * <p>
 * 会员表 服务类
 * </p>
 *
 * @author whoiszxl
 * @since 2023-08-04
 */
public interface IMemberService extends IService<Member> {

    /**
     * 初始化用户的基本信息
     * @param initBaseInfoCommand 参数命令
     */
    void initBaseInfo(InitBaseInfoCommand initBaseInfoCommand);

    /**
     * 成为 boss
     * @return
     */
    Boolean becomeBoss();

}
