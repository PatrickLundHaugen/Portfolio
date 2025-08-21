import { useTranslation } from "react-i18next";
import { IconLinks } from "./icon-links.tsx";

export function Footer() {
    const { t } = useTranslation();

    return (
        <footer className="flex justify-between align-center py-16 text-muted-foreground">
            <p className="text-sm">{t("footer.author")}</p>
            <IconLinks />
        </footer>
    )
}
