<template>
<div class="robot-box">
  <div id="loading"><span id="loadingPercent">0</span>%</div>
  <div id="robot"></div>
</div>
</template>
<script>
const s = 300; //视野范围控制系数
import * as THREE from 'three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader' // obj文件加载
import {MTLLoader} from 'three/examples/jsm/loaders/MTLLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
export default {
  name: 'v-robot',
  data() {
  },
  methods: {
    init(){
      //场景
      this.scene = new THREE.Scene();
      
      //光照
			const aLight = new THREE.AmbientLight(0x404040, 1);
			this.scene.add(aLight);
			const dLight = new THREE.DirectionalLight(0xffffff, 1);
			this.scene.add(dLight);
			const pLight = new THREE.PointLight(0xffffff, 0.8);
			pLight.position.set(0, 110, 200);
      this.scene.add(pLight);
      
      //照相机
			this.camera = new THREE.PerspectiveCamera(75, r, 1, 1000);
			// this.camera = new THREE.OrthographicCamera(-s*r, s*r, s, -s, 1, 1000);
			this.camera.position.set(0, 120, 300);
      this.camera.lookAt(this.scene.position);
      
      //渲染器
			this.renderer = new THREE.WebGLRenderer({
				antialias: true
			});
			this.renderer.setSize(w, h);
      this.renderer.setClearColor(0x000000, 1);
      let robot = document.getElementById('robot')
      robot.appendChild(this.renderer.domElement);
      
      //加载模型
      let _this = this
			const mtlLoader = new MTLLoader();
			const objLoader = new OBJLoader();
			mtlLoader.setPath("/obj/")
        .load(
        "IronMan.mtl",
        function(mtl) {
          //console.log("Material: ", mtl);
          //mtl.preload();
          mtl.side = THREE.DoubleSide;
          
          objLoader
            .setMaterials(mtl)
            .load(
              "/obj/IronMan.obj",
              function(obj) {
                //console.log("Model: ", obj);
                obj.scale.set(1.5, 1.5, 1.5);
                obj.position.y = -180;
                _this.scene.add(obj);
                _this.render();
              },
              function(xhr) {
                //console.log("OBJLoaded: ", (xhr.loaded / xhr.total * 100).toFixed(0), "%");
                
                let per = (xhr.loaded / xhr.total * 100).toFixed(0);
                if(per < 100) {
                  document.getElementById("loadingPercent").innerHTML = per;
                }else {
                  document.getElementById("loading").remove();
                }
              },
              function(err) {
                console.error("OBJError: ", err);
              }					 			
            );
        },
        function(xhr) {
          console.log("MTLLoaded: ", (xhr.loaded / xhr.total * 100).toFixed(0), "%");
        },
        function(err) {
          console.error("MTLError: ", err);
        })
    },
    render(){
      //渲染函数
      //console.log("Render...");
      this.renderer.render(this.scene, this.camera);
      this.scene.rotation.y += 0.002;
      requestAnimationFrame(this.render);
        texture.magFilter = THREE.LinearFilter;
        texture.minFilter = THREE.LinearFilter;
        const shader = THREE.ShaderLib.equirect;
        const material = new THREE.ShaderMaterial({
          fragmentShader: shader.fragmentShader,
          vertexShader: shader.vertexShader,
          uniforms: shader.uniforms,
          depthWrite: false,
          side: THREE.BackSide,
        });
        material.uniforms.tEquirect.value = texture;
        const plane = new THREE.BoxBufferGeometry(2, 2, 2);
        bgMesh = new THREE.Mesh(plane, material);
        bgScene.add(bgMesh);
      }
      function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
          renderer.setSize(width, height, false);
        }
        return needResize;
      }
      function render(time) {
        time *= 0.001;
        if (resizeRendererToDisplaySize(renderer)) {
          const canvas = renderer.domElement;
          camera.aspect = canvas.clientWidth / canvas.clientHeight;
          camera.updateProjectionMatrix();
        }
        // cubes.forEach((cube, ndx) => {
        //   const speed = 1 + ndx * .1;
        //   const rot = time * speed;
        //   cube.rotation.x = rot;
        //   cube.rotation.y = rot;
        // });
        bgMesh.position.copy(camera.position);
        renderer.render(bgScene, camera);
        renderer.render(scene, camera);
        requestAnimationFrame(render);
      }
      requestAnimationFrame(render);
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