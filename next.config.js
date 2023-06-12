/** @type {import('next').NextConfig} */

const nextTranslate = require("next-translate-plugin");

module.exports = nextTranslate({
  reactStrictMode: true,
  images: {
    loader: "default",
    //domains: ["localhost"],
    domains: ["inv.ptzsite.ru", "localhost"],
  },
});

/*const nextConfig = {

}

module.exports = nextConfig
*/
