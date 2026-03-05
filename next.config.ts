import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['picsum.photos', 'api.dicebear.com'], // 외부 이미지 도메인
  },
};

export default nextConfig;
