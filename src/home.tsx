import { IoLocationOutline } from "react-icons/io5";
import { FaLinkedin } from "react-icons/fa";
import { IoLogoGithub } from "react-icons/io";
import { FiMail } from "react-icons/fi";
import Tabs from "./components/tabs.tsx";
import PreviousProjects from "./components/previous-projects.tsx";
import { useTranslation } from "react-i18next";

const Home = () => {
    const { t } = useTranslation();

    return (
        <>
            <section className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold">{t("home.greeting")}</h1>
                <div className="inline-flex items-center text-muted-foreground font-sm">
                    <IoLocationOutline/>
                    <p>{t("home.location")}</p>
                </div>
                <p>{t("home.about")}</p>
                <div
                    className="flex gap-2 text-xl text-muted-foreground *:cursor-pointer *:transition-colors *:hover:text-primary">
                    <a href="https://www.linkedin.com/in/patrick-lund-haugen-6776092ab/" target="_blank"><FaLinkedin/></a>
                    <a href="https://github.com/PatrickLundHaugen" target="_blank"><IoLogoGithub/></a>
                    <a href="mailto:patricklundhaugen@gmail.com"><FiMail/></a>
                </div>
            </section>
            <section>
                <Tabs />
            </section>
            <section>
                <PreviousProjects />
            </section>
        </>
    )
}

export default Home;