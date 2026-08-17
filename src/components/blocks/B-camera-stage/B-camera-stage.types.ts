import type { ReactNode } from 'react';

export interface CameraStageProps {
    children: ReactNode;
    edgeZone?: number;
    maxSpeed?: number;
    maxOffset?: number;
}
