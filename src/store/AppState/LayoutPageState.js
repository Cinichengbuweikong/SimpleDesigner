// 存储布局页的页面状态

import newComponentExtraData from "../../utils/newComponentExtraData.js";


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

            // 删除掉一个标签页之前 记得需要先询问用户把标签页中的内容保存到文件中

            // debugger;

            // 获取要要被删除的标签在 openedComponents 中的下标
            const mustDeleteTabIndex =
                state.openedComponents.findIndex(comp => comp.id === id && comp.type === type);

            // 如果给定的 id 不在打开的标签中 那我们直接返回即可
            if (mustDeleteTabIndex === -1) {
                return ;
            }

            // 而后获取到当前被激活的标签在 openedComponents 中的下标
            const currentActiveTabIndex = 
                state.openedComponents.findIndex(comp => comp.id === state.tabBar.currentTab.id && comp.type === state.tabBar.currentTab.type);
            
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

            if (
                state.openedComponents.findIndex(comp => comp.id === id && comp.type === type) === -1
            ) {
                // 说明当前 tab 栏中没有打开此组件 因此打开此组件
                const newOpenedComponent = newComponentExtraData(id, type);
                const newOpenedComponents = [ ...state.openedComponents, newOpenedComponent ];
                state.openedComponents = newOpenedComponents;
            }

            this.commit("LayoutPageState/SET_CURRENT_TAB", { id, type });
        },

        SET_OPENED_COMPONENT_ORDER(
            state, 
            { 
                sentryID, 
                sentryType = null, 
                compID,
                compType = null, 
                direction, 
                moveToLast = false 
            }
        ) {
            // 用于将给定的组件 id 对应的组件额外信息对象 放到指定 id 对应的组件额外信息对象的前面 / 后面
            // sentryID: String  将会把用户指定的 id 对应的组件额外信息对象放在此 id 对应的组件额外信息对象的前面 / 后面
            // sentryType: "design" | "code"  id 和 标签类型唯一确定一个标签 这个就是 sentryID 对应的标签的类型
            // compID: String  需要改变位置的组件的 id
            // compType: "design" | "code"  id 和 标签类型唯一确定一个标签 这个就是 compID 对应的标签的类型
            // direction: "before" | "after" | "auto"  插入的位置  before 就是前面  after 就是后面  auto 就是让方法决定插在前面还是后面
            // moveToLast: Boolean  是否需要将当前标签移动到标签列表的最末尾 当我们直接把标签拖动到标签栏上时我们就需要这么做

            // 只有当 moveToLast === false 的时候 我们才需要传递 sentryType 和 compType 参数
            // 当 moveToLast === true 时 我们只需传递 compType 即可


            // 如果用户把标签拖动到了自己的身上的话 那接下来不需要做任何事情
            if (sentryID === compID) {
                return ;
            }

            // 如果需要把标签放到标签列表的最末尾的话
            if (moveToLast) {
                const newOpenedComponents = state.openedComponents.filter(
                    comp => !(comp.id === compID && comp.type === compType)
                    // 不能写成 comp.id !== compID && comp.type !== compType 哟!
                    // 可以自己举个例子来想一想为什么不能写成上面这样
                );
                const targetCompnentExtraDataObject = state.openedComponents.filter(
                    comp => comp.id === compID && comp.type === compType
                )[0];

                state.openedComponents = [ ...newOpenedComponents, targetCompnentExtraDataObject ];

                return ;
            }

            // 如果 direction 不为 "before" | "after" | "auto" 的话 那接下来不需要做任何事情
            if (direction !== "before" && direction !== "after" && direction !== "auto") {
                console.log("未知的插入位置: ", direction);
                return ;
            }


            // 新建一个包含了 opendedComponents 的容器
            // 这个容器中没有 compID 对应的数据 因为 compID 对应的数据会在后续被插入到这里面
            const newOpenedComponents = state.openedComponents.filter(
                comp => !(comp.id === compID && comp.type === compType)
            );

            // 获取到 compID 对应的数据  后续会将其插入在 opendedComponents 内指定的位置中
            const targetCompnentExtraDataObject = state.openedComponents.filter(
                comp => comp.id === compID && comp.type === compType
            )[0];
            
            // 找到数据需要被插入到的位置
            const sentryIndex = newOpenedComponents.findIndex(
                comp => comp.id === sentryID && comp.type === sentryType
            );


            if (direction === "before") {
                // 如果需要在前面被插入的话
                newOpenedComponents.splice(sentryIndex, 0, targetCompnentExtraDataObject);
            }
            else if (direction === "after") {
                // 如果需要在后面被插入的话
                newOpenedComponents.splice(sentryIndex + 1, 0, targetCompnentExtraDataObject);
            }
            else if (direction === "auto") {
                // 根据 compIndex 和 sentryIndex 的位置来动态决定元素该插入到那里

                const originalCompIndex = state.openedComponents.findIndex(
                    comp => comp.id === compID && comp.type === compType
                );
                
                const originalSentryIndex = state.openedComponents.findIndex(
                    comp => comp.id === sentryID && comp.type === sentryType
                );

                if (originalCompIndex === -1) {
                    console.log("未找到需要改变位置的组件的 id 的位置: ", originalCompIndex);
                    return ;
                }
                else if (originalSentryIndex === -1) {
                    console.log("未找到到相对于的组件的 id 的位置", originalSentryIndex);
                    return ;
                }

                if (originalCompIndex > originalSentryIndex) {
                    // 从后往前挪
                    newOpenedComponents.splice(sentryIndex, 0, targetCompnentExtraDataObject);
                }
                else if (originalCompIndex < originalSentryIndex) {
                    // 从前往后挪
                    newOpenedComponents.splice(sentryIndex + 1, 0, targetCompnentExtraDataObject);
                }
            }

            state.openedComponents = newOpenedComponents;
        }
    },

    state: {
        openedComponents: [
            // 存储本页面中每个打开的组件的额外信息
            // 例如当前组件在显示时的长宽(用户可以自行缩放组件显示时的大小)
            // 当前组件页面的类型是代码页面还是设计页面之类的信息
            
            // 还通过存储在这里的信息来生成标签栏中的标签

            // 这里所需存储的对象的结构 见  ./src/utils/newComponentExtraData.js
        ],

        tabBar: {
            // 标签栏中的信息

            // 存储当前活动的组件的 id 和本标签页的类型(代码还是设计)
            // 通过此状态得知当前用户在操作哪个
            // 本属性的类型为 { id: String, type: "design" | "code" } | null 
            
            currentTab: null,
        },

        panel: {
            // 存储当前打开的侧边栏面板信息

            // 当前打开的侧边栏面板名  我们通过这个状态来指示侧边栏现在应打开哪个面板
            // 这里设置默认打开组件面板

            currentPanel: "componentPanel"
        }
    },
 
    getters: {
        getCurrentActiveComponentExtraData(state) {
            // 获取当前激活的 tab 所对应的组件的额外信息对象

            if (state.tabBar.currentTab === null) {
                return null;
            }

            const currentComponentID = state.tabBar.currentTab.id;

            return state.openedComponents.find(comp => comp.id === currentComponentID);
        },
    }
};