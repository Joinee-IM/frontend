import { exec } from 'child_process';
import fs from 'fs';

fs.readFile('env/.env', 'utf8', function (err) {
  if (err)
    exec(`cp env/.env.example env/.env`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return;
      }
      if (stderr) {
        if (!stderr.includes('match any configured task')) console.log(stderr);
        return;
      }
      console.log(`🌟 Successfully copy .env.example`);
    });
});
