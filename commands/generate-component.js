const fs = require('fs');
const path = require('path');

// Get the router name passed as an argument
const routerName = process.argv[2];

// Validate the router name
if (!routerName) {
  console.error('Please provide a router name.');
  process.exit(1);
}

// Convert to Sentence Case
const toSentenceCase = (str) => str.charAt(0).toUpperCase() + str.slice(1);

function createFile(sourcePath, destinationPath) {
  // Read the base router file
  fs.readFile(sourcePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading source file:', err);
      return;
    }

    // Replace all occurrences of "base" with routerName
    const firstModifiedData = data.replace(/baseM/g, toSentenceCase(routerName));
    const modifiedData = firstModifiedData.replace(/base/g, routerName);
    // Write content to the new router file
    fs.writeFile(destinationPath, modifiedData, 'utf8', (err) => {
      if (err) {
        console.error('Error writing destination file:', err);
        return;
      }
      console.log(`Router file created: ${destinationPath}`);
    });
  });
}
// Define the path to paste
const dirPath = __dirname+'/../';
// for model creation 
const modelsourcePath = path.join(__dirname, 'baseStructure', 'models', 'base.js');
const modeldestinationPath = path.join(dirPath, 'src', 'models', `${toSentenceCase(routerName)}.js`);
createFile(modelsourcePath, modeldestinationPath);

// for controller creation 
const controllersourcePath = path.join(__dirname, 'baseStructure', 'controllers', 'baseController.js');
const controllerdestinationPath = path.join(dirPath, 'src', 'controllers', `${routerName}Controller.js`);
createFile(controllersourcePath, controllerdestinationPath);

// for router creation 
const routesourcePath = path.join(__dirname, 'baseStructure', 'routers', 'baseRouters.js');
const routedestinationPath = path.join(dirPath, 'src', 'routes', `${routerName}Routers.js`);
createFile(routesourcePath, routedestinationPath);
