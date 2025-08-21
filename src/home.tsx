import { IoLocationOutline } from "react-icons/io5";
import { Tabs } from "./components/tabs.tsx";
import { PreviousProjects } from "./components/previous-projects.tsx";
import { useTranslation } from "react-i18next";
import { IconLinks } from "./components/icon-links.tsx";

export function Home() {
    const { t } = useTranslation();

    return (
        <>
            <section className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold">{t("home.greeting")}</h1>
                <div className="inline-flex items-center text-muted-foreground font-sm">
                    <IoLocationOutline/>
                    <p>{t("home.location")}</p>
                </div>
                <p>{t("home.about")}</p>
                <IconLinks />
            </section>
            <section>
                <Tabs />
            </section>
            <section>
                <PreviousProjects />
            </section>
        </>
    )
}
