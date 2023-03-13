import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import postcss from "postcss";

export default defineConfig({
  plugins: [svelte()],
  css: {
    postcss
  }
});