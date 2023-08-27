package com.whoiszxl.zhipin.im.feign;

import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.whoiszxl.zhipin.im.dto.CheckGroupChatPermissionQuery;
import com.whoiszxl.zhipin.im.dto.CheckPrivateChatPermissionQuery;
import com.whoiszxl.zhipin.im.entity.Group;
import com.whoiszxl.zhipin.im.entity.GroupMember;
import com.whoiszxl.zhipin.im.service.IFriendService;
import com.whoiszxl.zhipin.im.service.IGroupMemberService;
import com.whoiszxl.zhipin.im.service.IGroupService;
import com.whoiszxl.zhipin.tools.common.entity.ResponseResult;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class PermissionCheckFeignImpl implements PermissionCheckFeign{

    private final IFriendService friendService;

    private final IGroupService groupService;

    private final IGroupMemberService groupMemberService;

    @Override
    public ResponseResult<Boolean> checkPrivateChatPermission(CheckPrivateChatPermissionQuery query) {
        boolean flag = friendService.checkFriend(query.getFromMemberId(), query.getToMemberId());
        return flag ? ResponseResult.buildSuccess(true) : ResponseResult.buildError(false);
    }

    @Override
    public ResponseResult<Boolean> checkGroupChatPermission(CheckGroupChatPermissionQuery query) {
        //1. 校验群组是否存在，我是否是群组里的人
        Long groupId = query.getGroupId();
        Long fromMemberId = query.getFromMemberId();
        boolean flag = groupMemberService.checkGroupMessageSendPermission(groupId, fromMemberId);
        return flag ? ResponseResult.buildSuccess(true) : ResponseResult.buildError(false);
    }
}
