import { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

import Header from "@/components/Header";
import VideoPreview from "@/components/VideoPreview";

export default function App() {
    const { pathname } = useLocation();
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        const lenis = new Lenis({
            autoRaf: true,
            duration: 1,
        });

        lenisRef.current = lenis;

        return () => {
            lenis.destroy();
        };
    }, []);

    useEffect(() => {
        if (lenisRef.current) {
            lenisRef.current.scrollTo(0, { immediate: true });
        } else {
            window.scrollTo(0, 0);
        }
    }, [pathname]);

    const isProjectDetail = pathname.startsWith("/project/");

    return (
        <div
            className={`flex flex-col gap-4 p-4 ${
                isProjectDetail ? "min-h-screen" : "h-screen"
            }`}
        >
            <Header />
            <main className="flex-1 w-full">
                <VideoPreview />
                <Outlet />
            </main>
        </div>
    );
}