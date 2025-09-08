const express = require('express');
const router = express.Router();

const { 
    GetRole,
    GetOffice,
    GetAccount,
    GetFund,
    GetSystem,
    GetService,
    GetPaymentReceipt
} = require('../controllers/OptionController');

router.get('/role', GetRole);
router.get('/office', GetOffice);
router.get('/account', GetAccount);
router.get('/fund', GetFund);
router.get('/system', GetSystem);
router.get('/service', GetService);
router.get('/receipt', GetPaymentReceipt);

module.exports = router;