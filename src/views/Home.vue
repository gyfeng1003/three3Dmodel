<template>
  <div class="home">
    <NetLiZi :rotate="setAnimation" :bgObj="currentBg" :type="currentBg.type"></NetLiZi>
    <!-- <v-robot></v-robot> -->
    <div class="viewer-bottom">
      <div class="viewer-bottom-right">
        <div class="control1"><i class="iconfont viewer-icon1" :class="{'iconzanting': setAnimation, 'iconweiraogoujianxuanzhuan': !setAnimation}" @click="setTransformAni"></i></div>
        <div class="control1"><i class="iconfont iconwenhao viewer-icon1" @click="openOperGuide"></i></div>
        <div class="control1">
          <i class="iconfont iconai-eye viewer-icon1" @click="showControl"></i>
          <ControlView class="views" :menus="list" v-show="controlShow" @clickMenu="clickMenu"></ControlView>
        </div>
        <div class="control1"><i class="iconfont iconvr viewer-icon1"></i></div>
      </div>
    </div>
    <overlay v-show="showGuide" @close="close"></overlay>
  </div>
</template>

<script>
import ControlView from '@/businessComp/controlView'
import Overlay from '@/businessComp/overlay'
import NetLiZi from '@/components/NetLizi'
// import VRobot from '@/components/RobotComp'
export default {
  name: 'Home',
  data() {
    return {
      setAnimation: true,
      showGuide: false,
      controlShow:false,
      list: [
        {
          title: '背景切换',
          bgs: [
            {
              type: 'bg',
              imgUrl: `/image/xingkong.jpg`
            },
            {
              type: 'model',
              imgUrl: `/image/360room.jpg`
            },
            {
              type: 'bg',
              imgUrl: `/image/meshimg.jpg`
            },
            {
              type: 'bg',
              imgUrl: `/image/mohu.jpg`
            }
          ]
        }
      ]
    }
  },
  created(){
    this.currentBg = this.list[0].bgs[1]
  },
  components: {
    // VRobot,
    NetLiZi,
    Overlay,
    ControlView
  },
  methods: {
    setTransformAni(){
      this.setAnimation = !this.setAnimation
    },
    openOperGuide(){
      this.showGuide = true
    },
    close(data) {
      this.showGuide = data
    },
    showControl () {
      this.controlShow = !this.controlShow
    },
    clickMenu(data){
      this.currentBg = data
    }
  }
}
</script>
<style lang="less" scoped>
.home {
  position: relative;
  width: 100%;
  height: 100%;
  .viewer-bottom {
    position: absolute;
    bottom: 20px;
    width: 100%;
    z-index: 3;
    line-height: 60px;
    height: 60px;

    .viewer-bottom-right {
      float: right;
      position: absolute;
      right: 40px;
      bottom: 0;
    }
    .control1 {
      color: #ddd;
      margin-right: 10px;
      display: inline-flex;
      position: relative;
    }
    .viewer-icon1 {
      font-size: 30px;
      width: 56px;
      height: 56px;
      line-height: 56px;
      color: #fff;
      background: rgba(0,0,0,0.5);
      text-align: center;
      border-radius: 50%;
    }
  }
  .views {
    width: 360px;
    position: absolute;
    right: -100px;
    bottom: 100%;
  }
}
</style>