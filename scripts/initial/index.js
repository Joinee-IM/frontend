import { exec } from 'child_process';
import inquirer from 'inquirer';

inquirer
  .prompt([
    {
      type: 'confirm',
      name: 'check',
      message: 'Enter Y for automatic initialization',
      default: false,
    },
  ])
  .then(({ check }) => {
    if (check)
      exec(`yarn husky && node scripts/initial/env`, (error, stdout, stderr) => {
        if (error) console.error(`❌ Error: ${error.message}`);
        if (stderr) console.error('❌', stderr);
        console.log(stdout);
        console.log('💡 Remember to fill in the .env file!');
      });
  });
