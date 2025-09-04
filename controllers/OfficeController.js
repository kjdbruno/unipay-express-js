const { 
    Op, 
    Sequelize  
} = require('../utils/dependencies');

const { 
    Office 
} = require('../models');

exports.GetAllOffices = async (req, res) => {

    const Page = parseInt(req.query.Page) || 1;
    const Limit = parseInt(req.query.Limit) || 10;
    const Offset = (Page - 1) * Limit;

    try {

        const { count, rows } = await Office.findAndCountAll({
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

exports.GetOffice = async (req, res) => {

    try {

        const offices = await Office.findAll({
            where: {
                IsActive: true
            },
            attributes: [
                ['Id', 'Value'],
                [Sequelize.literal("CONCAT(Alias, ' - ', Name)"), 'Label']
            ]
        });

        res.json(offices);

    } catch (error) {

        res.status(500).json({ 
            error: error.message 
        });

    }

};

exports.CreateOffice = async (req, res) => {

    const {
        name,
        alias,
        email
    } = req.body;

    try {

        const recordExist = await Office.findOne({
            where: { 
                [Op.or]: [
                    { name }, 
                    { alias }, 
                    { email } 
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

        const office = await Office.create({
            name,
            alias,
            email
        });

        res.status(201).json({ 
            Message: "record created.", 
            Data: office 
        });

    } catch (error) {

        res.status(400).json({ 
            error: error.message 
        });

    }

};

exports.UpdateOffice = async (req, res) => {

    const {
        id
    } = req.params;

    const {
        name,
        alias,
        email
    } = req.body;
  
    try {

        const office = await Office.findByPk(id);

        if (!office) {
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

        const recordExist = await Office.findOne({
            where: {
                [Op.or]: [
                    { name }, 
                    { alias }, 
                    { email } 
                ],
                Id: { [Op.ne]: id }
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

        await office.update({
            name,
            alias,
            email
        });

        res.status(200).json({ 
            Message: "record modified.", 
            Data: office 
        });

    } catch (error) {

        res.status(500).json({ 
            error: error.message 
        });

    }
};

exports.DisableOffice = async (req, res) => {

    const {
        id
    } = req.params;
  
    try {

        const office = await Office.findByPk(id);

        if (!office) {
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

        await office.update({
            isActive: false
        });

        res.status(200).json({ 
            Message: "record disabled.", 
            Data: office 
        });

    } catch (error) {

        res.status(500).json({ 
            error: error.message 
        });

    }

};

exports.EnableOffice = async (req, res) => {

    const {
        id
    } = req.params;
  
    try {

        const office = await Office.findByPk(id);

        if (!office) {
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

        await office.update({
            isActive: true
        });

        res.status(200).json({ 
            Message: "record enabled.", 
            Data: office
        });

    } catch (error) {

        res.status(500).json({ 
            error: error.message 
        });
        
    }
};