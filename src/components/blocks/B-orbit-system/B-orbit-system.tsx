import { useMemo } from 'react';
import { OrbitContainer, OrbitRing, CenterImage, OrbitWrapper, OrbitButton, OrbitImage, OrbitIndex } from './B-orbit-system.styles';
import type { OrbitSystemProps } from './B-orbit-system.types';

export function OrbitSystem({ centerImage, items, onSelect }: OrbitSystemProps) {
    const rings = useMemo(
        () => Array.from(new Set(items.map((item) => item.radius))),
        [items]
    );

    return (
        <OrbitContainer>
            {rings.map((radius) => (
                <OrbitRing key={radius} $radius={radius} />
            ))}

            <CenterImage
                src={centerImage.src}
                alt={centerImage.alt}
                $size={centerImage.size ?? 140}
            />

            {items.map((item) => (
                <OrbitWrapper
                    key={item.id}
                    $size={item.size}
                    style={{
                        '--radius': `${item.radius}px`,
                        '--duration': `${item.duration}s`,
                        '--delay': `${(-(item.startAngle ?? 0) / 360) * item.duration}s`,
                    } as React.CSSProperties}
                >
                    <OrbitButton
                        type="button"
                        data-id={item.id}
                        data-index={item.index}
                        aria-label={item.alt}
                        onClick={() => onSelect?.(item.id, item.index)}
                    >
                        <OrbitImage src={item.src} alt={item.alt} />
                        <OrbitIndex>{item.index}</OrbitIndex>
                    </OrbitButton>
                </OrbitWrapper>
            ))}
        </OrbitContainer>
    );
}
