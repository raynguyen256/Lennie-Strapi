const strapiUrl = new URL(process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: strapiUrl.protocol.replace(":", ""),
        hostname: strapiUrl.hostname,
        port: strapiUrl.port,
        pathname: "/uploads/**",
      },
      new URL("http://localhost:1337/uploads/**"),
    ],
  },
};

export default nextConfig;
