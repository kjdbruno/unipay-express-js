const { 
    Op, Sequelize  
} = require('../utils/dependencies');

const { 
    PaymentReceipt
} = require('../models');

exports.GetAllReceipts = async (req, res) => {

    const Page = parseInt(req.query.Page) || 1;
    const Limit = parseInt(req.query.Limit) || 10;
    const Offset = (Page - 1) * Limit;

    try {

        const { count, rows } = await PaymentReceipt.findAndCountAll({
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

exports.GetReceipt = async (req, res) => {

    try {

        const receipts = await PaymentReceipt.findAll({
            where: {
                isActive: true
            },
            attributes: [
                ['id', 'Value'],
                ['name', 'Label']
            ]
        });

        res.json(receipts);

    } catch (error) {

        res.status(500).json({ 
            error: error.message 
        });

    }

};

exports.CreateReceipt = async (req, res) => {

    const {
        name
    } = req.body;

    try {

        const recordExist = await PaymentReceipt.findOne({
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

        const receipt = await PaymentReceipt.create({
            name
        });

        res.status(201).json({ 
            Message: "record created.", 
            Data: receipt 
        });

    } catch (error) {

        res.status(400).json({ 
            error: error.message 
        });

    }

};

exports.UpdateReceipt = async (req, res) => {

    const {
        id
    } = req.params;

    const {
        name
    } = req.body;
  
    try {

        const receipt = await PaymentReceipt.findByPk(id);

        if (!receipt) {
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

        const recordExist = await PaymentReceipt.findOne({
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

        await receipt.update({
            name
        });

        res.status(200).json({ 
            Message: "record modified.", 
            Data: receipt 
        });

    } catch (error) {

        res.status(500).json({ 
            error: error.message 
        });

    }
};

exports.DisableReceipt = async (req, res) => {

    const {
        id
    } = req.params;
  
    try {

        const receipt = await PaymentReceipt.findByPk(id);

        if (!receipt) {
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

        await receipt.update({
            isActive: false
        });

        res.status(200).json({ 
            Message: "record disabled.", 
            Data: receipt 
        });

    } catch (error) {

        res.status(500).json({ 
            error: error.message 
        });

    }

};

exports.EnableReceipt = async (req, res) => {

    const {
        id
    } = req.params;
  
    try {

        const receipt = await PaymentReceipt.findByPk(id);

        if (!receipt) {
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

        await receipt.update({
            isActive: true
        });

        res.status(200).json({ 
            Message: "record enabled.", 
            Data: receipt
        });

    } catch (error) {

        res.status(500).json({ 
            error: error.message 
        });
        
    }
};