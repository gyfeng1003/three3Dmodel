<template>
<div class="robot-box">
  <canvas id="c"></canvas>
</div>
</template>
<script>
//全局变量
const w = window.innerWidth;
const h = window.innerHeight;
const r = w / h;
const s = 300; //视野范围控制系数

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
export default {
  name: 'v-robot',
  data() {
    return {
      renderer: null,
      scene: null,
      camera: null
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init(){
      const canvas = document.querySelector('#c');
      const renderer = new THREE.WebGLRenderer({canvas});
      renderer.autoClearColor = false;

      const fov = 75;
      const aspect = 2;  // the canvas default
      const near = 0.1;
      const far = 100;
      const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
      camera.position.z = 3;

      const controls = new OrbitControls(camera, canvas);
      controls.target.set(0, 0, 0);
      controls.update();

      const scene = new THREE.Scene();

      {
        const color = 0xFFFFFF;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(-1, 2, 4);
        scene.add(light);
      }

      const boxWidth = 1;
      const boxHeight = 1;
      const boxDepth = 1;
      const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

      function makeInstance(geometry, color, x) {
        const material = new THREE.MeshPhongMaterial({color});

        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        cube.position.x = x;

        return cube;
      }

      const cubes = [
        makeInstance(geometry, 0x44aa88,  0),
        makeInstance(geometry, 0x8844aa, -2),
        makeInstance(geometry, 0xaa8844,  2),
      ];

      const bgScene = new THREE.Scene();
      let bgMesh;
      {
        const loader = new THREE.TextureLoader();
        const texture = loader.load(
          'https://threejsfundamentals.org/threejs/resources/images/equirectangularmaps/tears_of_steel_bridge_2k.jpg',
        );
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
body {
  margin: 0;
}
#c {
  width: 100vw;
  height: 100vh;
  display: block;
}
</style>