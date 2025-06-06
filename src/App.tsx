import { Routes, Route } from "react-router-dom";
import Home from "./home.tsx";
import Navbar from "./sections/navbar.tsx";
import Footer from "./sections/footer.tsx";
import Project1 from "./projects/project1.tsx";
import Project2 from "./projects/project2.tsx";

const App = () => {
    return (
        <div className="flex flex-col justify-center max-w-180 px-4 m-auto">
            <Navbar/>
            <main className="flex flex-col gap-16">
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/project1" element={<Project1/>}/>
                    <Route path="/project2" element={<Project2/>}/>
                </Routes>
            </main>
            <Footer/>
        </div>
    )
}

export default App
