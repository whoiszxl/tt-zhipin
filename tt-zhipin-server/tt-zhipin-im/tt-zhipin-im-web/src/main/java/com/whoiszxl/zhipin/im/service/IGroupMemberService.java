package com.whoiszxl.zhipin.im.service;

import com.whoiszxl.zhipin.im.cqrs.dto.AddMemberToGroupDto;
import com.whoiszxl.zhipin.im.entity.GroupMember;
import com.baomidou.mybatisplus.extension.service.IService;

/**
 * <p>
 * 群组表 服务类
 * </p>
 *
 * @author whoiszxl
 * @since 2023-08-17
 */
public interface IGroupMemberService extends IService<GroupMember> {

    /**
     * 添加成员到群组
     * @param addMemberToGroupDto 添加参数
     */
    void addMemberToGroup(AddMemberToGroupDto addMemberToGroupDto);
}
