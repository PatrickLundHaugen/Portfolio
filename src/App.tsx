import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

import Header from "@/components/Header";

export default function App() {
    const { pathname } = useLocation();

    useEffect(() => {
            window.scrollTo(0, 0);
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
                <Outlet />
            </main>
        </div>
    );
}