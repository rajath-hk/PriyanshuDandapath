import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
    const [position, setPosition] = useState({ x: -100, y: -100 });
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    useEffect(() => {
        // Detect touch devices
        if (window.matchMedia('(pointer: coarse)').matches) {
            setIsTouchDevice(true);
            return;
        }

        const onMouseMove = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
            if (!isVisible) setIsVisible(true);

            // Check if hovering interactive element
            const target = e.target;
            const isInteractive = target.closest('a, button, input, [role="button"], .interactive-cursor');
            setIsHovering(!!isInteractive);
        };

        const onMouseLeave = () => setIsVisible(false);
        const onMouseEnter = () => setIsVisible(true);

        window.addEventListener('mousemove', onMouseMove);
        document.body.addEventListener('mouseleave', onMouseLeave);
        document.body.addEventListener('mouseenter', onMouseEnter);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            document.body.removeEventListener('mouseleave', onMouseLeave);
            document.body.removeEventListener('mouseenter', onMouseEnter);
        };
    }, [isVisible]);

    if (isTouchDevice || !isVisible) return null;

    return (
        <div 
            className="fixed pointer-events-none z-50 transition-transform duration-75 ease-out"
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
                transform: 'translate(-50%, -50%)',
            }}
            aria-hidden="true"
        >
            {/* Outer ring */}
            <div 
                className={`rounded-full border border-[#6EA8FF]/40 transition-all duration-200 ease-out flex items-center justify-center ${
                    isHovering 
                        ? 'w-10 h-10 bg-[#8B7CFF]/15 scale-125 border-[#6EA8FF]/90 shadow-[0_0_15px_rgba(110,168,255,0.4)]' 
                        : 'w-7 h-7 scale-100 bg-transparent'
                }`}
            >
                {/* Center dot */}
                <div 
                    className={`rounded-full bg-white transition-all duration-150 ${
                        isHovering ? 'w-1 h-1 opacity-0' : 'w-1.5 h-1.5 opacity-90'
                    }`}
                />
            </div>
        </div>
    );
}
