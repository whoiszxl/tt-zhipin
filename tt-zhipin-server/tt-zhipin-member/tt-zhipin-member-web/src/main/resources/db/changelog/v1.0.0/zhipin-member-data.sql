-- liquibase formatted sql

-- changeset whoiszxl:1
-- comment 初始化member模块表数据

INSERT INTO `ums_member` VALUES (1, '1', '', '', '荀彧', NULL, 'whoiszxl', '2023-08-15 07:30:45', '', '', '内网IP', '', 1, 'https://tt-zhipin-oss.oss-cn-shenzhen.aliyuncs.com/image/default3.png', '127.0.0.1', 0, 0, '2023-08-14 17:50:46', 1, 1, 1, 1, 0, 1, 1, 0, '2023-08-14 17:50:46', '2023-08-20 21:50:56');
INSERT INTO `ums_member` VALUES (2, '2', '', '', '姜维', NULL, 'whoiszxl', '2023-08-17 11:49:00', '', '', '内网IP', '', 1, 'https://tt-zhipin-oss.oss-cn-shenzhen.aliyuncs.com/image/default2.png', '127.0.0.1', 0, 0, '2023-08-15 19:49:17', 1, 8, 6, 1, 0, 1, 1, 0, '2023-08-15 19:49:17', '2023-08-20 21:51:18');
INSERT INTO `ums_member` VALUES (3, '3', '', '', '曹操', NULL, 'whoiszxl', '2023-08-15 11:53:10', '', '', '内网IP', '', 1, 'https://tt-zhipin-oss.oss-cn-shenzhen.aliyuncs.com/image/default2.png', '127.0.0.1', 0, 0, '2023-08-15 19:53:10', 1, 5, 1, 1, 0, 1, 1, 0, '2023-08-15 19:53:10', '2023-08-20 21:51:22');
INSERT INTO `ums_member` VALUES (4, '11388889999', '', '', '姜维', NULL, 'whoiszxl', '2023-08-26 10:03:12', '', '', '内网IP', '', 1, 'https://tt-zhipin-oss.oss-cn-shenzhen.aliyuncs.com/image/default2.png', '127.0.0.1', 0, 0, '2023-08-26 18:03:12', 2, 4, 2, 2, 0, 1, 1, 0, '2023-08-26 18:03:12', '2023-08-31 18:20:07');


INSERT INTO `ums_member_exp` VALUES (4, '', '[{\"job\": \"Java开发工程师\", \"city\": \"北京\", \"type\": 1, \"industryArr\": [\"电商\", \"金融\"], \"salaryRangeEnd\": 16, \"salaryRangeStart\": 11}, {\"job\": \"魔法师\", \"city\": \"上海\", \"type\": 1, \"industryArr\": [\"电商\", \"金融\"], \"salaryRangeEnd\": 16, \"salaryRangeStart\": 11}]', '[{\"jobName\": \"Java架构师\", \"industry\": \"音视频\", \"workDetail\": \"负责抖动项目的架构设计\", \"workDateEnd\": 1729393871000, \"workDateStart\": 1666235471000, \"companyFullName\": \"词节抖动\"}]', '[{\"projectLink\": \"https://whoiszxl.com\", \"projectName\": \"头头小视频\", \"projectRole\": \"架构师\", \"projectResult\": \"nice\", \"projectDateEnd\": 1666235471000, \"projectDateStart\": 1666235471000}]', '[{\"major\": \"魔法师专业\", \"paper\": \"论10级豪火球术和10级水鲛弹术孰强孰弱\", \"yearEnd\": 2020, \"schoolExp\": \"学会了10级火球术\", \"yearStart\": 1810, \"schoolName\": \"霍格沃兹魔法职业技术学院\", \"educationAttainment\": \"大专\"}]', '[\"火遁四级\", \"水遁八级\"]', 1, 1, 0, '2023-09-14 16:11:39', '2023-09-14 16:39:54');
