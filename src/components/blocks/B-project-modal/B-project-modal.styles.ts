import styled from 'styled-components';

export const AOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  background: rgba(8, 8, 10, 0.7);
  backdrop-filter: blur(4px);
`;

export const AModal = styled.div`
  position: relative;
  width: 100%;
  max-width: 440px;
  padding: 2.5rem;
  border-radius: 20px;
  background: #1a1a1e;
  border: 1px solid #2c2c32;
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
  }
`;

export const ACloseButton = styled.button`
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: #8a8a92;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;

  &:hover {
    background: #26262c;
    color: #f2f2f5;
  }
`;

export const AForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1.75rem;
`;

export const AField = styled.label`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const ALabel = styled.span`
  font-size: 0.8125rem;
  color: #9a9aa2;
`;

export const AInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  color: #f2f2f5;
  background: #121215;
  border: 1px solid #2c2c32;
  border-radius: 10px;
  transition: border-color 0.2s;

  &::placeholder {
    color: #56565e;
  }

  &:focus {
    outline: none;
    border-color: #f2f2f5;
  }
`;

export const ASubmit = styled.button`
  margin-top: 0.5rem;
  padding: 0.875rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  color: #111111;
  background: #ffffff;
  border: none;
  border-radius: 999px;
  cursor: pointer;
  transition: transform 0.2s, opacity 0.2s;

  &:hover {
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

export const AStatus = styled.p<{ $variant: "success" | "error" }>`
  margin-top: 0.25rem;
  font-size: 0.875rem;
  color: ${ ({$variant}) => ($variant === "success" ? "#4ade80" : "#f87171") };
`;
