const ensureAuthenticated = require('../middleware/Auth');
const fs = require('fs');
const path = require('path');
const { readUserData, getUsers } = require('../controllers/UserController');
const router = require('express').Router();

router.get('/get', ensureAuthenticated, getUsers)


module.exports = router;
