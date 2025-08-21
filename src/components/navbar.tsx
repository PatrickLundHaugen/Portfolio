import { ModeToggle } from "../dark-mode/mode-toggle.tsx";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Contact } from "./contact.tsx";
import { Button } from "./ui/button.tsx";

export function Navbar() {
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
            >
                {i18n.language === "en" ? "NO" : "EN"}
            </Button>
        </nav>
    );
}
