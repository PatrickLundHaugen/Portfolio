import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Logo from "/src/assets/logo/logo.svg?react";
import ToggleLanguage from "@/languages/ToggleLanguage";
import Button from "@/components/ui/Button";

export default function Header() {
    const { t, i18n } = useTranslation();
    const scope = useRef<HTMLElement>(null);
    const animationRef = useRef<{ restart: () => void } | null>(null);
    const splitRef = useRef<{ revert: () => void } | null>(null);

    useEffect(() => {
        let mounted = true;

        const loadGSAP = async () => {
            const [{ gsap }, { SplitText }] = await Promise.all([
                import("gsap"),
                import("gsap/SplitText")
            ]);

            if (!mounted || !scope.current) return;

            gsap.registerPlugin(SplitText);

            const split = new SplitText(".contact-text-rotation", {
                type: "chars"
            });

            splitRef.current = split;

            animationRef.current = gsap.to(split.chars, {
                rotationY: 360,
                duration: 0.5,
                stagger: 0.05,
                ease: "power4.out",
                paused: true,
            });
        };

        if ("requestIdleCallback" in window) {
            requestIdleCallback(() => loadGSAP());
        } else {
            setTimeout(loadGSAP, 200);
        }

        return () => {
            mounted = false;
            splitRef.current?.revert();
        };
    }, [i18n.language]);

    const handleMouseEnter = () => {
        animationRef.current?.restart();
    };

    return (
        <header ref={scope} className="animate-header inline-flex flex-wrap justify-between">
            <Link to="/" aria-label="Home">
                <Logo className="size-12 text-primary shrink-0" />
            </Link>
            <div className="hidden md:block text-lg font-medium tracking-tight">
                <p>{t("header.createdBy")}</p>
                <p className="text-neutral-500">{t("home.firstName")}</p>
            </div>
            <div className="hidden md:block text-lg font-medium tracking-tight">
                <p>{t("header.basedIn")}</p>
                <p className="text-neutral-500">{t("home.location")}</p>
            </div>
            <div className="inline-flex gap-2">
                <ToggleLanguage />
                <Button asChild className="text-lg gap-0 h-12">
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