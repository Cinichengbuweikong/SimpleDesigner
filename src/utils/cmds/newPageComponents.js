import AppState from "../../store/AppState/AppState.js";

/**
 * 新建页面组件
 * @param {Object} componentObject  组件对象 就是组件的 this
 * @param {string} componentName  要新建的组件的名称
 * @returns {string | null}
 */
export default function(componentObject, componentName) {
    const pageComponents = AppState.state.components.pageComponents;

    let hasThisComp = false;

    Object.values(pageComponents).map(comp => {
        if (comp.name === componentName) {
            hasThisComp = true;
        }
    });

    if (hasThisComp) {
        return `已经有一个叫 ${componentName} 的页面组件了`;
    }

    componentObject.$store.commit("AppState/ADD_COMPONENT", {
        componentName,
        componentType: "page"
    });
}