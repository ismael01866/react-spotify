const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,

  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')]
  },

  devIndicators: {
    buildActivity: false
  }
};

module.exports = nextConfig;
