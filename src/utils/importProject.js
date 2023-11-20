// 根据给定的项目 json 文件 返回一个包含了整个项目信息的对象
// 而后 Vuex 中的函数可以解析包含了项目信息的对象 从而恢复整个项目

export default function(projectJson) {
    // projectJson: String  本应用导出的项目文件中的 json 字符串

    const parsedData = JSON.parse(projectJson);

    const projectObject = {
        projectInfo: {},

        components: {
            pageComponents: {},
            normalComponents: {}
        },

        runtimeInfo: {
            layout: {
                openedComponents: [],
                currentTab: false
            },

            style: {
                openedComponents: [],
                currentTab: false
            },

            animation: {
                openedComponents: [],
                currentTab: false
            }
        }
    };

    if (!parsedData.type || parsedData.type !== "simpleDesignerProject") {
        throw Error("不是 simpleDesigner 项目");
    }

    const { settings, runtimeInfo, components } = parsedData;


    // 生成 projectInfo
    const { name, enableRulerBar, template, width, aspectRatio, dpr } = settings;
    const projectInfo = {
        projectName: name,
        projectSetting: {
            rulerBar: enableRulerBar,
            template,
            width,
            aspectRatio,
            dpr
        }
    };

    projectObject.projectInfo = projectInfo;


    // 生成 components
    const { pageComponents, normalComponents } = components;

    for (let key in pageComponents) {
        const component = pageComponents[key];

        const componentObject = {
            ...component.metaData,
            ast: component.content
        };

        projectObject.components.pageComponents[key] = componentObject;
    }

    for (let key in normalComponents) {
        const component = normalComponents[key];

        const componentObject = {
            ...component.metaData,
            ast: component.content
        };

        projectObject.components.normalComponents[key] = componentObject;
    }


    // 生成 runtimeInfo
    const { layout, style, animation } = runtimeInfo;
    let { openedComponents: layoutOpenedComponents, currentTab: layoutCurrentTab } = layout;
    
    layoutOpenedComponents = layoutOpenedComponents.map(c => ({
        ...c,
        workingComponents: ""
    }));

    projectObject.runtimeInfo.layout = {
        openedComponents: layoutOpenedComponents,
        currentTab: layoutCurrentTab ? layoutCurrentTab : null
    };


    let { openedComponents: styleOpenedComponents, currentTab: styleCurrentTab } = style;
    
    styleOpenedComponents = styleOpenedComponents.map(c => ({
        ...c,
        workingComponents: ""
    }));

    projectObject.runtimeInfo.style = {
        openedComponents: styleOpenedComponents,
        currentTab: styleCurrentTab ? styleCurrentTab : null
    };


    let { openedComponents: animationOpenedComponents, currentTab: animationCurrentTab } = animation;
    
    animationOpenedComponents = animationOpenedComponents.map(c => ({
        ...c,
        workingComponents: ""
    }));

    projectObject.runtimeInfo.animation = {
        openedComponents: animationOpenedComponents,
        currentTab: animationCurrentTab ? animationCurrentTab : null
    };


    return projectObject;
}