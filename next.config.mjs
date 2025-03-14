/** @type {import('next').NextConfig} */
const nextConfig = {
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
