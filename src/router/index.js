import VueRouter from "vue-router";

import newProjectPage from "../pages/newProject.vue";


export default new VueRouter({
    routes: [
        { path: "/", component: newProjectPage }
    ]
});
