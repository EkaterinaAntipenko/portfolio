import styled, { css } from 'styled-components';

//вызывает тайпы
import type {ATextClassName} from './A-text.types'

//забираем ток класс
interface StyledTextProps {
  $variant: ATextClassName;
  $align?: string;
  $color?: string;
}

// предписанное для класса
const classesStyles = {
  pageTitle: css`font-size: 2.5rem; font-weight: 700;`,
  mainText: css`font-size: 1.25rem; font-weight: 400;`,
  heading2: css`font-size: 2.1rem; font-weight: 700;`,
  tagText: css`font-size: 0.875rem; font-weight: 400;`,
};

// передача в индекс стилей
export const AStyledText = styled.span<StyledTextProps>`
  ${ ({$variant}) => classesStyles[$variant] }

  text-align: ${ ({$align}) => $align ?? 'left' };
  color: ${ ({$color}) => $color ?? 'inherit' };
`;
