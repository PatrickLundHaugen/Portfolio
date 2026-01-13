import { useRef } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";

import Logo from "/src/assets/logo/logo.svg?react";
import ToggleLanguage from "@/languages/ToggleLanguage";
import Button from "@/components/ui/Button";

gsap.registerPlugin(SplitText);

export default function Header() {
    const { t, i18n } = useTranslation();
    const scope = useRef<HTMLElement>(null);
    const animation = useRef<gsap.core.Tween | null>(null);

    useGSAP(() => {
        const split = new SplitText(".contact-text-rotation", {
            type: "chars"
        });

        animation.current = gsap.to(split.chars, {
            rotationY: 360,
            duration: 0.5,
            stagger: 0.05,
            ease: "power4.out",
            paused: true,
        });
    }, { scope, dependencies: [i18n.language] });

    const handleMouseEnter = () => {
        animation.current?.restart();
    };

    return (
        <header ref={scope} className="animate-header inline-flex flex-wrap justify-between">
            <Link to="/" aria-label="Home">
                <Logo className="size-12 text-primary shrink-0" />
            </Link>
            <div className="inline-flex gap-2">
                <ToggleLanguage />
                <Button asChild className="text-lg gap-0">
                    <a
                        key={i18n.language}
                        href="mailto:patricklundhaugen@gmail.com"
                        onMouseEnter={handleMouseEnter}
                        className="contact-text-rotation"
                        aria-label={t("header.contact")}
                    >
                        {t("header.contact")}
                    </a>
                </Button>
            </div>
        </header>
    );
}