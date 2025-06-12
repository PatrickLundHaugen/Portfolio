import { Link, useNavigate } from "react-router-dom";
import { flushSync } from "react-dom";
import imageGenerator from "../images/image-generator.png";
import dashboard from "../images/dashboard.png";
import { useTranslation } from "react-i18next";

const RecentProjects = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <>
            <h2 className="text-xl font-semibold mb-2">{t("recent-projects.title")}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link to="/project1" onClick={() => {
                    document.startViewTransition(() => {
                        flushSync(() => {
                            navigate("/project1");
                            window.scrollTo(0, 0);
                        });
                    });
                }}
                      className="group flex flex-col gap-2 border rounded-xl p-4 shadow cursor-pointer">
                    <img
                        src={dashboard}
                        alt={t("recent-projects.dashboard.title")}
                        className="w-full aspect-2/1 rounded-xl object-fit"
                        style={{viewTransitionName: "project1-image"}}
                    />
                    <h3 className="group-hover:underline font-medium leading-none tracking-tight">{t("recent-projects.dashboard.title")}</h3>
                    <p className="text-sm text-muted-foreground">{t("recent-projects.dashboard.description")}</p>
                </Link>
                <Link to="/project2" onClick={() => {
                    document.startViewTransition(() => {
                        flushSync(() => {
                            navigate("/project2");
                            window.scrollTo(0, 0);
                        });
                    });
                }}
                      className="group flex flex-col gap-2 border rounded-xl p-4 shadow cursor-pointer">
                    <img
                        src={imageGenerator}
                        alt={t("recent-projects.image-generator.title")}
                        className="w-full aspect-2/1 rounded-xl object-cover"
                        style={{viewTransitionName: "project2-image"}}
                    />
                    <h3 className="group-hover:underline font-medium leading-none tracking-tight">{t("recent-projects.image-generator.title")}</h3>
                    <p className="text-sm text-muted-foreground">{t("recent-projects.image-generator.description")}</p>
                </Link>
            </div>
        </>
    )
}

export default RecentProjects;