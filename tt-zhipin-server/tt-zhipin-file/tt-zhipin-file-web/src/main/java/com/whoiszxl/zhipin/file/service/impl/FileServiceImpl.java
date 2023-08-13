package com.whoiszxl.zhipin.file.service.impl;

import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.whoiszxl.zhipin.file.cqrs.command.FileDeleteCommand;
import com.whoiszxl.zhipin.file.entity.FmsFile;
import com.whoiszxl.zhipin.file.mapper.FileMapper;
import com.whoiszxl.zhipin.file.service.FileService;
import com.whoiszxl.zhipin.file.strategy.FileStrategy;
import com.whoiszxl.zhipin.tools.common.exception.ExceptionCatcher;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.ArrayUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

/**
 * <p>
 * 文件表 服务实现类
 * </p>
 *
 * @author whoiszxl
 * @since 2022-03-23
 */
@Service
@RequiredArgsConstructor
public class FileServiceImpl extends ServiceImpl<FileMapper, FmsFile> implements FileService {

    private final FileStrategy fileStrategy;

    @Override
    public String upload(Long id, String bizId, Integer bizType, MultipartFile file) {
        FmsFile fmsFile = fileStrategy.upload(file);

        fmsFile.setBizId(bizId);
        fmsFile.setBizType(bizType);

        if(id != null && id > 0) {
            fmsFile.setId(id);
            updateById(fmsFile);
        }else {
            save(fmsFile);
        }

        return fmsFile.getUrl();
    }

    @Override
    public void delete(Long[] ids) {
        if(ArrayUtils.isEmpty(ids)) {
            ExceptionCatcher.catchServiceEx("传参无效");
        }

        List<FmsFile> fileList = list(Wrappers.<FmsFile>lambdaQuery().in(FmsFile::getId, ids));
        if(fileList.isEmpty()) {
            ExceptionCatcher.catchServiceEx("传参无效");
        }

        removeByIds(Arrays.asList(ids));

        List<FileDeleteCommand> fileDeleteCommandList = fileList.stream().map(file -> {
            FileDeleteCommand deleteCommand = new FileDeleteCommand();
            deleteCommand.setRelativePath(file.getRelativePath());
            deleteCommand.setFinalFileName(file.getFinalFileName());
            deleteCommand.setId(file.getId());
            return deleteCommand;
        }).collect(Collectors.toList());

        fileStrategy.delete(fileDeleteCommandList);
    }
}
