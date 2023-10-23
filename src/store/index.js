import Vue from "vue";
import Vuex from "vuex";

import AppState from "./AppState/app.js";
import AnimationPageState from "./AppState/AnimationPageState.js";
import ExportPageState from "./AppState/ExportPageState.js";
import LayoutPageState from "./AppState/LayoutPageState.js";
import newProjectPageState from "./AppState/newProjectPageState.js";
import StylePageState from "./AppState/StylePageState.js";


Vue.use(Vuex);


export default new Vuex.Store({
    modules: {
        AppState,
        AnimationPageState,
        ExportPageState,
        LayoutPageState,
        newProjectPageState,
        StylePageState
    }
});
