import styled, { css } from 'styled-components';
import type {AInputClassName} from './A-input.types'

interface StyledInputProps {
  $variant: AInputClassName;
  $color?: string;
}

const classesStyles = {
  default: css`border: none; border-bottom: 1px solid #111;`,
  outlined: css`border: 1px solid #111; border-radius: 4px;`,
};


export const AStyledInput = styled.input<StyledInputProps>`
  ${ ({$variant}) => classesStyles[$variant] }

  padding: 0.5rem 0.75rem;
  font-size: 1rem;
  color: ${ ({$color}) => $color ?? 'inherit' };

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
