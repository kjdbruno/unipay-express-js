const express = require('express');
const router = express.Router();

const { 
    GetAllRevenueItems,
    GetRevenueItem,
    CreateRevenueItem,
    UpdateRevenueItem,
    DisableRevenueItem,
    EnableRevenueItem
} = require('../controllers/RevenueItemController');

const { 
    VerifyToken, 
} = require('../middlewares/AuthMiddleware');

const { 
    ValidateForm 
} = require('../middlewares/RevenueItemValidator');

router.get('/', VerifyToken, GetAllRevenueItems);
router.get('/option', VerifyToken, GetRevenueItem);
router.post('/', VerifyToken, ValidateForm, CreateRevenueItem);
router.post('/:Id/update', VerifyToken, ValidateForm, UpdateRevenueItem);
router.post('/:Id/disable', VerifyToken, DisableRevenueItem);
router.post('/:Id/enable', VerifyToken, EnableRevenueItem);

module.exports = router;