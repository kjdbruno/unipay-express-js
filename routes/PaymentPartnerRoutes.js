const express = require('express');
const router = express.Router();

const { 
    GetAll,
    Create,
    Update,
    Disable,
    Enable
} = require('../controllers/PaymentPartnerController');

const { 
    VerifyToken, 
} = require('../middlewares/AuthMiddleware');

const { 
    ValidateForm 
} = require('../middlewares/PaymentPartnerValidator');

router.get('/', VerifyToken, GetAll);
router.post('/', VerifyToken, ValidateForm, Create);
router.post('/:id/update', VerifyToken, ValidateForm, Update);
router.post('/:id/disable', VerifyToken, Disable);
router.post('/:id/enable', VerifyToken, Enable);

module.exports = router;