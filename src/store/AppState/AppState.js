// 存储应用本身的状态 例如打开了哪个面板 开启了哪些设置等

export default {
    namespaced: true,

    actions: {},

    mutations: {
        ADD_COMPONENT(state, componentObject) {
            if (componentObject.type === "page") {
                state.components.pageComponents = { 
                    ...state.components.pageComponents,
                    [componentObject.id]: componentObject
                };
            }
            else if (componentObject.type === "normal") {
                state.components.normalComponents = { 
                    ...state.components.normalComponents,
                    [componentObject.id]: componentObject
                };
            }

            console.log("unexpected component type: ", componentObject.type);
        }
    },

    state: {
        components: {
            // 保存组件数据
            pageComponents: {
                // 保存页面组件数据
                // 本对象中 key 组件的唯一 id, val 是一个对象 保存当前组件的数据

                "123456": {
                    id: "123456",
                    name: "TestPageComp",
                    type: "pageComponent"
                },

                "654321": {
                    id: "654321",
                    name: "anotherComp",
                },

                "1234567": {
                    id: "1234567",
                    name: "testAgain!"
                }
            },
            normalComponents: {
                // 保存普通组件数据
                // 本对象中 key 是组件的唯一 id, val 是一个对象 保存当前组件的数据

                "123456734667": {
                    id: "1234567",
                    name: "testAgain!"
                }
            }
        },
    },
 
    getters: {
    }
};