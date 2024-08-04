import fs from 'fs';
import path from 'path';

export default {
  swcMinify: true, // Ensure SWC is used for minification
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
      };
    }
    return config;
  },
  server: {
    https: {
      key: fs.readFileSync(path.join(process.cwd(), '192.168.219.188+3-key.pem')),
      cert: fs.readFileSync(path.join(process.cwd(), '192.168.219.188+3.pem')),
    },
  },
};
