import watchd1 from "@/assets/images/watchd-home.webp";
import watchd2 from "@/assets/images/watchd-search.webp";
import watchd3 from "@/assets/images/watchd-movie.webp";
import watchd4 from "@/assets/images/watchd-profile.webp";
import dashboard from "@/assets/images/dashboard.webp";
import imageGenerator from "@/assets/images/image-generator.webp";

export interface Project {
    id: string;
    to: string;
    image: string;
    images?: string[];
    productUrl?: string;
    githubUrl?: string;
}

export const projects: Project[] = [
    {
        id: "watchd",
        to: "/project/watchd",
        image: watchd1,
        images: [watchd1, watchd2, watchd3, watchd4],
        productUrl: "https://watchd-psi.vercel.app/",
        githubUrl: "https://github.com/PatrickLundHaugen/Watchd",
    },
    {
        id: "dashboard",
        to: "/project/dashboard",
        image: dashboard,
        images: [dashboard],
        productUrl: "https://dashboard-patricklh.vercel.app/",
        githubUrl: "https://github.com/PatrickLundHaugen/dashboard",
    },
    {
        id: "imageGenerator",
        to: "/project/imageGenerator",
        image: imageGenerator,
        images: [imageGenerator],
        productUrl: "https://image-generator-kohl-one.vercel.app/",
        githubUrl: "https://github.com/PatrickLundHaugen/Image-Generator",
    }
];