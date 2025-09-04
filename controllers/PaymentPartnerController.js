const { 
    Op, Sequelize  
} = require('../utils/dependencies');

const { 
    PaymentPartner
} = require('../models');

exports.GetAll = async (req, res) => {

    const Page = parseInt(req.query.Page) || 1;
    const Limit = parseInt(req.query.Limit) || 10;
    const Offset = (Page - 1) * Limit;

    try {

        const { count, rows } = await PaymentPartner.findAndCountAll({
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
        name
    } = req.body;

    try {

        const exist = await PaymentPartner.findOne({
            where: { 
                name
            }
        });

        if (exist) {
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

        const partner = await PaymentPartner.create({
            name
        });

        res.status(201).json({ 
            Message: "record created.", 
            Data: partner 
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
        name
    } = req.body;
  
    try {

        const partner = await PaymentPartner.findByPk(id);

        if (!partner) {
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

        const exist = await PaymentPartner.findOne({
            where: {
                name,
                id: { [Op.ne]: id }
            },
        });

        if (exist) {
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

        await partner.update({
            name
        });

        res.status(200).json({ 
            Message: "record modified.", 
            Data: partner 
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

        const partner = await PaymentPartner.findByPk(id);

        if (!partner) {
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

        await partner.update({
            isActive: false
        });

        res.status(200).json({ 
            Message: "record disabled.", 
            Data: partner 
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

        const partner = await PaymentPartner.findByPk(id);

        if (!partner) {
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

        await partner.update({
            isActive: true
        });

        res.status(200).json({ 
            Message: "record enabled.", 
            Data: partner
        });

    } catch (error) {

        res.status(500).json({ 
            error: error.message 
        });
        
    }
};