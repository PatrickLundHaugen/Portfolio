import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import watchd1 from "../images/watchd-home.png";
import watchd2 from "../images/watchd-search.png";
import watchd3 from "../images/watchd-movie.png";
import watchd4 from "../images/watchd-profile.png";
import { useTranslation } from "react-i18next";
import Autoplay from "embla-carousel-autoplay"
import {Carousel, CarouselContent, CarouselItem, type CarouselApi} from "../components/ui/carousel.tsx";
import {useEffect, useState} from "react";

const Project3 = () => {
    const { t } = useTranslation();

    const [api, setApi] = useState<CarouselApi>()
    const [current, setCurrent] = useState(0)
    const [count, setCount] = useState(0)

    useEffect(() => {
        if (!api) {
            return
        }

        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap() + 1)

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1)
        })
    }, [api])

    return (
        <>
            <Link to="/" className="inline-flex gap-1 items-center cursor-pointer hover:underline"><IoIosArrowBack/>{t("recent-projects.back")}</Link>
            <section className="flex flex-col gap-4">
                <div className="w-full px-8">
                    <Carousel
                        opts={{loop: true}}
                        plugins={[Autoplay({delay: 5000, stopOnInteraction: false,}),]}
                        setApi={setApi}>
                        <CarouselContent>
                            <CarouselItem>
                                <img
                                    src={watchd1}
                                    alt={t("recent-projects.watchd.title")}
                                    className="w-full aspect-2/1 rounded-lg object-contain border"
                                />
                            </CarouselItem>
                            <CarouselItem>
                                <img
                                    src={watchd2}
                                    alt={t("recent-projects.watchd.title")}
                                    className="w-full aspect-2/1 rounded-lg object-contain border"
                                />
                            </CarouselItem>
                            <CarouselItem>
                                <img
                                    src={watchd3}
                                    alt={t("recent-projects.watchd.title")}
                                    className="w-full aspect-2/1 rounded-lg object-contain border"
                                />
                            </CarouselItem>
                            <CarouselItem>
                                <img
                                    src={watchd4}
                                    alt={t("recent-projects.watchd.title")}
                                    className="w-full aspect-2/1 rounded-lg object-contain border"
                                />
                            </CarouselItem>
                        </CarouselContent>
                    </Carousel>
                    <div className="flex justify-center gap-2 py-2">
                        {[...Array(count)].map((_, index) => (
                            <div
                                key={index}
                                className={`size-2 rounded-full transition-all ${
                                    index === current - 1 ? "bg-muted-foreground" : "bg-muted"
                                }`}
                            />
                        ))}
                    </div>
                </div>
                <div>
                    <h1 className="text-2xl font-semibold">{t("recent-projects.watchd.title")}</h1>
                    <p className="text-sm text-muted-foreground">{t("recent-projects.watchd.date")}</p>
                </div>
                <div className="*:my-6 *:text-base/7 text-accent-foreground">
                    <p>{t("recent-projects.watchd.text.section1.text1")}</p>
                    <hr/>
                    <h2 className="text-foreground text-lg font-semibold">{t("recent-projects.watchd.text.section2.title")}</h2>
                    <p>{t("recent-projects.watchd.text.section2.text1")}</p>
                    <p>{t("recent-projects.watchd.text.section2.text2")}</p>
                    <hr/>
                    <h2 className="text-foreground text-lg font-semibold">{t("recent-projects.watchd.text.section3.title")}</h2>
                    <p>{t("recent-projects.watchd.text.section3.text1")}</p>
                    <hr/>
                    <h2 className="text-foreground text-lg font-semibold">{t("recent-projects.watchd.text.section4.title")}</h2>
                    <p>{t("recent-projects.watchd.text.section4.text1")}</p>
                </div>
            </section>
        </>
    )
}

export default Project3;