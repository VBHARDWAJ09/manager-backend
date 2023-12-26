const swaggerUI = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Short Url",
            description: "Short Url Api's collection.",
            version: "0.1.9"
        },
        servers: [
            {
                url: "http://localhost:5000/"
            }
        ],
        tags: [
            {
                name: "Public APIs",
                description: "APIs that do not require authorization"
            },
            {
                name: "Authorized APIs",
                description: "APIs that require authorization"
            }
        ]
    },
    apis: ['./routes/*.js']
}

module.exports = { swaggerServe: swaggerUI.serve, swaggerSetup: swaggerUI.setup(swaggerJsDoc(options)) }