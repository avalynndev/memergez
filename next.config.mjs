/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: ["@napi-rs/image"],
    },
    images: {
    remotePatterns: [
        {
            protocol: "https",
            hostname: "i.imgflip.com",
        },
    ],
  },
};

export default nextConfig;
