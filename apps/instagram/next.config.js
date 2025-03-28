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
        source: `/images/${process.env.SUPABASE_BUCKET_NAME}/:path*`,
        destination: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${process.env.SUPABASE_BUCKET_NAME}/:path*`,
      },
    ]
  },
}

export default nextConfig
