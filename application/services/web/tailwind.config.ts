import type {Config} from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [],
  theme: {
    extend: {
      gridTemplateRows: {
        home: 'repeat(10, 1fr)',
      },
    },
    fontFamily: {
      body: ['Inter', 'sans-serif'],
    },
  },
}
export default config
