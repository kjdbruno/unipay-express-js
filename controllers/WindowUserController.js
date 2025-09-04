const { 
    Op, 
    Sequelize
} = require('../utils/dependencies');

const { 
    UserWindow,
    User,
    Window 
} = require('../models');

exports.GetAllUserWindows = async (req, res) => {

    const Page = parseInt(req.query.page) || 1;
    const Limit = parseInt(req.query.limit) || 10;
    const Offset = (Page - 1) * Limit;

    try {

        const { count, rows } = await UserWindow.findAndCountAll({
            include: [
                {
                    model: User,
                    as: 'User',
                    attributes: ['Name']
                },
                {
                    model: Window,
                    as: 'Window',
                    attributes: ['Name']
                }
            ],
            limit: Limit,
            offset: Offset,
            order: [['CreatedAt', 'DESC']]
        });

        res.json({
            Data: rows,
            Meta: {
                TotalItems: count,
                TotalPages: Math.ceil(count / Limit),
                CurrentPage: Page
            }
        });

    } catch (error) {

        res.status(500).json({ 
            error: error.message 
        });

    }

};

exports.CreateUserWindow = async (req, res) => {

    const {
        UserId,
        WindowId
    } = req.body;

    try {

        const recordExist = await UserWindow.findOne({
            where: { 
                UserId,
                WindowId 
            }
        });

        if (recordExist) {
            return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "record already exists!",
                    path: "name",
                    location: "body",
                }],
            });
        }

        const window = await UserWindow.create({
            UserId,
            WindowId
        });

        res.status(201).json({ 
            Message: "record created.", 
            Data: window 
        });

    } catch (error) {

        res.status(400).json({ 
            error: error.message 
        });

    }

};

exports.UpdateUserWindow = async (req, res) => {

    const {
        Id
    } = req.params;

    const {
        UserId,
        WindowId
    } = req.body;
  
    try {

        const window = await UserWindow.findByPk(Id);

        if (!window) {
            return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "record not found!",
                    path: "name",
                    location: "body",
                }],
            });
        }

        const recordExist = await UserWindow.findOne({
            where: {
                UserId,
                WindowId,
                Id: { [Op.ne]: Id }
            },
        });

        if (recordExist) {
            return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "record already exist!",
                    path: "name",
                    location: "body",
                }],
            });
        }

        await window.update({
            UserId,
            WindowId
        });

        res.status(200).json({ 
            Message: "record modified.", 
            Data: window 
        });

    } catch (error) {

        res.status(500).json({ 
            error: error.message 
        });

    }
};

exports.DisableUserWindow = async (req, res) => {

    const {
        Id
    } = req.params;
  
    try {

        const window = await UserWindow.findByPk(Id);

        if (!window) {
            return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "record not found!",
                    path: "name",
                    location: "body",
                }],
            });
        }

        await window.update({
            IsActive: false
        });

        res.status(200).json({ 
            Message: "record disabled.", 
            Data: window 
        });

    } catch (error) {

        res.status(500).json({ 
            error: error.message 
        });

    }

};

exports.EnableUserWindow = async (req, res) => {

    const {
        Id
    } = req.params;
  
    try {

        const window = await UserWindow.findByPk(Id);

        if (!window) {
            return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "record not found!",
                    path: "name",
                    location: "body",
                }],
            });
        }

        await window.update({
            IsActive: true
        });

        res.status(200).json({ 
            Message: "record enabled.", 
            Data: window
        });

    } catch (error) {

        res.status(500).json({ 
            error: error.message 
        });
        
    }
};