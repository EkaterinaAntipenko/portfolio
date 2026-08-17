import styled from 'styled-components';

export const Layout = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 380px;
  gap: 3rem;
  align-items: start;
  padding: 2rem 2.5rem 5rem;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 1.5rem 1.25rem 3rem;
  }
`;

export const Gallery = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

export const GalleryItem = styled.figure`
  margin: 0;
  overflow: hidden;
  border-radius: 16px;
  background: #1a1a1e;
`;

export const GalleryImage = styled.img`
  display: block;
  width: 100%;
  height: auto;
  object-fit: cover;
`;

export const GalleryCaption = styled.figcaption`
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  color: #8a8a92;
`;

export const Aside = styled.aside`
  position: sticky;
  top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding: 1.75rem;
  border-radius: 18px;
  background: #1a1a1e;
  border: 1px solid #2c2c32;

  @media (max-width: 992px) {
    position: static;
  }
`;

export const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const Tag = styled.span`
  padding: 0.375rem 0.75rem;
  font-size: 0.8125rem;
  color: #c9c9cf;
  background: #26262b;
  border-radius: 999px;
`;

export const Dropdown = styled.details`
  border: 1px solid #2c2c32;
  border-radius: 12px;
  background: #121215;
  overflow: hidden;

  &[open] summary svg {
    transform: rotate(180deg);
  }
`;

export const DropdownSummary = styled.summary`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.875rem 1rem;
  font-size: 0.9375rem;
  color: #f2f2f5;
  cursor: pointer;
  list-style: none;

  &::-webkit-details-marker {
    display: none;
  }

  svg {
    transition: transform 0.2s;
  }
`;

export const DropdownItem = styled.a`
  display: block;
  padding: 0.75rem 1rem;
  font-size: 0.9375rem;
  color: #c9c9cf;
  text-decoration: none;
  border-top: 1px solid #2c2c32;
  transition: background 0.2s, color 0.2s;

  &:hover {
    background: #1e1e23;
    color: #ffffff;
  }
`;

export const BackLink = styled.button`
  align-self: flex-start;
  margin: 1.5rem 0 0 2.5rem;
  padding: 0.625rem 1.125rem;
  font-size: 0.9375rem;
  color: #c9c9cf;
  background: #26262b;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;

  &:hover {
    background: #34343b;
    color: #ffffff;
  }

  @media (max-width: 992px) {
    margin-left: 1.25rem;
  }
`;

export const StateBox = styled.div`
  padding: 4rem 2.5rem;
  color: #8a8a92;
`;
