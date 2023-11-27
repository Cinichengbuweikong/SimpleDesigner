import AppState from "../../store/AppState/AppState.js";
import LayoutPageState from "../../store/AppState/LayoutPageState.js";


/**
 * 设置组件的元信息 例如 缩放 横纵比
 * @param {*} componentObject  发出命令的组件的组件对象
 * @param {*} params  命令参数
 * @param {*} componentID  被操作的组件的 id
 */
export default function(componentObject, params, componentID) {
    const allPageComponents = AppState.state.components.pageComponents;
    const allNormalComponents = AppState.state.components.normalComponents;

    const componentData = allPageComponents[componentID] || allNormalComponents[componentID];
    const atLayout = LayoutPageState.state.openedComponents.find(comp => comp.id === componentID) ? true : false;

    if (componentData) {
        const cmd = params[0];

        if (cmd === "s") {
            if (atLayout) {
                componentObject.$store.commit("LayoutPageState/SET_CURRENT_COMPONENT_EXTRA_DATA", {
                    scale: +params[1]
                });
            } else {
                componentObject.$store.commit("StylePageState/SET_CURRENT_COMPONENT_EXTRA_DATA", {
                    scale: +params[1]
                });
            }
        }
        else if (cmd === "w") {
            componentObject.$store.commit("AppState/MODIFY_COMPONENT_DATA", {
                componentID,
                newComponentData: {
                    width: +params[1]
                }
            });
        }
        else if (cmd === "r") {
            if (!params[1].match(/\d+\/\d+/)) {
                return `不符合格式的比值: ${params[1]}`;
            }
            
            componentObject.$store.commit("AppState/MODIFY_COMPONENT_DATA", {
                componentID,
                newComponentData: {
                    aspectRatio: params[1]
                }
            });
        }
        else {
            return `未知的命令 ${cmd}`;
        }
    } else {
        // 为什么会有这种情况?
        return `未知的组件 id: ${componentID}`;
    }
}