import { useEffect, useRef } from 'react';
import { Viewport, World } from './B-camera-stage.styles';
import type { CameraStageProps } from './B-camera-stage.types';

export function CameraStage({
    children,
    edgeZone = 140,
    maxSpeed = 7,
    maxOffset = 380,
}: CameraStageProps) {
    const viewportRef = useRef<HTMLDivElement>(null);
    const worldRef = useRef<HTMLDivElement>(null);
    const mouse = useRef({ x: 0, y: 0, inside: false });
    const offset = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const viewport = viewportRef.current;
        if (!viewport) return;

        function handleMouseMove(event: MouseEvent) {
            const rect = viewport!.getBoundingClientRect();
            mouse.current.x = event.clientX - rect.left;
            mouse.current.y = event.clientY - rect.top;
            mouse.current.inside = true;
        }

        function handleMouseLeave() {
            mouse.current.inside = false;
        }

        viewport.addEventListener('mousemove', handleMouseMove);
        viewport.addEventListener('mouseleave', handleMouseLeave);

        let frameId: number;

        function tick() {
            if (mouse.current.inside && viewport) {
                const { width, height } = viewport.getBoundingClientRect();
                const { x, y } = mouse.current;

                let velocityX = 0;
                let velocityY = 0;

                if (x < edgeZone) {
                    velocityX = -maxSpeed * (1 - x / edgeZone);
                } else if (x > width - edgeZone) {
                    velocityX = maxSpeed * (1 - (width - x) / edgeZone);
                }

                if (y < edgeZone) {
                    velocityY = -maxSpeed * (1 - y / edgeZone);
                } else if (y > height - edgeZone) {
                    velocityY = maxSpeed * (1 - (height - y) / edgeZone);
                }

                offset.current.x = Math.max(-maxOffset, Math.min(maxOffset, offset.current.x + velocityX));
                offset.current.y = Math.max(-maxOffset, Math.min(maxOffset, offset.current.y + velocityY));

                if (worldRef.current) {
                    worldRef.current.style.transform = `translate(${-offset.current.x}px, ${-offset.current.y}px)`;
                }
            }

            frameId = requestAnimationFrame(tick);
        }

        frameId = requestAnimationFrame(tick);

        return () => {
            viewport.removeEventListener('mousemove', handleMouseMove);
            viewport.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(frameId);
        };
    }, [edgeZone, maxSpeed, maxOffset]);

    return (
        <Viewport ref={viewportRef}>
            <World ref={worldRef}>{children}</World>
        </Viewport>
    );
}
