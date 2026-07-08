// @ts-check
// Import the MDX plugin
const withMDX = require('@next/mdx')();
 
/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
    images: {
        remotePatterns: [
          { protocol: 'https', hostname: 'img.icons8.com' },
          { protocol: 'https', hostname: 'images.unsplash.com' },
          { protocol: 'https', hostname: 'plus.unsplash.com' },
          { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
        ],
      },
  }
   
// Use the MDX plugin
module.exports = withMDX(nextConfig);