import VueRouter from "vue-router";

import newProjectPage from "../pages/newProject.vue";
import LayoutPage from "../pages/Layout.vue";
import ExportPage from "../pages/Export.vue";


export default new VueRouter({
    routes: [
        { path: "/", component: newProjectPage },
        { path: "/layout", component: LayoutPage },
        { path: "/export", component: ExportPage },
    ]
});
