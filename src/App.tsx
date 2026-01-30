import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, lazy, Suspense, useRef } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

import Header from "@/components/Header";
import Home from "@/components/Home";
const ProjectDetail = lazy(() => import("@/work/ProjectDetail"));
const NotFound = lazy(() => import("@/components/NotFound"));

export default function App() {
    const { pathname } = useLocation();
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        const lenis = new Lenis({
            autoRaf: true,
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

    const isHome = pathname === "/";

    return (
        <div
            className={`flex flex-col gap-4 p-4 ${
                isHome ? "h-screen" : "min-h-screen"
            }`}
        >
            <Header />
            <main className="flex-1 w-full">
                <Suspense fallback={null}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/project/:projectId" element={<ProjectDetail />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Suspense>
            </main>
        </div>
    );
}