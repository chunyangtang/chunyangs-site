// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

import remarkMath from 'remark-math';

import rehypeKatex from 'rehype-katex';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [react()],

  markdown: {
    // // Choose a syntax highlighting theme
    // // Options: 'dracula', 'github-dark', 'one-dark-pro', 'nord'
    // shikiConfig: {
    //   theme: 'dracula',
    //   wrap: true, // Prevents horizontal scrolling on mobile
    // },
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  },
});