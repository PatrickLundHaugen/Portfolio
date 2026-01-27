import { useTranslation } from "react-i18next";

import Accordion from "@/components/ui/Accordion";
import Footer from "@/components/Footer";

export default function Home() {
    const { t } = useTranslation();

    return (
        <section className="h-full flex flex-col justify-end md:grid md:grid-cols-2 md:items-end gap-8 lg:gap-32">
            <div className="animate-left-col flex flex-col">
                <p className="text-xs md:text-sm font-medium tracking-tight uppercase">
                    {t("home.subheading")}
                </p>
                <div className="flex flex-col sm:flex-row sm:gap-x-2 text-3xl lg:text-4xl font-bold tracking-tight uppercase">
                    <span>{t("home.firstName")}</span>
                    <span>{t("home.lastName")}</span>
                </div>
                <p className="md:text-lg font-semibold tracking-tight leading-tight mt-4">
                    {t("home.about")}
                </p>
                <Footer />
            </div>
            <div className="w-full lg:justify-self-end">
                <p className="text-xs md:text-sm font-medium tracking-tight uppercase mb-3">
                    {t("work.recentWorkTitle")}
                </p>
                <Accordion />
            </div>
        </section>
    );
}