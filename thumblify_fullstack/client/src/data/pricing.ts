import type { IPricing } from "../types";

export const pricingData: IPricing[] = [
    {
        name: "Starter Plan",
        price: 9,
        period: "month",
        features: [
            "10 AI Thumbnails/day",
            "5 Video Ideas/day",
            "5 Script generations/day",
            "5 Blog generations/day",
            "Basic templates",
            "Standard quality"
        ],
        mostPopular: false
    },
    {
        name: "Pro Plan",
        price: 19,
        period: "month",
        features: [
            "Unlimited Thumbnails",
            "20 Video Ideas/day",
            "20 Scripts/day",
            "20 Blog generations/day",
            "Advanced templates",
            "HD quality output",
            "Faster AI processing"
        ],
        mostPopular: false
    },
    {
        name: "Premium Plan",
        price: 39,
        period: "month",
        features: [
            "Unlimited Thumbnails",
            "Unlimited Video Ideas",
            "Unlimited Scripts",
            "Unlimited Blogs",
            "All premium templates",
            "4K quality export",
            "No watermark",
            "Fastest AI speed",
            "Priority support"
        ],
        mostPopular: true
    }
];
