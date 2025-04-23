const fs = require('fs');
const path = require('path');
const pluralize = require('pluralize');
const readline = require('readline'); // ← ✅ Missing import

// Get the router name passed as an argument
const routerType = process.argv[2];
const routerPath = process.argv[3];
const routerName = process.argv[4];

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


// Convert to Sentence Case
const toSentenceCase = (str) => str.charAt(0).toUpperCase() + str.slice(1);
function createPathKey(routePath) {
    const segments = routePath.replace(/^\/+/, '').split('/');
    
    // Use pluralize to get the plural form of the first segment
    const base = pluralize.plural(segments[0]); // <-- FIXED
    
    // Convert params (e.g., :id) to just ":id"
    const extras = segments
      .slice(1)
      .map(seg => seg.startsWith(':') ? `:${seg.slice(1)}` : seg)
      .join('/');
  
    return extras ? `/${base}/${extras}` : `/${base}`;
}
  
// Define the path to paste
const dirPath = __dirname+'/../';
const routedestinationPath = path.join(dirPath, 'src', 'routes', `${routerName}Routes.js`);

async function findRouteLineNumber(filePath, targetPath, method) {
    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });
  
    let lineNumber = 0;
    let insidePath = false;
  
    for await (const line of rl) {
      lineNumber++;
  
      // Trim leading/trailing whitespace
      const trimmedLine = line.trim();
  
      // Check for path match (e.g. "/users")
      if (trimmedLine.startsWith(`"${targetPath}"`)) {
        insidePath = true;
      }
  
      // Once inside path, check for method (e.g. "post")
      if (insidePath && trimmedLine.startsWith(`"${method}"`)) {
        return lineNumber;
      }
    }
  
    return -1; // Not found
}
// check if file exists
if (fs.existsSync(routedestinationPath)) {
  // file exists so find the line number of path like "/logins" user input login then added json in under that json 

  console.log('File exists. Finding line number...');
  // convert route path login to "/logins" utiline pluraling pluralize
  const targetPath = createPathKey(routerPath);
  // Find the line number of the route
  console.log(targetPath);
  (async () => {
    const lineNumber = await findRouteLineNumber(routedestinationPath, targetPath, routerType);
    console.log(lineNumber === -1 ? 'Route or method not found' : `Line number: ${lineNumber}`);
  })();
} else {
    console.error(`❌ File not found: ${routedestinationPath}`);
}