const { baseMethodgetAll,baseMethodCreate,baseMethodEdit,baseMethodUpdate,baseMethodDetete } = require('../controllers/baseController');

const baseRoutes = {
  "/base": {
    "post": {
      "functions": [baseMethodCreate], // controllerMethods
      "summary": "base route summery", // Adjust for relevant route
      "tags": ["base"],      
      "security": [],
      "requestBody": {
        "required": true,
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                
              }
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "base successfully",
          "content": {
            "application/json": {
              "schema": {
                "oneOf": [
                  {
                    "type": "object",
                    "properties": {
                      "success": { "type": "boolean" },
                      "message": { "type": "string" },
                    }
                  },
                  {
                    "type": "object",
                    "properties": {
                      "success": { "type": "boolean" },
                      "error": { "type": "string" }
                    }
                  }
                ]
              }
            }
          }
        }
      }
    },
    "get": {
      "functions": [baseMethodgetAll], // controllerMethods
      "summary": "base route summery", // Adjust for relevant route
      "tags": ["base"],      
      "security": [],
      "requestBody": {
        "required": true,
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                
              }
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "base successfully",
          "content": {
            "application/json": {
              "schema": {
                "oneOf": [
                  {
                    "type": "object",
                    "properties": {
                      "success": { "type": "boolean" },
                      "message": { "type": "string" },
                    }
                  },
                  {
                    "type": "object",
                    "properties": {
                      "success": { "type": "boolean" },
                      "error": { "type": "string" }
                    }
                  }
                ]
              }
            }
          }
        }
      }
    }
  },
  "/base/:id": {
    "get": {
      "functions": [baseMethodEdit], // controllerMethods
      "summary": "base route summery", // Adjust for relevant route
      "tags": ["base"],      
      "security": [],
      "requestBody": {
        "required": true,
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                
              }
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "base successfully",
          "content": {
            "application/json": {
              "schema": {
                "oneOf": [
                  {
                    "type": "object",
                    "properties": {
                      "success": { "type": "boolean" },
                      "message": { "type": "string" },
                    }
                  },
                  {
                    "type": "object",
                    "properties": {
                      "success": { "type": "boolean" },
                      "error": { "type": "string" }
                    }
                  }
                ]
              }
            }
          }
        }
      }
    },
    "put": {
      "functions": [baseMethodUpdate], // controllerMethods
      "summary": "base route summery", // Adjust for relevant route
      "tags": ["base"],
      "security": [],
      "requestBody": {
        "required": true,
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                
              }
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "base successfully",
          "content": {
            "application/json": {
              "schema": {
                "oneOf": [
                  {
                    "type": "object",
                    "properties": {
                      "success": { "type": "boolean" },
                      "message": { "type": "string" },
                    }
                  },
                  {
                    "type": "object",
                    "properties": {
                      "success": { "type": "boolean" },
                      "error": { "type": "string" }
                    }
                  }
                ]
              }
            }
          }
        }
      }
    },
    "delete": {
      "functions": [baseMethodDetete], // controllerMethods
      "summary": "base route summery", // Adjust for relevant route
      "tags": ["base"],
      "security": [],
      "requestBody": {
        "required": true,
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                
              }
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "base successfully",
          "content": {
            "application/json": {
              "schema": {
                "oneOf": [
                  {
                    "type": "object",
                    "properties": {
                      "success": { "type": "boolean" },
                      "message": { "type": "string" },
                    }
                  },
                  {
                    "type": "object",
                    "properties": {
                      "success": { "type": "boolean" },
                      "error": { "type": "string" }
                    }
                  }
                ]
              }
            }
          }
        }
      }
    }
  },
};

module.exports = baseRoutes;
