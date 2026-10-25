import type { IFooter } from "../types";

export const footerData: IFooter[] = [
    {
        title: "Product",
        links: [
            { name: "Home", href: "/" },
            { name: "Features", href: "/#features" },
            { name: "Pricing", href: "/#pricing" },
            { name: "Contact", href: "/#contact" },
        ]
    },
    {
        title: "AI Tools",
        links: [
            { name: "AI Thumbnail", href: "/generate" },
            { name: "Script AI", href: "/content-generator" },
            { name: "Blog AI", href: "/blog-generator" },
            { name: "Video AI", href: "/video-generator" },
        ]
    },
    {
        title: "Account",
        links: [
            { name: "My Generations", href: "/my-generation" },
            { name: "My Videos", href: "/my-videos" },
            { name: "Login", href: "/login" },
        ]
    }
];
