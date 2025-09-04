const { 
    Op, 
    Sequelize
} = require('../utils/dependencies');

const { 
    RevenueService,
    Account,
    Fund,
    Office,
    System
} = require('../models');

exports.GetAll = async (req, res) => {

    const Page = parseInt(req.query.Page) || 1;
    const Limit = parseInt(req.query.Limit) || 10;
    const Offset = (Page - 1) * Limit;

    try {

        const { count, rows } = await RevenueService.findAndCountAll({
            include: [
                {
                    model: Account,
                    as: 'Account',
                    attributes: ['code', 'title']
                },
                {
                    model: Fund,
                    as: 'Fund',
                    attributes: ['name']
                },
                {
                    model: Office,
                    as: 'Office',
                    attributes: ['alias']
                },
                {
                    model: System,
                    as: 'System',
                    attributes: ['name']
                }
            ],
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

Get = async (id) => {

    const services = await RevenueService.findOne({
        where: {
            id
        },
        include: [
            {
                model: Account,
                as: 'Account',
                attributes: ['code', 'title']
            },
            {
                model: Fund,
                as: 'Fund',
                attributes: ['name']
            },
            {
                model: Office,
                as: 'Office',
                attributes: ['alias']
            },
            {
                model: System,
                as: 'System',
                attributes: ['name']
            }
        ],
    });
    return services;
};

exports.Create = async (req, res) => {

    const {
        name,
        accountId,
        officeId,
        fundId,
        systemId
    } = req.body;

    try {

        const exist = await RevenueService.findOne({
            where: { 
                name,
                accountId,
                officeId,
                fundId,
                systemId
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

        const service = await RevenueService.create({
            name,
            accountId,
            officeId,
            fundId,
            systemId
        });

        const s = await Get(service.id);

        res.status(201).json({ 
            Message: "record created.", 
            Data: s 
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
        accountId,
        officeId,
        fundId,
        systemId
    } = req.body;
  
    try {

        const service = await RevenueService.findByPk(id);

        if (!service) {
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

        const exist = await RevenueService.findOne({
            where: {
                name,
                accountId,
                officeId,
                fundId,
                systemId,
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

        await service.update({
            name,
            accountId,
            officeId,
            fundId,
            systemId
        });

        res.status(200).json({ 
            Message: "record modified.", 
            Data: service 
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

        const service = await RevenueService.findByPk(id);

        if (!service) {
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

        await service.update({
            isActive: false
        });

        res.status(200).json({ 
            Message: "record disabled.", 
            Data: service 
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

        const service = await RevenueService.findByPk(id);

        if (!service) {
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

        await service.update({
            isActive: true
        });

        res.status(200).json({ 
            Message: "record enabled.", 
            Data: service
        });

    } catch (error) {

        res.status(500).json({ 
            error: error.message 
        });
        
    }
};