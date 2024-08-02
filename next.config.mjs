/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "http",
                hostname: "194.238.16.213",
                port: "1122",
                pathname: "**",
            },
            {
                protocol: "http",
                hostname: "localhost",
                port: "3000",
                pathname: "**",
            },
        ],
    },
};

export default nextConfig;
