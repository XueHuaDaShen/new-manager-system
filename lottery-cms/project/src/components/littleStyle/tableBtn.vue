<template>
    <div style="display:inline">
        <el-button style="margin-left:.5rem" :plain="plain" :size="size" @click="func" round :type="btnType">{{text}}</el-button>
    </div>
</template>
<script>
export default {
    name: 'tableBtn',
    props: {
        text: {
            type: String,
            required: true
        },
        func: {
            type: Function,
            required: true
        },
        btnType: {
            type: String,
            default: 'info'
        },
        plain: {
            type: Boolean,
            default: true
        },
        size: {
            type: String,
            default: 'small'
        },
    }
}
</script>

