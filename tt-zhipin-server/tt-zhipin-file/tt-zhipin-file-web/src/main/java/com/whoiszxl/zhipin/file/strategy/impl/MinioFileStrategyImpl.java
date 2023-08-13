package com.whoiszxl.zhipin.file.strategy.impl;

import cn.hutool.core.util.StrUtil;
import com.whoiszxl.zhipin.file.cqrs.command.FileDeleteCommand;
import com.whoiszxl.zhipin.file.entity.FmsFile;
import com.whoiszxl.zhipin.file.properties.MinioProperties;
import com.whoiszxl.zhipin.file.strategy.AbstractFileStrategy;
import com.whoiszxl.zhipin.tools.common.utils.StrPoolUtil;
import io.minio.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

import static com.whoiszxl.zhipin.tools.common.utils.DateUtils.DEFAULT_MONTH_FORMAT_SLASH;

@Slf4j
@Service
@RequiredArgsConstructor
@ConditionalOnProperty(name = "tt-zhipin-file.active", havingValue = "minio")
public class MinioFileStrategyImpl extends AbstractFileStrategy {

    private final MinioProperties minioProperties;

    private final MinioClient minioClient;

    protected String getDomainUrl() {
        if(StringUtils.isNotBlank(minioProperties.getDomainUrl())) {
            return minioProperties.getDomainUrl();
        }

        String prefix = minioProperties.getEndpoint().startsWith("https://") ? "https://" : "http://";
        return prefix + minioProperties.getEndpoint().replaceFirst(prefix, "") + "/" + minioProperties.getBucketName();
    }




    @Override
    protected void uploadFile(FmsFile fmsFile, MultipartFile multipartFile) {
        try {
            //1. 获取bucket名称，如果不存在桶就创建
            String bucketName = minioProperties.getBucketName();
            if(!minioClient.bucketExists(BucketExistsArgs.builder().bucket(bucketName).build())) {
                minioClient.makeBucket(MakeBucketArgs.builder().bucket(bucketName).build());
            }

            //2. 生成文件名
            String fileName = UUID.randomUUID().toString() + "." + fmsFile.getExt();

            //生成日期格式的相对路径 2023\02
            String relativePath = Paths.get(LocalDate.now().format(DateTimeFormatter.ofPattern(DEFAULT_MONTH_FORMAT_SLASH))).toString();

            //2023\02\ + r4354rtfesrfeswf.jpg
            String relativeFileName = relativePath + StrPoolUtil.SLASH + fileName;
            //            //   把 \\  还有 \  替换为 /
            relativeFileName = StrUtil.replace(relativeFileName, "\\\\", StrPoolUtil.SLASH);
            relativeFileName = StrUtil.replace(relativeFileName, "\\", StrPoolUtil.SLASH);

            InputStream inputStream = multipartFile.getInputStream();
            //上传操作
            ObjectWriteResponse objectWriteResponse = minioClient.putObject(
                    PutObjectArgs.builder()
                            .bucket(bucketName)
                            .object(relativeFileName)
                            .stream(inputStream, inputStream.available(), -1)
                            .contentType(multipartFile.getContentType())
                            .build());

            log.info("minioUploadFile|minio图片上传成功|{}", objectWriteResponse);


            String url = getDomainUrl() + StrPoolUtil.SLASH + relativeFileName;
            url = StrUtil.replace(url, "\\\\", StrPoolUtil.SLASH);
            url = StrUtil.replace(url, "\\", StrPoolUtil.SLASH);

            fmsFile.setUrl(url);
            fmsFile.setFinalFileName(fileName);
            fmsFile.setRelativePath(relativePath);
            fmsFile.setPlatformType(4);


        } catch (Exception e) {
            log.error("文件上传失败", e);
        }

    }

    @Override
    protected void delete(FileDeleteCommand deleteCommand) {

        String bucketName = minioProperties.getBucketName();

        String url = deleteCommand.getRelativePath() + StrPoolUtil.SLASH + deleteCommand.getFinalFileName();
        url = StrUtil.replace(url, "\\\\", StrPoolUtil.SLASH);
        url = StrUtil.replace(url, "\\", StrPoolUtil.SLASH);

        try {
            minioClient.removeObject(RemoveObjectArgs.builder().bucket(bucketName).object(url).build());
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
