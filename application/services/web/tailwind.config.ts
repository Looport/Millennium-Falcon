import type {Config} from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './assets/vendor/preline/preline.js',
  ],
  plugins: [
    // eslint-disable-next-line import/no-commonjs
    require('@tailwindcss/forms'),
    // eslint-disable-next-line import/no-commonjs
    require('preline/plugin'),
  ],
  theme: {
    extend: {},
    fontFamily: {
      body: ['Inter', 'sans-serif'],
    },
  },
}

export default config
