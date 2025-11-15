/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // nonaktifkan strict mode React
  // typescript: {
  //   ignoreBuildErrors: true, // abaikan error TypeScript saat build
  // },
  output: 'standalone',
};

module.exports = nextConfig;
