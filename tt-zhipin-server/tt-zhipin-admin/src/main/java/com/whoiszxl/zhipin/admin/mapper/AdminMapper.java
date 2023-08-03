package com.whoiszxl.zhipin.admin.mapper;

import com.whoiszxl.zhipin.tools.common.base.BaseMapper;
import com.whoiszxl.zhipin.admin.entity.Admin;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Update;

/**
 * <p>
 * 管理员表 Mapper 接口
 * </p>
 *
 * @author whoiszxl
 * @since 2023-03-02
 */
@Mapper
public interface AdminMapper extends BaseMapper<Admin> {

    /**
     * 切换管理员状态
     * @param adminId 管理员ID
     * @return
     */
    @Update("update sys_admin set status = (case status when 1 then 0 else 1 end) where id = #{adminId}")
    Boolean switchStatus(Integer adminId);

}
