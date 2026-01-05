import { ModeToggle } from "../dark-mode/mode-toggle";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Contact } from "./contact";
import { Button } from "./ui/button";

export function Nav() {
    const { i18n } = useTranslation();
    const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
    const handleLanguageToggle = () => {
    const newLanguage = currentLanguage === "no" ? "en" : "no";
    setCurrentLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
    };

    return (
        <nav className="inline-flex justify-end gap-2 py-4">
            <Contact />

            <ModeToggle />

            <Button
                onClick={handleLanguageToggle}
                variant="outline"
                size="icon"
                aria-label="Switch language"
                className="text-xs"
            >
                {i18n.language === "en" ? "NO" : "EN"}
            </Button>
        </nav>
    );
}
