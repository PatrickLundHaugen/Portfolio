import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function NotFound() {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col justify-center items-center gap-4 h-full">
            <h1 className="text-3xl font-semibold tracking-tight">{t("404.title")}</h1>
            <Link to="/" className="inline-flex gap-1 items-center rounded-md cursor-pointer select-none hover:underline">
                <ChevronLeft className="size-4 shrink-0"/> {t("404.backLink")}
            </Link>
        </div>
    );
}