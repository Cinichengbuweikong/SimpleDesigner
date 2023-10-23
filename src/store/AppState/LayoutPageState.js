// 存储布局页的页面状态

export default {
    namespaced: true,

    actions: {},

    mutations: {
        SET_CURRENT_PANEL(state, panelName) {
            state.panel.currentPanel = panelName;
        },
    },

    state: {
        panel: {
            currentPanel: "LayoutASideComponentPanel"
        }
    },
 
    getters: {}
};