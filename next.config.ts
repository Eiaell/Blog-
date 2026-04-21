import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // transformers.js se importa dinamicamente en el cliente (browser usa
  // onnxruntime-web / WASM). El onnxruntime-node (354MB) viene como peer
  // pero nunca se ejecuta server-side — lo excluimos del trace para que
  // la serverless function no lo incluya y rebase los 250MB de Vercel.
  serverExternalPackages: ['@huggingface/transformers', 'onnxruntime-node'],
  outputFileTracingExcludes: {
    '*': [
      'node_modules/@huggingface/transformers/**',
      'node_modules/onnxruntime-node/**',
      'node_modules/onnxruntime-common/**',
    ],
  },
};

export default nextConfig;
