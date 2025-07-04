const validateAsset = (req, res, next) => {
    const { 
        assetId, 
        assetClass, 
        inventoryNumber, 
        makeModel, 
        serialNumber, 
        assetDescription, 
        availability 
    } = req.body;
    const errors = [];

    if (!assetId) errors.push('Asset ID is required');
    if (!assetClass) errors.push('Asset Class is required');
    if (!inventoryNumber) errors.push('Inventory Number is required');
    if (!makeModel) errors.push('Make/Model is required');
    if (!serialNumber) errors.push('Serial Number is required');

    const validAvailability = ['Available', 'In Use', 'Under Maintenance', 'Retired'];
    if (availability && !validAvailability.includes(availability)) {
        errors.push('Invalid availability status');
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    next();
};

const validateContract = (req, res, next) => {
    const {
        vendorName, gemContract, regularContract, period, value,
        nomination, regular, subject, oemOes
    } = req.body;
    const errors = [];

    if (!vendorName) errors.push('Vendor Name is required');
    if (!gemContract) errors.push('GeM Contract is required');
    if (!regularContract) errors.push('Regular Contract is required');
    if (!period) errors.push('Period is required');
    if (!value) errors.push('Value is required');
    if (!nomination) errors.push('Nomination is required');
    if (!regular) errors.push('Regular is required');
    if (!subject) errors.push('Subject is required');
    if (!oemOes) errors.push('OEM/OES is required');

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    next();
};

const validateService = (req, res, next) => {
    const {
        serviceID, serviceName, engineerName, contact, email,
        entry, desc
    } = req.body;

    const errors = [];

    if (!serviceID) errors.push('Service ID is required');
    if (!serviceName) errors.push('Service Name is required');
    if (!engineerName) errors.push('Engineer Name is required');
    if (!contact) errors.push('Contact Number is required');
    if (!email) errors.push('Email is required');
    if (!entry) errors.push('Entry Date and Time is required');
    if (!desc) errors.push('Description is required');

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    next();
};


module.exports = {
    validateAsset,
    validateContract,
    validateService
};
