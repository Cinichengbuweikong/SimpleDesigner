<template>
    <div class="layoutAsideToolPanel">
        <p class="panelTitle">工具面板</p>

        <div class="panelBox">
            <p class="boxTitle">布局工具:</p>

            <ul class="boxContent">
                <li class="boxItem">
                    标尺
                    <input
                        type="checkbox"
                        :disabled="allOpenedComponents.length === 0"
                        v-model="rulerBarState"
                    >
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "layoutAsideToolPanelComponent",

    methods: {
    },

    computed: {
        ...mapState('LayoutPageState', {
            allOpenedComponents: state => state.openedComponents,
            currentTab: state => state.tabBar.currentTab
        }),

        rulerBarState: {
            get() {
                if (this.currentTab === null) {
                    return null;
                }

                const currentComponentID = this.currentTab.id;
                const currentComponent =  this.allOpenedComponents.find(comp => comp.id === currentComponentID);
                return currentComponent.enableRulerBar;
            },

            set(value) {
                this.$store.commit(
                    "LayoutPageState/SET_CURRENT_COMPONENT_EXTRA_DATA", 
                    {
                        key: "enableRulerBar",
                        value
                    }
                );
            }
        },
    },
}
</script>

<style lang="scss" scoped>
.layoutAsideToolPanel {
    .panelTitle {
        color: $textColor;
        font-size: 14px;
        padding: 10px 5px;

        border-bottom: 1px solid $foregroundColor;
    }

    .panelBox {
        padding: 5px 5px;
        border-bottom: 1px solid $foregroundColor;

        .boxTitle {
            color: $textColor;
            font-size: 14px;

            padding: 5px 0;

            position: relative;

            span {
                display: block;
                width: 20px;
                height: 20px;

                position: absolute;
                right: 10px;
                top: 50%;
                transform: translateY(-50%);

                text-align: center;
                line-height: 20px;
                font-size: 20px;

                &:hover {
                    background-color: $barItemHoverBackgroundColor;
                }
            }
        }

        .boxContent {
            list-style: none;

            padding-left: 10px;

            color: $textColor;
            font-size: 14px;

            .boxItem {
                padding: 3px 2px;

                position: relative;

                &:hover {
                    background-color: $barItemHoverBackgroundColor;
                }

                input {
                    position: absolute;
                    right: 10px;
                    top: 50%;
                    transform: translateY(-50%);
                }
            }
        }
    }
}
</style>