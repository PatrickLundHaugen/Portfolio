import watchd from "@/images/watchd-home.webp";
import dashboard from "@/images/dashboard.webp";
import imageGenerator from "@/images/image-generator.webp";

export const projects = [
    {
        to: "/watchd",
        image: watchd,
        titleKey: "work.watchd.title",
        descKey: "work.watchd.text.section1.text1",
        year: "work.watchd.year"
    },
    {
        to: "/dashboard",
        image: dashboard,
        titleKey: "work.dashboard.title",
        descKey: "work.dashboard.text.section1.text1",
        year: "work.dashboard.year"
    },
    {
        to: "/imageGenerator",
        image: imageGenerator,
        titleKey: "work.image-generator.title",
        descKey: "work.image-generator.text.section1.text1",
        year: "work.image-generator.year"
    }
];