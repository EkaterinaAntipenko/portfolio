import styled, { keyframes } from 'styled-components';

const orbit = keyframes`
  from {
    transform: rotate(0deg) translateX(var(--radius)) rotate(0deg);
  }
  to {
    transform: rotate(360deg) translateX(var(--radius)) rotate(-360deg);
  }
`;

export const OrbitContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 1700px;
  aspect-ratio: 1 / 1;
  margin: 0 auto;
`;

export const OrbitRing = styled.div<{ $radius: number }>`
  position: absolute;
  top: 50%;
  left: 50%;
  width: ${({ $radius }) => $radius * 2}px;
  height: ${({ $radius }) => $radius * 2}px;
  margin: ${({ $radius }) => -$radius}px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.06);
  pointer-events: none;
`;

export const CenterImage = styled.img<{ $size: number }>`
  position: absolute;
  top: 50%;
  left: 50%;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  object-fit: cover;
  z-index: 2;
`;

export const OrbitWrapper = styled.div<{ $size: number }>`
  position: absolute;
  top: 50%;
  left: 50%;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  margin: ${({ $size }) => -$size / 2}px;
  animation: ${orbit} var(--duration) linear infinite;
  animation-delay: var(--delay);
  z-index: 1;
`;

export const OrbitImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
`;
