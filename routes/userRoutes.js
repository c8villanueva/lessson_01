const express = require('express')
const router = express.Router()

// we are already at /users
router.route('/')
  .get() //controllers will be put here
  .post()
  .patch()
  .delete()