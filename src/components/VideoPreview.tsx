import { useEffect, useRef, useState } from "react";
import cn from "@/lib/utils.ts";

const EDGE_PADDING = 16;
const DESKTOP_QUERY = "(min-width: 768px)";
const MUX_PLAYBACK_ID = "I5TltI6BN9klXArbYprWyBxHRSiYj5NoQTbnSpRq01Rk";

export default function VideoPreview() {
    const motionRef = useRef<HTMLDivElement>(null);
    const boxRef = useRef<HTMLDivElement>(null);
    const boxWidthRef = useRef(0);
    const screenWidthRef = useRef(0);
    const latestXRef = useRef<number | undefined>(undefined);
    const rafRef = useRef<number | null>(null);
    const [hidden, setHidden] = useState(false);

    useEffect(() => {
        const handleToggle = (e: Event) => {
            setHidden((e as CustomEvent<{ open: boolean }>).detail.open);
        };
        window.addEventListener("accordion:toggle", handleToggle);
        return () => window.removeEventListener("accordion:toggle", handleToggle);
    }, []);

    useEffect(() => {
        const el = motionRef.current;
        const box = boxRef.current;
        if (!el || !box) return;

        const hoverMq = window.matchMedia("(hover: hover) and (pointer: fine)");
        const sizeMq = window.matchMedia(DESKTOP_QUERY);

        const updateDimensions = () => {
            boxWidthRef.current = box.offsetWidth;
            screenWidthRef.current = document.documentElement.clientWidth;
        };
        updateDimensions();

        const computeX = (clientX?: number) => {
            if (!sizeMq.matches || !hoverMq.matches || clientX === undefined) return 0;
            const screenW = screenWidthRef.current;
            const boxW = boxWidthRef.current;
            const ratio = Math.min(1, Math.max(0, clientX / screenW));
            const trackWidth = Math.max(0, screenW - boxW - EDGE_PADDING * 2);
            return EDGE_PADDING + ratio * trackWidth + boxW / 2 - screenW / 2;
        };

        const setX = (x: number) => {
            el.style.transform = `translateX(${x}px)`;
        };

        const scheduleFrame = () => {
            if (rafRef.current) return;
            rafRef.current = requestAnimationFrame(() => {
                setX(computeX(latestXRef.current));
                rafRef.current = null;
            });
        };

        const handleMouseMove = (e: MouseEvent) => {
            latestXRef.current = e.clientX;
            scheduleFrame();
        };
        const handleChange = () => {
            updateDimensions();
            scheduleFrame();
        };

        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        window.addEventListener("resize", handleChange);
        hoverMq.addEventListener("change", handleChange);
        sizeMq.addEventListener("change", handleChange);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("resize", handleChange);
            hoverMq.removeEventListener("change", handleChange);
            sizeMq.removeEventListener("change", handleChange);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, []);

    return (
        <div
            className={cn(
                "grid w-full overflow-hidden transition-[grid-template-rows,opacity] ease-out",
                hidden
                    ? "grid-rows-[0fr] opacity-0 duration-0 [content-visibility:hidden]"
                    : "grid-rows-[1fr] opacity-100 duration-250"
            )}
        >
            <div className="min-h-0 mx-auto">
                <div ref={motionRef} className="transition-transform duration-500 ease-out will-change-transform">
                    <div
                        ref={boxRef}
                        className="relative aspect-video overflow-hidden rounded-xl will-change-transform [transform:translateZ(0)]
                        w-[clamp(240px,calc(100vw-2rem),36rem)] min-[540px]:w-[clamp(300px,45vw,28rem)] lg:w-[clamp(300px,45vw,36rem)]"
                    >
                        <video
                            src={`https://stream.mux.com/${MUX_PLAYBACK_ID}/highest.mp4`}
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}