// Vuex 中的 AppState 对象
import AppState from "../store/AppState/AppState.js";
// Vuex 中的 LayoutPageState 对象
import LayoutPageState from "../store/AppState/LayoutPageState.js";
// Vuex 中的 StylePageState 对象
import StylePageState from "../store/AppState/StylePageState.js";
// Vuex 中的 AnimationPageState 对象
import AnimationPageState from "../store/AppState/AnimationPageState.js";


// 将整个项目的数据保存为具有指定格式的 json 的函数
export default function() {
    // 新建项目对象 完整结构示例见项目根目录下的 projectSample.json
    const project = {
        type: "simpleDesignerProject",

        // 项目设置
        settings: {
            // 项目名
            name: "",

            // 是否默认启用标尺
            enableRulerBar: true,

            // 组件模板默认代码
            template: "",

            // 组件默认宽度
            width: 0,

            // 组件默认宽高比
            aspectRatio: "16/9",

            // 组件默认 dpr 值
            dpr: 2,
        },

        // 运行时信息
        runtimeInfo: {
            // 存储布局页的运行时信息
            layout: {
                openedComponents: [],
                currentTab: false
            },

            // 存储样式页的运行时信息
            style: {
                openedComponents: [],
                currentTab: false
            },
            
            // 存储动画页的运行时信息
            animation: {
                openedComponents: [],
                currentTab: false
            },
        },

        // 组件信息
        components: {
            pageComponents: {},

            normalComponents: {}
        }
    };


    // 存储项目的设置
    const projectName = AppState.state.projectInfo.projectName;
    const { rulerBar, template, width, aspectRatio, dpr } = AppState.state.projectInfo.projectSetting;

    project.settings.name = projectName;
    project.settings.enableRulerBar = rulerBar;
    project.settings.template = template;
    project.settings.width = width;
    project.settings.aspectRatio = aspectRatio;
    project.settings.dpr = dpr;


    // 存储运行时信息
    // 存储布局页面中的运行时信息
    const layoutOpenedComponents = LayoutPageState.state.openedComponents.map(c => ({
        id: c.id,
        type: c.type
    })); 

    let layoutCurrentTab = LayoutPageState.state.tabBar.currentTab;
    layoutCurrentTab = layoutCurrentTab ? { id: layoutCurrentTab.id, type: layoutCurrentTab.type } : false;

    project.runtimeInfo.layout.openedComponents = layoutOpenedComponents;
    project.runtimeInfo.layout.currentTab = layoutCurrentTab;


    return project;
}