import styled, { css } from 'styled-components';
import type {AButtonClassName} from './A-button.types'

interface StyledButtonProps {
  $variant: AButtonClassName;
  $color?: string;
}

const classesStyles = {
  primary: css`background: #111; color: #fff; border: none;`,
  secondary: css`background: #fff; color: #111; border: 1px solid #111;`,
  ghost: css`background: transparent; color: #111; border: none;`,
};


export const AStyledButton = styled.button<StyledButtonProps>`
  ${ ({$variant}) => classesStyles[$variant] }

  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  color: ${ ({$color}) => $color ?? 'inherit' };

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
