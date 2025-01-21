import baseTailwindConfig from '@icue/config/tailwind/tailwind.config';
import type { Config } from 'tailwindcss';

export default {
  content: ['./src/components/**/*.{js,ts,jsx,tsx,mdx}'],
  presets: [baseTailwindConfig],
} satisfies Config;
