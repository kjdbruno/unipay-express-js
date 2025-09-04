const express = require('express');
const router = express.Router();

const { 
    GetAllUserWindows,
    CreateUserWindow,
    UpdateUserWindow,
    DisableUserWindow,
    EnableUserWindow
} = require('../controllers/WindowUserController');

const { 
    VerifyToken, 
} = require('../middlewares/AuthMiddleware');

const { 
    ValidateForm 
} = require('../middlewares/UserWindowValidator');

router.get('/', VerifyToken, GetAllUserWindows);
router.post('/', VerifyToken, ValidateForm, CreateUserWindow);
router.post('/:Id/update', VerifyToken, ValidateForm, UpdateUserWindow);
router.post('/:Id/disable', VerifyToken, DisableUserWindow);
router.post('/:Id/enable', VerifyToken, EnableUserWindow);

module.exports = router;