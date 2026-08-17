import styled from 'styled-components';

export const Centered = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 1.5rem;
`;

export const Card = styled.div`
  width: 100%;
  max-width: 420px;
  padding: 2.5rem;
  border-radius: 20px;
  background: #1a1a1e;
  border: 1px solid #2c2c32;

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1.75rem;
`;

export const Switcher = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1.5rem;
`;

export const SwitchButton = styled.button<{ $active: boolean }>`
  flex: 1;
  padding: 0.625rem 1rem;
  font-size: 0.9375rem;
  color: ${ ({$active}) => ($active ? '#111111' : '#c9c9cf') };
  background: ${ ({$active}) => ($active ? '#ffffff' : '#26262b') };
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
`;

export const Notice = styled.p<{ $variant: 'success' | 'error' | 'info' }>`
  font-size: 0.875rem;
  color: ${ ({$variant}) => ($variant === 'success' ? '#4ade80' : $variant === 'error' ? '#f87171' : '#9a9aa2') };
`;
