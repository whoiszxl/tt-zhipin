package com.whoiszxl.zhipin.admin.mapper;

import com.whoiszxl.zhipin.admin.entity.RoleMenu;
import com.whoiszxl.zhipin.tools.common.base.BaseMapper;
import org.apache.ibatis.annotations.Mapper;

/**
 * <p>
 * 角色与菜单关联表 Mapper 接口
 * </p>
 *
 * @author whoiszxl
 * @since 2023-03-02
 */
@Mapper
public interface RoleMenuMapper extends BaseMapper<RoleMenu> {

}
