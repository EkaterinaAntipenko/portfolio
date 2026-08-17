import styled from 'styled-components';

export const AdminLayout = styled.div`
  display: grid;
  grid-template-columns: 300px minmax(0, 1fr);
  gap: 2rem;
  padding: 2rem 2.5rem 4rem;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    padding: 1.5rem 1.25rem 3rem;
  }
`;

export const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.25rem 2.5rem;
  border-bottom: 1px solid #26262b;

  @media (max-width: 992px) {
    padding: 1rem 1.25rem;
  }
`;

export const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const ProjectButton = styled.button<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0.75rem 1rem;
  font-size: 0.9375rem;
  text-align: left;
  color: ${ ({$active}) => ($active ? '#111111' : '#c9c9cf') };
  background: ${ ({$active}) => ($active ? '#ffffff' : '#1a1a1e') };
  border: 1px solid #2c2c32;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;

  &:hover {
    border-color: #3a3a42;
  }
`;

export const ProjectIndex = styled.span`
  min-width: 20px;
  font-size: 0.8125rem;
  opacity: 0.7;
`;

export const Panel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding: 1.75rem;
  border-radius: 18px;
  background: #1a1a1e;
  border: 1px solid #2c2c32;
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
`;

export const Field = styled.label`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const FieldLabel = styled.span`
  font-size: 0.8125rem;
  color: #9a9aa2;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 0.9375rem;
  color: #f2f2f5;
  background: #121215;
  border: 1px solid #2c2c32;
  border-radius: 10px;

  &::placeholder {
    color: #56565e;
  }

  &:focus {
    outline: none;
    border-color: #f2f2f5;
  }
`;

export const Textarea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 0.75rem 1rem;
  font-family: inherit;
  font-size: 0.9375rem;
  color: #f2f2f5;
  background: #121215;
  border: 1px solid #2c2c32;
  border-radius: 10px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #f2f2f5;
  }
`;

export const ListRow = styled.div`
  display: grid;
  grid-template-columns: 32px minmax(0, 2fr) minmax(0, 1fr) auto auto auto;
  gap: 0.5rem;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const OrderBadge = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  font-size: 0.8125rem;
  color: #9a9aa2;
  background: #121215;
  border: 1px solid #2c2c32;
  border-radius: 8px;
`;

export const SmallButton = styled.button`
  padding: 0.5rem 0.75rem;
  font-size: 0.8125rem;
  color: #c9c9cf;
  background: #26262b;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background: #34343b;
    color: #ffffff;
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

export const PrimaryButton = styled.button`
  padding: 0.75rem 1.375rem;
  font-size: 0.9375rem;
  font-weight: 500;
  color: #111111;
  background: #ffffff;
  border: none;
  border-radius: 12px;
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const DangerButton = styled(SmallButton)`
  color: #f87171;

  &:hover {
    background: #3a2426;
    color: #fca5a5;
  }
`;

export const SectionTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding-top: 0.5rem;
  border-top: 1px solid #2c2c32;
`;

export const Notice = styled.p<{ $variant: 'info' | 'success' | 'error' }>`
  font-size: 0.875rem;
  color: ${ ({$variant}) => ($variant === 'success' ? '#4ade80' : $variant === 'error' ? '#f87171' : '#9a9aa2') };
`;

export const Thumb = styled.img`
  width: 44px;
  height: 44px;
  object-fit: cover;
  border-radius: 8px;
  background: #121215;
`;
