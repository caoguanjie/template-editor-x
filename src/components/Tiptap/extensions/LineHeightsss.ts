import { Extension } from "@tiptap/core";
import "@tiptap/extension-text-style";

export type LineHeightOptions = {
    types: string[];
};

declare module "@tiptap/core" {
    interface Commands<ReturnType> {
        lineHeight: {
            /**
             * Set the font size
             */
            setLineHeight: (lineHeight: string) => ReturnType;
            /**
             * Unset the font size
             */
            unsetLineHeight: () => ReturnType;
        };
    }
}

export const LineHeight = Extension.create<LineHeightOptions>({
    name: "lineHeight",

    addOptions() {
        return {
            types: ["paragraph", "heading", 'textStyle'], // 应用行高样式的节点类型,
        };
    },

    addGlobalAttributes() {
        return [
            {
                types: this.options.types,
                attributes: {
                    lineHeight: {
                        default: null,
                        parseHTML: (element) =>
                            element.style.lineHeight.replace(/['"]+/g, ""),
                        renderHTML: (attributes) => {
                            if (!attributes.lineHeight) {
                                return {};
                            }

                            return {
                                style: `line-height: ${attributes.lineHeight}`,
                            };
                        },
                    },
                },
            },
        ];
    },

    addCommands() {
        return {
            setLineHeight:
                (lineHeight) =>
                    ({ chain }) => {
                        return chain().setMark("textStyle", { lineHeight }).run();
                    },
            unsetLineHeight:
                () =>
                    ({ chain }) => {
                        return chain()
                            .setMark("textStyle", { lineHeight: null })
                            .removeEmptyTextStyle()
                            .run();
                    },
        };
    },
});