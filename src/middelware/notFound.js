const db = require('../config/db');

module.exports = (app) => {
    app.get("/*", (req, res) => {
        res.status(404).json({ "msg": "Not found" });
    });
};