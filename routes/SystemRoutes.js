const express = require('express');
const router = express.Router();

const { 
    GetAllSystems,
    GetSystem,
    CreateSystem,
    UpdateSystem,
    DisableSystem,
    EnableSystem
} = require('../controllers/SystemController');

const { 
    VerifyToken, 
} = require('../middlewares/AuthMiddleware');

const { 
    ValidateForm 
} = require('../middlewares/SystemValidator');

router.get('/', VerifyToken, GetAllSystems);
router.get('/option', VerifyToken, GetSystem);
router.post('/', VerifyToken, ValidateForm, CreateSystem);
router.post('/:id/update', VerifyToken, ValidateForm, UpdateSystem);
router.post('/:id/disable', VerifyToken, DisableSystem);
router.post('/:id/enable', VerifyToken, EnableSystem);

module.exports = router;