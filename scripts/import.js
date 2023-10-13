import chokidar from 'chokidar';
import fs from 'fs';

const directories = [
  'components',
  'constants',
  'contexts',
  'hooks',
  'modules',
  'services',
  'utils',
];

// Initialize watcher.
const watcher = chokidar.watch(
  directories.map((dir) => `src/${dir}/**/*.tsx`),
  {
    ignored: /(^|[/\\])\../, // ignore dotfiles
    ignoreInitial: true,
    persistent: true,
  },
);

const importDefault = (record) => {
  const log = console.log.bind(console);
  log(`File ${record} has been added`);
  const [path, name] = record.match(/\/([^/]+)\.tsx$/);
  const index = record.replace(path, '/index.ts');
  const importStatement = `import ${name} from '.${path}';\n`;

  fs.appendFile(index, importStatement, (err) => {
    if (err) {
      log(`Error writing to ${index}:`, err);
    }
  });
};

// Something to use when events are received.
const log = console.log.bind(console);
// Add event listeners.
watcher
  .on('add', importDefault)
  .on('change', (path) => log(`File ${path} has been changed`))
  .on('unlink', (path) => log(`File ${path} has been removed`));

// More possible events.
watcher
  .on('addDir', (path) => log(`Directory ${path} has been added`))
  .on('unlinkDir', (path) => log(`Directory ${path} has been removed`))
  .on('error', (error) => log(`Watcher error: ${error}`))
  .on('ready', () => log('Initial scan complete. Ready for changes'));
