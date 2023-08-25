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
      colors: {
        exloreTitle: 'linear-gradient(to right, #FF343F, #FFE853)',
        main: '#151517',
      },
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
