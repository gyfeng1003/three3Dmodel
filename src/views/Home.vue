<template>
  <div class="home">
    <NetLiZi></NetLiZi>
    <!-- <v-robot></v-robot> -->
  </div>
</template>

<script>
import NetLiZi from '@/components/NetLizi'
import VRobot from '@/components/RobotComp'
export default {
  name: 'Home',
  components: {
    VRobot,
    NetLiZi
  }
}
</script>
<style lang="less" scoped>
.home {

}
</style>