import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { IoIosArrowBack } from "react-icons/io";
import { TbExternalLink } from "react-icons/tb";

import { Button } from "../components/ui/button";

import dashboard from "../images/dashboard.webp";

export function Project2() {
    const { t } = useTranslation();

    return (
        <>
            <Link to="/" className="inline-flex gap-1 items-center cursor-pointer hover:underline"><IoIosArrowBack/>{t("recent-projects.back")}</Link>
            <section className="flex flex-col gap-4">
                <div className="w-full px-2 md:px-8">
                    <img
                        src={dashboard}
                        alt={t("recent-projects.dashboard.title")}
                        className="w-full aspect-2/1 rounded-lg object-fit dark:border"
                    />
                </div>
                <div>
                    <h1 className="text-2xl font-semibold">{t("recent-projects.dashboard.title")}</h1>
                    <p className="text-sm text-muted-foreground">{t("recent-projects.dashboard.date")}</p>
                </div>
                <div className="*:my-6 *:text-base/7 text-accent-foreground">
                    <p>{t("recent-projects.dashboard.text.section1.text1")}</p>
                    <hr/>
                    <h2 className="text-foreground text-lg font-semibold">{t("recent-projects.dashboard.text.section2.title")}</h2>
                    <p>{t("recent-projects.dashboard.text.section2.text1")}</p>
                    <p>{t("recent-projects.dashboard.text.section2.text2")}</p>
                    <p>{t("recent-projects.dashboard.text.section2.text3")}</p>
                    <hr/>
                    <p>{t("recent-projects.dashboard.text.section3.text1")}</p>
                    <p>{t("recent-projects.dashboard.text.section3.text2")}</p>
                </div>
                <div>
                    <Button
                        onClick={() => window.open("https://github.com/PatrickLundHaugen/dashboard")}
                        size="link"
                    >
                        {t("recent-projects.dashboard.links")}
                        <TbExternalLink className="size-3" />
                    </Button>
                </div>
            </section>
        </>
    )
}
