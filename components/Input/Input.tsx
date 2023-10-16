"use client"
import { forwardRef } from "react";

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> { }

const Input = forwardRef<HTMLInputElement, InputProps>(({
    className,
    type,
    disabled,
    ...props
}, ref) => {
    return (
        <input
            type={type}
            className={
                `${disabled} && 'opacity-75',
                ${className}`
            }
            disabled={disabled}
            ref={ref}
            {...props}
        />
    )
});

Input.displayName = "Input";

export default Input