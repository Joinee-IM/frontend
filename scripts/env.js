import fs from 'fs';
import { exec } from 'child_process';

fs.readFile('.env', 'utf8', function (err) {
  if (err)
    exec(`cp .env.example .env`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return;
      }
      if (stderr) {
        if (!stderr.includes('match any configured task')) console.log(stderr);
        return;
      }
      console.log(`stdout: ${stdout}`);
    });
});
