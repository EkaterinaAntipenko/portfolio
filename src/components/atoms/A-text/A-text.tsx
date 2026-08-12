import {AStyledText} from "./A-text.styles"
import type {ATextTag,  ATextClassName, ATextProps} from "./A-text.types"

const defaultTag : Record<ATextClassName, ATextTag> = {
    pageTitle: "h1",
    mainText: "p",
    tagText: "p"
}

export funtion Text({ })