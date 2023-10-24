// 存储布局页的页面状态

import newComponentData from "../../utils/componentData.js";
import newComponentExtraData from "../../utils/componentExtraData.js";


export default {
    namespaced: true,

    actions: {},

    mutations: {
        SET_CURRENT_PANEL(state, panelName) {
            // 设置当前打开的侧边栏面板名
            // panelName: String  要打开的面板的名字
            state.panel.currentPanel = panelName;
        },

        SET_CURRENT_TAB(state, {id, type}) {
            // 设置当前活动的组件页面
            // id: String  是要被设置为的当前活动的组件的 id
            // type: "design" | code"  是要被设置为的当前活动的页面的类型
            state.tabBar.currentTab = {id, type};
        },

        REMOVE_OPENED_COMPONENTS(state, {id, type}) {
            // 从标签栏中移除一个组件页面的标签
            // id: String  是要从标签栏中移除组件的 id
            // type: "design" | code"  是要从标签栏中移除组件的类型

            // 删除掉一个标签页之前 需要先把标签页中的内容保存到文件中


            // 获取要要被删除的标签在 openedComponents 中的下标
            const mustDeleteTabIndex =
                state.openedComponents.findIndex(comp => comp.id === id && comp.type === type);

            // 而后获取到当前被激活的标签在 openedComponents 中的下标
            const currentActiveTabIndex = 
                state.openedComponents.findIndex(comp => comp.id === state.tabBar.currentTab.id);
            
            if (mustDeleteTabIndex === currentActiveTabIndex) {
                // 如果当前用户想要删除的标签页就是当前激活的标签页的话
                // 我们需要设置当前激活的标签为当前标签的下一个标签

                if (state.openedComponents.length > 1) {
                    // 只有当有大于 1 个标签的时候 我们才能将当前激活的标签设置为当前标签的上一个 / 下一个标签

                    if (currentActiveTabIndex === 0) {
                        // 标签栏中有大于 1 个标签 同时当前激活的标签是第一个标签
                        // 那我们得将当前激活标签设置为当前标签的下一个标签

                        state.tabBar.currentTab = {
                            id: state.openedComponents[mustDeleteTabIndex + 1].id,
                            type: state.openedComponents[mustDeleteTabIndex + 1].type,
                        };
                    } else {
                        // 标签栏中有大于 1 个标签 同时当前激活的标签不是第一个标签
                        // 那我们得将当前激活标签设置为当前标签的上一个标签
                        state.tabBar.currentTab = {
                            id: state.openedComponents[mustDeleteTabIndex - 1].id,
                            type: state.openedComponents[mustDeleteTabIndex - 1].type,
                        };
                    }
                } else {
                    // 只有一个标签的话 那当这个标签被删除时 我们就得设置当前打开的标签为 null
                    state.tabBar.currentTab = null;
                }
            }
            
            //对于其他情况 我们只需直接删除标签即可

            
            // 而后删除当前标签即可
            const openedComponents = [...state.openedComponents];
            openedComponents.splice(mustDeleteTabIndex, 1);
            
            state.openedComponents = openedComponents;
        },

        SET_CURRENT_COMPONENT_EXTRA_DATA(state, { key, value }) {
            // 用于设置当前活动的组件页面额外信息对象中的数据
            // key: String  要设置的额外信息的 key
            // val: any  要设置为的值

            const currentComponentID = state.tabBar.currentTab.id;
            
            const currentComponentExtraDataIndex =
                state.openedComponents.findIndex(comp => comp.id === currentComponentID);

            const newCurrentComponentExtraData = {
                ...state.openedComponents[currentComponentExtraDataIndex]
            };

            newCurrentComponentExtraData[key] = value;

            const newOpenedComponents = [ ...state.openedComponents ];

            newOpenedComponents.splice(currentComponentExtraDataIndex, 1, newCurrentComponentExtraData);

            state.openedComponents = newOpenedComponents;
        },

        ADD_OPENED_COMPONENT(state, {id, type}) {
            // 向打开的组件的数组中添加一个对象 也就是打开一个组件

            if (state.openedComponents.findIndex(comp => comp.id === id) === -1) {
                // 说明当前 tab 栏中没有打开此组件 因此打开此组件
                const newOpenedComponent = newComponentExtraData(id, type);
                const newOpenedComponents = [ ...state.openedComponents, newOpenedComponent ];
                state.openedComponents = newOpenedComponents;
            }

            this.commit("LayoutPageState/SET_CURRENT_TAB", { id, type });
        }
    },

    state: {
        openedComponents: [
            // 存储本页面中每个打开的组件的额外信息
            // 例如当前组件在显示时的长宽(用户可以自行缩放组件显示时的大小)
            // 当前组件页面的类型是代码页面还是设计页面之类的信息
            
            // 还通过存储在这里的信息来生成标签栏中的标签
            {
                id: "123456",  // 组件 id
                type: "design",  // 当前标签页的类型 取值 "design" | "code"

                width: 300,  // 展示组件的 iframe 的宽度
                aspectRatio: "16/9",  // 展示组件的 iframe 的宽高比

                enableRulerBar: true,  // 是否启用标尺
            },
            {
                id: "654321",
                type: "design",

                width: 300,
                aspectRatio: "3/2",

                enableRulerBar: true
            },
            {
                id: "1234567",
                type: "design",

                width: 300,
                aspectRatio: "16/10",

                enableRulerBar: true
            },
        ],

        tabBar: {
            // 标签栏中的信息

            // 存储当前活动的组件的 id 和本标签页的类型(代码还是设计)
            // 通过此状态得知当前用户在操作哪个
            // 本属性的类型为 { id: String, type: "design" | "code" } | null 
            currentTab: { id: "123456", type: "design" },
        },

        panel: {
            // 存储当前打开的侧边栏面板信息

            // 当前打开的侧边栏面板名  我们通过这个状态来指示侧边栏现在应打开哪个面板
            currentPanel: "LayoutASideComponentPanel"
        }
    },
 
    getters: {}
};