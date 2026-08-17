import styled from 'styled-components';

export const Page = styled.div`
  position: relative;
  min-height: 100vh;
  overflow-x: hidden;
  background: #111111;
  color: #ffffff;
`;

export const Glow = styled.img`
  position: absolute;
  top: -196px;
  left: calc(16.67% + 130px);
  width: 1337px;
  height: 1337px;
  pointer-events: none;
  user-select: none;
`;

export const Content = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 7px;
  max-width: 1630px;
  margin: 0 auto;
  padding: 56px 48px 64px;

  @media (max-width: 992px) {
    padding: 24px 20px 48px;
  }
`;

export const BackButton = styled.button`
  align-self: flex-start;
  padding: 10px 30px;
  font-family: inherit;
  font-size: clamp(1rem, 1.47vw, 25.444px);
  line-height: 1.416;
  letter-spacing: -0.03em;
  color: #000000;
  background: #ffffff;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.85;
  }
`;

export const Columns = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 530fr) minmax(0, 1080fr);
  gap: 20px;
  align-items: start;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

export const InfoCard = styled.aside`
  position: sticky;
  top: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 48px;
  min-height: 708px;
  padding: 43px 35px;
  background: #242424;
  border-radius: 30px;

  @media (max-width: 992px) {
    position: static;
    min-height: 0;
    padding: 32px 24px;
  }
`;

export const InfoTop = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const Title = styled.h1`
  padding: 10px;
  font-size: clamp(2rem, 2.63vw, 45.4px);
  font-weight: 400;
  line-height: 1.416;
  letter-spacing: -0.03em;
  text-align: center;
  color: #ffffff;
`;

export const Description = styled.p`
  align-self: center;
  max-width: 403px;
  padding: 10px;
  font-size: 18px;
  line-height: 1.416;
  letter-spacing: -0.03em;
  text-align: center;
  color: rgba(255, 255, 255, 0.4);
`;

export const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`;

export const Tag = styled.span`
  padding: 8px 26px;
  font-size: 18px;
  line-height: 1.416;
  letter-spacing: -0.03em;
  color: rgba(255, 255, 255, 0.6);
  background: #3b3b3b;
  border-radius: 95px;
`;

export const Dropdown = styled.details`
  width: 100%;
`;

export const DropdownSummary = styled.summary`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  height: 63px;
  padding: 0 32px;
  font-size: clamp(1rem, 1.47vw, 25.444px);
  line-height: 1.416;
  letter-spacing: -0.03em;
  color: #000000;
  background: #d9d9d9;
  border-radius: 15px;
  cursor: pointer;
  list-style: none;

  &::-webkit-details-marker {
    display: none;
  }

  img {
    width: 20px;
    height: 20px;
    transition: transform 0.2s;
  }

  details[open] > & img {
    transform: rotate(45deg);
  }
`;

export const DropdownList = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 8px;
  overflow: hidden;
  background: #d9d9d9;
  border-radius: 15px;
`;

export const DropdownItem = styled.a`
  padding: 14px 32px;
  font-size: 18px;
  line-height: 1.416;
  letter-spacing: -0.03em;
  color: #000000;
  text-decoration: none;
  transition: background 0.2s;

  & + & {
    border-top: 1px solid rgba(0, 0, 0, 0.12);
  }

  &:hover {
    background: #c9c9c9;
  }
`;

export const Gallery = styled.div`
  display: flex;
  flex-direction: column;
  gap: 34px;
  padding: 34px 37px;
  background: #242424;
  border-radius: 30px;

  @media (max-width: 992px) {
    gap: 20px;
    padding: 20px;
  }
`;

export const GalleryItem = styled.figure`
  margin: 0;
`;

export const GalleryImage = styled.img`
  display: block;
  width: 100%;
  height: auto;
  border-radius: 28px;
  background: #1a1a1e;
`;

export const GalleryCaption = styled.figcaption`
  padding: 12px 4px 0;
  font-size: 18px;
  line-height: 1.416;
  letter-spacing: -0.03em;
  color: rgba(255, 255, 255, 0.4);
`;

export const StateBox = styled.div`
  padding: 64px 0;
  font-size: 18px;
  color: rgba(255, 255, 255, 0.4);
`;
