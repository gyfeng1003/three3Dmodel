<template>
<div class="netLizi-box">
  <div id="loading"><span id="loadingPercent">0</span>%</div>
  <div id="netlizi"></div>
</div>
</template>
<script>
import * as THREE from 'three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader' // obj文件加载
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import {MTLLoader} from 'three/examples/jsm/loaders/MTLLoader'
let animationId = null
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
      this.camera.lookAt(this.scene.position)

      // 灯光
      const aLight = new THREE.AmbientLight(0xffffff, 1);
			this.scene.add(aLight);
      // var light = new THREE.DirectionalLight( 0xffffff, 1);
      // this.scene.add(light);
      // const pLight = new THREE.PointLight(0xffffff, 1);
			// pLight.position.set(0, 110, 200);
      // this.scene.add(pLight);

      // 渲染器
      this.renderer = new THREE.WebGLRenderer({
        antialias: true
      });
      this.renderer.setSize(window.innerWidth, window.innerHeight)
      this.renderer.setClearColor(0x000000, 1);
      let container = document.getElementById('netlizi')
      container.appendChild(this.renderer.domElement)

      // 控制器
      this.controls = new OrbitControls(this.camera, this.renderer.domElement );
      this.controls.minDistance = 50;
      this.controls.maxDistance = 300;
      this.controls.enablePan = false;
      this.controls.update();
      this.controls.addEventListener('change', (event)=>{
        console.log(event)
        this.render()
      })

      // 加载模型
      // this.loadAllTexture()
      this.loadTextureImage()
    },
    loadTextureImage() {
      let _this = this
      var loader = new THREE.TextureLoader();
      const objLoader = new OBJLoader();
      var texture = loader.load('/cat/Cat_diffuse.jpg');
      var textureBump = loader.load('/cat/Cat_bump.jpg');
      var tableMat = new THREE.MeshPhongMaterial({
        map: texture,
        // normalMap: textureBump, 
        // normalScale: 0.3
        bumpMap: textureBump, //凹凸贴图
        bumpScale: 0.2
      });
      textureBump.needsUpdate = true;
      textureBump.wrapS = THREE.RepeatWrapping
      textureBump.wrapT = THREE.RepeatWrapping
   
      objLoader.load(
        "/cat/12221_Cat_v1_l3.obj",
        function(obj) {
          let tablet = obj
          tablet.traverse(function(child) {
            if (child instanceof THREE.Mesh) {
              child.material = tableMat
            }
          })
          obj.rotateX(-20)
          obj.rotateY(0)
          _this.scene.add(obj)
          _this.render()
        },
        function(xhr) {
          console.log("OBJLoaded: ", (xhr.loaded / xhr.total * 100).toFixed(0), "%");
          
          let per = (xhr.loaded / xhr.total * 100).toFixed(0);
          if(per < 100) {
            document.getElementById("loadingPercent").innerHTML = per;
          }else {
            document.getElementById("loading").remove();
          }
        },
        function(err) {
          console.error("OBJError: ", err);
        })
    },
    loadAllTexture() {
      let loader = new THREE.TextureLoader();
      var textureNormal = loader.load('/cat/Cat_diffuse.jpg');
      var textureBump = loader.load('/cat/Cat_bump.jpg');
      var tableMat = new THREE.MeshStandardMaterial({
        // color: 0xff0000,
        normalMap: textureNormal, //法线贴图
        //设置深浅程度，默认值(1,1)。
        normalScale: new THREE.Vector2(3, 3),
      });
      tableMat.bumpMap = textureBump
      tableMat.bumpScale = 0.03
     
      Promise.all([this.loadCoffeeTexture(loader), this.loadGrayTexture(loader)]).then(result=>{
        // tableMat.map = result[1]
        // tableMat.needsUpdate = true
        this.loadTextureModal(tableMat)
      })
    },
    loadCoffeeTexture(loader){
      return new Promise((resolve)=>{
        loader.load('/cat/Cat_diffuse.jpg', function(map){
          map.wrapS = THREE.RepeatWrapping
          map.wrapT = THREE.RepeatWrapping
          resolve(map)
        })
      })
    },
    loadGrayTexture(loader){
      return new Promise((resolve)=>{
      loader.load('/cat/Cat_bump.jpg', function(map){
          map.wrapS = THREE.RepeatWrapping
          map.wrapT = THREE.RepeatWrapping
          resolve(map)
        })
      })
    },
    loadTextureModal(material){
      let _this = this
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
          // let tablet = obj
          // tablet.traverse(function(child) {
          //   if (child instanceof THREE.Mesh) {
          //     child.material = material
          //   }
          // })
          obj.rotateX(-20)
          obj.rotateY(0)
          _this.scene.add(obj)
          _this.render()
        },
        function(xhr) {
          console.log("OBJLoaded: ", (xhr.loaded / xhr.total * 100).toFixed(0), "%");
          
          let per = (xhr.loaded / xhr.total * 100).toFixed(0);
          if(per < 100) {
            document.getElementById("loadingPercent").innerHTML = per;
          }else {
            document.getElementById("loading").remove();
          }
        },
        function(err) {
          console.error("OBJError: ", err);
        })
      },
      function(xhr) {
        console.log("MTLLoaded: ", (xhr.loaded / xhr.total * 100).toFixed(0), "%");
      },
      function(err) {
        console.error("MTLError: ", err);
      })
    },
    render() {
      this.renderer.render(this.scene, this.camera);
      this.scene.rotation.y += 0.002;
      cancelAnimationFrame(animationId)
      animationId = requestAnimationFrame(this.render);
    }
  }
}
</script>
<style lang="less" scoped>
#loading {
  position:absolute;
  left:50%;
  top:50%;
  z-index:99;
  margin-left:-100px;
  margin-top:-100px;
  width:200px;
  height:200px;
  line-height:200px;
  text-align:center;
  font-size:18px;
  color:#fff;}
  #loadingPercent {
    font-size:96px;
  }
</style>