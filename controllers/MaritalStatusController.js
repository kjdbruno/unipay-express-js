const { 
    Op, 
    Sequelize  
} = require('../utils/dependencies');

const { 
    MaritalStatus 
} = require('../models');

exports.GetAllMaritalStatuses = async (req, res) => {

    const Page = parseInt(req.query.page) || 1;
    const Limit = parseInt(req.query.limit) || 10;
    const Offset = (Page - 1) * Limit;

    try {

        const { count, rows } = await MaritalStatus.findAndCountAll({
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

exports.GetMaritalStatus = async (req, res) => {

    try {

        const statuses = await MaritalStatus.findAll({
            where: {
                IsActive: true
            },
            attributes: [
                ['Id', 'Value'],
                ['Name', 'Label']
            ]
        });

        res.json(statuses);

    } catch (error) {

        res.status(500).json({ 
            error: error.message 
        });

    }

};

exports.CreateMaritalStatus = async (req, res) => {

    const {
        Name
    } = req.body;

    try {

        const recordExist = await MaritalStatus.findOne({
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

        const status = await MaritalStatus.create({
            Name
        });

        res.status(201).json({ 
            Message: "record created.", 
            Data: status 
        });

    } catch (error) {

        res.status(400).json({ 
            error: error.message 
        });

    }

};

exports.UpdateMaritalStatus = async (req, res) => {

    const {
        Id
    } = req.params;

    const {
        Name
    } = req.body;
  
    try {

        const status = await MaritalStatus.findByPk(Id);

        if (!status) {
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

        const recordExist = await MaritalStatus.findOne({
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

        await status.update({
            Name
        });

        res.status(200).json({ 
            Message: "record modified.", 
            Data: status 
        });

    } catch (error) {

        res.status(500).json({ 
            error: error.message 
        });

    }
};

exports.DisableMaritalStatus = async (req, res) => {

    const {
        Id
    } = req.params;
  
    try {

        const status = await MaritalStatus.findByPk(Id);

        if (!status) {
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

        await status.update({
            IsActive: false
        });

        res.status(200).json({ 
            Message: "record disabled.", 
            Data: status
        });

    } catch (error) {

        res.status(500).json({ 
            error: error.message 
        });

    }

};

exports.EnableMaritalStatus = async (req, res) => {

    const {
        Id
    } = req.params;
  
    try {

        const status = await MaritalStatus.findByPk(Id);

        if (!status) {
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

        await status.update({
            IsActive: true
        });

        res.status(200).json({ 
            message: "record enabled.", 
            Data: status
        });

    } catch (error) {

        res.status(500).json({ 
            error: error.message 
        });
        
    }
};