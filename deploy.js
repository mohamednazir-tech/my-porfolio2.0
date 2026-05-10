const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Create a simple deployment script
console.log('Starting deployment...');

try {
  // Build the project
  console.log('Building project...');
  execSync('npm run build', { stdio: 'inherit' });

  // Create pages directory if it doesn't exist
  const pagesDir = path.join(__dirname, 'pages');
  if (!fs.existsSync(pagesDir)) {
    fs.mkdirSync(pagesDir, { recursive: true });
  }

  // Copy HTML files to dist
  console.log('Copying HTML files...');
  if (fs.existsSync(path.join(__dirname, 'pages', 'privacy.html'))) {
    fs.copyFileSync(
      path.join(__dirname, 'pages', 'privacy.html'),
      path.join(__dirname, 'dist', 'privacy.html')
    );
  }
  
  if (fs.existsSync(path.join(__dirname, 'pages', 'terms.html'))) {
    fs.copyFileSync(
      path.join(__dirname, 'pages', 'terms.html'),
      path.join(__dirname, 'dist', 'terms.html')
    );
  }

  console.log('Files copied successfully!');
  console.log('Now run: git add dist/ && git commit -m "Update dist" && git push origin main');
  
} catch (error) {
  console.error('Deployment failed:', error.message);
  process.exit(1);
}
