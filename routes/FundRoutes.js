const express = require('express');
const router = express.Router();

const { 
    GetAllFunds,
    GetFund,
    CreateFund,
    UpdateFund,
    DisableFund,
    EnableFund
} = require('../controllers/FundController');

const { 
    VerifyToken, 
} = require('../middlewares/AuthMiddleware');

const { 
    ValidateForm 
} = require('../middlewares/FundValidator');

router.get('/', VerifyToken, GetAllFunds);
router.get('/option', VerifyToken, GetFund);
router.post('/', VerifyToken, ValidateForm, CreateFund);
router.post('/:id/update', VerifyToken, ValidateForm, UpdateFund);
router.post('/:id/disable', VerifyToken, DisableFund);
router.post('/:id/enable', VerifyToken, EnableFund);

module.exports = router;