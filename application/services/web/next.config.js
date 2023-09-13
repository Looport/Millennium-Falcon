/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {ignoreDuringBuilds: true},
  typescript: {ignoreBuildErrors: true},
  cleanDistDir: true
}

module.exports = nextConfig
