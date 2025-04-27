## NPM Scripts Description

- `npm run keygenerate`: Generate a fresh JWT secret.
- `npm run make:component`: Scaffold a new component.
- `npm run make:route`: Scaffold all types of API routes (GET, POST, etc.).
- `npm run make:model`: Scaffold a new database model.
- `npm run make:controller`: Scaffold a new controller file.


Script | Description | Example Usage
npm run keygenerate | Generates a new random JWT secret key. | npm run keygenerate
npm run make:component | Creates a new compact component (controller/model/route) | npm run make:component Product
npm run make:route | Generates all route types (GET, POST, PUT, DELETE) with swagger api & (RouteType = s for singular route which is generated into defaultRoutes.js and RouteType = is not given then generate route for {routeName}Routes.js ) | npm run make:route {Method} {RouteName} {RouteType}
npm run make:model | Creates a new database model. | npm run make:model Product
npm run make:controller | Generates a new controller file. | npm run make:controller Product