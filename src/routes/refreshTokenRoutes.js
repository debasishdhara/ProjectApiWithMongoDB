const { getAuthUser } = require('../controllers/userController');
const authenticateToken = require('@middlewares/auth');

const refreshTokenRoutes = {
    "/me": {
      "post": {
        "functions": [authenticateToken,getAuthUser],
        "summary": "Get the currently authenticated user",
        "tags": ["Users"],
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "refreshToken": {
                    "type": "string"
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "New access token and user info",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "success": {
                      "type": "boolean",
                      "example": true
                    },
                    "accessToken": {
                      "type": "string"
                    },
                    "refreshToken": {
                      "type": "string"
                    },
                    "expiresIn": {
                      "type": "integer",
                      "example": 900
                    },
                    "user": {
                      "$ref": "#/components/schemas/User"
                    }
                  }
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized"
          }
        }
      }
    }
  }
  
module.exports = refreshTokenRoutes;