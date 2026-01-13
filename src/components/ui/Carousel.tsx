"use client"

import React from "react"
import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react"
import { ChevronLeft, ChevronRight } from "lucide-react";

import cn from "@/lib/utils"
import Button from "@/components/ui/Button"

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
        <div className={cn("shrink-0 basis-full pl-4", className)} {...props} />
    )
}

export function CarouselPrevious({ className, ...props }: React.ComponentProps<typeof Button>) {
    const { scrollPrev, canScrollPrev } = useCarousel()

    return (
        <Button
            onClick={scrollPrev}
            size="icon"
            disabled={!canScrollPrev}
            className={cn("absolute top-1/2 left-6 -translate-y-1/2", className)}
            {...props}
        >
            <ChevronLeft className="size-6" />
            <span className="sr-only">Previous slide</span>
        </Button>
    )
}

export function CarouselNext({ className, ...props }: React.ComponentProps<typeof Button>) {
    const { scrollNext, canScrollNext } = useCarousel()

    return (
        <Button
            onClick={scrollNext}
            size="icon"
            disabled={!canScrollNext}
            className={cn("absolute top-1/2 right-6 -translate-y-1/2", className)}
            {...props}
        >
            <ChevronRight className="size-6" />
            <span className="sr-only">Next slide</span>
        </Button>
    )
}