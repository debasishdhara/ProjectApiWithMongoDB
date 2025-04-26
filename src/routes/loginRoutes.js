const { loginUser } = require('../controllers/authController'); // adjust path as needed
const loginRoutes = { // /logins 
    "/logins": { 
      "post": {
        "functions": [loginUser],
        "summary": "User login",
        "tags": ["Authentication"],
        "security": [],
        "description": "Authenticate a user and return access and refresh tokens",
        "operationId": "loginUser",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "email": { "type": "string" },
                  "password": { "type": "string" }
                },
                "required": ['email', 'password'],
              }
            }
          }
        },
        responses: {
          200: {
            description: 'Login successful. Returns access and refresh tokens',
            content: {
              'application/json': {
                schema: {
                  oneOf: [{
                  type: 'object',
                  properties: {
                    success: {
                      type: 'boolean',
                      example: true,
                    },
                    accessToken: {
                      type: 'string',
                      example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                    },
                    refreshToken: {
                      type: 'string',
                      example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                    },
                    expiresIn: {
                      type: 'integer',
                      example: 900,
                    },
                    user: {
                      type: 'object',
                      properties: {
                        _id: { type: 'string', example: '6804e6886ef5265bb9441c9e' },
                        name: { type: 'string', example: 'Debasish' },
                        email: { type: 'string', example: 'tset.mail45@gmail.com' },
                        phone: { type: 'string', example: '9038494256' },
                        address: { type: 'string', example: 'Test Address' },
                        city: { type: 'string', example: 'Test City' },
                        state: { type: 'string', example: 'Test State' },
                        zip: { type: 'string', example: 'Test Zip' },
                        country: { type: 'string', example: 'Test Country' },
                        type: { type: 'integer', example: 0 },
                        status: { type: 'integer', example: 1 },
                        createdAt: { type: 'string', format: 'date-time' },
                        updatedAt: { type: 'string', format: 'date-time' },
                        tokenVersion: { type: 'integer', example: 1 },
                      },
                    },
                  },
                },{
                  type: 'object',
                  properties: {
                    success: {
                      type: 'boolean',
                      example: false,
                    },
                    message: {
                      type: 'string',
                      example: 'Invalid credentials',
                    },
                  },
                }],
                },
              },
            },
          }
        }
      }
    }
};

module.exports = loginRoutes;