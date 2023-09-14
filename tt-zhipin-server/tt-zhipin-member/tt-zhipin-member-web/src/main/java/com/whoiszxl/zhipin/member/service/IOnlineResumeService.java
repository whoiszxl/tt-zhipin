package com.whoiszxl.zhipin.member.service;

import com.whoiszxl.zhipin.member.cqrs.command.OnlineResumeSaveCommand;
import com.whoiszxl.zhipin.member.cqrs.response.OnlineResumeResponse;

/**
 * <p>
 * 会员在线简历 服务类
 * </p>
 *
 * @author whoiszxl
 * @since 2023-08-04
 */
public interface IOnlineResumeService {

    OnlineResumeResponse info();

    boolean save(OnlineResumeSaveCommand saveCommand);
}
