<template>
  <div>
    <span>{{ cmd }}</span>
    <span>{{ desc }}</span>
  </div>
</template>

<script>
export default {
    name: "CmdPanelItemComponent",

    props: {
        cmd: {
            type: String,
            required: true
        },

        desc: {
            type: String,
            required: true
        }
    }
}
</script>

<style lang="scss" scoped>
div {
    height: 30px;
    margin: 5px 0;

    border-bottom: 1px solid $foregroundColor;

    span {
        line-height: 30px;
        margin: 0 15px;
    }

    &:first-child {
        margin-top: 0;
    }
    
    &:last-child {
        margin-bottom: 0;
        border: 0;
    }
}
</style>