const { 
    Op, 
    Sequelize
} = require('../utils/dependencies');

const { 
    RevenueItem,
    RevenueService,
    Receipt,
    Account,
    Fund,
    Office,
    System,
    PaymentReceipt
} = require('../models');

exports.GetAll = async (req, res) => {

    const Page = parseInt(req.query.Page) || 1;
    const Limit = parseInt(req.query.Limit) || 10;
    const Offset = (Page - 1) * Limit;

    try {

        const { count, rows } = await RevenueItem.findAndCountAll({
            include: [
                {
                    model: RevenueService,
                    as: 'RevenueService',
                    attributes: ['name'],
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
                            attributes: ['name']
                        },
                        {
                            model: System,
                            as: 'System',
                            attributes: ['name']
                        }
                    ],
                },
                {
                    model: PaymentReceipt,
                    as: 'Receipt',
                    attributes: ['name']
                }
            ],
            limit: Limit,
            offset: Offset,
            order: [['createdAt', 'DESC']]
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

exports.Get = async (id) => {

    const items = await RevenueItem.findOne({
        where: {
            id
        },
        include: [
            {
                model: RevenueService,
                as: 'RevenueService',
                attributes: ['name'],
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
                        attributes: ['name']
                    },
                    {
                        model: System,
                        as: 'System',
                        attributes: ['name']
                    }
                ],
            },
            {
                model: PaymentReceipt,
                as: 'Receipt',
                attributes: ['name']
            }
        ]
    });
    return items;
};

exports.Create = async (req, res) => {

    const {
        name,
        serviceId,
        receiptId,
        cost,
        isManual,
        isOnline
    } = req.body;
    
    try {

        const recordExist = await RevenueItem.findOne({
            where: { 
                name,
                serviceId,
                receiptId
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

        const item = await RevenueItem.create({
            name,
            serviceId,
            receiptId,
            cost,
            isManual,
            isOnline
        });

        console.log(item)

        res.status(201).json({ 
            Message: "record created.", 
            // Data: i 
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
        serviceId,
        receiptId,
        cost,
        isManual,
        isOnline
    } = req.body;
  
    try {

        const item = await RevenueItem.findByPk(id);

        if (!item) {
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

        const recordExist = await RevenueItem.findOne({
            where: {
                name,
                serviceId,
                receiptId,
                id: { 
                    [Op.ne]: id 
                }
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

        await item.update({
            name,
            serviceId,
            receiptId,
            cost,
            isManual,
            isOnline
        });

        const i = await Get(item.id);

        res.status(200).json({ 
            Message: "record modified.", 
            // Data: item 
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

        const item = await RevenueItem.findByPk(id);

        if (!item) {
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

        await item.update({
            isActive: false
        });

        res.status(200).json({ 
            Message: "record disabled.", 
            Data: item 
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

        const item = await RevenueItem.findByPk(id);

        if (!item) {
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

        await item.update({
            isActive: true
        });

        res.status(200).json({ 
            Message: "record enabled.", 
            Data: item
        });

    } catch (error) {

        res.status(500).json({ 
            error: error.message 
        });
        
    }
};