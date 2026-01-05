import { useTranslation } from "react-i18next";
import { motion } from "motion/react";

import Tabs from "@/components/Tabs";
import RecentProjects from "@/components/RecentProjects";

export default function About() {
    const { t } = useTranslation();

    return (
        <>
            <motion.section
                className="space-y-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            >
                <h1 className="text-2xl font-bold">{t("home.greeting")}</h1>
                <p className="text-6xl font-semibold tracking-tight leading-none">{t("home.about")}</p>
            </motion.section>
            <section>
                <Tabs />
            </section>
            <section>
                <RecentProjects />
            </section>
        </>
    )
}
