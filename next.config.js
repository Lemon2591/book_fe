/* eslint-disable */
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

dotenv.config();
// development or other environment
const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === "development";

module.exports = withBundleAnalyzer({
  serverRuntimeConfig: {
    // Will only be available on the server side
    rootDir: path.join(__dirname, "./"),
    PORT: isDev ? 5525 : process.env.PORT || 8879,
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    staticFolder: "/public",
    isDev, // Pass through env variables
  },
  images: {
    domains: ["api.truyen247.site", "truyen247.site"],
    formats: ["image/avif", "image/webp"],
  },
});
