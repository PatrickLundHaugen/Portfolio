import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";

import Header from "@/components/Header";
import Home from "@/components/Home";
const ProjectDetail = lazy(() => import("@/work/ProjectDetail"));
const NotFound = lazy(() => import("@/components/NotFound"));

export default function App() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <div className="h-screen flex flex-col gap-4 p-4">
            <Header />
            <main className="flex-1">
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