const fs = require('fs');
const path = require('path');

const models = {};
const modelsDir = path.join(__dirname);

fs.readdirSync(modelsDir).forEach((file) => {
  if (
    file === 'index.js' ||                  // skip self
    path.extname(file) !== '.js' ||         // only .js files
    file.startsWith('.')                    // skip hidden/system files
  ) return;

  const filePath = path.join(modelsDir, file);
  const model = require(filePath);

  // Only add valid mongoose models
  if (model && model.modelName) {
    models[model.modelName] = model;
  }
});

// console.log('Models:', models);  // Debugging step

module.exports = models;
