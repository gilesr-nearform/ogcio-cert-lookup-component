import { createTheme } from '@ogcio/design-system-tailwind';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/@govie-ds/react/dist/**/*.{js,mjs}',
  ],
  theme: createTheme(),
};
