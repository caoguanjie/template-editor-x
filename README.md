<p align="center">
<img src="https://img.shields.io/badge/Vue-3.3.4-brightgreen.svg"/>
    <img src="https://img.shields.io/badge/Vite-4.4.3-green.svg"/>
    <img src="https://img.shields.io/badge/pinia-2.1.4-blueviolet.svg"/>
    <img src="https://img.shields.io/badge/Element Plus-2.3.7-blue.svg"/>
    <a src="https://github.com/caoguanjie" target="_blank">
        <img src="https://img.shields.io/github/stars/caoguanjie/fitsadmin.svg?style=social&label=Stars"/>
    </a>
    <br/>
    <a href="https://github.com/caoguanjie" target="_blank">
        <img src="https://img.shields.io/badge/Author-丰德前端框架组-orange.svg"/>
    </a>
</p>




# Template Editor X - 探索模板动态创建与结构化编辑解决方案

## 项目简介
**template-editor-x** 是一个模板编辑器，项目使用 Vue3.3 + Vite4 + TypeScript + Element Plus + tiptap 3.x 等前端主流技术栈，这是利用element plus的Dialog弹窗进行模板编辑的，所有的富文本框的功能按钮，右键清单，表单控件，键盘监听，控件设置都是我自封装的，tiptap这个库只提供了编辑区域，很多功能都需要自搭建， 但是研究这块主要公司需求是为了解决以下痛点：
1. 康复文书类的模板动态创建、自定义维护
2. 康复量表类的模板动态创建、自定义维护
3. 康复评估的模板动态创建、自定义维护、以及评估的结构化数据分析
  
**Template Editor X** 是一款面向医疗健康领域的模板动态创建与结构化编辑系统，当初是公司要求我专为解决康复医疗场景中模板化文档管理的复杂需求而设计。本项目采用现代化前端技术栈（Vue 3.3 + Vite 4 + TypeScript + Element Plus + tiptap 3.x），构建了一个高度可定制、功能完备的模板编辑平台，不仅实现了基础的富文本编辑能力，更深入解决了康复文书、量表和评估报告等专业场景下的结构化数据管理难题。

与市面上通用富文本编辑器不同，Template Editor X 并非简单集成现有解决方案，而是基于 tiptap 3.x 强大的编辑引擎核心，**从零构建了一套完整的专业级模板编辑生态系统**。我们深度封装了所有交互元素，包括：
- 完整的富文本功能按钮体系（支持医疗专业符号、特殊格式）
- 智能右键上下文菜单（针对不同内容类型提供精准操作）
- 专业表单控件库（文本框、选择器、量表专用组件等）
- 全局键盘监听系统（支持快捷键自定义与医疗场景快捷操作）
- 可视化控件设置面板（无需编码即可配置复杂表单逻辑）

> **技术深度说明**：tiptap 仅提供了基础的编辑区域和核心 API，而 Template Editor X 通过构建多层抽象架构，实现了从基础编辑能力到专业医疗模板解决方案的跨越。我们开发了 1 个自定义扩展模块，这个自定义模块创建了单选，多选、文本输入、数字输入、下拉选择、时间选择等多个表单项，包括结构化数据绑定引擎、模板样式控制和数据源字段关联机制，使产品真正满足专业医疗场景需求。


**Template Editor X 目前只是一个基本模型和模板的底座，未来要结合业务做更多的拓展和优化。** 🌟

[!图片](https://caoguanjie.github.io/template-editor-x/demo.png)

## 安装
```sh
# 下载项目
git clone https://github.com/caoguanjie/template-editor-x.git

# 进入项目目录
cd template-editor-x

# 安装依赖
pnpm install


# 本地开发 启动项目
npm run dev
```
