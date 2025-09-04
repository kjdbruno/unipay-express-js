const express = require('express');
const router = express.Router();

const { 
    GetAllAccounts,
    GetAccount,
    CreateAccount,
    UpdateAccount,
    DisableAccount,
    EnableAccount
} = require('../controllers/AccountController');

const { 
    VerifyToken, 
} = require('../middlewares/AuthMiddleware');

const { 
    ValidateForm 
} = require('../middlewares/AccountValidator');

router.get('/', VerifyToken, GetAllAccounts);
router.get('/option', VerifyToken, GetAccount);
router.post('/', VerifyToken, ValidateForm, CreateAccount);
router.post('/:id/update', VerifyToken, ValidateForm, UpdateAccount);
router.post('/:id/disable', VerifyToken, DisableAccount);
router.post('/:id/enable', VerifyToken, EnableAccount);

module.exports = router;