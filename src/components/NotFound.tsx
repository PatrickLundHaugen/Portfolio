import { useMemo } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { useTranslation } from "react-i18next";

import { projects } from "@/work/projectsData";
import Button from "@/components/ui/Button";
import SeeMore from "@/components/SeeMore";

export default function NotFound() {
    const { t } = useTranslation();

    const recentProjects = useMemo(() => {
        return [...projects].slice(0, 2);
    }, []);

    return (
        <section className="h-full flex flex-col justify-end md:grid md:grid-cols-2 md:items-end gap-8 lg:gap-32 pt-[25vh]">
            <div className="md:flex items-baseline gap-2">
                <h1 className="text-9xl font-bold tracking-tight">
                    {t("404.status")}
                </h1>
                <p className="md:text-lg font-medium tracking-tight uppercase">
                    {t("404.error")}
                </p>
            </div>

            <div>
                <div className="pb-32">
                    <h2 className="text-3xl lg:text-4xl font-bold tracking-tight uppercase">{t("404.message")}</h2>
                    <Button asChild variant="link" size="link" className="mt-4 text-xs md:text-sm">
                        <Link to="/">
                            <ChevronLeft />
                            {t("404.backLink")}
                        </Link>
                    </Button>
                </div>

                <SeeMore projects={recentProjects} />
            </div>
        </section>
    );
}