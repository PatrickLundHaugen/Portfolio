import { ModeToggle } from "../dark-mode/mode-toggle.tsx";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import Contact from "./contact.tsx";

function Navbar() {
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

      <button
        onClick={handleLanguageToggle}
        className="inline-flex items-center justify-center rounded-md border border-input shadow-sm cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors size-9 text-sm font-medium focus-visible:ring-ring focus-visible:ring-3"
      >
        {i18n.language === "en" ? "NO" : "EN"}
      </button>
    </nav>
  );
}

export default Navbar;
