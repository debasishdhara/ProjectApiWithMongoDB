const { baseM } = require('@models');
const baseMethodgetAll = async (req, res) => {
    try {
        const data = await baseM.find();
        res.status(200).json({ success: true, data: data });
    } catch (error) {
        res.status(200).json({ success: false, error: error.message });
    }
};

const baseMethodCreate = async (req, res) => {
    try {
        const data = await baseM.create(req.body);
        res.status(200).json({ success: true, data: data });
    } catch (error) {
        res.status(200).json({ success: false, error: error.message });
    }
};

const baseMethodEdit = async (req, res) => {
    try {
        const data = await baseM.findOne({ _id: req.params.id });
        res.status(200).json({ success: true, data: data });
    } catch (error) {
        res.status(200).json({ success: false, error: error.message });
    }
};

const baseMethodUpdate = async (req, res) => {
    try {
        const data = await baseM.findOneAndUpdate({ _id: req.params.id }, req.body);
        res.status(200).json({ success: true, data: data });
    } catch (error) {
        res.status(200).json({ success: false, error: error.message });
    }
};

const baseMethodDetete = async (req, res) => {
    try {
        const data = await baseM.findOneAndDelete({ _id: req.params.id });
        res.status(200).json({ success: true, data: data });
    } catch (error) {
        res.status(200).json({ success: false, error: error.message });
    }
};


module.exports = {
    baseMethodgetAll,
    baseMethodCreate,
    baseMethodEdit,
    baseMethodUpdate,
    baseMethodDetete
};
