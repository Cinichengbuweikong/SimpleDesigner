import AppState from "../store/AppState/AppState.js";
import LayoutPageState from "../store/AppState/LayoutPageState.js";
import StylePageState from "../store/AppState/StylePageState.js";
import AnimationPageState from "../store/AppState/AnimationPageState.js";
import ExportPageState from "../store/AppState/ExportPageState.js";


export default function(stateName) {
    // 根据指定 state 内存储的被激活的组件的 id  在 AppState 中寻找此 id 对应的组件对象

    let id = "";

    if (stateName == "LayoutPageState") {
        if (LayoutPageState.state.tabBar.currentTab === null) {
            return null;
        }

        id = LayoutPageState.state.tabBar.currentTab.id;
    }
    else if (stateName == "StylePageState") {
        if (StylePageState.state.tabBar.currentTab === null) {
            return null;
        }

        id = StylePageState.state.tabBar.currentTab.id;
    }
    else if (stateName == "AnimationPageState") {
        if (AnimationPageState.state.tabBar.currentTab === null) {
            return null;
        }

        id = AnimationPageState.state.tabBar.currentTab.id;
    }
    else if (stateName == "ExportPageState") {
        if (ExportPageState.state.tabBar.currentTab === null) {
            return null;
        }

        id = ExportPageState.state.tabBar.currentTab.id;
    }
    else {
        // 不允许的 stateName  我们什么都不做即可
        console.log("不允许的 stateName: ", stateName);
        return ;
    }

    if (AppState.state.components.pageComponents[id]) {
        return AppState.state.components.pageComponents[id];
    }
    else if (AppState.state.components.normalComponents[id]) {
        return AppState.state.components.normalComponents[id];
    }
    else {
        console.log("没找到此 id 对应的组件: ", id);
    }
}