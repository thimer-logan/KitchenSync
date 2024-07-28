/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects() {
    return [
      {
        source: "/",
        destination: "/a/storage",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
