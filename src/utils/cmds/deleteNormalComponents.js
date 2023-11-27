import AppState from "../../store/AppState/AppState.js";
import LayoutPageState from "../../store/AppState/LayoutPageState.js";
import StylePageState from "../../store/AppState/StylePageState.js";

/**
 * 删除普通组件
 * @param {Object} componentObject  组件对象 就是组件的 this
 * @param {string} componentName  要删除的组件的名称
 * @returns {string | null}
 */
export default function(componentObject, componentName) {
    const normalComponents = AppState.state.components.normalComponents;

    let compID = null;

    Object.values(normalComponents).map(comp => {
        if (comp.name === componentName) {
            compID = comp.id;
        }
    });

    if (compID === null) {
        return `没有找到名为 ${componentName} 的页面组件`;
    }

    // 如果在这个组件有在标签栏上打开的话 那我们需要先关闭这个标签栏
    if (
        LayoutPageState.state.openedComponents &&
        LayoutPageState.state.openedComponents.findIndex(comp => comp.id === compID) !== -1
    ) {
        // 关闭设计页面
        componentObject.$store.commit(`LayoutPageState/REMOVE_OPENED_COMPONENTS`, {
            id: compID,
            type: "design"
        });

        // 关闭代码页面
        componentObject.$store.commit(`LayoutPageState/REMOVE_OPENED_COMPONENTS`, {
            id: compID,
            type: "code"
        });
    }

    if (
        StylePageState.state.openedComponents &&
        StylePageState.state.openedComponents.findIndex(comp => comp.id === compID) !== -1
    ) {
        // 关闭设计页面
        componentObject.$store.commit(`StylePageState/REMOVE_OPENED_COMPONENTS`, {
            id: compID,
            type: "design"
        });

        // 关闭代码页面
        componentObject.$store.commit(`StylePageState/REMOVE_OPENED_COMPONENTS`, {
            id: compID,
            type: "code"
        });
    }

    componentObject.$store.commit("AppState/DELETE_COMPONENT_BY_NAME", {
        componentName,
        componentType: "normal"
    });
}