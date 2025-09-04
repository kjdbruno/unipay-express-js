const { 
    Op, 
    Sequelize
} = require('../utils/dependencies');

const { 
    Window 
} = require('../models');

exports.GetAllWindows = async (req, res) => {

    const Page = parseInt(req.query.page) || 1;
    const Limit = parseInt(req.query.limit) || 10;
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

exports.GetWindow = async (req, res) => {

    try {

        const windows = await Window.findAll({
            where: {
                IsActive: true
            },
            attributes: [
                ['Id', 'Value'],
                ['Name', 'Label']
            ]
        });

        res.json(windows);

    } catch (error) {

        res.status(500).json({ 
            error: error.message 
        });

    }

};

exports.CreateWindow = async (req, res) => {

    const {
        Name,
        Description
    } = req.body;

    try {

        const recordExist = await Window.findOne({
            where: { 
                Name 
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

        const window = await Window.create({
            Name,
            Description
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

exports.UpdateWindow = async (req, res) => {

    const {
        Id
    } = req.params;

    const {
        Name,
        Description
    } = req.body;
  
    try {

        const window = await Window.findByPk(Id);

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

        const recordExist = await Window.findOne({
            where: {
                Name,
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
            Name,
            Description
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

exports.DisableWindow = async (req, res) => {

    const {
        Id
    } = req.params;
  
    try {

        const window = await Window.findByPk(Id);

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

exports.EnableWindow = async (req, res) => {

    const {
        Id
    } = req.params;
  
    try {

        const window = await Window.findByPk(Id);

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