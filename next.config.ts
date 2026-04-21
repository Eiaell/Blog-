import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // transformers.js se importa dinamicamente en el cliente.
  // Lo marcamos como external para que Next no intente bundlearlo server-side.
  serverExternalPackages: ['@huggingface/transformers'],
};

export default nextConfig;
