/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "http",
                hostname: "194.238.16.213",
                port: "1122",
                pathname: "/user/**",
            },
        ],
    },
};

export default nextConfig;
