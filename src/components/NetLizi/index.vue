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
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
import { StereoEffect } from 'three/examples/jsm/effects/StereoEffect'
let animationId = null
let wh =  window.innerWidth / window.innerHeight
let w = window.innerWidth
let h = window.innerHeight
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
      controls: null,
      // 背景场景
      bgScene: null,
      bgMesh: null,
      material: null,
      VrRender: null // VR分屏 render
    }
  },
  props: {
    rotate: {
      type: Boolean,
      default: true
    },
    bgObj: {
      type: Object,
      default: ()=>({
        type: '',
        imgUrl: ``
      })
    },
    itsVr: {
      type: Boolean,
      default: false
    }
  },
  mounted(){
    this.init()
  },
  computed: {
    isBg() {
      return this.bgObj.type === 'bg'
    }
  },
  watch: {
    bgObj: {
      deep: true,
      handler (val) {
        console.log('change', val)
        if (this.isBg) {
          this.setSceneBg()
        } else {
          let loader = new THREE.CubeTextureLoader();
          loader.setPath(this.bgObj.srcPath)
          let texture = loader.load([
            'posx.jpg',
            'negx.jpg',
            'posy.jpg',
            'negy.jpg',
            'posz.jpg',
            'negz.jpg'
          ])
          this.scene.background = texture
        }
      }
    }
  },
  methods: {
    init(){
      // 场景
      this.scene = new THREE.Scene();
      // 设置背景场景
      this.bgScene = new THREE.Scene()
      this.setSceneBg()
      // this.setSceneMeshBg()

      // 相机
      this.camera = new THREE.PerspectiveCamera( 75, wh, 0.7, 700 );
      this.camera.position.set(-74, 0, 83);
      this.camera.lookAt(this.scene.position)

      // 灯光
      const aLight = new THREE.AmbientLight(0xffffff, 1);
			this.scene.add(aLight);
      var light = new THREE.DirectionalLight( 0xffffff, 1);
      this.scene.add(light);

      // 渲染器
      this.renderer = new THREE.WebGLRenderer({
        antialias: true
      });
      // VR分屏
      this.VrRender = new StereoEffect(this.renderer);//VR分屏
      this.renderer.autoClearColor = false;
      this.renderer.setSize(w, h)
      this.renderer.setClearColor(0x000000, 1);
      let container = document.getElementById('netlizi')
      container.appendChild(this.renderer.domElement)

      // 控制器
      this.controls = new OrbitControls(this.camera, this.renderer.domElement );
      this.controls.minDistance = 50;
      this.controls.maxDistance = 300;
      this.controls.enablePan = false;
      this.controls.target.set(0, 0, 0);
      this.controls.update();
      // this.controls.addEventListener('change', (event)=>{
      // console.log(event)
      //   this.render()
      // })
      this.controls.addEventListener('change', this.render)

      // 加载模型
      // this.loadTextureModal()
      this.loadTextureImage()
    },
    setSceneBg() {
      let loader = new THREE.TextureLoader();
      let _this = this
      if (this.isBg) { //设置背景图
        loader.load(this.bgObj.imgUrl, function(value){
          let defaultBg = value
          _this.scene.background = defaultBg;
          let imageAspect=defaultBg.image?defaultBg.image.width/defaultBg.image.height:1;
          let aspect=imageAspect/wh;

          defaultBg.offset.x = aspect > 1 ? (1-1/aspect)/2:0;
          defaultBg.repeat.x = aspect > 1 ?1 / aspect:1;
          defaultBg.offset.y = aspect > 1 ? 0 : (1 - aspect) / 2;
          defaultBg.repeat.y = aspect > 1 ? 1 : aspect;
        })
      }
    },
    setSceneMeshBg() { //使用全景图实现天空盒-存在bug：切换背景不生效，所以使用texture 6张图实现天空盒
      const loader = new THREE.TextureLoader();
      const texture = loader.load(this.bgObj.imgUrl);
      texture.magFilter = THREE.LinearFilter;
      texture.minFilter = THREE.LinearFilter;
      const shader = THREE.ShaderLib.equirect;
      this.material = new THREE.ShaderMaterial({
        fragmentShader: shader.fragmentShader,
        vertexShader: shader.vertexShader,
        uniforms: shader.uniforms,
        depthWrite: false,
        side: THREE.BackSide,
      });
      this.material.uniforms.tEquirect.value = texture;
      this.material.needsUpdate = true
      this.material.uniformsNeedUpdate = true
      const plane = new THREE.BoxBufferGeometry(2, 2, 2);
      this.bgMesh = new THREE.Mesh(plane, this.material);
      this.bgScene.add(this.bgMesh);
    },
    loadTextureImage() {
      let _this = this
      var loader = new THREE.TextureLoader();
      const objLoader = new OBJLoader();
      var texture = loader.load('cat/Cat_diffuse.jpg');
      var textureBump = loader.load('cat/Cat_bump.jpg');
      var tableMat = new THREE.MeshStandardMaterial({
        map: texture,
        // normalMap: textureBump, 
        // normalScale: new THREE.Vector2(3, 3),
        bumpMap: textureBump, //凹凸贴图
        bumpScale: 1
      });
      textureBump.needsUpdate = true;
      textureBump.wrapS = THREE.RepeatWrapping
      textureBump.wrapT = THREE.RepeatWrapping
   
      objLoader.load(
        "cat/12221_Cat_v1_l3.obj",
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
          let elem = document.getElementById("loadingPercent")
          let loading = document.getElementById('loading')
          if(per < 100) {
            elem && (elem.innerHTML = per);
          }else {
            loading && loading.remove();
          }
        },
        function(err) {
          console.error("OBJError: ", err);
        })
    },
    loadTextureModal(){
      let _this = this
      const mtlLoader = new MTLLoader();
      const objLoader = new OBJLoader();
			mtlLoader.setPath("cat/")
      .load(
      "12221_Cat_v1_l3.mtl",
      function(mtl) {
        mtl.side = THREE.DoubleSide;
        objLoader
        .setMaterials(mtl)
        .load(
        "cat/12221_Cat_v1_l3.obj",
        function(obj) {
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
      if (this.resizeRendererToDisplaySize(this.renderer)) {
        // const canvas = this.renderer.domElement;
        // this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
        // this.camera.updateProjectionMatrix();
      }
      
      if (!this.isBg && this.bgMesh) {
        this.bgMesh.position.copy(this.camera.position)
      }
      // !this.isBg && this.renderer.render(this.bgScene, this.camera);
      // this.renderer.render(this.bgScene, this.camera); // 天空盒全景图texture渲染

      if(this.itsVr){
				this.VrRender.setSize(w, h);//设置渲染场景尺寸
				this.VrRender.render(this.scene, this.camera);
			} else{
				this.renderer.setSize(w, h);//设置渲染场景尺寸
				this.renderer.render(this.scene, this.camera);
			}
      if (this.rotate) {
        this.scene.rotation.y += 0.002;
      } else {
        cancelAnimationFrame(animationId)
      }
     
      cancelAnimationFrame(animationId)
      animationId = requestAnimationFrame(this.render);
    },
    resizeRendererToDisplaySize(renderer) {
      const canvas = renderer.domElement;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const needResize = canvas.width !== width || canvas.height !== height;
      if (needResize) {
        renderer.setSize(width, height, false);
      }
      return needResize;
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
  .netLizi-box, #netlizi {
    width: 100%;
    height: 100%;
  }
</style>