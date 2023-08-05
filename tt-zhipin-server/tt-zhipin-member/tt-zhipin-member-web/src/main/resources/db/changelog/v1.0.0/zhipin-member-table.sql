-- liquibase formatted sql

-- changeset whoiszxl:1
-- comment 初始化member模块表结构

DROP TABLE IF EXISTS `ums_member`;
CREATE TABLE `ums_member`(
    `id`                                bigint(11) NOT NULL COMMENT '主键ID',
    `phone`                             varchar(16) NOT NULL COMMENT '手机',
    `email`                             varchar(64) DEFAULT '' COMMENT '邮箱(选填)',
    `password`                          varchar(128) DEFAULT '' COMMENT '登录密码',
    `full_name`                         varchar(32) DEFAULT '' COMMENT '全名',
    `work_date`                         datetime DEFAULT NULL COMMENT '参加工作时间',
    `wx_code`                           varchar(64) DEFAULT '' COMMENT '微信号',
    `birthday`                          datetime DEFAULT NULL COMMENT '生日',
    `country`                           varchar(64) DEFAULT '' COMMENT '国家',
    `province`                          varchar(64) DEFAULT '' COMMENT '省份',
    `city`                              varchar(64) DEFAULT '' COMMENT '城市',
    `district`                          varchar(64) DEFAULT '' COMMENT '区域',
    `gender`                            tinyint(2) DEFAULT 3 COMMENT '状态(1:男 2:女 3:未知)',
    `avatar`                            varchar(256) DEFAULT '' COMMENT '头像',
    `ip`                                varchar(256) DEFAULT '' COMMENT 'IP地址',
    `login_count`                       bigint(11) NOT NULL DEFAULT 0 COMMENT '会员登录次数',
    `login_error_count`                 bigint(11) NOT NULL DEFAULT 0 COMMENT '会员登录错误次数',
    `last_login`                        datetime DEFAULT CURRENT_TIMESTAMP COMMENT '最后登录',
    `work_status`                       tinyint(2) DEFAULT 1 COMMENT '求职状态(1:离职-随时到岗 2:在职-月内到岗 3:在职-考虑机会 4:在职-暂不考虑)',
    `is_toutou`                         tinyint(2) DEFAULT 0 COMMENT '是否是头头(0:否 1:是)',
    `is_init`                           tinyint(2) DEFAULT 0 COMMENT '是否初始化(0:否 1:是)',
    `status`                            tinyint(2) DEFAULT 1 COMMENT '状态(0:无效 1:有效)',
    `version`                           bigint(11) unsigned NOT NULL DEFAULT '1' COMMENT '乐观锁',
    `is_deleted`                        tinyint(3) DEFAULT 0 COMMENT '逻辑删除 1: 已删除, 0: 未删除',
    `created_at`                        datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `updated_at`                        datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
	PRIMARY KEY (`id`),
	UNIQUE KEY `idx_full_name` (`full_name`),
	UNIQUE KEY `idx_phone` (`phone`)
) ENGINE = InnoDB CHARSET = utf8mb4 COMMENT '会员表';

DROP TABLE IF EXISTS `ums_member_exp`;
CREATE TABLE `ums_member_exp`(
    `member_id`                         bigint(11) NOT NULL COMMENT '会员ID',
    `advantage`                         varchar(200) DEFAULT '' COMMENT '个人优势',
    `work_expect`                       json DEFAULT NULL COMMENT '求职期望, 对象数组, 最多两个',
    `work_experience`                   json DEFAULT NULL COMMENT '工作经历, 对象数组, 暂定无上限',
    `project_experience`                json DEFAULT NULL COMMENT '项目经历, 对象数组, 暂定无上限',
    `edu_experience`                    json DEFAULT NULL COMMENT '教育经历, 对象数组, 暂定无上限',
    `qualification`                     json DEFAULT NULL COMMENT '资格证书',
    `status`                            tinyint(2) DEFAULT 1 COMMENT '状态(0:无效 1:有效)',
    `version`                           bigint(11) unsigned NOT NULL DEFAULT '1' COMMENT '乐观锁',
    `is_deleted`                        tinyint(3) DEFAULT 0 COMMENT '逻辑删除 1: 已删除, 0: 未删除',
    `created_at`                        datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `updated_at`                        datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
	PRIMARY KEY (`member_id`)
) ENGINE = InnoDB CHARSET = utf8mb4 COMMENT '会员经历表';

DROP TABLE IF EXISTS `ums_member_toutou`;
CREATE TABLE `ums_member_toutou`(
    `member_id`                         bigint(11) NOT NULL COMMENT '会员ID',
    `phone`                             varchar(16) NOT NULL COMMENT '手机',
    `resume_email`                      varchar(64) DEFAULT '' COMMENT '接收简历邮箱(选填)',
    `company`                           varchar(64) NOT NULL DEFAULT '' COMMENT '公司名称',
    `company_scale`                     varchar(64) NOT NULL DEFAULT '' COMMENT '公司规模',
    `financing_stage`                   varchar(64) NOT NULL DEFAULT '' COMMENT '融资阶段',
    `industry`                          varchar(16) NOT NULL DEFAULT '' COMMENT '所属行业',
    `business_license`                  varchar(256) NOT NULL DEFAULT '' COMMENT '营业执照',
    `full_name`                         varchar(32) NOT NULL DEFAULT '' COMMENT '全名',
    `wx_code`                           varchar(64) NOT NULL DEFAULT '' COMMENT '微信号',
    `avatar`                            varchar(256) NOT NULL DEFAULT '' COMMENT '头像',
    `ip`                                varchar(256) NOT NULL DEFAULT '' COMMENT 'IP地址',
    `status`                            tinyint(2) NOT NULL DEFAULT 1 COMMENT '状态(0:无效 1:有效)',
    `version`                           bigint(11) unsigned NOT NULL DEFAULT '1' COMMENT '乐观锁',
    `is_deleted`                        tinyint(3) DEFAULT 0 COMMENT '逻辑删除 1: 已删除, 0: 未删除',
    `created_at`                        datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `updated_at`                        datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
	PRIMARY KEY (`member_id`),
	UNIQUE KEY `idx_company` (`company`),
	UNIQUE KEY `idx_phone` (`phone`)
) ENGINE = InnoDB CHARSET = utf8mb4 COMMENT '头头表';

DROP TABLE IF EXISTS `ums_member_complaint`;
CREATE TABLE `ums_member_complaint`(
    `id`                                bigint(11) NOT NULL COMMENT '主键ID',
    `member_id`                         bigint(11) NOT NULL COMMENT '举报人的用户ID',
    `complaint_member_id`               bigint(11) NOT NULL COMMENT '被举报的用户ID',
    `report_jd_id`                      bigint(11) NOT NULL COMMENT '被举报的JD的ID',
    `title`                             varchar(100) NOT NULL COMMENT '举报标题',
    `content`                           varchar(200) NOT NULL COMMENT '举报内容',
    `status`                            tinyint(2) DEFAULT 1 COMMENT '状态(0:无效 1:有效)',
    `version`                           bigint(11) unsigned NOT NULL DEFAULT '1' COMMENT '乐观锁',
    `is_deleted`                        tinyint(3) DEFAULT 0 COMMENT '逻辑删除 1: 已删除, 0: 未删除',
    `created_at`                        datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `updated_at`                        datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (`id`)
) ENGINE = InnoDB CHARSET = utf8mb4 COMMENT '会员投诉表';