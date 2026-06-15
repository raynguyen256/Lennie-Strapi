/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [new URL("http://localhost:1337/uploads/**")],
  },
};

export default nextConfig;
