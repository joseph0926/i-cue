import baseTailwindConfig from '@doc-q/config/tailwind/tailwind.config';
import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@doc-q/ui/src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  presets: [baseTailwindConfig],
} satisfies Config;
