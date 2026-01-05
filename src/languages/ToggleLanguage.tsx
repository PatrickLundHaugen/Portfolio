import { useTranslation } from "react-i18next";

import Button from "@/components/ui/Button";

type Lang = "en" | "no";

export default function ToggleLanguage() {
    const { i18n } = useTranslation();
    const isNorwegian = i18n.resolvedLanguage?.startsWith("no");
    const nextLang: Lang = isNorwegian ? "en" : "no";

    const toggleLanguage = () => {
        i18n.changeLanguage(nextLang).catch(console.error);
    };

    return (
        <Button
            onClick={toggleLanguage}
            variant="outline"
            size="icon"
            aria-label={`Switch to ${isNorwegian ? "English" : "Norwegian"}`}
        >
            <span aria-hidden="true" className={`transition-[rotate,opacity] ${!isNorwegian ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"}`}>
                No
            </span>
            <span aria-hidden="true" className={`absolute transition-[rotate,opacity] ${isNorwegian ? "rotate-0 opacity-100" : "rotate-90 opacity-0"}`}>
                En
            </span>
        </Button>
    )
}