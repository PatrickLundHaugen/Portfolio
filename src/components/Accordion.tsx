import { ReactNode, useState, useId, useRef } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { IoIosArrowDown } from "react-icons/io";
import { RiArrowRightUpLine } from "react-icons/ri";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import { projects } from "@/work/projectsData";
import Button from "@/components/ui/Button";

interface ItemProps {
    title: string;
    year: string;
    content: ReactNode;
    isOpen: boolean;
    onClick: () => void;
}

function AccordionItem({ title, year, content, isOpen, onClick }: ItemProps) {
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
                <div className="flex flex-1 items-baseline justify-between ">
                    <span className="md:text-lg font-semibold group-hover:underline animate-title-text">{title}</span>
                    <span className="text-xs md:text-sm text-neutral-500">{year}</span>
                </div>
                <IoIosArrowDown
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
    const container = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.from(".animate-title-text", {
            y: "50%",
            autoAlpha: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power4.out",
            clearProps: "all"
        });
    }, { scope: container });

    return (
        <div ref={container} className="border-y divide-y">
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
                                                <RiArrowRightUpLine />
                                            </a>
                                        </Button>
                                    )}
                                    {project.githubUrl && (
                                        <Button asChild variant="link" size="link">
                                            <a href={project.githubUrl} target="_blank" rel="noreferrer">
                                                {t(`work.projects.${project.id}.links.github`)}
                                                <RiArrowRightUpLine />
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