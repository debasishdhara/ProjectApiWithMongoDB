const express = require('express');
const fs = require('fs');
const path = require('path');
const pluralize = require('pluralize');

const allRoutes = express.Router();
const routesPath = path.join(__dirname);

const router = express.Router();

let routeJson = {};
fs.readdirSync(routesPath).forEach(file => {
  if (file === 'index.js') return; // skip this file

  const filePath = path.join(routesPath, file);
  const stat = fs.statSync(filePath);

  if (stat.isFile() && file.endsWith('Routes.js')) {
    const routeDefs = require(filePath); // userPath, etc.

    const name = file.replace('Routes.js', '');
    let baseRoutePath;
    if (['refreshtoken', 'default'].includes(name.toLowerCase())) {
      baseRoutePath = '/';
    } else {
      baseRoutePath = '/' + pluralize(name.toLowerCase());
    }


    // Loop through route definitions like "/users": { get, post }
    Object.entries(routeDefs).forEach(([routePath, methods], index1) => {
      let currentMethods = methods;
      Object.entries(methods).forEach(([method, config], index2) => {
        // need only omitting the functions from the config
        const { functions, ...restConfig } = config;
        currentMethods[method] = restConfig;

        if (config.functions && Array.isArray(config.functions)) {
          // Register the route to the router
          router[method.toLowerCase()](routePath, ...config.functions);
        }
      });
      routeJson[`${routePath}`] = currentMethods;
    });

    allRoutes.use(baseRoutePath, router);
  }
});

module.exports = {
  allRoutes,
  routeJson
};
