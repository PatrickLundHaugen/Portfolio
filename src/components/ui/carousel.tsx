"use client"

import React from "react"
import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react"
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { cn } from "@/lib/utils"
import { Button } from "./button"

export type CarouselApi = UseEmblaCarouselType[1]

type CarouselProps = {
    opts?: Parameters<typeof useEmblaCarousel>[0]
    plugins?: Parameters<typeof useEmblaCarousel>[1]
    setApi?: (api: CarouselApi) => void
    className?: string
    children?: React.ReactNode
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
    return React.useContext(CarouselContext)!
}

export function Carousel({ opts, plugins, setApi, className, children, ...props }: CarouselProps & React.ComponentProps<"div">) {
    const [carouselRef, api] = useEmblaCarousel(opts, plugins)
    const [canScrollPrev, setCanScrollPrev] = React.useState(false)
    const [canScrollNext, setCanScrollNext] = React.useState(false)

    const onSelect = React.useCallback((api?: CarouselApi) => {
        if (!api) return
        setCanScrollPrev(api.canScrollPrev())
        setCanScrollNext(api.canScrollNext())
    }, [])

    const scrollPrev = React.useCallback(() => api?.scrollPrev(), [api])
    const scrollNext = React.useCallback(() => api?.scrollNext(), [api])

    React.useEffect(() => {
        if (!api) return
        setApi?.(api)

        onSelect(api)

        api.on("reInit", onSelect)
        api.on("select", onSelect)

        return () => {
            api?.off("select", onSelect)
            api?.off("reInit", onSelect)
        }
    }, [api, setApi, onSelect])

    return (
        <CarouselContext.Provider value={{ carouselRef, api, scrollPrev, scrollNext, canScrollPrev, canScrollNext }}>
            <div className={cn("relative", className)} {...props}>
                {children}
            </div>
        </CarouselContext.Provider>
    )
}

export function CarouselContent({ className, ...props }: React.ComponentProps<"div">) {
    const { carouselRef } = useCarousel()

    return (
        <div ref={carouselRef} className={cn("overflow-hidden", className)}>
            <div className={cn("flex -ml-4", className)} {...props} />
        </div>
    )
}

export function CarouselItem({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div className={cn("min-w-0 shrink-0 grow-0 basis-full pl-4", className)} {...props} />
    )
}

export function CarouselPrevious({ className, ...props }: React.ComponentProps<typeof Button>) {
    const { scrollPrev, canScrollPrev } = useCarousel()

    if (!canScrollPrev) return null

    return (
        <Button
            onClick={scrollPrev}
            variant="outline"
            size="icon"
            className={cn("absolute size-8 rounded-full top-1/2 left-4 md:-left-10 -translate-y-1/2", className)}
            {...props}
        >
            <IoIosArrowBack />
            <span className="sr-only">Previous slide</span>
        </Button>
    )
}

export function CarouselNext({ className, ...props }: React.ComponentProps<typeof Button>) {
    const { scrollNext, canScrollNext } = useCarousel()

    if (!canScrollNext) return null

    return (
        <Button
            onClick={scrollNext}
            variant="outline"
            size="icon"
            className={cn("absolute size-8 rounded-full top-1/2 right-4 md:-right-10 -translate-y-1/2", className)}
            {...props}
        >
            <IoIosArrowForward />
            <span className="sr-only">Next slide</span>
        </Button>
    )
}
