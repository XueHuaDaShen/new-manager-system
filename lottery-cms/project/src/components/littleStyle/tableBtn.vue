<template>
    <div style="display:inline">
        <el-button style="margin-left:.5rem" plain size="small" @click="func" round type="info">{{text}}</el-button>
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
        }
    }
}
</script>

