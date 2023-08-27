# tt-zhipin

[![MyWebSite](https://img.shields.io/badge/我的站点-whoiszxl-blue.svg)](http://whoiszxl.com)
[![docs](https://img.shields.io/badge/docs-项目文档-green.svg)](http://zhipin-docs.whoiszxl.com)
[![teach](https://img.shields.io/badge/演示-ttzhipin-orange.svg)](https://zhipin.whoiszxl.com)
[![email](https://img.shields.io/badge/email-whoiszxl@gmail.com-red.svg)](whoiszxl@gmail.com)

## 项目介绍

头头直聘，仿Boss直聘实现。SpringBoot3 + Java17 + SpringCloud Alibaba 构建后端，React Native 构建移动端，Vue3.0 + Arco Design 构建管理后台，Hadoop + Flink 实现大数据体系。实现招聘、内容管理、IM即时通讯等业务。

## 架构预览
![aa](./docs/docs/public/img/base/arch.png)


## 项目特点

* 技术全面：提供多种技术栈，移动端、PC 端、后端皆有支持，且每种技术都是当前较新技术。
* 方案通用：封装的 starter，代码规范，DDD 领域驱动设计，RBAC 权限管理，各种封装的组件可以灵活运用到其他项目中。
* 代码复用：管理后台封装 BaseController，一次继承解决基础增删改查。
* 版本管理：通过 Liquibase 管理数据库版本，跟踪、管理和应用数据库变化。
* 数仓支持：提供 Hadoop 技术栈支持，通过 CDH 构建，实现离线数仓与实时数仓。
* 扩展方案：多种分库分表策略，高并发场景。
* 持续集成：实现 DevOps，通过 DroneCI/Jenkins 实现部署的全流程自动化
* 容器编排：通过 Rancher/DockerSwarm 实现多容器的部署、管理与监控。
* 系统监控：通过 ELK 实现日志监控，通过 SkyWalking 实现链路追踪，通过 Prometheus + Grafana 实现系统监控。
* 其他：待补充

## 技术架构

### 后端技术架构

|  技术名称             | 简介   |      官网       |
|  ----                 | ----    |    -----      |           
| Spring Boot           | Spring Boot 是一个用于创建和部署基于 Java 的独立、生产级的应用程序的开发框架，它简化了 Spring 应用程序的配置和开发过程。      |https://spring.io/projects/spring-boot|
| MyBatis-Plus          | MyBatis-Plus 是一个基于 MyBatis 的增强工具包，提供了许多便捷的功能和增强，用于简化数据库访问和操作。   |https://www.baomidou.com|
| Redis                 | Redis 是一个高性能的键值存储系统，支持持久化、内存缓存、分布式数据结构等功能，常用于缓存、队列等场景。   |https://redis.io|
| RocketMQ              | RocketMQ 是一个分布式消息队列系统，具有高吞吐量、低延迟和可靠性，适用于大规模分布式系统的消息通信。   |https://rocketmq.apache.org|
| Kafka                 | Kafka 是一个分布式流处理平台，用于处理高容量、实时的数据流，常用于构建可扩展的数据管道和实时数据流处理应用程序。   |https://kafka.apache.org|
| SpringCloud Alibaba   | SpringCloud Alibaba 是基于 Spring Cloud 的一套微服务解决方案，集成了阿里巴巴的一些开源组件，用于构建和管理云原生应用。   |https://github.com/alibaba/spring-cloud-alibaba|
| Sentinel              | Sentinel 是一个轻量级的流量控制和熔断降级框架，用于保护分布式系统中的稳定性和可靠性。   |https://github.com/alibaba/Sentinel|
| Knife4j               | Knife4j 是一个基于 Swagger 的接口文档生成工具，能够帮助开发人员自动生成并展示 API 接口文档。   |https://doc.xiaominfo.com|
| Redisson              | Redisson 是一个基于 Redis 的分布式 Java 对象和服务框架，提供了许多分布式操作和数据结构的封装。   |https://redisson.org|
| Flink                 | Flink 是一个开源的流处理和批处理框架，支持高吞吐量、低延迟的实时数据流处理，以及大规模的离线数据处理。   |https://flink.apache.org|
| Hadoop                | Hadoop 是一个分布式计算框架，用于存储和处理大规模数据集，提供了可靠性、容错性和高性能的数据处理能力。   |https://hadoop.apache.org|
| Liquibase             | Liquibase 是一个开源的数据库重构工具，用于跟踪、管理和应用数据库的变更。   |https://www.liquibase.org|
| Undertow              | Undertow 是一个高性能的 Java Web 服务器，用于构建和部署可扩展的 Java Web 应用程序。   |https://undertow.io|
| Docker & Swarm        | Docker 是一个开源的容器化平台，用于构建、打包和部署应用程序，Swarm 是 Docker 的原生集群和编排工具。   |https://www.docker.com|
| Rancher               | Rancher 是一个开源的容器管理平台，用于简化 Docker 集群的部署、管理和扩展。   |https://www.rancher.com|
| Portainer             | Portainer 是一个简单易用的 Docker 容器管理界面，用于可视化管理和监控 Docker 容器和集群。   |https://www.portainer.io|
| DroneCI               | DroneCI 是一个持续集成（CI）和持续部署（CD）平台，用于自动化构建、测试和部署应用程序。   |https://www.drone.io|
| SkyWalking            | SkyWalking 是一个开源的应用性能监控（APM）系统，用于收集和分析分布式应用程序的性能指标和调用链信息。   |https://skywalking.apache.org|
| Prometheus            | Prometheus 是一个开源的监控和警报系统，用于收集和存储时间序列数据，并提供强大的查询和报警功能。   |https://prometheus.io|
| Grafana               | Grafana 是一个开源的数据可视化和监控仪表盘工具，用于创建和展示各种指标和日志数据的图表和仪表盘。   |https://grafana.com|
| ELK                   | ELK 是一个由 Elasticsearch、Logstash 和 Kibana 组成的日志管理和分析平台，用于收集、存储、分析和可视化日志数据。   |https://www.elastic.co/cn/what-is/elk-stack|


### 前端技术架构

|  技术名称             | 简介   |      官网       |
|  ----                 | ----    |    -----      |           
| Vue3                  | Vue3 是一个现代化的 JavaScript 前端框架，用于构建用户界面和单页面应用程序。它具有响应式数据绑定、组件化开发和简洁易用的 API 等特点。        |https://vuejs.org|
| Arco Design           | Arco Design 是一套开源的前端设计系统，提供了丰富的 UI 组件和设计资源，帮助开发人员快速构建美观和一致的用户界面。        |https://arco.design/|
| React Native          | React Native是一种跨平台移动应用开发技术，它允许开发者使用JavaScript编写应用程序，并能在多个平台（如iOS和Android）上运行。简单来说，React Native可以让开发者用相同的代码创建不同平台的手机应用，节省时间和精力。        |https://reactnative.dev/|


## 项目预览
//TODO


## 快速启动
//TODO


### 后端
//TODO


### 前端
//TODO