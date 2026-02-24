import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import type { Project } from "@/work/projectsData";

interface SeeMoreProps {
    projects: Project[];
}

export default function SeeMore({ projects }: SeeMoreProps) {
    const { t } = useTranslation();

    const projectDescriptions = useMemo(() => {
        const map: Record<string, string> = {};
        projects?.forEach((project) => {
            const content = t(`work.projects.${project.id}.content`, { returnObjects: true }) as
                | (string | { type: "heading"; text: string })[]
                | undefined;

            map[project.id] =
                content && content.length > 0 && typeof content[0] === "string"
                    ? content[0]
                    : "";
        });
        return map;
    }, [projects, t]);

    if (!projects || projects.length === 0) return null;

    return (
        <section>
            <p className="text-sm font-medium tracking-tight uppercase border-b mb-3">
                {t("work.seeMore")}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 my-6">
                {projects.map((project) => (
                    <Link
                        key={project.id}
                        to={project.to}
                        className="group lg:flex lg:gap-4 space-y-4"
                    >
                        <div className="aspect-video w-full lg:w-1/3 overflow-hidden rounded-md shrink-0">
                            <img
                                src={project.image}
                                alt={t(`work.projects.${project.id}.title`)}
                                loading="lazy"
                                className="size-full object-cover transition-transform duration-250 scale-110 group-hover:scale-100"
                            />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold group-hover:underline">
                                {t(`work.projects.${project.id}.title`)}
                            </h2>
                            <p className="text-sm text-neutral-600 line-clamp-2 mt-2 lg:w-4/5">
                                {projectDescriptions[project.id]}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}