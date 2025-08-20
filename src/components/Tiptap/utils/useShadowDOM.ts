/*
 * @Author: caoguanjie 
 * @Date: 2025-08-12 11:47:28 
 * @Last Modified by:   caoguanjie 
 * @Last Modified time: 2025-08-12 11:47:28
 * @Description: Shadow DOM 内部事件不会冒泡到编辑器，不会造成编辑器的光标和单选、多选这种有input标签，导致了输入框的聚焦问题，
 * 解决光标一闪而过的问题
 */



export interface ShadowDOMApi {
    container: Ref<HTMLDivElement | null>;
    shadowRoot: Ref<ShadowRoot | null>;
    // 把dom节点进行更新
    update: (timeplate: string) => void;
}
export interface ShadowDOMOptions {

    /**
     * dom的样式字符串
     * @example 
     * `
     *   div {
     *        color: red;
     *   }
     * `
     */
    styles: string;


}

export function useShadowDOM(styles?: string): ShadowDOMApi {
    const container = ref<HTMLDivElement | null>(null);
    const shadowRoot = ref<ShadowRoot | null>(null);
    let widgetContainer: HTMLDivElement | null = null;

    const initShadowDOM = () => {
        if (!container.value) {
            return;
        }
        // 创建或清空 Shadow DOM
        if (container.value.shadowRoot) {
            shadowRoot.value = container.value.shadowRoot;
            shadowRoot.value.innerHTML = '';
        } else {
            shadowRoot.value = container.value.attachShadow({ mode: 'open' });
        }
        // 创建样式隔离
        const style = document.createElement('style');
        style.textContent = `
        :host {
            display: inline;
            
            // vertical-align: middle;
            // contain: content;
            // font-size: 0;
            // line-height: 1;
        }
        ${styles}
        `;

        // 创建控件容器
        widgetContainer = document.createElement('div');
        widgetContainer.className = 'widget-content';


        // 添加样式和内容
        shadowRoot.value.appendChild(style);
        shadowRoot.value.appendChild(widgetContainer);
    }



    /**
     * 更新内容
     * dom的模板字符串
     * @example 
     * `<div>例子</div>`
     */
    const update = (template: string) => {
        if (widgetContainer) {
            // 创建插入dom到容器
            widgetContainer.innerHTML = template;
        }
    };

    onMounted(initShadowDOM);
    return {
        container,
        shadowRoot,
        update
    };

}