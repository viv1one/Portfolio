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
          // Allow Unsplash premium images used in post thumbnails
          { protocol: 'https', hostname: 'plus.unsplash.com' },
        ],
      },
  }
   
// Use the MDX plugin
module.exports = withMDX(nextConfig);