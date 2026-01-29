import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Using next/font instead of @fontsource
import { Providers } from "@/components/Providers";
import "@/index.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "1shopapp",
    description: "Shopify App UI",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" data-theme="turquoise">
            <body className={inter.className}>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
