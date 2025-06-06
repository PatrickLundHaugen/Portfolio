import { IoSunny, IoMoon } from "react-icons/io5";
import { useTheme } from "./theme-provider.tsx";

export function ModeToggle() {
    const { toggleTheme } = useTheme();

    return (
        <button onClick={toggleTheme} className="size-9 text-sm font-medium">
            <IoSunny className="size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <IoMoon className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </button>
    );
}
