const { 
    Op, 
    Sequelize
} = require('../utils/dependencies');

const { 
    Account 
} = require('../models');

exports.GetAllAccounts = async (req, res) => {

    const Page = parseInt(req.query.Page) || 1;
    const Limit = parseInt(req.query.Limit) || 10;
    const Offset = (Page - 1) * Limit;

    try {

        const { count, rows } = await Account.findAndCountAll({
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

exports.GetAccount = async (req, res) => {

    try {

        const accounts = await Account.findAll({
            where: {
                IsActive: true
            },
            attributes: [
                ['Id', 'Value'],
                [Sequelize.literal("CONCAT(Code, ' - ', Title)"), 'Label']
            ]
        });

        res.json(accounts);

    } catch (error) {

        res.status(500).json({ 
            error: error.message 
        });

    }

};

exports.CreateAccount = async (req, res) => {

    const {
        code,
        title,
        description,
        balance
    } = req.body;

    try {

        const recordExist = await Account.findOne({
            where: { 
                [Op.or]: [
                    { code }, 
                    { title }
                ] 
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

        const account = await Account.create({
            code,
            title,
            description,
            balance
        });

        res.status(201).json({ 
            Message: "record created.", 
            Data: account 
        });

    } catch (error) {

        res.status(400).json({ 
            error: error.message 
        });

    }

};

exports.UpdateAccount = async (req, res) => {

    const {
        id
    } = req.params;

    const {
        code,
        title,
        description,
        balance
    } = req.body;
  
    try {

        const account = await Account.findByPk(id);

        if (!account) {
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

        const recordExist = await Account.findOne({
            where: {
                [Op.or]: [
                    { code }, 
                    { title }
                ],
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

        await account.update({
            code,
            title,
            description,
            balance
        });

        res.status(200).json({ 
            Message: "record modified.", 
            Data: account 
        });

    } catch (error) {

        res.status(500).json({ 
            error: error.message 
        });

    }
};

exports.DisableAccount = async (req, res) => {

    const {
        id
    } = req.params;
  
    try {

        const account = await Account.findByPk(id);

        if (!account) {
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

        await account.update({
            isActive: false
        });

        res.status(200).json({ 
            Message: "record disabled.", 
            Data: account 
        });

    } catch (error) {

        res.status(500).json({ 
            error: error.message 
        });

    }

};

exports.EnableAccount = async (req, res) => {

    const {
        id
    } = req.params;
  
    try {

        const account = await Account.findByPk(id);

        if (!account) {
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

        await account.update({
            isActive: true
        });

        res.status(200).json({ 
            Message: "record enabled.", 
            Data: account
        });

    } catch (error) {

        res.status(500).json({ 
            error: error.message 
        });
        
    }
};