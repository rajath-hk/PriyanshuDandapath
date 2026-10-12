/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['"Plus Jakarta Sans"', 'sans-serif'],
                handwriting: ['"Caveat"', 'cursive'],
                display: ['"Outfit"', '"Plus Jakarta Sans"', 'sans-serif'],
                editorial: ['"Outfit"', '"Plus Jakarta Sans"', 'sans-serif'],
            },
            colors: {
                paper: {
                    50: '#FDFBF7',
                    100: '#FAF7F0',
                    200: '#F4EFE6',
                    300: '#E9E2D5',
                },
                ink: {
                    DEFAULT: '#18181B',
                    muted: '#52525B',
                    subtle: '#71717A',
                },
                tape: {
                    yellow: '#FEF08A',
                    blue: '#BFDBFE',
                    pink: '#FBCFE8',
                    green: '#BBF7D0',
                }
            }
        },
    },
    plugins: [],
}
