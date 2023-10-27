import { exec } from 'child_process';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

const argv = yargs(hideBin(process.argv)).argv;

if (argv.d || argv.p) {
  const NODE_ENV = argv.d ? 'development' : 'production';
  exec(`export NODE_ENV=${NODE_ENV} && node scripts/fetch/schema`, (error, stdout, stderr) => {
    if (error) console.error(`❌ Error: ${error.message}`);
    if (stderr) console.error('❌', stderr);
    console.log(stdout);
  });
} else {
  console.error('❌ choose an option for environment: d or p');
}
