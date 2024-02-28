/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "dataspan.frontend-home-assignment.s3",
      "dataspan.frontend-home-assignment.s3.eu-central-1.amazonaws.com",
    ],
  },
};

export default nextConfig;
