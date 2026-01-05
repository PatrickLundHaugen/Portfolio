import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { useTranslation } from "react-i18next";

export default function NotFound() {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col justify-center items-center gap-4 py-32">
            <h1 className="text-3xl font-semibold tracking-tight">{t("404.title")}</h1>
            <Link to="/" className="inline-flex gap-1 items-center rounded-md cursor-pointer select-none hover:underline">
                <IoIosArrowBack /> {t("404.link")}
            </Link>
        </div>
    );
}
