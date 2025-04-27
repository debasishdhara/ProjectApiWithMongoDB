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

// for controller creation 
const controllersourcePath = path.join(__dirname, 'baseStructure', 'controllers', 'baseController.js');
const controllerdestinationPath = path.join(dirPath, 'src', 'controllers', `${routerName}Controller.js`);

(async () => {
  if (fs.existsSync(controllerdestinationPath)) {
    console.log(`⚠️ Controller already exists at ${controllerdestinationPath}. Skipping creation.`);
  } else {
    const resultOfController = await createFile(controllersourcePath, controllerdestinationPath, routerName);
    console.log(`✅ Controller created at ${controllerdestinationPath}`);
  }
})();