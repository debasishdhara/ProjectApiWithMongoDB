const fs = require('fs');
const path = require('path');
const { createFile } = require('./file-create-and-update');

// Get the router name passed as an argument
const routerName = process.argv[2];

// Validate the router name
if (!routerName) {
  console.error('Please provide a router name.');
  process.exit(1);
}

if(routerName === 'default'){
  console.error('Please provide a router name other than default.');
  process.exit(1);
}

// Convert to Sentence Case
const toSentenceCase = (str) => str.charAt(0).toUpperCase() + str.slice(1);


// Define the path to paste
const dirPath = __dirname+'/../';
// for model creation 
const modelsourcePath = path.join(__dirname, 'baseStructure', 'models', 'base.js');
const modeldestinationPath = path.join(dirPath, 'src', 'models', `${toSentenceCase(routerName)}.js`);
(async () => {
  const resultOfModel = await createFile(modelsourcePath, modeldestinationPath,routerName);
})();
// for controller creation 
const controllersourcePath = path.join(__dirname, 'baseStructure', 'controllers', 'baseController.js');
const controllerdestinationPath = path.join(dirPath, 'src', 'controllers', `${routerName}Controller.js`);
(async () => {
  const resultOfController = await createFile(controllersourcePath, controllerdestinationPath,routerName);
})();
// for router creation 
const routesourcePath = path.join(__dirname, 'baseStructure', 'routers', 'baseRouters.js');
const routedestinationPath = path.join(dirPath, 'src', 'routes', `${routerName}Routes.js`);
(async () => {
  const resultOfRoute = await createFile(routesourcePath, routedestinationPath,routerName);
})();