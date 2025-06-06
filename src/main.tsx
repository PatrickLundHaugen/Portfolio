import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './App.css';
import App from './App';
import { ThemeProvider } from './dark-mode/theme-provider';
import { BrowserRouter } from "react-router-dom";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en_home from './languages/en.json';
import no_home from './languages/no.json';

const savedLanguage = localStorage.getItem('language') || 'no';

i18n.use(initReactI18next).init({
    resources: {
        en: {translation: en_home},
        no: {translation: no_home}
    },
    lng: savedLanguage,
    fallbackLng: "en",
    interpolation: { escapeValue: false },
});

i18n.on('languageChanged', (lng) => {
    localStorage.setItem('language', lng);
});

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter>
            <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
                <App />
            </ThemeProvider>
        </BrowserRouter>
    </StrictMode>
);