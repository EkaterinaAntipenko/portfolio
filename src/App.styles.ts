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
  position: relative;
  height: calc(100vh - 6.5rem);
  overflow: hidden;
`;
