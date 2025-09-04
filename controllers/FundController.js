const { 
    Op, 
    Sequelize
} = require('../utils/dependencies');

const { 
    Fund 
} = require('../models');

exports.GetAllFunds = async (req, res) => {

    const Page = parseInt(req.query.Page) || 1;
    const Limit = parseInt(req.query.Limit) || 10;
    const Offset = (Page - 1) * Limit;

    try {

        const { count, rows } = await Fund.findAndCountAll({
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

exports.GetFund = async (req, res) => {

    try {

        const funds = await Fund.findAll({
            where: {
                isActive: true
            },
            attributes: [
                ['id', 'Value'],
                ['name', 'Label']
            ]
        });

        res.json(funds);

    } catch (error) {

        res.status(500).json({ 
            error: error.message 
        });

    }

};

exports.CreateFund = async (req, res) => {

    const {
        name
    } = req.body;

    try {

        const recordExist = await Fund.findOne({
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

        const fund = await Fund.create({
            name
        });

        res.status(201).json({ 
            Message: "record created.", 
            Data: fund 
        });

    } catch (error) {

        res.status(400).json({ 
            error: error.message 
        });

    }

};

exports.UpdateFund = async (req, res) => {

    const {
        id
    } = req.params;

    const {
        name
    } = req.body;
  
    try {

        const fund = await Fund.findByPk(id);

        if (!fund) {
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

        const recordExist = await Fund.findOne({
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

        await fund.update({
            name
        });

        res.status(200).json({ 
            Message: "record modified.", 
            Data: fund 
        });

    } catch (error) {

        res.status(500).json({ 
            error: error.message 
        });

    }
};

exports.DisableFund = async (req, res) => {

    const {
        id
    } = req.params;
  
    try {

        const fund = await Fund.findByPk(id);

        if (!fund) {
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

        await fund.update({
            isActive: false
        });

        res.status(200).json({ 
            Message: "record disabled.", 
            Data: fund 
        });

    } catch (error) {

        res.status(500).json({ 
            error: error.message 
        });

    }

};

exports.EnableFund = async (req, res) => {

    const {
        id
    } = req.params;
  
    try {

        const fund = await Fund.findByPk(id);

        if (!fund) {
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

        await fund.update({
            isActive: true
        });

        res.status(200).json({ 
            Message: "record enabled.", 
            Data: fund
        });

    } catch (error) {

        res.status(500).json({ 
            error: error.message 
        });
        
    }
};