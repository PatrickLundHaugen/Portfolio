import React from "react"
import { Slot } from "@radix-ui/react-slot"

import cn from "@/lib/utils"

type ButtonVariant = "default" | "outline" | "link"
type ButtonSize = "default" | "icon" | "link"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant
    size?: ButtonSize
    asChild?: boolean
    className?: string
}

const variants: Record<ButtonVariant, string> = {
    default: "bg-primary hover:bg-primary/90 text-neutral-800",
    outline: "bg-neutral-50 border hover:bg-neutral-300",
    link: "tracking-wider hover:underline"
}

const sizes: Record<ButtonSize, string> = {
    default: "px-6",
    icon: "size-12",
    link: "p-0",
}

export default function Button({
                           variant = "default",
                           size = "default",
                           asChild = false,
                           className,
                           ...props
                       }: ButtonProps) {
    const Comp = asChild ? Slot : "button"
    return (
        <Comp
            className={cn("inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-full font-medium tracking-tight cursor-pointer uppercase select-none transition-[color,background-color,border-color,opacity] disabled:pointer-events-none disabled:opacity-50",
                variants[variant],
                sizes[size],
                className)}
            {...props}
        />
    )
}
