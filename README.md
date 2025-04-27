## NPM Scripts Description

- `npm run keygenerate`: Generate a fresh JWT secret.
- `npm run make:component`: Scaffold a new component.
- `npm run make:route`: Scaffold all types of API routes (GET, POST, etc.).
- `npm run make:model`: Scaffold a new database model.
- `npm run make:controller`: Scaffold a new controller file.

# 📜 Available NPM Scripts

| Script | Description | Example Usage |
|:-------|:------------|:--------------|
| `npm run keygenerate` | Generates a new random JWT secret key. | `npm run keygenerate` |
| `npm run make:component` | Creates a new compact structure: Component + Controller + Model + Route. | `npm run make:component Product` |
| `npm run make:route` | Generates all types of routes (GET, POST, PUT, DELETE) with Swagger API documentation.<br><br>**Options:**<br>- `RouteType = s` → Singular route generated into `defaultRoutes.js`.<br>- `RouteType` not given → Normal `{RouteName}Routes.js` generated. | `npm run make:route {Method} {RouteName} {RouteType}`<br><br>Example:<br>`npm run make:route GET User s` |
| `npm run make:model` | Creates a new database model file. | `npm run make:model Product` |
| `npm run make:controller` | Creates a new controller file. | `npm run make:controller Product` |

---

## 🔥 Quick Examples

### ➡️ Generate a JWT Secret Key
```bash
npm run keygenerate
```

### ➡️ Create a Compact Component Structure
```bash
npm run make:component Product
```

### ➡️ Generate Routes (with Swagger)
- Singular route into `defaultRoutes.js`:
  ```bash
  npm run make:route GET User s
  ```

- Normal route (creates `OrderRoutes.js`):
  ```bash
  npm run make:route POST Order
  ```

### ➡️ Create a New Database Model
```bash
npm run make:model Product
```

### ➡️ Create a New Controller
```bash
npm run make:controller Product
```
