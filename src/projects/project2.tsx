import { IoIosArrowBack } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { flushSync } from "react-dom";
import imageGenerator from "../images/image-generator.png";
import { useTranslation } from "react-i18next";

const Project2 = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <>
            <Link to="/" onClick={() => {
                document.startViewTransition(() => {
                    flushSync(() => {
                        navigate("/");
                    });
                });
            }} className="inline-flex gap-1 items-center cursor-pointer hover:underline"><IoIosArrowBack/>{t("recent-projects.back")}</Link>
            <section className="flex flex-col gap-4">
                <div className="w-full px-8">
                    <img
                        src={imageGenerator}
                        alt={t("recent-projects.image-generator.title")}
                        className="w-full aspect-2/1 rounded-lg object-cover border"
                        style={{viewTransitionName: "project2-image"}}
                    />
                </div>
                <div>
                    <h1 className="text-2xl font-semibold">{t("recent-projects.image-generator.title")}</h1>
                    <p className="text-sm text-muted-foreground">{t("recent-projects.image-generator.date")}</p>
                </div>
                <div className="*:my-6 *:text-base/7 text-accent-foreground">
                    <p>{t("recent-projects.image-generator.text.section1.text1")}</p>
                    <p>{t("recent-projects.image-generator.text.section1.text2")}</p>
                    <p>{t("recent-projects.image-generator.text.section1.text3")}</p>
                    <hr/>
                    <h2 className="text-foreground text-lg font-semibold">{t("recent-projects.image-generator.text.section2.title")}</h2>
                    <p>{t("recent-projects.image-generator.text.section2.text1")}</p>
                    <hr/>
                    <h2 className="text-foreground text-lg font-semibold">{t("recent-projects.image-generator.text.section3.title")}</h2>
                    <p>{t("recent-projects.image-generator.text.section3.text1")}</p>
                    <p>{t("recent-projects.image-generator.text.section3.text2")}</p>
                </div>
            </section>
        </>
    )
}

export default Project2;