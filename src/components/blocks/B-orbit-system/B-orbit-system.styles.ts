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

export const OrbitButton = styled.button`
  display: block;
  width: 100%;
  height: 100%;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.08);
  }

  &:focus-visible {
    outline: 2px solid #ffffff;
    outline-offset: 4px;
  }
`;

export const OrbitImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
`;

export const OrbitIndex = styled.span`
  position: absolute;
  top: -8px;
  left: -8px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 22px;
  height: 22px;
  padding: 0 6px;
  font-size: 0.75rem;
  color: #111111;
  background: #ffffff;
  border-radius: 999px;
  pointer-events: none;
`;
