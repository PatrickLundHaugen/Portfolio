import { IoSunny, IoMoon } from "react-icons/io5";
import { useTheme } from "./theme-provider.tsx";
import {Button} from "../components/ui/button.tsx";

export function ModeToggle() {
    const { toggleTheme } = useTheme();

    return (
        <Button onClick={toggleTheme} variant="outline" size="icon" aria-label="Toggle theme">
            <IoSunny className="size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <IoMoon className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
    );
}
