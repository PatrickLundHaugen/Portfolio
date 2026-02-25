import { useState, useId, useMemo, memo } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ChevronDown, ArrowUpRight } from "lucide-react";

import { projects } from "@/work/projectsData.ts";
import Button from "@/components/ui/Button";
import cn from "@/lib/utils.ts";

type ContentBlock = string | { type: string; text: string };
type Project = (typeof projects)[number];

interface ItemProps {
    project: Project;
    isOpen: boolean;
    onToggle: () => void;
    index: number;
}

const AccordionItem = memo(({ project, isOpen, onToggle, index }: ItemProps) => {
    const id = useId();
    const { t } = useTranslation();

    const content = t(`work.projects.${project.id}.content`, { returnObjects: true }) as ContentBlock[];
    const description = typeof content[0] === "string" ? content[0] : "";

    const renderedContent = useMemo(() => (
        <div className="flex flex-col gap-6">
            <div className="relative aspect-video w-full max-w-2xl self-center rounded-md overflow-hidden">
                <img
                    src={project.image}
                    alt={t(`work.projects.${project.id}.title`)}
                    loading="lazy"
                    decoding="async"
                    className={cn(
                        "absolute inset-0 size-full object-cover z-20 transition-[clip-path,transform,opacity] duration-500 delay-50 ease-[cubic-bezier(0.87,0,0.13,1)]",
                        isOpen
                            ? "[clip-path:polygon(0_100%,100%_100%,100%_0,0_0)] translate-y-0 opacity-100"
                            : "[clip-path:polygon(30%_50%,70%_50%,70%_50%,30%_50%)] -translate-y-4 opacity-0"
                    )}
                />
            </div>
            <p className="text-xs md:text-sm line-clamp-2">{description}</p>
            <div className="flex flex-wrap items-center gap-4 text-xs">
                <Button asChild className="py-2 px-4">
                    <Link to={project.to}>{t("work.readMore")}</Link>
                </Button>
                {project.productUrl && (
                    <Button asChild variant="link" size="link">
                        <a href={project.productUrl} target="_blank" rel="noreferrer">
                            {t(`work.projects.${project.id}.links.product`)} <ArrowUpRight />
                        </a>
                    </Button>
                )}
                {project.githubUrl && (
                    <Button asChild variant="link" size="link">
                        <a href={project.githubUrl} target="_blank" rel="noreferrer">
                            {t(`work.projects.${project.id}.links.github`)} <ArrowUpRight />
                        </a>
                    </Button>
                )}
            </div>
        </div>
    ), [isOpen, description, project, t]);

    return (
        <div>
            <button
                id={`trigger-${id}`}
                type="button"
                className="group flex items-center justify-between gap-4 w-full py-2 text-left font-medium cursor-pointer"
                onClick={onToggle}
                aria-expanded={isOpen}
                aria-controls={`content-${id}`}
            >
                <div className="flex flex-1 items-baseline justify-between">
                    <span
                        className="md:text-lg font-semibold group-hover:underline animate-title-text"
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        {t(`work.projects.${project.id}.title`)}
                    </span>
                    <span className="text-xs md:text-sm text-neutral-500">{t(`work.projects.${project.id}.year`)}</span>
                </div>
                <ChevronDown className={cn("size-4 transition-transform duration-300 ease-out", isOpen && "rotate-180")} />
            </button>
            <div
                id={`content-${id}`}
                role="region"
                aria-labelledby={`trigger-${id}`}
                inert={!isOpen}
                className={cn(
                    "grid overflow-hidden transition-[grid-template-rows,opacity,margin] duration-250 ease-in-out",
                    isOpen ? "grid-rows-[1fr] opacity-100 my-4" : "grid-rows-[0fr] opacity-0 mb-0"
                )}
            >
                <div className="min-h-0 text-neutral-600">{renderedContent}</div>
            </div>
        </div>
    );
});

AccordionItem.displayName = "AccordionItem";

export default function Accordion() {
    const [openId, setOpenId] = useState<string | null>(null);

    return (
        <div className="border-y divide-y">
            {projects.map((project, index) => (
                <AccordionItem
                    key={project.id}
                    project={project}
                    index={index}
                    isOpen={openId === project.id}
                    onToggle={() => setOpenId(openId === project.id ? null : project.id)}
                />
            ))}
        </div>
    );
}