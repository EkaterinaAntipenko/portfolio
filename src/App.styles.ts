import styled from 'styled-components';

export const AppShell = styled.div`
  min-height: 100vh;
  color: #f2f2f5;
  background-color: #141417;
  background-image:
    radial-gradient(1200px 600px at 80% -10%, rgba(70, 70, 82, 0.28), transparent 60%),
    repeating-linear-gradient(115deg, rgba(255, 255, 255, 0.016) 0 1px, transparent 1px 26px);
`;

export const Hero = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 7rem 2.5rem;

  @media (max-width: 768px) {
    padding: 4rem 1.25rem;
  }
`;
