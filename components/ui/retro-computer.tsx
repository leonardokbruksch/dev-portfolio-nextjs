'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { cn } from '@/lib/utils';

export function RotatingComputer({ className }: { className?: string }) {
    return (
        <div className={cn('relative inline-block', className)}>
            <Canvas className="h-full w-full" dpr={[1, 2]} camera={{ position: [0, 0.2, 4.2], fov: 35 }}>
                <ambientLight intensity={0.9} />
                <directionalLight position={[2, 2, 2]} intensity={1} />
                <group rotation={[0.15, Math.PI, 0]}>
                    <ComputerModel />
                </group>
                <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={3.0} />
            </Canvas>
        </div>
    );
}

function ComputerModel() {
    const { scene } = useGLTF('/models/retro_pc.glb');
    return <primitive object={scene} scale={3.2} />;
}

useGLTF.preload('/models/retro_pc.glb');
