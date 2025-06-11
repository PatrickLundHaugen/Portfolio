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

  const [isOpen, setOpen] = useState(false);

  return (
    <nav className="inline-flex justify-end gap-2 py-4">
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center rounded-md border border-input shadow-sm cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors focus-visible:ring-1 focus-visible:ring-ring h-9 px-4 py-2 text-sm font-medium focus-visible:ring-[3px]"
      >
        {t("navbar.contact.title")}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpen(false)}
          />
          <div className="relative z-50 flex flex-col gap-4 bg-background w-full max-w-[calc(100%-2rem)] sm:max-w-lg rounded-lg border p-6 shadow-lg">
            <div className="flex flex-col gap-2">
              <h1 className="leading-none font-semibold">
                {t("navbar.contact.title")}
              </h1>
              <p className="text-muted-foreground text-sm">
                {t("navbar.contact.description")}
              </p>
            </div>
            <form action="" className="flex flex-col gap-2">
              <label
                htmlFor="name"
                className="text-sm leading-none font-medium select-none"
              >
                {t("navbar.contact.form.input1.label")}
              </label>
              <input
                id="name"
                type="text"
                placeholder={t("navbar.contact.form.input1.placeholder")}
                autoComplete="name"
                required
                className="placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border px-3 py-1 shadow-xs transition-all outline-none md:text-sm focus-visible:border-ring"
              />
              <label
                htmlFor="email"
                className="text-sm leading-none font-medium select-none"
              >
                {t("navbar.contact.form.input2.label")}
              </label>
              <input
                id="email"
                type="text"
                placeholder={t("navbar.contact.form.input2.label")}
                autoComplete="email"
                required
                className="placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border px-3 py-1 shadow-xs transition-all outline-none md:text-sm focus-visible:border-ring"
              />
              <label
                htmlFor="message"
                className="text-sm leading-none font-medium select-none"
              >
                {t("navbar.contact.form.input3.label")}
              </label>
              <textarea
                name="message"
                id="message"
                placeholder={t("navbar.contact.form.input3.placeholder")}
                required
                className="border-input placeholder:text-muted-foreground dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border resize-y bg-transparent px-3 py-2 shadow-xs transition-all outline-none md:text-sm focus-visible:border-ring"
              />
            </form>
            <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button
                onClick={() => setOpen(false)}
                className="bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80 h-9 px-4 py-2 whitespace-nowrap cursor-pointer rounded-md text-sm font-medium transition-all shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
              >
                {t("navbar.contact.button1")}
              </button>
              <button
                onClick={() => setOpen(false)}
                className="bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 h-9 px-4 py-2 whitespace-nowrap cursor-pointer rounded-md text-sm font-medium transition-all shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
              >
                {t("navbar.contact.button2")}
              </button>
            </div>
          </div>
        </div>
      )}

      <ModeToggle />
      <button
        onClick={handleLanguageToggle}
        className="inline-flex items-center justify-center rounded-md border border-input shadow-sm cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors focus-visible:ring-1 focus-visible:ring-ring size-9 text-sm font-medium focus-visible:ring-[3px]"
      >
        {i18n.language === "en" ? "NO" : "EN"}
      </button>
    </nav>
  );
}

export default Navbar;
