const { 
    Op, 
    Sequelize
} = require('../utils/dependencies');

const { 
    Assessment,
    AssessmentItem,
    System,
    Queue,
    Payor,
    Burial,
    Slaughter,
    IndividualCedula,
    CorporationCedula,
    ProfessionalTaxReceipt
} = require('../models');

exports.GetAllAssessments = async (req, res) => {

    const Page = parseInt(req.query.page) || 1;
    const Limit = parseInt(req.query.limit) || 10;
    const Offset = (Page - 1) * Limit;

    try {

        const { count, rows } = await Assessment.findAndCountAll({
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

exports.CreateRegularAssessment = async (req, res) => {

    const { 
        SystemId, 
        Items, 
        Name 
    } = req.body;

    try {

        const Now = new Date();
        const Year = String(Now.getFullYear()).slice(-2); // Last two digits of year
        const Month = String(Now.getMonth() + 1).padStart(2, "0"); // Ensure 2-digit format
        const Day = String(Now.getDate()).padStart(2, "0"); // Ensure 2-digit format
        const TodayString = `${Year}-${Month}-${Day}`;

        const system = await System.findOne({ where: { id: systemId } });

        if (!system) {
            return res.status(400).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "record not found!",
                    path: "name",
                    location: "body",
                }],
            });
        }

        const SystemCode = system.Code;
        
        const LatestReference = await Assessment.findOne({
            where: {
                SystemId,
                ReferenceNo: { [Op.like]: `${SystemCode}-${TodayString}-%` }, // Match today's references
            },
            order: [["ReferenceNo", "DESC"]]
        });

        let NextReferenceNumber;

        if (LatestReference) {
            const LastNumber = parseInt(LatestReference.ReferenceNo.split("-").pop(), 10);
            NextReferenceNumber = `${SystemCode}-${TodayString}-${String(LastNumber + 1).padStart(5, "0")}`;
        } else {
            NextReferenceNumber = `${SystemCode}-${TodayString}-00001`; // Start fresh for the day
        }

        const LatestQueue = await Queue.findOne({
            where: { 
                CreatedAt: { [Op.gte]: Now.setHours(0, 0, 0, 0) } 
            },
            order: [["QueueNo", "DESC"]]
        });

        const NextQueueNumber = LatestQueue
            ? `CSF-${String(parseInt(LatestQueue.QueueNo.replace("CSF-", ""), 10) + 1).padStart(4, "0")}`
            : "CSF-0001";

        const queue = await Queue.create({ 
            QueueNo: NextQueueNumber 
        });

        const assessment = await Assessment.create({ 
            QueueId: queue.Id, 
            SystemId: SystemId, 
            ReferenceNo: NextReferenceNumber 
        });

        const i = Items.map(item => ({
            AssessmentId: assessment.Id,
            ItemCode: item.code,
            ItemId: item.itemId,
            Quantity: item.quantity,
            Cost: item.cost
        }));

        await AssessmentItem.bulkCreate(i);

        await Payor.create({ 
            AssessmentId: assessment.Id, 
            Name 
        });

        res.status(201).json({ 
            Message: "record created."
        });

    } catch (error) {

        res.status(400).json({ 
            error: error.message 
        });

    }

};


exports.CreateBurialAssessment = async (req, res) => {

    const { 
        SystemId, 
        Items, 
        Name, 
        Burials 
    } = req.body;
    
    const { 
        Permission, 
        NationalityId,
        Age, 
        SexId, 
        DateOfDeath, 
        CauseOfDeath, 
        Cemetery, 
        IsInfectious, 
        IsEmbalmed, 
        DateOfDisposition 
    } = Burials

    try {

        const Now = new Date();
        const Year = String(Now.getFullYear()).slice(-2); // Last two digits of year
        const Month = String(Now.getMonth() + 1).padStart(2, "0"); // Ensure 2-digit format
        const Day = String(Now.getDate()).padStart(2, "0"); // Ensure 2-digit format
        const TodayString = `${Year}-${Month}-${Day}`;

        const system = await System.findOne({ 
            where: { 
                Id: SystemId 
            } 
        });

        if (!system) {
            return res.status(400).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "record not found!",
                    path: "name",
                    location: "body",
                }],
            });
        }

        const SystemCode = system.Code;

        const LatestReference = await Assessment.findOne({
            where: {
                SystemId,
                ReferenceNo: {
                    [Op.like]: `${SystemCode}-${TodayString}-%` 
                }
            },
            order: [["ReferenceNo", "DESC"]]
        });

        let NextReferenceNumber;

        if (LatestReference) {
            // Extract the last incremented part, add 1, and format
            const LastNumber = parseInt(LatestReference.referenceNo.split("-").pop(), 10);
            NextReferenceNumber = `${SystemCode}-${TodayString}-${String(LastNumber + 1).padStart(5, "0")}`;
        } else {
            NextReferenceNumber = `${SystemCode}-${TodayString}-00001`; // Start fresh for the day
        }

        const LatestQueue = await Queue.findOne({
            where: { 
                CreatedAt: { [Op.gte]: Now.setHours(0, 0, 0, 0) } 
            },
            order: [["QueueNo", "DESC"]]
        });

        const NextQueueNumber = LatestQueue
            ? `CSF-${String(parseInt(LatestQueue.QueueNo.replace("CSF-", ""), 10) + 1).padStart(4, "0")}`
            : "CSF-0001";

        const queue = await Queue.create({ 
            queueNo: NextQueueNumber 
        });

        const assessment = await Assessment.create({ 
            QueueId: queue.Id, 
            SystemId: SystemId, 
            ReferenceNo: NextReferenceNumber 
        });

        const i = Items.map(item => ({
            AssessmentId: assessment.id,
            ItemId: item.itemId,
            ItemCode: item.code,
            Quantity: item.quantity,
            Cost: item.cost
        }));

        await AssessmentItem.bulkCreate(i);

        await Payor.create({ 
            AssessmentId: assessment.Id, 
            Name 
        });

        await Burial.create({ 
            AssessmentId: assessment.Id, 
            Permission, 
            Name, 
            NationalityId, 
            Age, 
            SexId, 
            DateOfDeath, 
            CauseOfDeath, 
            Cemetery, 
            IsInfectious, 
            IsEmbalmed, 
            DateOfDisposition 
        });

        res.status(201).json({ 
            Message: "record created."
        });

    } catch (error) {

        res.status(400).json({ 
            error: error.message 
        });

    }

};

exports.CreateSlaughterAssessment = async (req, res) => {

    const { 
        SystemId, 
        Items, 
        Name, 
        Slaughters 
    } = req.body;
    
    const { 
        HeadOf, 
        Weight 
    } = Slaughters

    try {

        const Now = new Date();
        const Year = String(Now.getFullYear()).slice(-2); // Last two digits of year
        const Month = String(Now.getMonth() + 1).padStart(2, "0"); // Ensure 2-digit format
        const Day = String(Now.getDate()).padStart(2, "0"); // Ensure 2-digit format
        const TodayString = `${Year}-${Month}-${Day}`;

        const system = await System.findOne({ 
            where: { 
                Id: SystemId 
            } 
        });

        if (!system) {
            return res.status(400).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "record not found!",
                    path: "name",
                    location: "body",
                }],
            });
        }

        const SystemCode = system.Code;

        const LatestReference = await Assessment.findOne({
            where: {
                SystemId,
                ReferenceNo: {
                    [Op.like]: `${SystemCode}-${TodayString}-%` 
                }
            },
            order: [["ReferenceNo", "DESC"]]
        });

        let NextReferenceNumber;

        if (LatestReference) {
            // Extract the last incremented part, add 1, and format
            const LastNumber = parseInt(LatestReference.referenceNo.split("-").pop(), 10);
            NextReferenceNumber = `${SystemCode}-${TodayString}-${String(LastNumber + 1).padStart(5, "0")}`;
        } else {
            NextReferenceNumber = `${SystemCode}-${TodayString}-00001`; // Start fresh for the day
        }

        const LatestQueue = await Queue.findOne({
            where: { 
                CreatedAt: { [Op.gte]: Now.setHours(0, 0, 0, 0) } 
            },
            order: [["QueueNo", "DESC"]]
        });

        const NextQueueNumber = LatestQueue
            ? `CSF-${String(parseInt(LatestQueue.QueueNo.replace("CSF-", ""), 10) + 1).padStart(4, "0")}`
            : "CSF-0001";

        const queue = await Queue.create({ 
            queueNo: NextQueueNumber 
        });

        const assessment = await Assessment.create({ 
            QueueId: queue.Id, 
            SystemId: SystemId, 
            ReferenceNo: NextReferenceNumber 
        });

        const i = Items.map(item => ({
            AssessmentId: assessment.id,
            ItemId: item.itemId,
            ItemCode: item.code,
            Quantity: item.quantity,
            Cost: item.cost
        }));

        await AssessmentItem.bulkCreate(i);

        await Payor.create({ 
            AssessmentId: assessment.Id, 
            Name 
        });

        await Slaughter.create({ 
            AssessmentId: assessment.Id, 
            Name, 
            HeadOf, 
            Weight 
        });

        res.status(201).json({ 
            Message: "record created."
        });

    } catch (error) {

        res.status(400).json({ 
            error: error.message 
        });

    }

};