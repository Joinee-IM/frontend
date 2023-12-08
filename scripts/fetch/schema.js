import { exec } from 'child_process';
import '../../env/loadEnv.cjs';

exec(
  `yarn openapi-zod-client ${process.env.VITE_API_ENDPOINT}/api/openapi.json -o src/services/type.ts`,
  (error, _, stderr) => {
    if (error) console.error(`❌ Error: ${error.message}`);
    if (stderr) console.error('❌', stderr);
  },
);
