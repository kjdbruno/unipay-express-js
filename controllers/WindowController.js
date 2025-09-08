const { 
    Op, 
    Sequelize
} = require('../utils/dependencies');

const { 
    Window 
} = require('../models');

exports.GetAll = async (req, res) => {

    const Page = parseInt(req.query.Page) || 1;
    const Limit = parseInt(req.query.Limit) || 10;
    const Offset = (Page - 1) * Limit;

    try {

        const { count, rows } = await Window.findAndCountAll({
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

exports.Create = async (req, res) => {

    const {
        name,
        description
    } = req.body;

    try {

        const recordExist = await Window.findOne({
            where: { 
                name 
            }
        });

        if (recordExist) {
            return res.status(500).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "record already exists!",
                    path: "name",
                    location: "body",
                }],
            });
        }

        const window = await Window.create({
            name,
            description
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

exports.Update = async (req, res) => {

    const {
        id
    } = req.params;

    const {
        name,
        description
    } = req.body;
  
    try {

        const window = await Window.findByPk(id);

        if (!window) {
            return res.status(500).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "record not found!",
                    path: "name",
                    location: "body",
                }],
            });
        }

        const recordExist = await Window.findOne({
            where: {
                name,
                id: { 
                    [Op.ne]: id 
                }
            },
        });

        if (recordExist) {
            return res.status(500).json({
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
            name,
            description
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

exports.Disable = async (req, res) => {

    const {
        id
    } = req.params;
  
    try {

        const window = await Window.findByPk(id);

        if (!window) {
            return res.status(500).json({
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
            isActive: false
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

exports.Enable = async (req, res) => {

    const {
        id
    } = req.params;
  
    try {

        const window = await Window.findByPk(id);

        if (!window) {
            return res.status(500).json({
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
            isActive: true
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