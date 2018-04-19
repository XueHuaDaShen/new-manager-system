<template>
  <div>
    <div class="open-dialog"><span @click="handleOpenDialog" style="cursor: pointer;">设置属性</span></div>
    <DialogUserInfo v-if="dialog" @closeDialog="handleCloseDialog"></DialogUserInfo>
  </div>
</template>
<script>
import DialogUserInfo from './dialog-user-info/DialogUserInfo';
export default {
  name: 'setAttr',
  components: {
    DialogUserInfo
  },
  data() {
    return {
      dialog: false,
    }
  },
  methods: {
    handleOpenDialog() {
      this.dialog = true;
    },
    handleCloseDialog(val) {
      this.dialog = val;
    }
  }
}
</script>

