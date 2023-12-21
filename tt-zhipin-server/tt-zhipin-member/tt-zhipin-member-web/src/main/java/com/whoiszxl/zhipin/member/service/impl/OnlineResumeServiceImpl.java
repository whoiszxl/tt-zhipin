package com.whoiszxl.zhipin.member.service.impl;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.lang.Assert;
import cn.hutool.json.JSONUtil;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.whoiszxl.zhipin.member.cqrs.command.OnlineResumeSaveCommand;
import com.whoiszxl.zhipin.member.cqrs.dto.EduExperienceDto;
import com.whoiszxl.zhipin.member.cqrs.dto.ProjectExperienceDto;
import com.whoiszxl.zhipin.member.cqrs.dto.WorkExpectDto;
import com.whoiszxl.zhipin.member.cqrs.dto.WorkExperienceDto;
import com.whoiszxl.zhipin.member.cqrs.response.MemberInfoResponse;
import com.whoiszxl.zhipin.member.cqrs.response.OnlineResumeResponse;
import com.whoiszxl.zhipin.member.entity.Member;
import com.whoiszxl.zhipin.member.entity.MemberExp;
import com.whoiszxl.zhipin.member.service.IMemberExpService;
import com.whoiszxl.zhipin.member.service.IMemberService;
import com.whoiszxl.zhipin.member.service.IOnlineResumeService;
import com.whoiszxl.zhipin.tools.common.token.TokenHelper;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OnlineResumeServiceImpl implements IOnlineResumeService {

    private final TokenHelper tokenHelper;

    private final IMemberService memberService;

    private final IMemberExpService memberExpService;

    @Override
    public OnlineResumeResponse info() {
        Long appMemberId = tokenHelper.getAppMemberId();
        Member member = memberService.getById(appMemberId);
        MemberExp memberExp = memberExpService.getOne(Wrappers.<MemberExp>lambdaQuery()
                .eq(MemberExp::getMemberId, appMemberId));
        Assert.isTrue(memberExp != null, "用户信息不存在");

        OnlineResumeResponse response = new OnlineResumeResponse();
        response.setMemberInfoResponse(BeanUtil.copyProperties(member, MemberInfoResponse.class));

        if(StringUtils.isNotBlank(memberExp.getWorkExpect())) {
            List<WorkExpectDto> workExpects = JSONUtil.toList(memberExp.getWorkExpect(), WorkExpectDto.class);
            response.setWorkExpectDtoList(workExpects);
        }

        if(StringUtils.isNotBlank(memberExp.getWorkExperience())) {
            List<WorkExperienceDto> workExperienceDtoList = JSONUtil.toList(memberExp.getWorkExperience(), WorkExperienceDto.class);
            response.setWorkExperienceDtoList(workExperienceDtoList);
        }

        if(StringUtils.isNotBlank(memberExp.getProjectExperience())) {
            List<ProjectExperienceDto> projectExperienceDtoList = JSONUtil.toList(memberExp.getProjectExperience(), ProjectExperienceDto.class);
            response.setProjectExperienceDtoList(projectExperienceDtoList);
        }

        if(StringUtils.isNotBlank(memberExp.getEduExperience())) {
            List<EduExperienceDto> eduExperienceDtoList = JSONUtil.toList(memberExp.getEduExperience(), EduExperienceDto.class);
            response.setEduExperienceDtoList(eduExperienceDtoList);
        }

        if(StringUtils.isNotBlank(memberExp.getQualification())) {
            List<String> qualificationList = JSONUtil.toList(memberExp.getQualification(), String.class);
            response.setQualificationList(qualificationList);
        }

        response.setAdvantage(memberExp.getAdvantage());

        return response;
    }

    @Override
    public boolean save(OnlineResumeSaveCommand saveCommand) {
        Long appMemberId = tokenHelper.getAppMemberId();
        MemberExp updateMemberExp = new MemberExp();
        updateMemberExp.setMemberId(appMemberId);

        if(CollUtil.isNotEmpty(saveCommand.getWorkExpectDtoList())) {
            updateMemberExp.setWorkExpect(JSONUtil.toJsonStr(saveCommand.getWorkExpectDtoList()));
        }
        if(CollUtil.isNotEmpty(saveCommand.getWorkExperienceDtoList())) {
            updateMemberExp.setWorkExperience(JSONUtil.toJsonStr(saveCommand.getWorkExperienceDtoList()));
        }
        if(CollUtil.isNotEmpty(saveCommand.getProjectExperienceDtoList())) {
            updateMemberExp.setProjectExperience(JSONUtil.toJsonStr(saveCommand.getProjectExperienceDtoList()));
        }
        if(CollUtil.isNotEmpty(saveCommand.getEduExperienceDtoList())) {
            updateMemberExp.setEduExperience(JSONUtil.toJsonStr(saveCommand.getEduExperienceDtoList()));
        }

        if(CollUtil.isNotEmpty(saveCommand.getQualificationList())) {
            updateMemberExp.setQualification(JSONUtil.toJsonStr(saveCommand.getQualificationList()));
        }
        MemberExp currentMemberExp = memberExpService.getOne(Wrappers.<MemberExp>lambdaQuery()
                .eq(MemberExp::getMemberId, appMemberId));

        if(currentMemberExp == null) {
            return memberExpService.save(updateMemberExp);
        }

        return memberExpService.update(updateMemberExp, Wrappers.<MemberExp>lambdaUpdate()
                .eq(MemberExp::getMemberId, appMemberId));
    }
}

