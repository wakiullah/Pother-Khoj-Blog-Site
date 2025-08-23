/** @type {import('next').NextConfig} */
const nextConfig = {

    images: {
        domains: ['ibb.co.com', 'i.ibb.co.com'],
    },
    experimental: {
        serverActions: true,
    },

};

export default nextConfig;
