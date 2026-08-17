//сначало обращается сюда потом идем в стил
// индекс -> стили ->  тайпы -> стили -> индекс

import {AStyledText} from "./A-text.styles"
import type {ATextTag,  ATextClassName, ATextProps} from "./A-text.types"

const defaultTag : Record<ATextClassName, ATextTag> = {
    pageTitle: "h1",
    heading2: "h2",
    mainText: "p",
    tagText: "p"
}

export function Text({ tag, className = "mainText", color, align, children }: ATextProps) {
    return (
        <AStyledText
            as={tag ?? defaultTag[className]}
            $variant={className}
            $align={align}
            $color={color}
        >
            {children}
        </AStyledText>
    )
}
