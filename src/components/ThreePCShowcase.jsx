"use client";
import React, { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
    OrbitControls,
    RoundedBox,
    ContactShadows,
    Environment,
    Html,
    PerspectiveCamera,
} from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";
// --- Utility for the Monitor Screen Texture ---
function useMonitorTexture({ width = 1600, height = 900 } = {}) {
    return useMemo(() => {
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");

        // 1. Background: VS Code Dark theme
        ctx.fillStyle = "#1e1e1e";
        ctx.fillRect(0, 0, width, height);

        // 2. Header/Tabs
        ctx.fillStyle = "#2d2d30";
        ctx.fillRect(0, 0, width, 40);
        ctx.fillStyle = "#cccccc";
        ctx.font = "18px Inter, monospace";
        ctx.fillText("about.jsx", 20, 28);

        // 3. Sidebar (Explorer)
        const sidebarW = Math.floor(width * 0.18);
        ctx.fillStyle = "#252526";
        ctx.fillRect(0, 40, sidebarW, height - 40);
        ctx.fillStyle = "#cccccc";
        ctx.font = "16px monospace";
        ctx.fillText("EXPLORER", 10, 70);
        const files = ["portfolio.jsx", "index.js", "about.jsx", "projects.jsx", "contact.jsx"];
        files.forEach((f, i) => {
            ctx.fillStyle = i === 2 ? "#ffffff" : "#a1a1a1";
            ctx.font = (i === 2 ? "bold " : "") + "15px monospace";
            ctx.fillText((i === 2 ? "› " : "  ") + f, 10, 100 + i * 30);
        });

        // 4. Main Editor: Line Numbers and Code Content
        const editorX = sidebarW;
        const editorW = width - editorX;
        const lnW = 40;
        const codeX = editorX + lnW + 10;
        const codeLines = [
            "import React from 'react'",
            "// A single-file component for Pappu's portfolio",
            "function HeroSection() {",
            "  return (",
            "    <div className='hero-card'>",
            "      <h1 className='text-3xl text-white'>Hi, I'm</h1>",
            "      <h2 className='text-6xl text-purple-400'>Pappu</h2>",
            "      <p className='text-lg text-gray-400'>A professional Front-end Web Developer</p>",
            "    </div>",
            "  );",
            "}",
            "function App() {",
            "  return (",
            "    <main className='portfolio-page'>",
            "      <HeroSection />",
            "    </main>",
            "  );",
            "}",
            "export default App;",
        ];

        // Line Numbers
        ctx.fillStyle = "#5c5c5c";
        ctx.font = "14px monospace";
        for (let i = 0; i < codeLines.length; i++) {
            ctx.fillText(String(i + 1), editorX + 10, 70 + i * 26);
        }

        // Code Content (using theme colors)
        codeLines.forEach((line, i) => {
            const y = 70 + i * 26;
            let color = "#d4d4d4"; // Default white/gray
            if (line.includes("import") || line.includes("from") || line.includes("export")) color = "#c586c0"; // Keywords
            if (line.includes("//")) color = "#6a9955"; // Comment
            if (line.includes("<") && line.includes(">")) color = "#86c3ff"; // JSX tags
            if (line.includes("className") || line.includes("title")) color = "#9cdcfe"; // Props
            if (line.includes("'") || line.includes('"')) color = "#ce9178"; // Strings

            ctx.fillStyle = color;
            ctx.fillText(line.trim(), codeX, y);
        });

        // 5. Hero Panel (Right side, actual UI preview)
        const heroW = Math.floor(editorW * 0.45);
        const heroX = editorX + editorW - heroW - 10;
        const heroY = 60;
        const heroH = height * 0.6;

        ctx.fillStyle = "#161b24"; // Dark background
        ctx.fillRect(heroX, heroY, heroW, heroH);

        ctx.textAlign = 'left';
        ctx.fillStyle = "#e6e6e6";
        ctx.font = "24px Inter, sans-serif";
        ctx.fillText("Front-end Developer", heroX + 25, heroY + 50);

        ctx.fillStyle = "#ffffff";
        ctx.font = "36px Inter, sans-serif";
        ctx.fillText("Hi, I'm", heroX + 25, heroY + 130);

        ctx.fillStyle = "#a78bfa"; // Purple tone for name
        ctx.font = "56px Inter, sans-serif";
        ctx.fillText("Pappu", heroX + 25, heroY + 200);

        ctx.fillStyle = "#a1a1a1";
        ctx.font = "20px Inter, sans-serif";
        ctx.fillText("A professional Front-end Web", heroX + 25, heroY + 240);
        ctx.fillText("Developer", heroX + 25, heroY + 270);

        // 6. Footer (Status Bar)
        ctx.fillStyle = "#007acc";
        ctx.fillRect(0, height - 30, width, 30);
        ctx.fillStyle = "#ffffff";
        ctx.font = "14px Inter, monospace";
        ctx.fillText("  > Terminal   Problems 0   Warnings 0", 10, height - 10);
        ctx.textAlign = 'right';
        ctx.fillText("Ln 8, Col 12  JavaScript/JSX  4 Spaces  LF  UTF-8", width - 10, height - 10);
        ctx.textAlign = 'left';

        const texture = new THREE.CanvasTexture(canvas);
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.needsUpdate = true;
        return texture;
    }, []);
}

// --- 3D Components ---

function Monitor() {
    const tex = useMonitorTexture();
    return (
        <group position={[0, -0.1, 0.7]}>
            {/* Screen Bezel - More reflective, slightly glowing */}
            <RoundedBox args={[3.6, 2.1, 0.15]} radius={0.03}>
                <meshStandardMaterial
                    color="#0b0b0d"
                    metalness={0.9}
                    roughness={0.2}
                    emissive="#151515" // Subtle edge glow
                    emissiveIntensity={0.2}
                />
            </RoundedBox>

            {/* Screen Surface */}
            <mesh position={[0, 0, 0.08]}>
                <planeGeometry args={[3.2, 1.8]} />
                <meshPhysicalMaterial map={tex} toneMapped={false} />
            </mesh>

            {/* Stand Arm */}
            <RoundedBox args={[0.08, 0.8, 0.08]} radius={0.01} position={[0, -1.0, 0.0]}>
                <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.3} />
            </RoundedBox>

            {/* Stand Base */}
            <RoundedBox args={[0.8, 0.08, 0.8]} radius={0.02} position={[0, -1.45, 0.0]}>
                <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.3} />
            </RoundedBox>

            {/* Logo (GIGABYTE) */}
            <Html position={[0, -1.35, 0.08]} distanceFactor={3.5}>
                <div className="text-[6px] font-bold text-gray-400 tracking-wider">GIGABYTE</div>
            </Html>
        </group>
    );
}

// Small desk speaker component
function DeskSpeaker({ position = [0, 0, 0], hueOffset = 0 }) {
    const bodyMaterialRef = useRef();
    const ringMaterialRef = useRef();

    useFrame(({ clock }) => {
        const t = clock.getElapsedTime() * 0.5;
        // RGB color cycling for the entire speaker body
        const hue = ((t * 60 + hueOffset) % 360) / 360;
        const color = new THREE.Color().setHSL(hue, 0.9, 0.5);

        if (bodyMaterialRef.current && ringMaterialRef.current) {
            // Access material refs directly
            bodyMaterialRef.current.emissive.copy(color); // Body glow
            bodyMaterialRef.current.color.copy(color).multiplyScalar(0.1); // Base color
            ringMaterialRef.current.emissive.copy(color); // Ring glow
        }
    });

    return (
        <group position={position}>
            {/* Speaker Body (Cylinder) with full RGB glow */}
            <mesh position={[0, 0, 0]}>
                <cylinderGeometry args={[0.15, 0.15, 0.5, 32]} />
                {/* Attach body material ref */}
                <meshStandardMaterial ref={bodyMaterialRef} color="#0b0d10" metalness={0.7} roughness={0.4} emissive="#00ff00" emissiveIntensity={1.5} />
            </mesh>
            {/* Speaker Cone (Inner Circle) */}
            <mesh position={[0, 0.25, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <circleGeometry args={[0.1, 32]} />
                <meshStandardMaterial color="#000000" metalness={0.8} roughness={0.3} />
            </mesh>
            {/* RGB Ring Light - more defined */}
            <mesh position={[0, 0.25, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[0.14, 0.01, 16, 32]} />
                {/* Attach ring material ref */}
                <meshStandardMaterial ref={ringMaterialRef} emissive="#00ff00" emissiveIntensity={6} />
            </mesh>
        </group>
    );
}

// Large floor speaker component (replaces the PC Tower)
function TallSpeaker({ position = [0, 0, 0], hueOffset = 0 }) {
    const ringMaterialRef = useRef();
    const height = 1.6;

    useFrame(({ clock }) => {
        const t = clock.getElapsedTime() * 0.5;
        const hue = ((t * 60 + hueOffset) % 360) / 360;
        const color = new THREE.Color().setHSL(hue, 0.9, 0.5);

        if (ringMaterialRef.current) {
            // Use the same ref for the rings to synchronize the color pulse
            ringMaterialRef.current.emissive.copy(color);
        }
    });

    return (
        <group position={position}>
            {/* Speaker Cabinet (Box geometry) */}
            {/* Positioned so its base is at Y=0 (relative to the floor/stand) */}
            <RoundedBox args={[0.4, height, 0.4]} radius={0.02} position={[0, height / 2, 0]}>
                <meshStandardMaterial color="#0b0d10" metalness={0.8} roughness={0.3} />
            </RoundedBox>

            {/* Woofer (Bottom) - Position relative to the cabinet base (Y=0) */}
            <mesh position={[0, 0.3, 0.205]} rotation={[0, 0, 0]}>
                <circleGeometry args={[0.15, 32]} />
                <meshStandardMaterial color="#000000" metalness={0.8} roughness={0.3} />
            </mesh>
            {/* Woofer RGB Ring (Controlled by frame loop) */}
            <mesh position={[0, 0.3, 0.205]} rotation={[0, 0, 0]}>
                <torusGeometry args={[0.17, 0.01, 16, 32]} />
                <meshStandardMaterial ref={ringMaterialRef} emissive="#00ff00" emissiveIntensity={6} />
            </mesh>

            {/* Midrange (Middle) */}
            <mesh position={[0, 0.8, 0.205]} rotation={[0, 0, 0]}>
                <circleGeometry args={[0.1, 32]} />
                <meshStandardMaterial color="#000000" metalness={0.8} roughness={0.3} />
            </mesh>
            {/* Midrange RGB Ring - Uses a fixed color for contrast */}
            <mesh position={[0, 0.8, 0.205]} rotation={[0, 0, 0]}>
                <torusGeometry args={[0.12, 0.01, 16, 32]} />
                <meshStandardMaterial emissive="#ff00ff" emissiveIntensity={5} />
            </mesh>


            {/* Tweeter (Top) */}
            <mesh position={[0, 1.3, 0.205]} rotation={[0, 0, 0]}>
                <circleGeometry args={[0.05, 32]} />
                <meshStandardMaterial color="#000000" metalness={0.8} roughness={0.3} />
            </mesh>

            {/* Speaker base (Floor Stand) */}
            <RoundedBox args={[0.5, 0.05, 0.5]} radius={0.01} position={[0, -0.025, 0]}>
                <meshStandardMaterial color="#222222" metalness={0.9} roughness={0.2} />
            </RoundedBox>
        </group>
    );
}

// Group of two floor speakers to fill the PC Tower space
function FloorSpeakers() {
    // Positioning the group on the floor (Y=-1.6) at the PC tower's original X/Z location
    const floorY = -1.6;

    return (
        <group position={[2.6, floorY, 0.9]}>
            {/* Speaker 1 */}
            <TallSpeaker position={[-0.3, 0, 0]} hueOffset={0} />
            {/* Speaker 2 */}
            <TallSpeaker position={[0.3, 0, 0]} hueOffset={180} />
        </group>
    );
}


function Key({ position, hueOffset = 0, size = [0.095, 0.02, 0.07] }) {
    const materialRef = useRef(); // Reference the material directly

    useFrame(({ clock }) => {
        const t = clock.getElapsedTime() * 0.8;
        // More complex color wave and intensity pulse
        const wave = Math.sin(t * 2 + position[0] * 8 + position[1] * 10);
        const hue = ((t * 60 + hueOffset + wave * 20) % 360) / 360;
        const saturation = 0.9;
        const lightness = 0.5 + wave * 0.1; // Pulsing effect
        const emissiveColor = new THREE.Color().setHSL(hue, saturation, lightness);

        if (materialRef.current) {
            // Access the material ref's emissive color property
            materialRef.current.emissive.copy(emissiveColor);
            materialRef.current.emissiveIntensity = 4 + Math.sin(t * 5 + position[0] * 10) * 1.5; // More intense pulse
        }
    });

    return (
        <RoundedBox args={size} radius={0.005} position={position}>
            {/* Attach the ref directly to the material */}
            <meshStandardMaterial ref={materialRef} color="#0b0b0b" emissive="#ff0000" emissiveIntensity={3} roughness={0.5} />
        </RoundedBox>
    );
}

function Keyboard() {
    const keys = [];
    const rows = 5;
    const cols = 15;
    const keySpacing = 0.11;
    const startX = -1.15;
    const startY = -0.02;
    const startZ = 0.04;

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            // Assign a unique hue offset for each key to create a rainbow effect
            keys.push(
                <Key
                    key={`${r}-${c}`}
                    position={[
                        startX + c * keySpacing,
                        startY - r * 0.065,
                        startZ
                    ]}
                    hueOffset={(r * cols + c) * 10} // Staggered hue for wave effect
                />
            );
        }
    }

    return (
        <group position={[-0.8, -1.35, 1.0]} rotation={[-0.06, 0, 0]}>
            {/* Keyboard Base - More sleek and reflective */}
            <mesh position={[0, -0.02, 0]}>
                <RoundedBox args={[cols * keySpacing + 0.1, 0.08, rows * 0.065 + 0.15]} radius={0.02}>
                    <meshStandardMaterial color="#111111" metalness={0.9} roughness={0.2} />
                </RoundedBox>
            </mesh>
            {keys}
        </group>
    );
}

function MouseAndPad() {
    const padMaterialRef = useRef();
    const scrollMaterialRef = useRef();

    useFrame(({ clock }) => {
        const t = clock.getElapsedTime() * 0.8;
        // Dynamic lightning pattern color
        const hue = (t * 40 % 360) / 360;
        const color = new THREE.Color().setHSL(hue, 0.8, 0.6);
        if (padMaterialRef.current && scrollMaterialRef.current) {
            padMaterialRef.current.emissive.copy(color);
            scrollMaterialRef.current.emissive.copy(color);
            scrollMaterialRef.current.color.copy(color);
        }
    });

    return (
        <group position={[1.3, -1.42, 1.05]}>
            {/* Mouse Pad (Dark base with glowing pattern) */}
            <RoundedBox args={[1.2, 0.01, 0.9]} radius={0.05} position={[0, 0, 0]}>
                <meshStandardMaterial
                    ref={padMaterialRef}
                    color="#0a0a0a"
                    roughness={0.7}
                    emissive="#8b00ff" // Initial lightning color
                    emissiveIntensity={1.5}
                />
            </RoundedBox>

            {/* Mouse Body - More glow */}
            <RoundedBox args={[0.2, 0.07, 0.35]} radius={0.02} position={[0, 0.04, 0.1]}>
                <meshStandardMaterial color="#0b0b0b" metalness={0.9} roughness={0.1} emissive="#333333" emissiveIntensity={0.5} />
            </RoundedBox>

            {/* Mouse Scroll Wheel (Dynamic RGB) */}
            <mesh position={[0, 0.08, 0.2]}>
                <cylinderGeometry args={[0.01, 0.01, 0.03, 16]} />
                <meshStandardMaterial ref={scrollMaterialRef} emissive="#ff0000" emissiveIntensity={8} color="#ff0000" /> {/* Intense glow */}
            </mesh>
        </group>
    );
}


/* -----------------------
  Scene container inside Canvas
------------------------*/
function SceneContent() {
    const groupRef = useRef();
    // Continuous 360-degree rotation for the entire setup
    useFrame(({ clock }) => {
        if (groupRef.current) {
            // Continuous rotation at a constant speed (one full rotation every 20 seconds)
            groupRef.current.rotation.y = clock.getElapsedTime() * 0.05; // 2π radians / 20 seconds ≈ 0.314 rad/s
        }
    });

    return (
        <group ref={groupRef} position={[0, -0.6, 0]}>
            {/* Desk Surface (Darker, more reflective) */}
            <mesh position={[0, -1.6, 0]} receiveShadow>
                <boxGeometry args={[8, 0.12, 3.8]} />
                <meshStandardMaterial color="#080808" metalness={0.9} roughness={0.2} /> {/* Darker, more reflective desk */}
            </mesh>
            <Monitor />
            <FloorSpeakers /> {/* Replaced PCTower with two tall Floor Speakers */}
            <Keyboard />
            <DeskSpeaker position={[-1.7, -1.35, 0.7]} hueOffset={0} /> {/* Existing desk speaker 1 */}
            <DeskSpeaker position={[1.7, -1.35, 0.7]} hueOffset={180} /> {/* Existing desk speaker 2 */}
            <MouseAndPad />
            <ContactShadows position={[0, -1.75, 0]} opacity={0.8} scale={10} blur={2} far={10} />
        </group>
    );
}

// Component to set the scene background color
function Scene() {
    const { scene } = useThree();
    // Set a very dark gray background instead of pure black
    scene.background = new THREE.Color('#ffff');
    return null;
}

/* -----------------------
  Main exported component
------------------------*/
export default function ThreePCShowcase() {
    return (
        <span className="w-full h-100 flex justify-center">
            <span className="w-[30%] rounded-lg border border-amber-200 shadow-emerald-700 overflow-hidden flex items-center justify-center text-center bg-white relative">
                <Canvas shadows camera={{ position: [4, 2.2, 6], fov: 35 }}>
                    <PerspectiveCamera makeDefault position={[4, 2.2, 6]} />
                    <Scene /> {/* Component to set the background color */}
                    {/* Lighting adjusted for a more dramatic, moody scene with colorful accents */}
                    {/* Increased ambient light to brighten the whole scene, mimicking the "stage" feel */}
                    <ambientLight intensity={0.8} color="#555555" />
                    <directionalLight position={[6, 8, 6]} intensity={0.8} castShadow color="#ffccaa" /> {/* Warm highlight */}
                    <directionalLight position={[-4, 2, -6]} intensity={0.4} color="#aaccff" /> {/* Cool fill light, slightly brighter */}

                    {/* Accent lights to enhance the RGB glow and reflections - more saturated, strategic placement */}
                    <pointLight position={[-2, 1, 3]} intensity={15} color="#ff00ff" distance={5} decay={2} /> {/* Magenta */}
                    <pointLight position={[2, 1, 3]} intensity={15} color="#00ffff" distance={5} decay={2} /> {/* Cyan */}
                    <pointLight position={[0, 2, -1]} intensity={8} color="#ffff00" distance={3} decay={2} /> {/* Yellow for front */}


                    <Suspense fallback={<Html center>Loading...</Html>}>
                        <SceneContent />
                        {/* Use a simple environment preset that provides global, even illumination/reflection */}
                        <Environment preset="night" />
                    </Suspense>
                    <OrbitControls 
                        target={[0, -0.6, 1]} 
                        maxPolarAngle={Math.PI / 2.1} 
                        enablePan={false}
                        enableRotate={true} // Allow manual rotation
                        autoRotate={true} // Enable auto-rotation
                        autoRotateSpeed={2} // Speed of auto-rotation
                    />
                </Canvas>
                <div className="absolute bottom-3 left-0 right-0 text-center text-gray-400 text-sm bg-white p-1">
                    click & drag to rotate • scroll to zoom • auto-rotating
                </div>
            </span>
        </span>
    );
}