<template>
  <div class="overlay">
    <div class="tabs_title">
      <h4 class="fs_16">操作导航</h4>
      <div class="close"><i class="iconfont iconguanbi" @click="close"></i></div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    close(){
      this.$emit('close', false)
    }
  }
}
</script>
<style lang="less" scoped>
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 7;
  background: rgba(0,0,0,0.8);
  flex-flow: column nowrap;
  cursor: pointer;
  right: 0;
  bottom: 0;
  color: #fff;
}
.tabs_title {
  height: 88px;
  line-height: 88px;
  position: relative;
  text-align: center;

  .fs_16 {
    font-size: 32px;
  }

  .close {
    position: absolute;
    right: 30px;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>