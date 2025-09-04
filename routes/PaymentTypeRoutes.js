const express = require('express');
const router = express.Router();

const { 
    GetAllPaymentTypes,
    GetPaymentType,
    CreatePaymentType,
    UpdatePaymentType,
    DisablePaymentType,
    EnablePaymentType
} = require('../controllers/PaymentTypeController');

const { 
    VerifyToken, 
} = require('../middlewares/AuthMiddleware');

const { 
    ValidateForm 
} = require('../middlewares/PaymentTypeValidator');

router.get('/', VerifyToken, GetAllPaymentTypes);
router.get('/option', VerifyToken, GetPaymentType);
router.post('/', VerifyToken, ValidateForm, CreatePaymentType);
router.post('/:id/update', VerifyToken, ValidateForm, UpdatePaymentType);
router.post('/:id/disable', VerifyToken, DisablePaymentType);
router.post('/:id/enable', VerifyToken, EnablePaymentType);

module.exports = router;