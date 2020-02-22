import React, { useRef, useEffect } from "react";
import {
  WebGLRenderer,
  PerspectiveCamera,
  Scene,
  BoxBufferGeometry,
  MeshNormalMaterial,
  Mesh,
  Vector3
} from "three";

const Canvas = () => {
  const canvasRef = useRef();

  useEffect(() => {
    if (canvasRef.current) {
      const node = canvasRef.current;

      const boxGeo = new BoxBufferGeometry(1, 1, 1);
      const boxMat = new MeshNormalMaterial();
      const boxMesh = new Mesh(boxGeo, boxMat);
      const rotationSpeed = 0.01;

      const renderer = new WebGLRenderer({ antialias: true, canvas: node });

      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0xcccccc);
      renderer.setPixelRatio(window.devicePixelRatio);

      const camera = new PerspectiveCamera(
        35,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );

      const scene = new Scene();
      scene.add(boxMesh);
      camera.lookAt(boxMesh.position);
      camera.position.z = 10;

      window.addEventListener("resize", () => {
        const { innerHeight, innerWidth } = window;
        camera.aspect = innerWidth / innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(innerWidth, innerHeight);
      });

      window.addEventListener("click", e => {
        const PosX = (event.clientX / window.innerWidth) * 2 - 1;
        const PosY = -(event.clientY / window.innerHeight) * 2 + 1;

        const vector = new Vector3(PosX, PosY, 0.5);
        vector.unproject(camera);
        const dir = vector.sub(camera.position).normalize();
        const distance = -camera.position.z / dir.z;
        const pos = camera.position.clone().add(dir.multiplyScalar(distance));

        boxMesh.position.copy(pos);
      });

      renderer.setAnimationLoop(() => {
        boxMesh.rotation.set(
          0,
          boxMesh.rotation.y + rotationSpeed,
          boxMesh.rotation.z + rotationSpeed
        );
        renderer.render(scene, camera);
      });
    }
  }, []);

  return (
    <div>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default Canvas;
