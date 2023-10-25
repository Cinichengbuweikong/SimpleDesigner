// 存储应用本身的状态 例如打开了哪个面板 开启了哪些设置等

import newComponentData from "../../utils/newComponentData.js";

// 用于生成新组件的 id
import { nanoid } from "nanoid";


export default {
    namespaced: true,

    actions: {},

    mutations: {
        // 组件
        ADD_COMPONENT(state, {componentName, componentType}) {
            // 新建组件 并将新建的组件的对象保存在 state.components.xxxComponents 中
            // componentName 就是要新建的组件的名字
            // componentType 就是新建的组件的类型 取值 "page" | "normal"

            if (componentType !== "page" && componentType !== "normal") {
                console.log("unexpected component type: ", componentType);
                return ;
            }
            
            const newComponentID = nanoid();
            const newComponent = newComponentData(newComponentID, componentName, componentType);

            if (componentType === "page") {
                state.components.pageComponents = { 
                    ...state.components.pageComponents,
                    [newComponentID]: newComponent
                };
            }
            else if (componentType === "normal") {
                state.components.normalComponents = { 
                    ...state.components.normalComponents,
                    [newComponentID]: newComponent
                };
            }
            
            
            // 而后打开新建的组件
            this.commit("LayoutPageState/ADD_OPENED_COMPONENT", {
                id: newComponentID,
                type: "design"
            });
        },


        // 对话框
        SET_DIALOG_STATE(state, dialogStateObject) {
            // 用于设置关于对话框的数据
            // dialogStateObject  保存着对话框数据的对象 这个对象中只应有如下属性:
            //   show: Boolean  是否显示对话框
            //   dialogCompName: String  要遭对话框中显示的组件的名字
            //   maskPointerEvents: Boolean  设置覆盖层是否响应鼠标事件 默认不响应
            //   left: Number  对话框距屏幕左上角的横轴距离  百分比
            //   top: Number  对话框距屏幕左上角的纵轴距离  百分比
            //   padding: Number  对话框的内边距  px 计
            //   maskBackgroundColor: String  覆盖层的背景色 默认透明

            const newDialogState = {
                ...state.dialog.dialogData
            };

            for (let key in dialogStateObject) {
                switch(key) {
                    case "width":
                    case "height":
                    case "left":
                    case "top":
                    case "padding":
                        if (dialogStateObject[key] < 0) {
                            console.log(`${key} has a unavaliable value: ${dialogStateObject[key]}`);
                            continue;
                        }
                }
                
                newDialogState[key] = dialogStateObject[key];
            }

            state.dialog.dialogData = newDialogState;
        },

        SET_NEW_COMPONENT_TYPE(state, newComponentType) {
            // 用于设置 state.dialog.NewComponentDialogData 中 newComponentType 的取值
            // 也即设置对于新建组件对话框来说 对话框应新建什么类型的组件

            if (newComponentType !== "page" && newComponentType !== "normal") {
                 // 未知的类型 该值不能被设置
                 console.log("未知的新组件类型: ", newComponentType);
                 return ;
            }

            state.dialog.NewComponentDialogData.newComponentType = newComponentType;
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
                    type: "page"
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

        dialog: {
            // 为了复用对话框 这里选择把对话框的数据存储在全局状态中
            // 这里保存的就是所有对话框的数据

            dialogData: {
                // 存储 Dialog 组件的信息

                // 是否显示对话框
                show: false,

                // 要在对话框中显示的组件的名字:
                dialogCompName: "",

                // 设置覆盖层是否响应鼠标事件 默认不响应
                maskPointerEvents: true,

                // 对话框距屏幕左上角的横轴距离  百分比
                left: 50,

                // 对话框距屏幕左上角的纵轴距离  百分比
                top: 50,

                // 对话框的内边距  px 计
                padding: 10,

                // 覆盖层的背景色 默认透明
                maskBackgroundColor: "transparent",
            },

            NewComponentDialogData: {
                // 存储 "新建组件" 对话框的数据

                // 要新建的组件的类型  取值: "page" | "normal"
                newComponentType: "page",
            }
        }
    },
 
    getters: {
    }
};