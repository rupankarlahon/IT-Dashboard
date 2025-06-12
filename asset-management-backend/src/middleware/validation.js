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

module.exports = {
    validateAsset
}; 