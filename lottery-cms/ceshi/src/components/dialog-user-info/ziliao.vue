<template>
  <div>
    {{data}}
  </div>
</template>
<script>
export default {
  name: 'ziliao',
  props: {
    ziliao: {
        type: Object,
        required: true
    }
  },
  data() {
    return {
        data: this.ziliao
    }
  }
}
</script>

