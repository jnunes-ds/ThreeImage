import React from 'react';
import {GLView, ExpoWebGLRenderingContext} from 'expo-gl';
import {Renderer} from 'expo-three';
import {
  Scene,
  PerspectiveCamera,
  Color,
  AmbientLight,
  DirectionalLight,
  MeshStandardMaterial,
  Mesh,
  BoxGeometry,
} from 'three';
import {View} from 'react-native';

interface CanvasProps {
  width: number;
  height: number;
}

interface GLProps extends ExpoWebGLRenderingContext {
  canvas: CanvasProps;
  drawingBufferWidth: number;
  drawingBufferHeight: number;
}

export default function ThreeImage() {
  const width = 400;
  const height = 400;
  async function onContextCreate(gl: GLProps) {
    //THREE.js code

    const scene = new Scene();

    const camera = new PerspectiveCamera(
      75,
      gl.drawingBufferWidth / gl.drawingBufferHeight,
      0.1,
      1000,
    );
    const ambientLightColor = new Color(0x454545);
    const ambientLight = new AmbientLight(ambientLightColor);
    scene.add(ambientLight);

    const directionalLightColor = new Color(0xffffff);
    const directionalLight = new DirectionalLight(directionalLightColor, 1);
    scene.add(directionalLight);

    gl.canvas = {width: gl.drawingBufferWidth, height: gl.drawingBufferHeight};
    camera.position.z = 2;

    const renderer = new Renderer({gl});
    renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);

    const cubeGeometry = new BoxGeometry(1, 1, 1);
    const cubeMaterial = new MeshStandardMaterial({
      color: '#055555',
    });
    const cube = new Mesh(cubeGeometry, cubeMaterial);
    scene.add(cube);

    const update = () => {
      if (cube.rotation.x <= 12.555) {
        cube.rotation.x += 0.01;
      } else {
        cube.rotation.x = 0;
      }

      if (cube.rotation.y <= 12.555) {
        cube.rotation.y += 0.01;
      } else {
        cube.rotation.y = 0;
      }
    };

    const render = () => {
      requestAnimationFrame(render);
      update();
      renderer.render(scene, camera);
      gl.endFrameEXP();
    };

    render();
  }

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <GLView
        style={{
          width,
          height,
          justifyContent: 'center',
        }}
        onContextCreate={onContextCreate}
      />
    </View>
  );
}
