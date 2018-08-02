const helper = require('./task');

function create(req, res) {
    helper.addTask({ time: req.body.time, message: req.body.message });
    return res.status(200).json({ success: true });
}

module.exports = {
    create,
};
