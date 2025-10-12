// Simple script to run admin panel in development
// This sets the URL to admin route before starting the dev server

const { exec } = require('child_process');

// Set environment variable to indicate admin mode
process.env.VITE_ADMIN_MODE = 'true';

// Start the dev server
const devServer = exec('npm run dev', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error}`);
    return;
  }
  console.log(stdout);
  if (stderr) {
    console.error(stderr);
  }
});

devServer.stdout.on('data', (data) => {
  console.log(data);
});

devServer.stderr.on('data', (data) => {
  console.error(data);
});

console.log('🚀 Starting Admin Panel in development mode...');
console.log('📱 Navigate to http://localhost:5173/admin/login to access the admin panel');
console.log('🔑 Demo credentials: admin@cyberverse.com / admin123');