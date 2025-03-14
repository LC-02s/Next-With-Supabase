/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
    serverActions: {
      bodySizeLimit: '5mb',
    },
  },
  async rewrites() {
    return [
      {
        source: '/storage/:path*',
        destination: `${process.env.SUPABASE_URL}/storage/v1/object/public/${process.env.SUPABASE_BUCKET_NAME}/:path*`,
      },
    ]
  },
}

export default nextConfig
