import tailwind from "tailwindcss";
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";

import tailwindConfig from "./tailwind.config.js";

const ENVIRONMENT = process.env.NODE_ENV;
const DEV_MODE = ENVIRONMENT === "development";

export default {
    plugins: [
        tailwind(tailwindConfig),
        autoprefixer,
        !DEV_MODE && cssnano({
            preset: "default"
        })
    ]
};