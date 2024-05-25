import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "🌙 & ☀️" as string,
    description: "Contagem regressiva para o início do nosso relacionamento",
};

interface RootLayoutProps {
    children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
    return (
        <html lang="en">
        <head>
            <title>{metadata.title as string}</title>
            <meta name="description" content={metadata.description as string}/>
            <link rel="icon" href="./favicon.ico" sizes="any"/>
        </head>
        <body className={inter.className}>{children}</body>
        </html>
    );
};

export default RootLayout;
