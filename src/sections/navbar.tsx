import { ModeToggle } from "../dark-mode/mode-toggle.tsx";
import { useTranslation } from "react-i18next";
import { useState } from "react";

function Navbar() {
    const { t, i18n } = useTranslation();
    const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
    const handleLanguageToggle = () => {
        const newLanguage = currentLanguage === "no" ? "en" : "no";
        setCurrentLanguage(newLanguage);
        i18n.changeLanguage(newLanguage);
    };

    return (
        <nav
            className="inline-flex justify-end gap-2 py-4 *:inline-flex *:items-center *:justify-center *:rounded-md *:border *:border-input *:shadow-sm *:cursor-pointer *:hover:bg-accent *:hover:text-accent-foreground *:transition-colors *:focus-visible:outline-none *:focus-visible:ring-1 *:focus-visible:ring-ring">
            <button className="h-9 px-4 py-2 text-sm font-medium">{t("navbar.contact")}</button>
            <ModeToggle/>
            <button onClick={handleLanguageToggle} className="size-9 text-sm font-medium">
                {i18n.language === "en" ? "NO" : "EN"}
            </button>
        </nav>
    )
}

export default Navbar;
