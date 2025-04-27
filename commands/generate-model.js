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
  if (fs.existsSync(modeldestinationPath)) {
    console.log(`⚠️ Model already exists at ${modeldestinationPath}. Skipping creation.`);
  } else {
    const resultOfModel = await createFile(modelsourcePath, modeldestinationPath, routerName);
    console.log(`✅ Model created at ${modeldestinationPath}`);
  }
})();
