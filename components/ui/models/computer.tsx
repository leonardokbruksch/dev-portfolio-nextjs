'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { cn } from '@/lib/utils';

export function RotatingComputer({ className }: { className?: string }) {
    return (
        <div className={cn('relative', className)}>
            <Canvas className="h-full w-full" camera={{ position: [0, 0, 5], fov: 45 }}>
                <ambientLight intensity={0.8} />
                <directionalLight position={[2, 2, 2]} intensity={0.9} />
                <group rotation={[0.2, 0.6, 0]}>
                    <ComputerModel />
                </group>
                <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.6} />
            </Canvas>
        </div>
    );
}

function ComputerModel() {
    const { scene } = useGLTF('/models/retro_pc.glb');
    return <primitive object={scene} scale={2.2} />;
}

useGLTF.preload('/models/retro_pc.glb');
