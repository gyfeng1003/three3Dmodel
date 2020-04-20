<template>
  <div class="home">
    <NetLiZi></NetLiZi>
    <!-- <v-robot></v-robot> -->
    <div class="viewer-bottom">
      <div class="viewer-bottom-right">
        <div class="control"></div>
        <div class="control"></div>
        <div class="control"></div>
        <div class="control"></div>
      </div>
    </div>
  </div>
</template>

<script>
import NetLiZi from '@/components/NetLizi'
// import VRobot from '@/components/RobotComp'
export default {
  name: 'Home',
  components: {
    // VRobot,
    NetLiZi
  }
}
</script>
<style lang="less" scoped>
.home {

}
</style>