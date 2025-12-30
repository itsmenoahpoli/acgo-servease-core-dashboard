import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const distPath = join(__dirname, '..', 'dist');
const port = process.env.PORT || 4173;

if (!existsSync(distPath)) {
  console.error('Error: dist directory not found. Please run "npm run build" first.');
  process.exit(1);
}

const serve = spawn('npx', ['serve', '-s', distPath, '-l', port.toString()], {
  stdio: 'inherit',
  shell: true
});

serve.on('error', (error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});

serve.on('exit', (code) => {
  process.exit(code || 0);
});

