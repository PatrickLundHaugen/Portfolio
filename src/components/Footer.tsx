import { useTranslation } from "react-i18next";

import Button from "@/components/ui/Button";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
    const { t } = useTranslation();

    return (
        <footer className="flex flex-wrap gap-4 mt-4 lg:mt-6 text-xs md:text-sm">
            <Button asChild variant="link" size="link">
                <a href="https://www.linkedin.com/in/patrick-lund-haugen-6776092ab/" target="_blank" rel="noopener noreferrer">
                    {t("footer.linkedin")}
                    <ArrowUpRight />
                </a>
            </Button>
            <Button asChild variant="link" size="link">
                <a href="https://github.com/PatrickLundHaugen" target="_blank" rel="noopener noreferrer">
                    {t("footer.github")}
                    <ArrowUpRight />
                </a>
            </Button>
        </footer>
    )
}