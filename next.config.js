/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: false,
  images: {
    domains: ["pokeapi.co", "raw.githubusercontent.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pokeapi.co",
        port: "",
        pathname: "/api/v2/pokemon/**",
      },
    ],
  },
};

//https://pokeapi.co/api/v2/pokemon
