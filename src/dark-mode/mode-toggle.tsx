import { IoSunny, IoMoon } from "react-icons/io5";
import { useTheme } from "./theme-provider.tsx";

export function ModeToggle() {
    const { toggleTheme } = useTheme();

    return (
        <button onClick={toggleTheme} className="inline-flex items-center justify-center rounded-md border border-input text-sm font-medium size-9 shadow-sm cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-[3px]">
            <IoSunny className="size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <IoMoon className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </button>
    );
}
