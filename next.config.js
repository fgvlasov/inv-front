const { withNextVideo } = require('next-video/process')

/** @type {import('next').NextConfig} */

const nextTranslate = require('next-translate-plugin');

module.exports = nextTranslate({
  reactStrictMode: false,
  //reactStrictMode: true,
  images: {
    loader: 'default',
    domains: ['admin.invert.studio'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
});

/*const nextConfig = {

}

module.exports = nextConfig
*/
