const express = require('express');
const router = express.Router();

const { 
    GetAll,
    Get,
    Create,
    Update,
    Disable,
    Enable
} = require('../controllers/RevenueItemController');

const { 
    VerifyToken, 
} = require('../middlewares/AuthMiddleware');

const { 
    ValidateForm 
} = require('../middlewares/RevenueItemValidator');

router.get('/', VerifyToken, GetAll);
router.get('/option', VerifyToken, Get);
router.post('/', VerifyToken, ValidateForm, Create);
router.post('/:id/update', VerifyToken, ValidateForm, Update);
router.post('/:id/disable', VerifyToken, Disable);
router.post('/:id/enable', VerifyToken, Enable);

module.exports = router;