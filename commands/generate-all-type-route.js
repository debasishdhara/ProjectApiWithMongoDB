const fs = require('fs');
const path = require('path');
const pluralize = require('pluralize');
require('module-alias/register');
const readline = require('readline'); // ← ✅ Missing import
const { createFile } = require('./file-create-and-update');
const fsPromises = require('fs').promises; // Notice .promises here!
// Get the router name passed as an argument
const routerType = process.argv[2];
const routerPath = process.argv[3];
const routerName = process.argv[4];
const makeRouteType = process.argv[5];

// Validate the router type
if (!routerType) {
  console.error('Please provide a router type. e.g. "POST", "GET", "PUT", "DELETE"');
  process.exit(1);
}

// validate the router path
if (!routerPath) {
  console.error('Please provide a router path. e.g. "user" - for "/users" & "user:id" - for "/users/:id"');
  process.exit(1);
}

// validate the router name
if (!routerName) {
  console.error('Please provide a router name.');
  process.exit(1);
}

if (makeRouteType) {
  if (makeRouteType === 's') {
    // console.log('makeRouteType',makeRouteType);
  } else {
    console.error('Please provide singluar or plural type route. e.g. "s" - for "user" & "" - for "users"');
    process.exit(1);
  }
}

// Convert to Sentence Case
const toSentenceCase = (str) => str.charAt(0).toUpperCase() + str.slice(1);
function createPathKey(routePath, typeDirect = '') {
  const segments = routePath.replace(/^\/+/, '').split('/');
  let base = '';

  if (typeDirect === 's') {
    base = segments[0];
  } else {
    base = pluralize.plural(segments[0]);
  }
  // Use pluralize to get the plural form of the first segment
  // base = pluralize.plural(segments[0]); // <-- FIXED

  // Convert params (e.g., :id) to just ":id"
  const extras = segments
    .slice(1)
    .map(seg => seg.startsWith(':') ? `:${seg.slice(1)}` : seg)
    .join('/');

  return extras ? `/${base}/${extras}` : `/${base}`;
}

function updateBraceDepth(line, currentDepth) {
  const openCount = (line.match(/{/g) || []).length;
  const closeCount = (line.match(/}/g) || []).length;
  console.log('line', line);
  console.log('openCount', openCount);
  console.log('closeCount', closeCount);
  return currentDepth + openCount - closeCount;
}
function matchJsonKey(line, key) {
  const regex = new RegExp(`["']${key}["']\\s*:\\s*{`);
  return regex.test(line);
}
async function findRouteLineNumber(filePath, targetPath, targetMethod) {
  const rl = readline.createInterface({
    input: fs.createReadStream(filePath),
    crlfDelay: Infinity,
  });

  let lineNumber = 0;
  let insideRoutesObject = false;
  let insideTargetPath = false;
  let insideTargetPathBraceCount = false;
  let braceDepth = 0;
  let targetPathCloseBraceLineNumber = 0;
  let targetPathMatchLine = null;

  let insideTargetMethod = false;
  let insideTargetMethodBraceCount = false;
  let targetMethodCloseBraceLineNumber = 0;
  let targetMethodMatchLine = null;
  let depth = 0;
  let multipleLineComment = false;

  // multiple line comments check
  for await (const line of rl) {
    lineNumber++;
    let trimmed = line.trim();
    if (trimmed.includes('//')) {
      trimmed = trimmed.split('//')[0];
    }
    //check if line has commments
    if (trimmed.startsWith('//')) {
      continue;
    }

    // check if line has multiple line comments
    if (trimmed.includes('/*')) {
      multipleLineComment = true;
    }

    if (multipleLineComment === false) {
      // console.log(trimmed);
      // match the line with target path
      // if (trimmed.startsWith(`${'"'+targetPath+'"'}:`) || trimmed.startsWith(`${"'"+targetPath+'"'}:`)) {
      if (matchJsonKey(trimmed, targetPath)) {
        insideTargetPath = true;
        insideTargetPathBraceCount = true;
        targetPathMatchLine = lineNumber;
      }

      if (insideTargetPath === true && insideTargetPathBraceCount === true) {
        depth = updateBraceDepth(trimmed, depth);
        console.log(depth);
        if (depth === 0) {
          insideTargetPathBraceCount = false;
          targetPathCloseBraceLineNumber = lineNumber;
        }
        // console.log(trimmed);
        // console.log(targetMethod);
        // check method available in the route
        // if (trimmed.startsWith(`${'"'+targetMethod+'"'}:`) || trimmed.startsWith(`${"'"+targetMethod+'"'}:`) || trimmed.startsWith(`${'"'+(targetMethod).toLowerCase()+'"'}:`) || trimmed.startsWith(`${"'"+(targetMethod).toUpperCase()+'"'}:`) ) {
        if (trimmed !== '') {
          if (matchJsonKey(trimmed, targetMethod)) {
            insideTargetMethod = true;
            insideTargetMethodBraceCount = true;
            targetMethodMatchLine = lineNumber;
          } else {
            if (depth === 1) {
              targetMethodCloseBraceLineNumber = lineNumber;
            }
          }
        }
      }
    }
    if (trimmed.includes('*/')) {
      multipleLineComment = false;
    }
  }

  rl.close();
  return { insideRoutesObject, insideTargetPath, targetPathMatchLine, targetPathCloseBraceLineNumber, insideTargetMethod, insideTargetMethodBraceCount, targetMethodMatchLine, targetMethodCloseBraceLineNumber };
}
async function readGetWrapped(filePath,targetPath, targetMethod) {
  try {
    const data = await fsPromises.readFile(filePath, 'utf8');  // Read the JSON file
    const jsonData = JSON.parse(data);                       // Parse JSON
    const getObject = { [targetMethod]: jsonData?.base?.[targetMethod] };           // Wrap 'get' inside an object again
    // console.log(JSON.stringify(getObject, null, 2));         // Pretty-print the wrapped 'get'
    const targetObject = { [targetPath]: getObject };
    return targetObject;
  } catch (error) {
    console.error('Error:', error);
  }
}
(async () => {
  try {
  // Define the path to paste
  const dirPath = __dirname + '/../';
  const routedestinationPath = path.join(dirPath, 'src', 'routes', `${routerName}Routes.js`);
  // convert route path login to "/logins" utiline pluraling pluralize
  const targetPath = createPathKey(routerPath, makeRouteType);
  const targetMethod = routerType.toLowerCase();
  let jsonSourcePath = path.join(__dirname, 'baseStructure', 'routers', 'singleGetRouters.json');
  if((targetMethod).toLowerCase() === 'post') {
    jsonSourcePath = path.join(__dirname, 'baseStructure', 'routers', 'singlePostRouters.json');
  }else if((targetMethod).toLowerCase() === 'put') {
    jsonSourcePath = path.join(__dirname, 'baseStructure', 'routers', 'singlePutRouters.json');
  }else if((targetMethod).toLowerCase() === 'delete') {
    jsonSourcePath = path.join(__dirname, 'baseStructure', 'routers', 'singleDeleteRouters.json');
  }
   // Step 1: Read the JSON file
   const fullJson = await readGetWrapped(jsonSourcePath,targetPath, (targetMethod).toLowerCase());

   console.log(fullJson);
   
    // Step 3: Format the extracted "get" object
    const formattedGetJson = JSON.stringify({ [targetMethod]: fullJson[targetMethod] }, null, 2)
          .split('\n')
          .slice(1, -1) // REMOVE first '{' and last '}'
          .map(line => '  ' + line); // optional indent

  // check if file exists
  if (fs.existsSync(routedestinationPath)) {
    // file exists so find the line number of path like "/logins" user input login then added json in under that json 

    console.log('File exists. Finding line number...');

    // Find the line number of the route
    console.log("targetPath", targetPath);
    console.log("targetMethod", targetMethod);
    console.log("routedestinationPath", routedestinationPath);
    const lineNumber = await findRouteLineNumber(routedestinationPath, targetPath, targetMethod);
    console.log(lineNumber);
  } else {
    console.log(`❌ File not found: ${routedestinationPath}`);
    const routesourcePath = path.join(__dirname, 'baseStructure', 'routers', 'basicRoutes.js');
    // Step 4: Read the target file
    
    const resultOfRoute = await createFile(routesourcePath, routedestinationPath, routerName);
    console.log(`✅ File created: ${routedestinationPath}`);
    // check if file exists
    if (resultOfRoute) {
      let targetContent = (await fs.promises.readFile(routedestinationPath, 'utf8')).split('\n');
      targetContent.splice(2, 0, ...formattedGetJson); // Insert after line 2
      await fs.promises.writeFile(routedestinationPath, targetContent.join('\n'), 'utf8');
      // file exists so find the line number of path like "/logins" user input login then added json in under that json
      // console.log('File exists. Finding line number...', resultOfRoute);
    }
  }
} catch (err) {
  console.error('🚨 Error inside IIFE:', err);
}
})();