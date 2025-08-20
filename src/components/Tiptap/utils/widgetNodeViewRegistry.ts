/*
 * @Author: caoguanjie 
 * @Date: 2025-08-05 11:10:59 
 * @Last Modified by: caoguanjie
 * @Last Modified time: 2025-08-05 11:33:04
 * @Description: 自定义节点视图注册器
 * 1. 使用 Map 存储所有活动节点视图实例
 * 2. 键为节点 ID，确保唯一性
 * 3. 值为节点视图暴露的 API 接口
 * 目的是想通过在WidgetNodes自定义拓展里面调用子组件的内部的方法，由于Tiptap 内部结构的工作流，阻隔了键盘事件，所以需要通过这种方式来调用
 */


import { ComponentInternalInstance } from 'vue'

// 全局注册表存储节点视图实例
export const widgetNodeViewRegistry = new Map<string, ComponentInternalInstance>()


/**
 * 注册节点视图
 * onMounted 注册节点视图
 */
export const registerNodeView = (id: string, instance: ComponentInternalInstance) => {
  widgetNodeViewRegistry.set(id, instance)
}

/**
 * 注销节点视图
 * onBeforeUnmount 注销节点视图
 * @param id 
 */
export const unregisterNodeView = (id: string) => {
  widgetNodeViewRegistry.delete(id)
}

// 获取节点视图实例
export const getNodeView = (id: string) => {
  return widgetNodeViewRegistry.get(id)
}
// 清空所有注册事件
export const clearNodeView = () => {
  widgetNodeViewRegistry.clear()
}