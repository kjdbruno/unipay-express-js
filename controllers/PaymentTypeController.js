const { 
    Op, 
    Sequelize  
} = require('../utils/dependencies');

const { 
    PaymentType 
} = require('../models');

exports.GetAllPaymentTypes = async (req, res) => {

    const Page = parseInt(req.query.Page) || 1;
    const Limit = parseInt(req.query.Limit) || 10;
    const Offset = (Page - 1) * Limit;

    try {

        const { count, rows } = await PaymentType.findAndCountAll({
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

exports.GetPaymentType = async (req, res) => {

    try {

        const types = await PaymentType.findAll({
            where: {
                isActive: true
            },
            attributes: [
                ['Id', 'Value'],
                ['Name', 'Label']
            ]
        });

        res.json(types);

    } catch (error) {

        res.status(500).json({ 
            error: error.message 
        });

    }

};

exports.CreatePaymentType = async (req, res) => {

    const {
        name
    } = req.body;

    try {

        const recordExist = await PaymentType.findOne({
            where: { 
                name
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

        const type = await PaymentType.create({
            name
        });

        res.status(201).json({ 
            Message: "record created.", 
            Data: type 
        });

    } catch (error) {

        res.status(400).json({ 
            error: error.message 
        });

    }

};

exports.UpdatePaymentType = async (req, res) => {

    const {
        id
    } = req.params;

    const {
        name
    } = req.body;
  
    try {

        const type = await PaymentType.findByPk(id);

        if (!type) {
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

        const recordExist = await PaymentType.findOne({
            where: {
                name,
                id: { [Op.ne]: id }
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

        await type.update({
            name
        });

        res.status(200).json({ 
            Message: "record modified.", 
            Data: type 
        });

    } catch (error) {

        res.status(500).json({ 
            error: error.message 
        });

    }
};

exports.DisablePaymentType = async (req, res) => {

    const {
        id
    } = req.params;
  
    try {

        const type = await PaymentType.findByPk(id);

        if (!type) {
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

        await type.update({
            isActive: false
        });

        res.status(200).json({ 
            Message: "record disabled.", 
            Data: type 
        });

    } catch (error) {

        res.status(500).json({ 
            error: error.message 
        });

    }

};

exports.EnablePaymentType = async (req, res) => {

    const {
        id
    } = req.params;
  
    try {

        const type = await PaymentType.findByPk(id);

        if (!type) {
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

        await type.update({
            isActive: true
        });

        res.status(200).json({ 
            Message: "record enabled.", 
            Data: type
        });

    } catch (error) {

        res.status(500).json({ 
            error: error.message 
        });
        
    }
};