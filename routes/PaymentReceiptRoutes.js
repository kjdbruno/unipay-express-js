const express = require('express');
const router = express.Router();

const { 
    GetAllReceipts,
    GetReceipt,
    CreateReceipt,
    UpdateReceipt,
    DisableReceipt,
    EnableReceipt
} = require('../controllers/PaymentReceiptController');

const { 
    VerifyToken, 
} = require('../middlewares/AuthMiddleware');

const { 
    ValidateForm 
} = require('../middlewares/PaymentReceiptValidator');

router.get('/', VerifyToken, GetAllReceipts);
router.get('/option', VerifyToken, GetReceipt);
router.post('/', VerifyToken, ValidateForm, CreateReceipt);
router.post('/:id/update', VerifyToken, ValidateForm, UpdateReceipt);
router.post('/:id/disable', VerifyToken, DisableReceipt);
router.post('/:id/enable', VerifyToken, EnableReceipt);

module.exports = router;