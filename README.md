# kitty-generator

#### 项目介绍

Kitty代码生成器，可以通过界面配置快速生成包括 model，dao，service，controller 以及页面的相关代码。

### 软件架构

#### 后端架构

##### 开发环境

- IDE : eclipse 4.x
- JDK : JDK1.8.x
- Maven : Maven 3.5.x
- MySQL: MySQL 5.7.x

##### 技术选型

- 核心框架：Spring Boot 2.x
- 视图框架：Spring MVC 5.x
- 持久层框架：MyBatis 3.x
- 模板技术：beetl 1.1.68
- XML解析：dom4j 1.6.x
- JSON工具：fastjson 1.2.x

##### 项目结构

- kitty-generator： 代码生成服务模块
- kitty-dbms： 数据库操作业务封装模块
- kitty-core： 核心代码模块，封装公共业务模块
- kitty-common： 公共代码模块，放置一些工具类

#### 前端架构

##### 开发环境

- IDE : VS Code 1.27
- NODE: Node 8.9.x
- NPM : NPM 6.4.x

##### 技术选型

- 前端框架：Vue 2.x
- 页面组件：Element 2.x
- 状态管理：Vuex 2.x
- 后台交互：axios 0.18.x
- 图标使用：Font Awesome 4.x

##### 项目结构

kitty-generator-ui
- assets： 图标、字体、国际化信息等静态信息
- components： 组件库，对常用组件进行封装
- i18n： 国际化模块，使用Vue i18n进行国际化
- mock： Mock模块，模拟接口调用并返回定制数据
- router： 路由管理模块，负责页面各种路由配置
- store： 状态管理模块，提供组件间状态共享
- utils： 工具模块，提供一些通用的工具方法
- views： 页面模块，主要放置各种页面视图组件

### 安装教程

#### 后端安装

1. 下载源码

    git clone https://gitee.com/liuge1988/kitty-generator.git

2. 导入工程

    使用 Eclipse导入 Maven 项目，在此之前请确认已安装 JDK 和 Maven 工具。

3. 编译代码

    找到 kitty-generator 工程的 pom.xml，执行 maven clean install 命令编译一键打包。

    一般来说不会有什么问题，如果还是编译不成功，可以按照优先级逐个编译试一试。

4. 导入数据库

    为了方便测试，模块集成了Mybatis模块，如果启动报出Mybatis数据连接错误，遵循如下操作。

    修改 kitty-generator 下 application.yml 中的数据库连接和账号密码为可用的数据库配置。

5. 启动系统

    找到 kitty-generator工程下的 KittyGeneratorApplication， 启动项目，开启代码生成服务。
    
#### 前端安装

1. 下载源码

    git clone https://gitee.com/liuge1988/kitty-generator.git

2. 编译代码

    进入 kitty-generator-ui 根目录，执行 npm install, 下载和安装项目相关依赖包。

3. 启动系统

    执行 npm run dev 命令，启动项目，通过 http://localhost:8888 访问。

4. 项目打包

    执行 npm run build 命令，启动打包，完成之后会生成 dist 目录。

5. 修改配置

    如果想自定义端口（默认是8888），可以修改 config/index.js 下的 port 属性。

    后台服务接口服务器地址配置在 src/utils/global.js，后台如有修改请做相应变更。

    
### 使用指南

#### 1.配置数据源

![输入图片说明](https://images.gitee.com/uploads/images/2018/1114/180145_1b395632_645970.png "屏幕截图.png")

#### 2.选择数据库表

![输入图片说明](https://images.gitee.com/uploads/images/2018/1114/180317_ca91ceb2_645970.png "屏幕截图.png")

#### 3.编辑信息，生成代码

![输入图片说明](https://images.gitee.com/uploads/images/2018/1114/180642_2c4f986d_645970.png "屏幕截图.png")


#### 参与贡献

1. Fork 本项目
2. 新建 Feat_xxx 分支
3. 提交代码
4. 新建 Pull Request


#### 码云特技

1. 使用 Readme\_XXX.md 来支持不同的语言，例如 Readme\_en.md, Readme\_zh.md
2. 码云官方博客 [blog.gitee.com](https://blog.gitee.com)
3. 你可以 [https://gitee.com/explore](https://gitee.com/explore) 这个地址来了解码云上的优秀开源项目
4. [GVP](https://gitee.com/gvp) 全称是码云最有价值开源项目，是码云综合评定出的优秀开源项目
5. 码云官方提供的使用手册 [https://gitee.com/help](https://gitee.com/help)
6. 码云封面人物是一档用来展示码云会员风采的栏目 [https://gitee.com/gitee-stars/](https://gitee.com/gitee-stars/)