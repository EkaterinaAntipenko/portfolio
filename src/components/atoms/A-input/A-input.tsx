import {AStyledInput} from "./A-input.styles"
import type {AInputProps} from "./A-input.types"

export function Input({ type = "text", className = "default", value, placeholder, color, disabled, onChange }: AInputProps) {
    return (
        <AStyledInput
            type={type}
            $variant={className}
            $color={color}
            value={value}
            placeholder={placeholder}
            disabled={disabled}
            onChange={(event) => onChange?.(event.target.value)}
        />
    )
}
