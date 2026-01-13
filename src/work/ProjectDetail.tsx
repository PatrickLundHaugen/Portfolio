import { useState, useEffect, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Autoplay from "embla-carousel-autoplay";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
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
import NotFound from "@/components/NotFound";

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

    const main = useRef<HTMLElement>(null);
    const container = useRef<HTMLDivElement>(null);

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

    useGSAP(() => {
        gsap.from(".animate-left-col > *", {
            duration: 0.5,
            x: -200,
            autoAlpha: 0,
            stagger: 0.05,
            ease: "power4.out",
        });

        if (container.current) {
            gsap.from(container.current.children, {
                y: 50,
                autoAlpha: 0,
                duration: 0.5,
                stagger: 0.1,
                ease: "power4.out",
                clearProps: "all"
            });
        }
    }, { scope: main });

    if (!project) {
        return <NotFound />;
    }

    const hasMultipleImages = project.images && project.images.length > 1;
    const hasSingleImage = project.images && project.images.length === 1;

    const content = t(`work.projects.${project.id}.content`, { returnObjects: true }) as (string | { type: "heading"; text: string })[];

    return (
        <section ref={main} className="pt-[25vh]">
            <h1 className="text-3xl lg:text-4xl font-bold tracking-tight uppercase mb-6">
                {t(`work.projects.${project.id}.title`)}
            </h1>
            <div className="flex flex-col lg:grid lg:grid-cols-3 gap-8 lg:gap-16">
                <div className="h-fit lg:sticky lg:top-10 text-sm animate-left-col">
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
                                            loading="lazy"
                                            decoding="async"
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
                                                                loading="lazy"
                                                                decoding="async"
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

                <div className="flex flex-col lg:col-span-2">
                    <p className="text-sm font-medium tracking-tight uppercase border-b">
                        {t("work.article")}
                    </p>

                    <div ref={container} className="xl:mr-64">
                        {content.map((item, index) => {
                            if (typeof item === "string") {
                                return <p key={index} className="text-base/7 text-neutral-600 my-6">{item}</p>;
                            }
                            if (item.type === "heading") {
                                return (
                                    <h2 key={index} className="font-medium">
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
    );
}