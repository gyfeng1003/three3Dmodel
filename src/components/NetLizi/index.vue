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
      this.camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
      var light = new THREE.DirectionalLight( 0xffffff );
      light.position.set(0, 1, 1).normalize();
      this.scene.add(light);

      let _this = this
      // 没有材质
      new OBJLoader().load('/cat/12221_Cat_v1_l3.obj', function (obj) {
          // obj.scale.set(10, 10, 10)
          // obj.position.set(-10, 0, 0)
          // obj.children.forEach(function (e) {
          //     e.castShadow = true
          // }) // 设置阴影
          _this.scene.add(obj)
          _this.renderer = new THREE.WebGLRenderer();
          _this.renderer.setSize(window.innerWidth, window.innerHeight)
          let container = document.getElementById('netlizi')
          container.appendChild(_this.renderer.domElement)
      });

      // var geometry = new THREE.CubeGeometry( 10, 10, 10);
      // var material = new THREE.MeshPhongMaterial( { ambient: 0x050505, color: 0x0033ff, specular: 0x555555, shininess: 30 } );
    
      // var mesh = new THREE.Mesh(geometry, material );
      // mesh.position.z = -50;
      // this.scene.add( mesh );

      // _this.renderer = new THREE.WebGLRenderer();
      // _this.renderer.setSize(window.innerWidth, window.innerHeight)
      // let container = document.getElementById('netlizi')
      // container.appendChild(_this.renderer.domElement)
      // this.renderer.render(this.scene, this.camera);
    },
  }
}
</script>
<style lang="less" scoped>
.netlizi {

}
</style>