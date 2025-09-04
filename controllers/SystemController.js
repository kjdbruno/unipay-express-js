const { 
    Op, 
    Sequelize,
    crypto
} = require('../utils/dependencies');

const { 
    System 
} = require('../models');

exports.GetAllSystems = async (req, res) => {

    const Page = parseInt(req.query.Page) || 1;
    const Limit = parseInt(req.query.Limit) || 10;
    const Offset = (Page - 1) * Limit;

    try {

        const { count, rows } = await System.findAndCountAll({
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

exports.GetSystem = async (req, res) => {

    try {

        const systems = await System.findAll({
            where: {
                isActive: true
            },
            attributes: [
                ['id', 'Value'],
                [Sequelize.literal("CONCAT(code, ' - ', name)"), 'label']
            ]
        });

        res.json(systems);

    } catch (error) {

        res.status(500).json({ 
            error: error.message 
        });

    }

};

exports.CreateSystem = async (req, res) => {

    const {
        name,
        code
    } = req.body;

    try {

        const recordExist = await System.findOne({
            where: { 
                [Op.or]: [
                    { name }, 
                    { code }
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

        const system = await System.create({
            name,
            code,
            key: crypto.randomBytes(10).toString("hex")
        });

        res.status(201).json({ 
            Message: "record created.", 
            Data: system 
        });

    } catch (error) {

        res.status(400).json({ 
            error: error.message 
        });

    }

};

exports.UpdateSystem = async (req, res) => {

    const {
        id
    } = req.params;

    const {
        name,
        code
    } = req.body;
  
    try {

        const system = await System.findByPk(id);

        if (!system) {
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

        const recordExist = await System.findOne({
            where: {
                [Op.or]: [
                    { name }, 
                    { code }
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

        await system.update({
            name,
            code
        });

        res.status(200).json({ 
            Message: "record modified.", 
            Data: system 
        });

    } catch (error) {

        res.status(500).json({ 
            error: error.message 
        });

    }
};

exports.DisableSystem = async (req, res) => {

    const {
        id
    } = req.params;
  
    try {

        const system = await System.findByPk(id);

        if (!system) {
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

        await system.update({
            isActive: false
        });

        res.status(200).json({ 
            Message: "record disabled.", 
            Data: system 
        });

    } catch (error) {

        res.status(500).json({ 
            error: error.message 
        });

    }

};

exports.EnableSystem = async (req, res) => {

    const {
        id
    } = req.params;
  
    try {

        const system = await System.findByPk(id);

        if (!system) {
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

        await system.update({
            isActive: true
        });

        res.status(200).json({ 
            Message: "record enabled.", 
            Data: system
        });

    } catch (error) {

        res.status(500).json({ 
            error: error.message 
        });
        
    }
};