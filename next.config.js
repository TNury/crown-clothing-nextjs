// /** @type {import('next').NextConfig} */
// module.exports = {
//   reactStrictMode: false,
//   experimental: {
//     appDir: true,
//   },
// };

module.exports = {
  reactStrictMode: true,
  experimental: {
    serverActions: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
      },
    ],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'graphql-tag/loader',
        },
      ],
    });

    return config;
  },
};
