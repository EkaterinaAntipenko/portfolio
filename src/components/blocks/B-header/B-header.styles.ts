import styled from 'styled-components';

export const AHeader = styled.header`
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.25rem 2.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    padding: 1rem 1.25rem;
  }
`;

export const ANav = styled.nav`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const ANavItem = styled.button`
  cursor: pointer;
  border: none;
  padding: 0.625rem 1.125rem;
  font-size: 0.9375rem;
  color: #c9c9cf;
  background: #26262b;
  border-radius: 10px;
  text-decoration: none;
  transition: background 0.2s, color 0.2s;

  &:hover {
    background: #34343b;
    color: #ffffff;
  }
`;

export const ADiscussButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.375rem;
  font-size: 0.9375rem;
  font-weight: 500;
  color: #111111;
  background: #ffffff;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  white-space: nowrap;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
  }

  @media (max-width: 768px) {
    justify-content: center;
  }
`;
