<template>
  <div id="netlizi"></div>
</template>
<script>
import * as THREE from 'three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader' // obj文件加载
export default {
  data(){
    return {
        // 相机
      camera: null,
      // 场景
      scene: null,
      // 渲染器
      renderer: null
    }
  },
  mounted(){
    this.init()
  },
  methods: {
    init(){
      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );
      var light = new THREE.DirectionalLight( 0xffffff );
      light.position.set(0, 1, 1).normalize();
      this.scene.add(light);

      let _this = this
      // 没有材质
      new OBJLoader().load('/obj/IronMan.obj', function (obj) {
          _this.scene.add(obj)
          _this.renderer = new THREE.WebGLRenderer();
          _this.renderer.setSize(window.innerWidth, window.innerHeight)
          let container = document.getElementById('netlizi')
          container.appendChild(_this.renderer.domElement)
      });
    }
  }
}
</script>
<style lang="less" scoped>
.netlizi {

}
</style>