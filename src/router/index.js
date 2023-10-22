import VueRouter from "vue-router";

import newProjectPage from "../pages/newProject.vue";
import LayoutPage from "../pages/Layout.vue";


export default new VueRouter({
    routes: [
        { path: "/", component: newProjectPage },
        { path: "/layout", component: LayoutPage },
    ]
});
