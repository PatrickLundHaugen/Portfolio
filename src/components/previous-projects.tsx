import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import imageGenerator from "../images/image-generator.png";
import dashboard from "../images/dashboard.png";
import watchd from "../images/watchd-home.png";
import { useTranslation } from "react-i18next";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext,
    type CarouselApi,
} from "./ui/carousel";

const projects = [
    {
        to: "/project1",
        image: imageGenerator,
        titleKey: "recent-projects.image-generator.title",
        descKey: "recent-projects.image-generator.description",
    },
    {
        to: "/project2",
        image: dashboard,
        titleKey: "recent-projects.dashboard.title",
        descKey: "recent-projects.dashboard.description",
    },
    {
        to: "/project3",
        image: watchd,
        titleKey: "recent-projects.watchd.title",
        descKey: "recent-projects.watchd.description",
    },
];

const PreviousProjects = () => {
    const { t } = useTranslation();
    const visibleCount = 2;
    const [api, setApi] = useState<CarouselApi>();
    const [currentSnap, setCurrentSnap] = useState(0);

    const onSelect = useCallback((carouselApi: CarouselApi) => {
        if (!carouselApi) return;
        setCurrentSnap(carouselApi.selectedScrollSnap());
    }, []);

    useEffect(() => {
        if (!api) return;
        onSelect(api);
        api.on("reInit", onSelect);
        api.on("select", onSelect);

        return () => {
            api.off("select", onSelect);
        };
    }, [api, onSelect]);

    const displayedProjects = [...projects].reverse();

    return (
        <div>
            <h2 className="text-xl font-semibold mb-2">{t("recent-projects.title")}</h2>

            <Carousel
                setApi={setApi}
                opts={{
                    align: "start",
                    slidesToScroll: 1,
                }}
                className="relative"
            >
                <CarouselContent>
                    {displayedProjects.map((proj, index) => (
                        <CarouselItem
                            key={index}
                            className="md:basis-1/2"
                        >
                            <Link
                                to={proj.to}
                                className="group flex flex-col gap-2 border rounded-xl p-4 shadow cursor-pointer h-full"
                            >
                                <img
                                    src={proj.image}
                                    alt={t(proj.titleKey)}
                                    className="w-full aspect-2/1 rounded-lg object-cover"
                                />
                                <h3 className="group-hover:underline font-medium leading-none tracking-tight">
                                    {t(proj.titleKey)}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    {t(proj.descKey)}
                                </p>
                            </Link>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious/>
                <CarouselNext/>

                <div className="flex justify-center mt-4 gap-2">
                    {projects.map((_, index) => (
                        <div
                            key={index}
                            className={`size-2 rounded-full transition-all ${
                                index >= currentSnap && index < currentSnap + visibleCount
                                    ? "bg-muted-foreground"
                                    : "bg-muted"
                            }`}
                        />
                    ))}
                </div>
            </Carousel>
        </div>
    );
};

export default PreviousProjects;