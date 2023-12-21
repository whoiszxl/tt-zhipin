package com.whoiszxl.zhipin.member.cqrs.response;

import com.whoiszxl.zhipin.member.cqrs.dto.EduExperienceDto;
import com.whoiszxl.zhipin.member.cqrs.dto.ProjectExperienceDto;
import com.whoiszxl.zhipin.member.cqrs.dto.WorkExpectDto;
import com.whoiszxl.zhipin.member.cqrs.dto.WorkExperienceDto;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.util.List;

@Data
@Schema(description = "在线简历返回实体")
public class OnlineResumeResponse {

    @Schema(description = "用户信息")
    private MemberInfoResponse memberInfoResponse;

    @Schema(description = "求职期望列表")
    private List<WorkExpectDto> workExpectDtoList;

    @Schema(description = "工作经历列表")
    private List<WorkExperienceDto> workExperienceDtoList;

    @Schema(description = "项目经历列表")
    private List<ProjectExperienceDto> projectExperienceDtoList;

    @Schema(description = "教育经历列表")
    private List<EduExperienceDto> eduExperienceDtoList;

    @Schema(description = "资格证书列表")
    private List<String> qualificationList;

    @Schema(description = "个人优势")
    private String advantage;

}
