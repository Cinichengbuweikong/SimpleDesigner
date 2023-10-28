<template>
  <section class="layoutPage">
    <ASide>
        <template v-slot:toolBar>
            <LayoutASideBar/>
        </template>
        
        <template v-slot:toolPanel>
            <LayoutASidePanel/>
        </template>
    </ASide>

    <article>
        <ViewBox />
    </article>
  </section>
</template>

<script>
import ASide from "../components/ASide/ASide.vue";
import LayoutASideBar from "../components/ASide/LayoutASide/LayoutASideBar.vue";
import LayoutASidePanel from "../components/ASide/LayoutASide/LayoutASidePanel.vue";
import ViewBox from "../components/ViewBox/ViewBox.vue";


export default {
    name: "LayoutPage",

    data() {
        return {
        };
    },

    methods: {},

    components: {
        ASide,
        ViewBox,
        LayoutASideBar,
        LayoutASidePanel,
    }
}
</script>

<style lang="scss" scoped>
.layoutPage {
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: row;

    article {
        flex-grow: 1;

        display: flex;
        flex-direction: column;

        position: relative;
    }
}

</style>