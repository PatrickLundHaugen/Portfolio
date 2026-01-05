import React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

type ButtonVariant = "default" | "secondary" | "outline"
type ButtonSize = "default" | "sm" | "icon" | "link"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant
    size?: ButtonSize
    asChild?: boolean
    className?: string
}

const variants: Record<ButtonVariant, string> = {
    default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
    secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
    outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50"
}

const sizes: Record<ButtonSize, string> = {
    default: "h-9 px-4 py-2",
    sm: "h-8 px-3",
    icon: "size-9",
    link: "py-1 px-3 text-xs gap-1",
}

export function Button({
                           variant = "default",
                           size = "default",
                           asChild = false,
                           className,
                           ...props
                       }: ButtonProps) {
    const Comp = asChild ? Slot : "button"
    return (
        <Comp
            className={cn("inline-flex items-center justify-center whitespace-nowrap text-sm rounded-md font-medium cursor-pointer transition-all disabled:pointer-events-none disabled:opacity-50 shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", variants[variant], sizes[size], className)}
            {...props}
        />
    )
}
