/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: "default",
    //domains: ["localhost"],
	domains: [process.env.NEXT_PUBLIC_STRAPI_API_URL],
	//domains: ["https://inv.ptzsite.ru"],
	remotePatterns: [
		{
		  protocol: 'https',
		  hostname: process.env.NEXT_PUBLIC_STRAPI_API_URL,
		},
	  ],
  },
}

module.exports = nextConfig
