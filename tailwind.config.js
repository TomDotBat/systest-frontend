/** @type {import('tailwindcss').Config} */

import defaultTheme from "tailwindcss/defaultTheme.js";
import forms from "@tailwindcss/forms";

export default {
    darkMode: "media",
    theme: {
        extend: {
            fontFamily: {
                sans: ["Poppins", ...defaultTheme.fontFamily.sans]
            }
        }
    },
    content: ["./src/**/*.{html,svelte,js}"],
    plugins: [forms],
    safelist: [
        "text-gray-400",
        "bg-sky-500",
        "bg-green-100", "text-green-800",
        "bg-red-100", "text-red-800",
        "bg-blue-100", "text-blue-800",
        "bg-amber-100", "text-amber-800",
        "bg-purple-100", "text-purple-800"
    ]
};