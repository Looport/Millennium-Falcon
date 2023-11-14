import type {Config} from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  plugins: [],
  theme: {
    extend: {},
    fontFamily: {
      body: ['Inter', 'sans-serif'],
    },
  },
}

export default config
