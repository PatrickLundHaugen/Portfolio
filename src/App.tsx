import { Routes, Route } from "react-router-dom";

import { Home } from "./home";
import { Nav } from "./components/nav";
import { Footer } from "./components/footer";
import { Project1 } from "./projects/project1";
import { Project2 } from "./projects/project2";
import { Project3 } from "./projects/project3";
import { ScrollToTop } from "./components/scroll-to-top";

export function App() {

    return (
        <div className="flex flex-col justify-center max-w-180 px-4 m-auto">
            <Nav/>
            <main className="flex flex-col gap-16">
                <ScrollToTop />
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/project1" element={<Project1/>}/>
                    <Route path="/project2" element={<Project2/>}/>
                    <Route path="/project3" element={<Project3/>}/>
                </Routes>
            </main>
            <Footer/>
        </div>
    )
}
