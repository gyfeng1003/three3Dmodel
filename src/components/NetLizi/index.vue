<template>
  <div id="netlizi"></div>
</template>
<script>
import * as THREE from 'three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader' // obj文件加载
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import {MTLLoader} from 'three/examples/jsm/loaders/MTLLoader'
export default {
  data(){
    return {
        // 相机
      camera: null,
      // 场景
      scene: null,
      // 渲染器
      renderer: null,
      // 控制器
      controls: null
    }
  },
  mounted(){
    this.init()
  },
  methods: {
    init(){
      // 场景
      this.scene = new THREE.Scene();

      // 相机
      this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );
      this.camera.position.set(-74, 0, 83);
      this.camera.lookAt(0,0,0)
      

      // 灯光
      const aLight = new THREE.AmbientLight(0xfffff, 1);
			this.scene.add(aLight);
      var light = new THREE.DirectionalLight( 0xffffff, 1);
      this.scene.add(light);

      // 渲染器
      this.renderer = new THREE.WebGLRenderer();
      this.renderer.setSize(window.innerWidth, window.innerHeight)
      let container = document.getElementById('netlizi')
      container.appendChild(this.renderer.domElement)

      // 控制器
      this.controls = new OrbitControls(this.camera, this.renderer.domElement );
      this.controls.addEventListener('change', (event)=>{
        console.log(event)
        this.render()
      })

      let _this = this
      // 没有材质
      const mtlLoader = new MTLLoader();
      const objLoader = new OBJLoader();
			mtlLoader.setPath("/cat/")
        .load(
        "12221_Cat_v1_l3.mtl",
        function(mtl) {
          mtl.side = THREE.DoubleSide;
          objLoader
          .setMaterials(mtl)
          .load(
          "/cat/12221_Cat_v1_l3.obj",
          function(obj) {
            obj.rotateX(-20)
            obj.rotateY(0)
            _this.scene.add(obj)
            _this.render()
          })
        })
      // new OBJLoader().load('/cat/12221_Cat_v1_l3.obj', function (obj) {
      //   obj.rotateX(-20)
      //   obj.rotateY(0)
      //   _this.scene.add(obj)
      //   _this.render()
      // },
      // function(xhr) {
      //   // console.log(xhr.loaded)
      //   // console.log(xhr.total)
      // },
      // function(err) {
      //   console.error("OBJError: ", err);
      // });
    },
    render() {
      this.renderer.render(this.scene, this.camera);
    }
  }
}
</script>
<style lang="less" scoped>
.netlizi {

}
</style>