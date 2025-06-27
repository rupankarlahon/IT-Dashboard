const Contract = require('../models/contract');

class ContractController {
    async addContract(req, res) {
        try {
            const contract = await Contract.create(req.body);
            res.status(201).json(contract);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getContracts(req, res) {
        try {
            const contracts = await Contract.findAll({ order: [['createdAt', 'ASC']] });
            res.json(contracts);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async deleteContract(req, res) {
        try {
            const id = req.params.id;
            const deleted = await Contract.destroy({ where: { id } });
            if (deleted) {
                res.json({ message: 'Contract deleted' });
            } else {
                res.status(404).json({ error: 'Contract not found' });
            }
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async updateContract(req, res) {
        try {
            const id = req.params.id;
            const contract = await Contract.findByPk(id);
            if (!contract) {
                return res.status(404).json({ error: 'Contract not found' });
            }
            await contract.update(req.body);
            res.json(contract);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = ContractController;