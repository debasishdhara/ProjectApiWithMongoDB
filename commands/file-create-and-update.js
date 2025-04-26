const fs = require('fs').promises;
const pluralize = require('pluralize');

const toSentenceCase = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

async function createFile(sourcePath, destinationPath, routerName){
    console.log('sourcePath',sourcePath);
    console.log('destinationPath',destinationPath);
    console.log('routerName',routerName);
  try {
    let data = await fs.readFile(sourcePath, 'utf8');
    
    if (data.includes('Pbase')) {
      data = data.replace(/Pbase/g, pluralize.plural(routerName));
    }

    if (data.includes('baseM')) {
      data = data.replace(/baseM/g, toSentenceCase(routerName));
    }

    if (data.includes('base')) {
      data = data.replace(/base/g, routerName);
    }

    await fs.writeFile(destinationPath, data, 'utf8');
    console.log(`File created: ${destinationPath}`);
    return true;
  } catch (err) {
    console.error('Error in createFile:', err);
    return false;
  }
};

module.exports = { createFile };