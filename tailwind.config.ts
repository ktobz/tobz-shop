import type { Config } from "tailwindcss";
import daisyui from "daisyui";

const config: Config = {
    content: [
        "./src/pages/**/*.{ts,tsx}",
        "./src/components/**/*.{ts,tsx}",
        "./src/app/**/*.{ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                turquoise: {
                    50: '#f0fdfa',
                    100: '#ccfbf1',
                    200: '#99f6e4',
                    300: '#5eead4',
                    400: '#2dd4bf',
                    500: '#14b8a6',
                    600: '#0d9488',
                    700: '#0f766e',
                    800: '#115e59',
                    900: '#134e4a',
                },
            },
        },
    },
    plugins: [daisyui],
    daisyui: {
        themes: [
            {
                turquoise: {
                    "primary": "#14b8a6",
                    "secondary": "#ffffff",
                    "accent": "#0d9488",
                    "neutral": "#3d4451",
                    "base-100": "#ffffff",
                    "info": "#2097C7",
                    "success": "#10b981",
                    "warning": "#FBBD23",
                    "error": "#ef4444",
                },
            },
        ],
    },
};
export default config;
