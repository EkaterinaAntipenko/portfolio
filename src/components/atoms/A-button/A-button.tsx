import {AStyledButton} from "./A-button.styles"
import type {AButtonProps} from "./A-button.types"

export function Button({ type = "button", className = "primary", color, disabled, onClick, children }: AButtonProps) {
    return (
        <AStyledButton
            type={type}
            $variant={className}
            $color={color}
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </AStyledButton>
    )
}
