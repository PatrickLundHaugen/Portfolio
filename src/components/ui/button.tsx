import React from "react";

type Variant = "default" | "secondary" | "outline";
type Size = "default" | "sm" | "icon" | "link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: Variant;
    size?: Size;
}

const baseStyles =
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive";

const variants: Record<Variant, string> = {
    default:
        "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
    secondary:
        "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
    outline:
        "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
};

const sizes: Record<Size, string> = {
    default: "h-9 px-4 py-2 has-[>svg]:px-3",
    sm: "h-8 rounded-md px-3 has-[>svg]:px-2.5",
    icon: "size-9",
    link: "py-1 px-3 text-xs gap-1"
};

export function Button({
                           variant = "default",
                           size = "default",
                           className = "",
                           children,
                           ...props
                       }: ButtonProps) {
    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
