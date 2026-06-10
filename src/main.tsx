import { StrictMode, lazy } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import "@/App.css";
import App from "@/App";
import Home from "@/components/Home";
import en from "@/languages/en.json";
import no from "@/languages/no.json";

const ProjectDetail = lazy(() => import("@/work/ProjectDetail"));
const NotFound = lazy(() => import("@/components/NotFound"));

const savedLanguage = localStorage.getItem("i18nextLng") || "no";

i18n.use(initReactI18next).init({
    resources: {
        en: { translation: en },
        no: { translation: no }
    },
    lng: savedLanguage,
    fallbackLng: "en",
    interpolation: { escapeValue: false },
})
    .catch(console.error);

i18n.on("languageChanged", (language) => {
    localStorage.setItem("i18nextLng", language);
});

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { index: true, element: <Home /> },
            { path: "project/:projectId", element: <ProjectDetail /> },
            { path: "*", element: <NotFound /> },
        ],
    },
]);

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);