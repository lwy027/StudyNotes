# API开放平台

背景：

1.前端获取数据需要调用接口

2.使用现成的系统的功能(https://blog.luoaicheng.cn/content/108/)

## 项目介绍

一个提供API调用接口的平台，用户可以注册登录，开通接口的调用权限。用户可以使用接口，并且每次调用都会进行统计。

管理员可以发布接口、下线接口、接入接口、以及可视化接口的调用情况、数据。

## 业务流程

https://bcdh.yuque.com/staff-wpxfif/resource/sntu12?inner=Z4yHV

## 技术选型

### 前端

Ant Design Pro
React
Ant Design Procomponents
Umi
Umi Request(Axios的封装)

### 后端

Java Spring Boot
Spring Boot Starter(SDK开发)
Dubbo(RPC)
Nacos
Spring Cloud Gateway(网关、限流、日志实现)































## 知识点

**API网关(kong,nginx,gateway):**

无论当前用户做什么操作，API网关都会先执行进行拦截，在这里可以进行一些鉴权、授权、计费、接口保护、日志等操作。只有当这些操作全部通过才会真正执行当前用户的操作,API网关是一个独立的东西，AOP写在业务代码中。

**SDK(software Development Kit):**

与java中的JDK类似，就是一个软件开发工具包，帮助用户更好的完成获取一个接口或完成某些操作，也可以理解为是一个工具类，别人给你更方便使用接口的源码包。