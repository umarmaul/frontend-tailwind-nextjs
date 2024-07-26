import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "TheWizards",
    description:
        "TheWizards is a web application for monitoring and predicting natural hazards such as landslides, floods, and wildfires. It uses machine learning algorithms to analyze data from various sources such as weather stations, satellite imagery, and sensors to predict the likelihood of a hazard occurring in a particular location. The application also provides real-time monitoring of hazards and alerts users to potential dangers.",
    icons: {
        icon: "/favicon.ico",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="scroll-smooth">
            <body className={inter.className}>{children}</body>
        </html>
    );
}
