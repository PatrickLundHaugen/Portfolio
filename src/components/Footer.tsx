import { useTranslation } from "react-i18next";
import { RiArrowRightUpLine } from "react-icons/ri";

import Button from "@/components/ui/Button";

export default function Footer() {
    const { t } = useTranslation();

    return (
        <footer className="flex flex-wrap gap-4 mt-4 lg:mt-8 text-xs md:text-sm">
            <Button asChild variant="link" size="link">
                <a href="https://www.linkedin.com/in/patrick-lund-haugen-6776092ab/" target="_blank" rel="noopener noreferrer">
                    {t("footer.linkedin")}
                    <RiArrowRightUpLine />
                </a>
            </Button>
            <Button asChild variant="link" size="link">
                <a href="https://github.com/PatrickLundHaugen" target="_blank" rel="noopener noreferrer">
                    {t("footer.github")}
                    <RiArrowRightUpLine />
                </a>
            </Button>
        </footer>
    )
}