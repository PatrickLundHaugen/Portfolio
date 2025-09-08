"use client"

import * as React from "react"
import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react"
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { cn } from "../../lib/utils"
import { Button } from "./button"

type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

type CarouselProps = {
    opts?: CarouselOptions
    plugins?: CarouselPlugin
    setApi?: (api: CarouselApi) => void
}

type CarouselContextProps = {
    carouselRef: ReturnType<typeof useEmblaCarousel>[0]
    api: ReturnType<typeof useEmblaCarousel>[1]
    scrollPrev: () => void
    scrollNext: () => void
    canScrollPrev: boolean
    canScrollNext: boolean
} & CarouselProps

const CarouselContext = React.createContext<CarouselContextProps | null>(null)

function useCarousel() {
    const context = React.useContext(CarouselContext)
    if (!context) throw new Error("useCarousel must be used within a <Carousel />")
    return context
}

function Carousel({
                      opts,
                      setApi,
                      plugins,
                      className,
                      children,
                      ...props
                  }: React.ComponentProps<"div"> & CarouselProps) {
    const [carouselRef, api] = useEmblaCarousel(opts, plugins)
    const [canScrollPrev, setCanScrollPrev] = React.useState(false)
    const [canScrollNext, setCanScrollNext] = React.useState(false)

    const onSelect = React.useCallback((api: CarouselApi) => {
        if (!api) return
        setCanScrollPrev(api.canScrollPrev())
        setCanScrollNext(api.canScrollNext())
    }, [])

    const scrollPrev = React.useCallback(() => api?.scrollPrev(), [api])
    const scrollNext = React.useCallback(() => api?.scrollNext(), [api])

    React.useEffect(() => {
        if (!api) return
        if (setApi) setApi(api)

        onSelect(api)

        api.on("reInit", onSelect)
        api.on("select", onSelect)

        return () => {
            api?.off("select", onSelect)
            api?.off("reInit", onSelect)
        }
    }, [api, setApi, onSelect])

    return (
        <CarouselContext.Provider
            value={{
                carouselRef,
                api,
                opts,
                scrollPrev,
                scrollNext,
                canScrollPrev,
                canScrollNext,
            }}
        >
            <div
                className={cn("relative", className)}
                role="region"
                aria-roledescription="carousel"
                data-slot="carousel"
                {...props}
            >
                {children}
            </div>
        </CarouselContext.Provider>
    )
}

function CarouselContent({ className, ...props }: React.ComponentProps<"div">) {
    const { carouselRef } = useCarousel()

    return (
        <div
            ref={carouselRef}
            className="overflow-hidden"
            data-slot="carousel-content"
        >
            <div className={cn("flex -ml-4", className)} {...props}/>
        </div>
    )
}

function CarouselItem({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            role="group"
            aria-roledescription="slide"
            data-slot="carousel-item"
            className={cn("min-w-0 shrink-0 grow-0 basis-full pl-4", className)}
            {...props}
        />
    )
}

function CarouselPrevious({
                              className,
                              variant = "outline",
                              size = "icon",
                              ...props
                          }: React.ComponentProps<typeof Button>) {
    const { scrollPrev, canScrollPrev } = useCarousel()

    if (!canScrollPrev) return null

    return (
        <Button
            data-slot="carousel-previous"
            variant={variant}
            size={size}
            className={cn("absolute size-8 rounded-full top-1/2 left-4 md:-left-10 -translate-y-1/2", className)}
            onClick={scrollPrev}
            {...props}
        >
            <IoIosArrowBack />
            <span className="sr-only">Previous slide</span>
        </Button>
    )
}

function CarouselNext({
                          className,
                          variant = "outline",
                          size = "icon",
                          ...props
                      }: React.ComponentProps<typeof Button>) {
    const { scrollNext, canScrollNext } = useCarousel()

    if (!canScrollNext) return null

    return (
        <Button
            data-slot="carousel-next"
            variant={variant}
            size={size}
            className={cn("absolute size-8 rounded-full top-1/2 right-4 md:-right-10 -translate-y-1/2", className)}
            onClick={scrollNext}
            {...props}
        >
            <IoIosArrowForward />
            <span className="sr-only">Next slide</span>
        </Button>
    )
}

export {
    type CarouselApi,
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext,
}
