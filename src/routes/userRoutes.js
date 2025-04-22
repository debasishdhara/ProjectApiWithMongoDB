
const { getUsers, createUser } = require('../controllers/userController');
const validateUser = require('@middlewares/validateUser');
const authenticateToken = require('@middlewares/auth');
const userRoutes ={
    // users for resources route in this file
    "/users": {
      "get": {
        "summary": "Get all users",
        "functions": [authenticateToken,getUsers],
        "tags": ["Users"],        
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "responses": {
          "200": {
            "description": "List of users",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/User"
                  }
                }
              }
            }
          }
        }
      },
      "post": {
        "summary": "Create a new user",
        "functions": [validateUser, createUser],
        "security": [],
        "tags": ["Users"],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/User"
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "User created",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/User"
                }
              }
            }
          }
        }
      }
    },
    // registraion is under users route 
    "/registration":{
        "post": {
        "summary": "Create a new user",
        "functions": [validateUser, createUser],
        "security": [],
        "tags": ["Users"],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/User"
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "User created",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/User"
                }
              }
            }
          }
        }
      }
    }
}

module.exports = userRoutes;
