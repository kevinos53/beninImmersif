// @ts-check
import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import tailwind from '@astrojs/tailwind';
import playformCompress from '@playform/compress';
// https://astro.build/config
export default defineConfig({
    integrations: [vue(), tailwind(), playformCompress()]
});