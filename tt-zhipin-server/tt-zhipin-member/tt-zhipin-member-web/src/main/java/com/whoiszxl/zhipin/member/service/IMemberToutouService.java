package com.whoiszxl.zhipin.member.service;

import com.whoiszxl.zhipin.member.cqrs.command.ToutouSubmitCommand;
import com.whoiszxl.zhipin.member.entity.MemberToutou;
import com.baomidou.mybatisplus.extension.service.IService;

/**
 * <p>
 * 头头表 服务类
 * </p>
 *
 * @author whoiszxl
 * @since 2023-08-04
 */
public interface IMemberToutouService extends IService<MemberToutou> {

    /**
     * 注册为头头
     * @param toutouSubmitCommand 注册参数
     */
    void toutouSubmit(ToutouSubmitCommand toutouSubmitCommand);

}
