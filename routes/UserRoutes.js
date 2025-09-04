const express = require('express');
const router = express.Router();

const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage });

const { 
    GetAllSystems,
    GetSystem,
    CreateSystem,
    UpdateSystem,
    DisableSystem,
    EnableSystem,
    GetAllUsers
} = require('../controllers/UserController');

const { 
    VerifyToken, 
} = require('../middlewares/AuthMiddleware');

const { 
    ValidateForm 
} = require('../middlewares/UserValidator');

// router.get('/', VerifyToken, GetAllUsers);
// router.post('/', VerifyToken, ValidateForm, CreateSystem);
// router.post('/:id/update', VerifyToken, ValidateForm, UpdateSystem);
// router.post('/:id/disable', VerifyToken, DisableSystem);
// router.post('/:id/enable', VerifyToken, EnableSystem);

// router.get('/', verifyToken, getAllUsers);
// router.post('/', verifyToken, validateForm(true),createUser);
// router.post('/:id/update', verifyToken, validateForm(false), updateUser);
// router.post('/:id/disable', verifyToken, disableUser);
// router.post('/:id/enable', verifyToken, enableUser);

module.exports = router;