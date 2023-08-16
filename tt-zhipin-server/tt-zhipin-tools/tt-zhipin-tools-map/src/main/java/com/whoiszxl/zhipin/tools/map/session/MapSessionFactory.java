package com.whoiszxl.zhipin.tools.map.session;

/**
 * @author whoiszxl
 */
public interface MapSessionFactory {

    /**
     * 打开map session会话
     * @return mapSession
     */
    MapSession openSession();
}
