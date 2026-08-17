import styled from 'styled-components';
import type { AdminStatus } from '../../../types/admin';

export const UserCard = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 0.75rem;
  align-items: end;
  padding: 1rem;
  border: 1px solid #2c2c32;
  border-radius: 12px;
  background: #121215;
`;

export const CardHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  grid-column: 1 / -1;
`;

export const StatusBadge = styled.span<{ $status: AdminStatus }>`
  padding: 0.25rem 0.625rem;
  font-size: 0.75rem;
  border-radius: 999px;
  color: ${ ({$status}) => ($status === 'approved' ? '#4ade80' : $status === 'pending' ? '#fbbf24' : '#f87171') };
  background: ${ ({$status}) => ($status === 'approved' ? '#16301f' : $status === 'pending' ? '#332714' : '#3a2426') };
`;

export const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  grid-column: 1 / -1;
`;

export const Hint = styled.span`
  font-size: 0.75rem;
  color: #6b6b73;
`;
