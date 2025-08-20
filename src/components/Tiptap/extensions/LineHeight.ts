/*
 * @Author: caoguanjie 
 * @Date: 2025-06-19 11:48:30 
 * @Last Modified by: caoguanjie
 * @Last Modified time: 2025-06-19 16:18:41
 * 文件描述：控制tiptap富文本的编辑器的段落行高
 * 如果使用Fontsize自定义拓展的类似的方法的话，它是使用textstyle相关的属性来控制，但是这个是直接控制某选中节点的行高，不是段落的行高。
 * 下面的这个方法还是有问题的，当你一旦选中了某个行高，所有的段落都会默认这个行高，因为addGlobalAttributes添加是全局属性，一旦选中，就会改变所有段落。（待优化）
 */
import { Extension } from '@tiptap/core';

export interface LineHeightOptions {
    /**
     * The types where the text align attribute can be applied.
     * @default []
     * @example ['paragraph', 'heading', 'listItem']
     */
    types: string[],
}

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        lineHeight: {
            /**
             * 设置行高
             * @example editor.commands.setLineHeight()
             */
            setLineHeight: (lineHeight: string) => ReturnType;
            /**
             * 取消行高
             * @example editor.commands.unsetLineHeight()
             */
            unsetLineHeight: () => ReturnType,
        }
    }
}

// 自定义缩进扩展
export const LineHeight = Extension.create<LineHeightOptions>({
    name: 'lineHeight',
    addOptions() {
        return {
            types: ['paragraph', 'heading', 'listItem'], // 可以缩进的节点类型
        };
    },
    // 使用属性在内容中存储附加信息
    addGlobalAttributes() {
        return [{
            types: this.options.types,
            attributes: {
                lineHeight: {
                    default: 0,
                    parseHTML: element => element.style.lineHeight.replace(/['"]+/g, ""),
                    // 返回将在输出中渲染的 HTML 属性
                    renderHTML: attributes => {
                        // 如果没有缩进的值，则返回空对象
                        if (!attributes.lineHeight) return {};
                        return {
                            style: `line-height: ${attributes.lineHeight}`,
                        };
                    },
                },
            },
        }]
    },

    addCommands() {
        return {

            setLineHeight: (lineHeight) => ({ commands, state }) => {
                const { selection } = state;
                const { $from } = selection;
                const node = $from.node($from.depth);
                return commands.updateAttributes(node.type.name, {
                    lineHeight: lineHeight
                });
            },

            unsetLineHeight: () => ({ commands, state }) => {
                const { selection } = state;
                const { $from } = selection;
                const node = $from.node($from.depth);
                return commands.updateAttributes(node.type.name, {
                    lineHeight: null
                });
            },

        }
    }

})