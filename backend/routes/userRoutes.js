// Author: Tobiloba Samuel
// Date: 10 Jan 2023
// Title of program/source code: Restful API for a Blog Service with NodeJS Express, MongoDB and Mongoose
// Type: source code
// Web address or publisher: https://tobisamcodes.hashnode.dev/restful-api-for-a-blog-service-with-nodejs-express-mongodb-and-mongoose

const express = require('express')

// controller functions
const { signupUser, loginUser } = require('../controllers/userController')

const router = express.Router()

// login route
router.post('/login', loginUser)

// signup route
router.post('/signup', signupUser)

module.exports = router