import AppState from "../../store/AppState/AppState.js";

/**
 * 新建普通组件
 * @param {Object} componentObject  组件对象 就是组件的 this
 * @param {string} componentName  要新建的组件的名称
 * @returns {string | null}
 */
export default function(componentObject, componentName) {
    const normalComponents = AppState.state.components.normalComponents;

    let hasThisComp = false;

    Object.values(normalComponents).map(comp => {
        if (comp.name === componentName) {
            hasThisComp = true;
        }
    });

    if (hasThisComp) {
        return `已经有一个叫 ${componentName} 的普通组件了`;
    }

    componentObject.$store.commit("AppState/ADD_COMPONENT", {
        componentName,
        componentType: "normal"
    });
}