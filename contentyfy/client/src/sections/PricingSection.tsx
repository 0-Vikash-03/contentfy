'use client'

import SectionTitle from "../components/SectionTitle";
import { DollarSignIcon, RocketIcon, CrownIcon } from "lucide-react";
import { motion } from "framer-motion";
import api from "../configs/api";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function PricingSection() {
    const { user } = useAuth();

    const plans = [
        {
            icon: DollarSignIcon,
            title: "Starter Plan",
            price: 9,
            features: [
                "10 AI Thumbnails/day",
                "5 Video Ideas/day",
                "5 Script generations/day",
                "5 Blog generations/day",
                "Basic templates",
                "Standard quality"
            ]
        },
        {
            icon: RocketIcon,
            title: "Pro Plan",
            price: 19,
            features: [
                "Unlimited Thumbnails",
                "20 Video Ideas/day",
                "20 Scripts/day",
                "20 Blog generations/day",
                "Advanced templates",
                "HD quality output",
                "Faster AI processing"
            ]
        },
        {
            icon: CrownIcon,
            title: "Premium Plan",
            price: 39,
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
            popular: true
        }
    ];

    const handlePayment = async (plan: any) => {
        const toastId = toast.loading(`Processing payment for ${plan.title}...`);

        try {
            const res = await api.post("/api/payment/pay", {
                plan: plan.title,
                amount: plan.price,
                userId: user?._id || "guest"
            });

            const data = res.data;

            if (data.status === "success") {
                localStorage.setItem("userPlan", plan.title);
                localStorage.setItem("txnId", data.transactionId);

                toast.success(`Payment Successful! Plan: ${plan.title}`, { id: toastId });
            } else {
                toast.error("Payment Failed!", { id: toastId });
            }

        } catch (error: any) {
            console.error("Payment Error:", error);
            toast.error(error?.response?.data?.message || "Server error processing payment.", { id: toastId });
        }
    };

    return (
        <div id="pricing" className="px-4 md:px-16 lg:px-24 xl:px-32 py-24 bg-white">

            <SectionTitle
                text1="Our Pricing"
                text2="Simple Plans for Creators"
                text3="AI tools for thumbnails, videos, scripts & blogs."
            />

            <div className="flex flex-wrap justify-center gap-8 mt-20">

                {plans.map((item, index) => {
                    const Icon = item.icon;

                    return (
                        <motion.div
                            key={index}
                            initial={{ y: 100, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className={`w-72 p-6 text-center rounded-2xl transition-all duration-300
                            ${item.popular
                                ? "border-2 border-blue-600 shadow-xl scale-105"
                                : "border border-gray-200 shadow-sm"
                            }`}
                        >

                            {/* Popular Tag */}
                            {item.popular && (
                                <p className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full inline-block mb-2">
                                    Most Popular
                                </p>
                            )}

                            <div className="flex justify-center mb-4">
                                <Icon className="w-10 h-10 text-blue-600" />
                            </div>

                            <h3 className="text-xl font-semibold">
                                {item.title}
                            </h3>

                            <p className="text-blue-600 font-semibold mt-2">
                                ${item.price} / month
                            </p>

                            {/* FEATURES LIST */}
                            <ul className="mt-4 text-sm text-gray-600 text-left space-y-2">
                                {item.features.map((feature: string, i: number) => (
                                    <li key={i}>✅ {feature}</li>
                                ))}
                            </ul>

                            <button
                                onClick={() => handlePayment(item)}
                                className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 cursor-pointer transition"
                            >
                                Buy Now
                            </button>

                        </motion.div>
                    );
                })}

            </div>
        </div>
    );
}
