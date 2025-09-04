const express = require('express');
const router = express.Router();

const { 
    Login 
} = require('../controllers/AuthenticationController');

const { 
    ValidateForm 
} = require('../middlewares/AuthValidator');

router.post('/', ValidateForm, Login);

module.exports = router;