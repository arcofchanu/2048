import React, { useRef, useEffect } from 'react';

declare var BABYLON: any;

interface InteractiveStartObjectProps {
  onStart: () => void;
}

const InteractiveStartObject: React.FC<InteractiveStartObjectProps> = ({ onStart }) => {
  const reactCanvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!reactCanvas.current || typeof BABYLON === 'undefined') {
      return;
    }

    const canvas = reactCanvas.current;
    const engine = new BABYLON.Engine(canvas, true, {
      preserveDrawingBuffer: true,
      stencil: true,
    });
    
    const scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color4(0, 0, 0, 0); // Transparent background

    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 5, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);
    camera.inputs.clear();

    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0), scene);
    light.intensity = 0.5;

    // --- Morphing Geode ---

    // 1. Create the base icosphere
    const geode = BABYLON.MeshBuilder.CreateIcoSphere("geode", { radius: 1.5, subdivisions: 4 }, scene);
    
    // 2. Setup Material
    const geodeMaterial = new BABYLON.StandardMaterial("geodeMat", scene);
    geodeMaterial.emissiveColor = new BABYLON.Color3(0.65, 0.33, 0.93); // Purple: #a855f7
    geodeMaterial.wireframe = true;
    geodeMaterial.alpha = 0.8;
    geode.material = geodeMaterial;

    // 3. Setup Morph Targets for the animation
    const manager = new BABYLON.MorphTargetManager();
    geode.morphTargetManager = manager;

    const baseTarget = BABYLON.MorphTarget.FromMesh(geode, "base", 0.0);
    const spikeTarget = BABYLON.MorphTarget.FromMesh(geode, "spike", 0.0);
    manager.addTarget(spikeTarget);

    // Create the "spiky" vertex data for the morph target
    const basePositions = baseTarget.getPositions();
    const spikePositions = new Float32Array(basePositions.length);
    for (let i = 0; i < basePositions.length; i += 3) {
        const p = new BABYLON.Vector3(basePositions[i], basePositions[i+1], basePositions[i+2]);
        const normal = p.clone().normalize();
        const spikeAmount = 0.2 + Math.random() * 0.2;
        const spikedP = p.add(normal.scale(spikeAmount));

        spikePositions[i] = spikedP.x;
        spikePositions[i+1] = spikedP.y;
        spikePositions[i+2] = spikedP.z;
    }
    spikeTarget.setPositions(spikePositions);

    // 4. Glow Layer
    const gl = new BABYLON.GlowLayer("glow", scene);
    gl.intensity = 1.0;
    
    let rotationSpeed = 0.005;

    scene.registerBeforeRender(() => {
        geode.rotation.y += rotationSpeed;
        geode.rotation.x += rotationSpeed * 0.5;
    });

    // 5. Interactivity
    geode.actionManager = new BABYLON.ActionManager(scene);
    
    const morphIn = () => {
        canvas.style.cursor = "pointer";
        rotationSpeed = 0.0021;
        gl.intensity = 2.0;
        BABYLON.Animation.CreateAndStartAnimation('morphIn', spikeTarget, 'influence', 30, 15, 0, 1, 0);
    };

    const morphOut = () => {
        canvas.style.cursor = "default";
        rotationSpeed = 0.005;
        gl.intensity = 1.0;
        BABYLON.Animation.CreateAndStartAnimation('morphOut', spikeTarget, 'influence', 30, 15, 1, 0, 0);
    };

    geode.actionManager.registerAction(
      new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger, morphIn)
    );

    geode.actionManager.registerAction(
      new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger, morphOut)
    );
    
    geode.actionManager.registerAction(
      new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, onStart)
    );

    engine.runRenderLoop(() => {
      scene.render();
    });

    const handleResize = () => {
      engine.resize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      engine.dispose();
    };
  }, [onStart]);

  return (
    <div 
        className="flex flex-col items-center animate-fade-in-up" 
        style={{ animationDelay: '150ms', opacity: 0 }}
        aria-label="Start Game"
        role="button"
        tabIndex={0}
        onClick={onStart}
        onKeyPress={(e) => e.key === 'Enter' && onStart()}
    >
      <canvas ref={reactCanvas} style={{ width: '250px', height: '250px', outline: 'none' }} />
      <p className="text-neutral-400 mt-4 text-lg">Click the ORB to begin</p>
    </div>
  );
};

export default InteractiveStartObject;
