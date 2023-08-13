package com.whoiszxl.zhipin.file.strategy.impl;

import cn.hutool.core.util.StrUtil;
import com.aliyun.oss.OSS;
import com.aliyun.oss.OSSClient;
import com.aliyun.oss.model.ObjectMetadata;
import com.aliyun.oss.model.PutObjectRequest;
import com.aliyun.oss.model.PutObjectResult;
import com.whoiszxl.zhipin.file.cqrs.command.FileDeleteCommand;
import com.whoiszxl.zhipin.file.entity.FmsFile;
import com.whoiszxl.zhipin.file.properties.AliOssProperties;
import com.whoiszxl.zhipin.file.strategy.AbstractFileStrategy;
import com.whoiszxl.zhipin.tools.common.utils.StrPoolUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

import static com.whoiszxl.zhipin.tools.common.utils.DateUtils.DEFAULT_MONTH_FORMAT_SLASH;

/**
 * 阿里云OSS策略实现
 *
 * @author whoiszxl
 * @date 2022/3/24
 */
@Slf4j
@Service
@RequiredArgsConstructor
@ConditionalOnProperty(name = "tt-zhipin-file.active", havingValue = "oss")
public class AliOssFileStrategyImpl extends AbstractFileStrategy {

    private final AliOssProperties aliOssProperties;

    private final OSS ossClient;

    protected String getDomainUrl() {
        if(StringUtils.isNotBlank(aliOssProperties.getDomainUrl())) {
            return aliOssProperties.getDomainUrl();
        }

        String prefix = aliOssProperties.getEndpoint().startsWith("https://") ? "https://" : "http://";
        return prefix + aliOssProperties.getBucketName() + "." + aliOssProperties.getEndpoint().replaceFirst(prefix, "");
    }




    @Override
    protected void uploadFile(FmsFile fmsFile, MultipartFile multipartFile) {
        String bucketName = aliOssProperties.getBucketName();
        if(!ossClient.doesBucketExist(bucketName)) {
            ossClient.createBucket(bucketName);
        }

        //生成文件名
        String fileName = UUID.randomUUID().toString() + "." + fmsFile.getExt();

        //生成日期格式的相对路径
        String relativePath = Paths.get(LocalDate.now().format(DateTimeFormatter.ofPattern(DEFAULT_MONTH_FORMAT_SLASH))).toString();

        String relativeFileName = relativePath + StrPoolUtil.SLASH + fileName;
        relativeFileName = StrUtil.replace(relativeFileName, "\\\\", StrPoolUtil.SLASH);
        relativeFileName = StrUtil.replace(relativeFileName, "\\", StrPoolUtil.SLASH);

        //配置元数据
        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentDisposition("attachment;fileName=" + fmsFile.getOriginalFileName());

        try {
            PutObjectRequest request = new PutObjectRequest(bucketName, relativeFileName, multipartFile.getInputStream(), metadata);
            PutObjectResult result = ossClient.putObject(request);
            log.info("上传文件了，结果：{}", result);

            String url = getDomainUrl() + StrPoolUtil.SLASH + relativeFileName;
            url = StrUtil.replace(url, "\\\\", StrPoolUtil.SLASH);
            url = StrUtil.replace(url, "\\", StrPoolUtil.SLASH);

            fmsFile.setUrl(url);
            fmsFile.setFinalFileName(fileName);
            fmsFile.setRelativePath(relativePath);
            fmsFile.setPlatformType(1);

        } catch (IOException e) {
            log.error("文件上传失败", e);
        }

    }

    @Override
    protected void delete(FileDeleteCommand deleteCommand) {
        String bucketName = aliOssProperties.getBucketName();

        String url = deleteCommand.getRelativePath() + StrPoolUtil.SLASH + deleteCommand.getFinalFileName();
        url = StrUtil.replace(url, "\\\\", StrPoolUtil.SLASH);
        url = StrUtil.replace(url, "\\", StrPoolUtil.SLASH);
        ossClient.deleteObject(bucketName, url);

    }
}
