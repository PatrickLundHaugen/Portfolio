import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

import Home from "@/components/Home";
import Header from "@/components/Header";
import ProjectDetail from "@/work/ProjectDetail";
import NotFound from "@/components/NotFound";

export default function App() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <div className="h-screen flex flex-col gap-4 p-4">
            <Header/>
            <main className="flex-1">
                <Routes>
                    <Route path="/" element={<Home/>} />

                    <Route path="/project/:projectId" element={<ProjectDetail/>} />

                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>
        </div>
    )
}