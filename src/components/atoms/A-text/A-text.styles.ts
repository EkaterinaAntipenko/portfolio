import styled, { css } from 'styled-components';
import type {ATextClassName} from './A-text.types'

interface StyledTextProps {
  $variant: ATextClassName;
  $align?: string;
  $color?: string;
}

const classesStyles = {
  pageTitle: css`font-size: 2.5rem; font-weight: 700;`,
  mainText: css`font-size: 1.25rem; font-weight: 400;`,
  TagText: css`font-size: 0.875rem; font-weight: 400;`,
};


export const AstyledText = styled.span<StyledTextProps>`
  ${ ({$variant}) => classesStyles[$variant] }

  text-align: ${ ({$align}) => $align ?? 'left' }
  color: ${ ({$color}) => $color ?? 'left' }
`;