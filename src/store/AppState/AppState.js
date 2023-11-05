// 存储应用本身的状态 例如打开了哪个面板 开启了哪些设置等


// 用于生成新组件的 id
import { nanoid } from "nanoid";

import newComponentData from "../../utils/newComponentData.js";
import newProject from "../..//utils/newProject.js";


export default {
    namespaced: true,

    actions: {},

    mutations: {
        // 项目
        CREATE_PROJECT(state, projectName) {
            // 新建项目
            // projectName: String  新项目名

            const newProjectObject = newProject(projectName);

            state.projectInfo = newProjectObject;
        },

        IMPORT_PROJECT(state) {},

        SAVE_PROJECT(state) {},

        CLOSE_PROJECT(state) {
            // 关闭项目

            // 删除项目信息:
            state.projectInfo = null;

            // 删除组件信息
            state.components.pageComponents = {};
            state.components.normalComponents = {};
        },

        MODIFY_PROJECT_INFO(state, { keys, value }) {
            // 修改项目信息
            // keys: Array<String>  包含要被修改的属性的 key 们
            //   例如 ["projectName"] 表示要修改 state.projectInfo.projectName
            //   例如 ["projectSetting", "enableRulerBar"] 表示要修改 state.projectInfo.projectSetting.enableRulerBar
            // value: Any  要将属性修改为的值

            let ref = state.projectInfo;

            for (let i=0; i<keys.length-1; i++) {
                const key = keys[i];
                ref = ref[key];
            }

            ref[keys[keys.length - 1]] = value;
        },


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

        DELETE_BY_DIALOG_COMPONENET(state) {
            // 删除一个组件 本函数不接受其他参数
            // 要被删除的组件的信息会从 state.dialog.DeleteComponentDialogData 中获取
            // 因此本 mutation 用于删除由 "删除组件对话框" 设置要删除的组件

            const mustDeleteComponentID = state.dialog.DeleteComponentDialogData.deleteComponentID;

            if (state.components.pageComponents[mustDeleteComponentID]) {
                let newPageComponents = { ...state.components.pageComponents };
                delete newPageComponents[mustDeleteComponentID];
                state.components.pageComponents = newPageComponents;
            }
            else if (state.components.normalComponents[mustDeleteComponentID]) {
                let newNormalComponents = { ...state.components.normalComponents };
                delete newNormalComponents[mustDeleteComponentID];
                state.components.normalComponents = newNormalComponents;
            }
        },

        MODIFY_COMPONENT_DATA(state, { componentID, newComponentData }) {
            // 修改组件对象中所 存储的数据

            if (state.components.pageComponents[componentID]) {
                for (let key in newComponentData) {
                    state.components.pageComponents[componentID][key] = newComponentData[key];
                }
            }
            else if (state.components.normalComponents[componentID]) {
                for (let key in newComponentData) {
                    state.components.normalComponents[componentID][key] = newComponentData[key];
                }
            } else {
                // 很奇怪 给定的组件 id 不在 pageComponents 和 normalComponents 中
                // 那就 console.log() 一下 id 就行了
                console.log("未知的组件 id : ", componentID);
            }
        },

        MOVE_COMPONENT(state, { componentID, targetComponentType }) {
            // 将指定 componentID 所指向的对象修改为指定的类型
            // componentID: String  需要被挪动的组件对象的 id
            // targetComponentType: "page" | "normal"  需要将组件移动到哪个组件类别下

            // 如果需要移动到的组件的类别不存在的话 那就返回就行了
            if (targetComponentType !== "page" && targetComponentType !== "normal") {
                return ;
            }

            if (state.components.pageComponents[componentID] && targetComponentType !== "page") {
                const componentObject = state.components.pageComponents[componentID];
                componentObject.type = targetComponentType;

                const newPageComponents = { ...state.components.pageComponents };
                delete newPageComponents[componentID];

                const newNormalComponents = { ...state.components.normalComponents };
                newNormalComponents[componentID] = componentObject;

                state.components.pageComponents = newPageComponents;
                state.components.normalComponents = newNormalComponents;
            }
            else if (state.components.normalComponents[componentID] && targetComponentType !== "normal") {
                const componentObject = state.components.normalComponents[componentID];
                componentObject.type = targetComponentType;

                const newNormalComponents = { ...state.components.normalComponents };
                delete newNormalComponents[componentID];

                const newPageComponents = { ...state.components.pageComponents };
                newPageComponents[componentID] = componentObject;

                state.components.pageComponents = newPageComponents;
                state.components.normalComponents = newNormalComponents;
            }
        },


        // 对话框
        SET_DIALOG_STATE(state, dialogStateObject) {
            // 用于设置关于对话框的数据
            // dialogStateObject  保存着对话框数据的对象 这个对象中只应有如下属性:
            //   show: Boolean  是否显示对话框
            //   dialogCompName: String  要遭对话框中显示的组件的名字
            //   maskPointerEvents: Boolean  设置覆盖层是否响应鼠标事件 默认不响应
            //   left: Number  对话框距屏幕左上角的横轴距离  px
            //   top: Number  对话框距屏幕左上角的纵轴距离  px
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
        },

        SET_DELETE_COMPONENT_ID(state, deleteComponentID) {
            // 用于设置要被删除的组件的 id
            // deleteComponentID: String  表示要被删除的组件的 id

            // 首先检查输入输入的 id 是否是一个合法的 id
            if (
                state.components.pageComponents[deleteComponentID] === undefined
                && state.components.normalComponents[deleteComponentID] === undefined
            ) {
                // 不存在此 id 对应的数据  取消执行
                return ;
            }

            state.dialog.DeleteComponentDialogData.deleteComponentID = deleteComponentID;
        },

        SET_COMPONENT_MENU_DIALOG_DATA(state, { componentID, componentType }) {
            // 设置在 "组件面板" 的组件项上右键时显示的组件菜单对话框所需的数据
            // componentID: String  被右键的组件的 id
            // componentType: "page" | "normal"  被右键的组件的类型

            if (componentType !== "page" && componentType !== "normal") {
                // 未知类型 不需要进行下一步了
                return ;
            }

            state.dialog.ComponentMenuDialogData.targetCompnentID = componentID;
            state.dialog.ComponentMenuDialogData.targetComponentType = componentType;
        },

        SET_COMPONENT_MENU_DIALOG_DATA(state, { componentID, componentType }) {
            // 设置在 "组件面板" 的组件项上右键时显示的组件菜单对话框所需的数据
            // componentID: String  被右键的组件的 id
            // componentType: "page" | "normal"  被右键的组件的类型

            if (componentType !== "page" && componentType !== "normal") {
                // 未知类型 不需要进行下一步了
                return ;
            }

            state.dialog.ComponentMenuDialogData.targetCompnentID = componentID;
            state.dialog.ComponentMenuDialogData.targetComponentType = componentType;
        },

        SET_COMPONENT_RENAME_DIALOG_DATA(state, { componentID }) {
            // 设置组件重命名对话框所需的数据
            // componentID: String  需要重名名的组件的 id

            state.dialog.ComponentRenameDialogData.targetCompnentID = componentID;
        },

        SET_HAS_OPENED_PROJECT_DIALOG_DATA(state, { nextAction }) {
            // 设置 "提醒用户已经打开一个项目了" 对话框所需的数据
            // nextAction: Function  当用户需要进行下一步时的回调函数

            if (!nextAction) {
                return ;
            }

            state.dialog.HasOpenedProjectDialogData.nextAction = nextAction;
        }
    },

    state: {
        // 保存关于当前项目的信息
        // 该属性取值 null | Object
        // Object 的具体结果见 ./utils/newProject.js
        projectInfo: null,

        components: {
            // 保存组件数据
            pageComponents: {
                // 保存页面组件数据
                // 本对象中 key 组件的唯一 id, val 是一个对象 保存当前组件的数据
                // 这个所需存储的对象的结构见 ./src/utils/newComponentData.js
            },

            normalComponents: {
                // 保存普通组件数据
                // 本对象中 key 是组件的唯一 id, val 是一个对象 保存当前组件的数据
                // 这个所需存储的对象的结构见 ./src/utils/newComponentData.js
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
            },

            DeleteComponentDialogData: {
                // 存储 "删除组件" 对话框的数据

                // 要新建的组件的id
                deleteComponentID: "",
            },

            ComponentMenuDialogData: {
                // 存储在 "组件面板" 的组件项上右键时显示的组件菜单对话框所需的数据

                // 在哪个组件项上右键? 这里存储被右键的组件项的 id
                targetCompnentID: "",

                // 被右键的组件项的类型 取值 "page" | "normal"
                targetComponentType: "",
            },

            ComponentRenameDialogData: {
                // 存储重命名对话框中的数据

                // 需要被重命名的组件的 id
                targetCompnentID: "",
            },

            HasOpenedProjectDialogData: {
                // 存储 "提醒用户已经打开一个项目了" 对话框所需的数据

                // 当用户需要进行下一步时的回调函数
                nextAction: () => {}
            }
        }
    },
 
    getters: {
    }
};