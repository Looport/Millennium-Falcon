import type {Config} from 'tailwindcss'

const config: Config = {
  content: [
    './src/ui/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [],
  theme: {
    extend: {
    },
    fontFamily: {
      body: ['Inter', 'sans-serif'],
    },
  },
}

export default config
