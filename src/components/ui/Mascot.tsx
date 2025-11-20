import { useEffect, useState } from "react";


export function Mascot({ size = 100 }: { size?: number }) {
    const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;

            // Calculate offset from center, clamped to a small range for the pupils
            const x = Math.min(Math.max((clientX - centerX) / 30, -10), 10);
            const y = Math.min(Math.max((clientY - centerY) / 30, -10), 10);

            setEyePosition({ x, y });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <div style={{ width: size, height: size }} className="relative">
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
                {/* Body */}
                <circle cx="50" cy="50" r="45" fill="#FBBF24" stroke="#1F2937" strokeWidth="4" />

                {/* Eyes Container */}
                <g transform={`translate(${eyePosition.x}, ${eyePosition.y})`}>
                    {/* Left Eye */}
                    <circle cx="35" cy="45" r="12" fill="white" stroke="#1F2937" strokeWidth="3" />
                    <circle cx="35" cy="45" r="5" fill="#1F2937" />

                    {/* Right Eye */}
                    <circle cx="65" cy="45" r="12" fill="white" stroke="#1F2937" strokeWidth="3" />
                    <circle cx="65" cy="45" r="5" fill="#1F2937" />
                </g>

                {/* Mouth */}
                <path d="M 35 70 Q 50 80 65 70" fill="none" stroke="#1F2937" strokeWidth="4" strokeLinecap="round" />
            </svg>
        </div>
    );
}
