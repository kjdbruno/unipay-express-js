const express = require('express');
const router = express.Router();

const { 
    GetAllWindows,
    GetWindow,
    CreateWindow,
    UpdateWindow,
    DisableWindow,
    EnableWindow
} = require('../controllers/WindowController');

const { 
    VerifyToken, 
} = require('../middlewares/AuthMiddleware');

const { 
    ValidateForm 
} = require('../middlewares/WindowValidator');

router.get('/', VerifyToken, GetAllWindows);
router.get('/option', VerifyToken, GetWindow);
router.post('/', VerifyToken, ValidateForm, CreateWindow);
router.post('/:Id/update', VerifyToken, ValidateForm, UpdateWindow);
router.post('/:Id/disable', VerifyToken, DisableWindow);
router.post('/:Id/enable', VerifyToken, EnableWindow);

module.exports = router;