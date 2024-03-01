/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'think-ai-challenge-uploader.s3.amazonaws.com',
              pathname: '**',
            },
          ],
    }
};

export default nextConfig;
