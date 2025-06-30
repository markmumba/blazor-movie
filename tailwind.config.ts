import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            animation: {
                'grain': 'grain 8s steps(10) infinite',
                'spin-slow': 'spin 8s linear infinite',
                'spin-slow-reverse': 'spin 8s linear infinite reverse',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'fade-in': 'fadeIn 0.5s ease-out forwards',
                'fade-in-delay': 'fadeIn 0.5s ease-out 0.2s forwards',
                'fade-in-delay-2': 'fadeIn 0.5s ease-out 0.4s forwards',
                'gradient': 'gradient 8s linear infinite',
                'float': 'float 6s ease-in-out infinite',
                'twinkle': 'twinkle 4s ease-in-out infinite',
                'shooting-star': 'shootingStar 3s linear infinite',
                'shimmer': 'shimmer 1.2s infinite linear'
            },
            keyframes: {
                shimmer: {
                    '0%': { transform: 'translateX(-100%)' },
                    '100%': { transform: 'translateX(100%)' },
                },
                grain: {
                    '0%, 100%': { transform: 'translate(0, 0)' },
                    '10%': { transform: 'translate(-5%, -5%)' },
                    '20%': { transform: 'translate(-10%, 5%)' },
                    '30%': { transform: 'translate(5%, -10%)' },
                    '40%': { transform: 'translate(-5%, 15%)' },
                    '50%': { transform: 'translate(-10%, 5%)' },
                    '60%': { transform: 'translate(15%, 0)' },
                    '70%': { transform: 'translate(0, 10%)' },
                    '80%': { transform: 'translate(3%, 15%)' },
                    '90%': { transform: 'translate(-10%, 10%)' },
                },
                fadeIn: {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                gradient: {
                    '0%, 100%': {
                        'background-size': '200% 200%',
                        'background-position': 'left center',
                    },
                    '50%': {
                        'background-size': '200% 200%',
                        'background-position': 'right center',
                    },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
                    '25%': { transform: 'translateY(-10px) rotate(2deg)' },
                    '50%': { transform: 'translateY(0) rotate(0deg)' },
                    '75%': { transform: 'translateY(10px) rotate(-2deg)' },
                },
                twinkle: {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0.3' },
                },
                shootingStar: {
                    '0%': {
                        transform: 'translateY(0) translateX(0) rotate(45deg)',
                        opacity: '1',
                    },
                    '100%': {
                        transform: 'translateY(100vh) translateX(100vw) rotate(45deg)',
                        opacity: '0',
                    },
                },
            },
        },
    },
    plugins: [],
};

export default config; 