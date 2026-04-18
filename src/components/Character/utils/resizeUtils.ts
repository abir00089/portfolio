import * as THREE from "three";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap"; // ✅ added (important for proper GSAP usage)
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";

// ✅ ensure plugin is registered
gsap.registerPlugin(ScrollTrigger);

export default function handleResize(
  renderer: THREE.WebGLRenderer,
  camera: THREE.PerspectiveCamera,
  canvasDiv: React.RefObject<HTMLDivElement>,
  character: THREE.Object3D
) {
  if (!canvasDiv.current) return;

  let canvas3d = canvasDiv.current.getBoundingClientRect();
  const width = canvas3d.width;
  const height = canvas3d.height;

  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  const workTrigger = ScrollTrigger.getById("work");

  // ✅ keep your logic, just slightly safer
  ScrollTrigger.getAll().forEach((trigger) => {
    if (trigger !== workTrigger) {
      trigger.kill(true); // force kill properly
    }
  });

  // ✅ refresh after killing triggers (important)
  ScrollTrigger.refresh();

  // your original logic (unchanged)
  setCharTimeline(character, camera);
  setAllTimeline();
}