package com.whoiszxl.zhipin.file.strategy;

import com.whoiszxl.zhipin.file.cqrs.command.FileDeleteCommand;
import com.whoiszxl.zhipin.file.entity.FmsFile;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

/**
 * 文件策略
 *
 * @author whoiszxl
 * @date 2022/3/23
 */
public interface FileStrategy {

    /**
     * 上传文件
     * @param file 文件
     * @return
     */
    FmsFile upload(MultipartFile file);

    /**
     * 批量删除文件
     * @param commandList 文件命令集合
     * @return
     */
    boolean delete(List<FileDeleteCommand> commandList);

}
