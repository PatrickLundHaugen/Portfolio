import { ReactNode, useState, useId } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ChevronDown, ArrowUpRight } from "lucide-react";

import { projects } from "@/work/projectsData.ts";
import Button from "@/components/ui/Button";

interface ItemProps {
    title: string;
    year: string;
    content: ReactNode;
    isOpen: boolean;
    onClick: () => void;
    index: number;
}

function AccordionItem({ title, year, content, isOpen, onClick, index }: ItemProps) {
    const id = useId();

    return (
        <div>
            <button
                className="group flex items-center justify-between gap-4 w-full py-2 text-left font-medium cursor-pointer"
                type="button"
                onClick={onClick}
                aria-expanded={isOpen}
                aria-controls={`content-${id}`}
            >
                <div className="flex flex-1 items-baseline justify-between">
                    <span
                        className="md:text-lg font-semibold group-hover:underline animate-title-text"
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        {title}
                    </span>
                    <span className="text-xs md:text-sm text-neutral-500">{year}</span>
                </div>
                <ChevronDown
                    className={`size-4 transition-transform ${
                        isOpen ? "rotate-180" : "rotate-0"
                    }`}
                />
            </button>
            <div
                id={`content-${id}`}
                inert={!isOpen}
                className={`grid overflow-hidden ease-in-out transition-[grid-template-rows,opacity,margin] duration-250 ${
                    isOpen
                        ? "grid-rows-[1fr] opacity-100 my-4"
                        : "grid-rows-[0fr] opacity-0 mb-0"
                }`}
            >
                <div className="min-h-0 text-neutral-600">
                    {content}
                </div>
            </div>
        </div>
    );
}

export default function Accordion() {
    const { t } = useTranslation();
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <div className="border-y divide-y">
            {projects.map((project, index) => {
                const content = t(`work.projects.${project.id}.content`, { returnObjects: true }) as (string | { type: string; text: string })[];
                const description = typeof content[0] === 'string' ? content[0] : '';

                return (
                    <AccordionItem
                        key={project.id}
                        title={t(`work.projects.${project.id}.title`)}
                        year={t(`work.projects.${project.id}.year`)}
                        isOpen={openIndex === index}
                        onClick={() => setOpenIndex(openIndex === index ? null : index)}
                        index={index}
                        content={
                            <div className="flex flex-col gap-6">
                                <div className="aspect-video w-full max-w-2xl self-center rounded-md overflow-hidden">
                                    <img
                                        src={project.image}
                                        alt={t(`work.projects.${project.id}.title`)}
                                        loading="lazy"
                                        decoding="async"
                                        className="size-full object-cover transition-transform duration-250 scale-110 hover:scale-100"
                                    />
                                </div>
                                <p className="text-xs md:text-sm line-clamp-2">
                                    {description}
                                </p>
                                <div className="flex flex-wrap items-center gap-4 text-xs">
                                    <Button asChild className="py-2 px-4">
                                        <Link to={project.to}>{t("work.readMore")}</Link>
                                    </Button>
                                    {project.productUrl && (
                                        <Button asChild variant="link" size="link">
                                            <a href={project.productUrl} target="_blank" rel="noreferrer">
                                                {t(`work.projects.${project.id}.links.product`)}
                                                <ArrowUpRight />
                                            </a>
                                        </Button>
                                    )}
                                    {project.githubUrl && (
                                        <Button asChild variant="link" size="link">
                                            <a href={project.githubUrl} target="_blank" rel="noreferrer">
                                                {t(`work.projects.${project.id}.links.github`)}
                                                <ArrowUpRight />
                                            </a>
                                        </Button>
                                    )}
                                </div>
                            </div>
                        }
                    />
                );
            })}
        </div>
    );
}