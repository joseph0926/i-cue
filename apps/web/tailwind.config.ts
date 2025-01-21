import baseTailwindConfig from '@icue/config/tailwind/tailwind.config';
import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@icue/ui/src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  presets: [baseTailwindConfig],
} satisfies Config;
