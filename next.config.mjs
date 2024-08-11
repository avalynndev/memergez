/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: ["@napi-rs/image"],
    },
};

export default nextConfig;
