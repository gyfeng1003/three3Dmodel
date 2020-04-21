<template>
  <div class="control-view">
    <ul class="control-menu">
      <li class="title" v-for="(data, index) in menus" :key="index">
        <div class="texture">{{data.title}}<i class="iconfont iconarrow-right"></i></div>
        <div class="True_box">
          <div class="toLeft iconfont iconzuosanjiaoxing"></div>
          <div class="main_box">
            <ul class="viewer-menus">
              <li class="link img_Texture" :class="{'active': currentTab===idx}" v-for="(item, idx) in data.bgs" :key="idx" @click="clickThumb(item, idx)">
                <img class="img_Textures" :src="item.imgUrl" alt="">
              </li>
            </ul>
          </div>
          <div class="toRight iconfont iconyousanjiaoxing"></div>
        </div>
      </li>
    </ul>
    <div class="controls-Angle"></div>
  </div>
</template>
<script>
export default {
  data (){
    return {
      currentTab: 0
    }
  },
  props: {
    menus: {
      type: Array,
      default: ()=>[]
    }
  },
  methods: {
    clickThumb(data, idx) {
      this.currentTab = idx
      this.$emit('clickMenu', data)
    }
  }
}
</script>
<style lang="less" scoped>
.control-menu {
  padding-bottom: 20px;
  border-radius: 20px;
  background: rgba(0,0,0,0.75);
  margin-bottom: 12px;
}
.controls-Angle {
  width: 0;
  height: 0;
  border-left: 12px solid transparent;
  border-right: 12px solid transparent;
  border-top: 12px solid rgba(0,0,0,0.75);
  position: absolute;
  bottom: 0;
  right: 116px;
  margin-left: 2px;
}
.texture {
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
}
.True_box {
  width: 320px;
  height: 48px;
  margin: 4px auto;
  display: flex;
}
.toLeft, .toRight {
  width: 36px;
  height: 36px;
  background: rgba(0,0,0,0.8);
  float: left;
  cursor: pointer;
  line-height: 36px;
  padding-left: 6px;
  border-radius: 4px;
}
.toLeft {
  margin-right: 4px;
}
.toRight {
  margin-left: 4px;
}
.main_box {
  width: 240px;
  height: 36px;
  float: left;
  overflow: hidden;
}
.viewer-menus {
  height: 36px;
  display: block;
  position: relative;
  width: 9999em;
  .img_Texture {
    width: 36px;
    height: 36px;
    margin-left: 6px;
    margin-right: 6px;
    float: left;
    .img_Textures {
      width: 36px;
      height: 36px;
      vertical-align: baseline;
    }
  }
}
.active {
  border: 4px solid #fff;
}
</style>