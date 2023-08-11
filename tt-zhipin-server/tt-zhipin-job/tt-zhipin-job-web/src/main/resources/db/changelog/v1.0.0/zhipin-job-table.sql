-- liquibase formatted sql

-- changeset whoiszxl:1
-- comment 初始化job模块表结构

DROP TABLE IF EXISTS `jms_job`;
CREATE TABLE `jms_job` (
  `id` bigint(11) NOT NULL COMMENT '主键ID',
  `member_info` json DEFAULT NULL COMMENT '职位发布人基础信息(字段冗余,避免跨服务查询): 头像|岗位|姓名',
  `member_id` bigint(11) NOT NULL COMMENT '职位发布人ID',
  `company_id` bigint(11) NOT NULL COMMENT '职位所属公司ID',
  `job_name` varchar(32) NOT NULL COMMENT '职位名称',
  `salary_range_start` int(6) DEFAULT '1' COMMENT '薪资范围起始值',
  `salary_range_end` int(6) DEFAULT '1' COMMENT '薪资范围结束值',
  `salary_optional` json DEFAULT NULL COMMENT '薪资可选项: 发薪日|底薪|社保类型|提成|奖金补贴',
  `work_year_range_start` int(2) DEFAULT '1' COMMENT '工作年限范围起始值',
  `work_year_range_end` int(2) DEFAULT '1' COMMENT '工作年限范围结束值',
  `age_range_start` int(3) DEFAULT '18' COMMENT '年龄范围起始值',
  `age_range_end` int(3) DEFAULT '18' COMMENT '年龄范围结束值',
  `education_attainment` varchar(8) DEFAULT '' COMMENT '学历',
  `job_tags` json DEFAULT NULL COMMENT '职位标签',
  `job_description` text NOT NULL COMMENT '职位描述',
  `reply_count` int(6) DEFAULT '0' COMMENT '回复次数',
  `longitude` decimal(10,6) DEFAULT NULL COMMENT '工作地址经度',
  `latitude` decimal(10,6) DEFAULT NULL COMMENT '工作地址纬度',
  `country` varchar(64) DEFAULT '' COMMENT '国家',
  `province` varchar(64) DEFAULT '' COMMENT '省份',
  `city` varchar(64) DEFAULT '' COMMENT '城市',
  `district` varchar(64) DEFAULT '' COMMENT '区域',
  `address_detail` varchar(64) DEFAULT '' COMMENT '地址详情',
  `status` tinyint(2) DEFAULT '1' COMMENT '状态(0:无效 1:有效)',
  `version` bigint(11) unsigned NOT NULL DEFAULT '1' COMMENT '乐观锁',
  `is_deleted` tinyint(3) DEFAULT '0' COMMENT '逻辑删除 1: 已删除, 0: 未删除',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='职位表';

DROP TABLE IF EXISTS `jms_company`;
CREATE TABLE `jms_company` (
  `id` bigint(11) NOT NULL COMMENT '主键ID',
  `apply_member_id` bigint(11) NOT NULL COMMENT '申请用户ID',
  `company_full_name` varchar(64) NOT NULL COMMENT '公司全称',
  `company_abbr_name` varchar(64) NOT NULL COMMENT '公司缩略名',
  `company_logo` varchar(256) DEFAULT '' COMMENT '公司LOGO',
  `company_description` text COMMENT '公司描述',
  `company_scale` varchar(64) NOT NULL DEFAULT '' COMMENT '公司规模',
  `financing_stage` varchar(64) NOT NULL DEFAULT '' COMMENT '融资阶段',
  `industry` varchar(16) NOT NULL DEFAULT '' COMMENT '所属行业',
  `work_date_start` datetime DEFAULT NULL COMMENT '上班时间',
  `work_date_end` datetime DEFAULT NULL COMMENT '下班时间',
  `rest_way` tinyint(2) DEFAULT '1' COMMENT '休息时间: 1-双休 2-排班轮休',
  `overtime` tinyint(2) DEFAULT '1' COMMENT '加班情况: 1-不加班 2-偶尔加班 3-弹性工作',
  `photo` json DEFAULT NULL COMMENT '公司照片, 数组保存',
  `employee_welfare` json DEFAULT NULL COMMENT '员工福利, 数组保存, 对象为title+subTitle',
  `main_business` json DEFAULT NULL COMMENT '主营业务, 数组保存',
  `longitude` decimal(10,6) DEFAULT NULL COMMENT '公司经度',
  `latitude` decimal(10,6) DEFAULT NULL COMMENT '公司纬度',
  `country` varchar(64) DEFAULT '' COMMENT '公司所在国家',
  `province` varchar(64) DEFAULT '' COMMENT '公司所在省份',
  `city` varchar(64) DEFAULT '' COMMENT '公司所在城市',
  `district` varchar(64) DEFAULT '' COMMENT '公司所在区域',
  `address_detail` varchar(64) DEFAULT '' COMMENT '公司地址详情',
  `status` tinyint(2) DEFAULT '1' COMMENT '状态(0:无效 1:有效)',
  `version` bigint(11) unsigned NOT NULL DEFAULT '1' COMMENT '乐观锁',
  `is_deleted` tinyint(3) DEFAULT '0' COMMENT '逻辑删除 1: 已删除, 0: 未删除',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='公司表';