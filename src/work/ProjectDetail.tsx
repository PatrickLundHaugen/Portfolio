import { useState, useEffect, useCallback, useMemo } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Autoplay from "embla-carousel-autoplay";
import { ArrowUpRight, Maximize, X } from "lucide-react";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    type CarouselApi,
    CarouselPrevious,
    CarouselNext
} from "@/components/ui/Carousel";
import Button from "@/components/ui/Button";
import { projects } from "@/work/projectsData";

export default function ProjectDetail() {
    const { t } = useTranslation();
    const { projectId } = useParams<{ projectId: string }>();

    const project = projects.find(p => p.id === projectId);

    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);
    const [count, setCount] = useState(0);

    const [isFullscreen, setIsFullscreen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [dialogApi, setDialogApi] = useState<CarouselApi>();
    const [dialogCurrent, setDialogCurrent] = useState(0);

    const openFullscreen = useCallback(() => {
        setSelectedIndex(current - 1);
        setIsFullscreen(true);
    }, [current]);

    const closeFullscreen = useCallback(() => {
        setIsFullscreen(false);
    }, []);

    useEffect(() => {
        if (isFullscreen) {
            document.body.style.overflow = "hidden";
            return () => {
                document.body.style.overflow = "unset";
            };
        }
    }, [isFullscreen]);

    useEffect(() => {
        if (!api) return;

        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap() + 1);

        const onSelect = () => {
            setCurrent(api.selectedScrollSnap() + 1);
        };

        api.on("select", onSelect);
        return () => {
            api.off("select", onSelect);
        };
    }, [api]);

    useEffect(() => {
        if (!dialogApi) return;

        setDialogCurrent(dialogApi.selectedScrollSnap() + 1);

        const onSelect = () => {
            setDialogCurrent(dialogApi.selectedScrollSnap() + 1);
        };

        dialogApi.on("select", onSelect);
        return () => {
            dialogApi.off("select", onSelect);
        };
    }, [dialogApi]);

    const { hasMultipleImages, hasSingleImage, content, relatedProjects } = useMemo(() => {
        if (!project) return { hasMultipleImages: false, hasSingleImage: false, content: [], relatedProjects: [] };

        const hasMultipleImages = project.images && project.images.length > 1;
        const hasSingleImage = project.images && project.images.length === 1;
        const content = t(`work.projects.${project.id}.content`, { returnObjects: true }) as (string | { type: "heading"; text: string })[];

        const currentIndex = projects.findIndex(p => p.id === projectId);
        const prevProject = projects[(currentIndex - 1 + projects.length) % projects.length];
        const nextProject = projects[(currentIndex + 1) % projects.length];
        const relatedProjects = [prevProject, nextProject];

        return { hasMultipleImages, hasSingleImage, content, relatedProjects };
    }, [project, projectId, t]);

    const getProjectDescription = useCallback((projectId: string) => {
        const content = t(`work.projects.${projectId}.content`, { returnObjects: true }) as (string | { type: "heading"; text: string })[];
        return typeof content[0] === "string" ? content[0] : "";
    }, [t]);

    if (!project) {
        return <Navigate to="/404" replace />;
    }

    return (
        <>
            <section className="pt-[25vh]">
                <h1 className="h-fit lg:sticky lg:top-8 text-3xl lg:text-4xl lg:w-[calc((100%-8rem)/3)] font-bold tracking-tight uppercase mb-6">
                    {t(`work.projects.${project.id}.title`)}
                </h1>
                <div key={project.id} className="flex flex-col lg:grid lg:grid-cols-3 gap-8 lg:gap-16">
                    <div className="h-fit lg:sticky lg:top-24 text-sm animate-left-col">
                        <p className="font-medium tracking-tight uppercase border-b mb-3">
                            {t("work.aboutProject")}
                        </p>

                        <div className="flex flex-wrap justify-between border-b border-dashed py-2">
                            <p className="font-semibold tracking-tight uppercase">{t("work.timeframe")}:</p>
                            <p>{t(`work.projects.${project.id}.date`)}, {t(`work.projects.${project.id}.year`)}</p>
                        </div>

                        <div className="flex flex-wrap justify-between gap-2 border-b border-dashed py-2">
                            <p className="font-semibold tracking-tight uppercase">{t("work.links")}:</p>
                            <div className="inline-flex flex-wrap space-x-2">
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

                        {project.images && project.images.length > 0 && (
                            <div className="space-y-4 mt-8">
                                {hasSingleImage ? (
                                    <div className="relative group">
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={openFullscreen}
                                            className="absolute top-3 right-3 z-10"
                                            aria-label="View Fullscreen"
                                        >
                                            <Maximize />
                                        </Button>
                                        <div className="overflow-hidden rounded-lg">
                                            <img
                                                src={project.images[0]}
                                                alt={t(`work.projects.${project.id}.title`)}
                                                loading="eager"
                                                decoding="async"
                                                fetchPriority="high"
                                                className="w-full aspect-video object-cover transition-transform duration-250 scale-110 group-hover:scale-100"
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <div className="relative group">
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                onClick={openFullscreen}
                                                className="absolute top-3 right-3 z-10"
                                                aria-label="View Fullscreen"
                                            >
                                                <Maximize />
                                            </Button>

                                            <Carousel
                                                opts={{ loop: true }}
                                                plugins={[Autoplay({ delay: 3000, stopOnInteraction: false })]}
                                                setApi={setApi}
                                            >
                                                <CarouselContent>
                                                    {project.images.map((img, index) => (
                                                        <CarouselItem key={index}>
                                                            <div className="overflow-hidden rounded-lg">
                                                                <img
                                                                    src={img}
                                                                    loading={index === 0 ? "eager" : "lazy"}
                                                                    decoding="async"
                                                                    fetchPriority={index === 0 ? "high" : "auto"}
                                                                    alt={`${t(`work.projects.${project.id}.title`)} - Image ${index + 1}`}
                                                                    className="w-full aspect-video object-cover transition-transform duration-250 scale-110 group-hover:scale-100"
                                                                />
                                                            </div>
                                                        </CarouselItem>
                                                    ))}
                                                </CarouselContent>
                                            </Carousel>
                                        </div>

                                        {count > 0 && (
                                            <div className="flex justify-center gap-2">
                                                {[...Array(count)].map((_, index) => (
                                                    <div
                                                        key={index}
                                                        className={`size-2 rounded-full transition-colors ${
                                                            index === current - 1 ? "bg-neutral-700" : "bg-neutral-300"
                                                        }`}
                                                    />
                                                ))}
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col lg:col-span-2 pb-32">
                        <p className="text-sm font-medium tracking-tight uppercase border-b">
                            {t("work.article")}
                        </p>

                        <div className="animate-content-col xl:mr-64">
                            {content.map((item, index) => {
                                if (typeof item === "string") {
                                    return (
                                        <p
                                            key={index}
                                            className="text-base/7 text-neutral-600 my-6"
                                            style={{ animationDelay: `${index * 100}ms` }}
                                        >
                                            {item}
                                        </p>
                                    );
                                }
                                if (item.type === "heading") {
                                    return (
                                        <h2
                                            key={index}
                                            className="font-medium"
                                            style={{ animationDelay: `${index * 100}ms` }}
                                        >
                                            {item.text}
                                        </h2>
                                    );
                                }
                                return null;
                            })}
                        </div>
                    </div>
                </div>

                {isFullscreen && project.images && (
                    <div
                        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/50 p-4 backdrop-blur-xs"
                        onClick={closeFullscreen}
                    >
                        <Button
                            size="icon"
                            className="fixed top-4 right-4 z-50"
                            onClick={closeFullscreen}
                            aria-label="Close Fullscreen"
                        >
                            <X className="size-6" />
                        </Button>

                        <div
                            className="max-w-6xl space-y-8"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {hasMultipleImages ? (
                                <Carousel
                                    setApi={setDialogApi}
                                    opts={{
                                        startIndex: selectedIndex,
                                        loop: true
                                    }}
                                >
                                    <CarouselContent>
                                        {project.images.map((img, index) => (
                                            <CarouselItem key={index} className="flex items-center justify-center">
                                                <img
                                                    src={img}
                                                    loading="lazy"
                                                    decoding="async"
                                                    alt={`${t(`work.projects.${project.id}.title`)} - Image ${index + 1}`}
                                                    className="rounded-xl object-contain"
                                                />
                                            </CarouselItem>
                                        ))}
                                    </CarouselContent>

                                    <CarouselPrevious />
                                    <CarouselNext />
                                </Carousel>
                            ) : (
                                <img
                                    src={project.images[0]}
                                    loading="lazy"
                                    decoding="async"
                                    alt={t(`work.projects.${project.id}.title`)}
                                    className="rounded-xl object-contain"
                                />
                            )}

                            {hasMultipleImages && (
                                <div className="flex justify-center gap-2">
                                    {project.images.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => dialogApi?.scrollTo(index)}
                                            className={`size-2 rounded-full transition-colors ${
                                                index === dialogCurrent - 1 ? "bg-neutral-300" : "bg-neutral-700"
                                            }`}
                                            aria-label={`Go to image ${index + 1}`}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </section>
            <section>
                <p className="text-sm font-medium tracking-tight uppercase border-b mb-3">{t("work.seeMore")}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 my-6">
                    {relatedProjects.map((relatedProject) => (
                        <Link
                            key={relatedProject.id}
                            to={relatedProject.to}
                            className="group lg:flex lg:gap-4 space-y-4"
                        >
                            <div className="aspect-video w-full lg:w-1/3 overflow-hidden rounded-md shrink-0">
                                <img
                                    src={relatedProject.image}
                                    alt={t(`work.projects.${relatedProject.id}.title`)}
                                    loading="lazy"
                                    className="size-full object-cover transition-transform duration-250 scale-110 hover:scale-100"
                                />
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold group-hover:underline">
                                    {t(`work.projects.${relatedProject.id}.title`)}
                                </h2>
                                <p className="text-sm text-neutral-600 line-clamp-2 mt-2 lg:w-4/5">
                                    {getProjectDescription(relatedProject.id)}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </>
    );
}