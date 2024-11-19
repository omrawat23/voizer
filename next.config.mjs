/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'retell-utils-public.s3.us-west-2.amazonaws.com'
          }
        ]
    }
};

export default nextConfig;