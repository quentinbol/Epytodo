const db = require('../../config/db');

function getAllTodos(req, res) {
    db.execute(`SELECT * FROM todo WHERE user_id='${req.user.id}';`, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ "msg": "Internal server error"});
            return;
        }
        res.status(200).send(result);
    });
}

function getTodo(req, res, id) {
    db.execute(`SELECT * FROM todo WHERE user_id='${req.user.id}' AND id='${id}';`, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ "msg": "Internal server error"});
            return;
        }
        if (result.length == 0) {
            res.status(404).json({ "msg": "Not found" });
            return;
        }
        res.status(200).send(result[0]);
    });
}

function createTodo(req, res) {
    const title = req.query.title;
    const desc = req.query.description;
    const dueTime = req.query.due_time;
    const userId = req.query.user_id;
    const status = req.query.status;

    if (!dueTime.match(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/)) {
        res.status(400).json({ "msg": "Bad parameter" });
        return;
    }

    db.execute(`INSERT INTO todo (title, description, due_time, user_id, status) VALUES ('${title}', '${desc}', '${dueTime}', '${userId}', '${status}');`, (err, result) => {
        if (err) {
            res.status(500).json({ "msg": "Internal server error" });
            return;
        }

        db.execute(`SELECT * FROM todo WHERE user_id='${userId}' AND id=LAST_INSERT_ID();`, (err, result) => {
            if (err) {
                res.status(500).json({ "msg": "Internal server error" });
                return;
            }
            res.status(200).json(result[0]);
        });
    });
}

function delTodo(req, res, id) {
    db.execute(`DELETE FROM todo WHERE user_id='${req.user.id}' AND id='${id}'`, (err, result) => {
        if (err) {
            res.status(500).json({"msg": "Internal server error"});
            return;
        }
        if (result.length == 0) {
            res.status(404).json({ "msg": "Not found" });
            return;
        }
        res.status(200).json({ "msg": `Successfully deleted record number: ${id}` });
    });
}

function updateTodo(req, res, id) {
    const newTitle = req.query.title;
    const newDesc = req.query.description;
    const newDueTime = req.query.due_time;
    const newStatus = req.query.status;

    if (!newDueTime.match(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/)) {
        res.status(400).json({ "msg": "Bad parameter" });
        return;
    }

    db.execute(`UPDATE todo SET title='${newTitle}', description='${newDesc}', due_time='${newDueTime}', status='${newStatus}' WHERE user_id='${req.user.id}' AND id='${id}';`, (err, result) => {
        if (err) {
            res.status(500).json({"msg": "Internal server error"});
            return;
        }
        if (result.length == 0) {
            res.status(404).json({ "msg": "Not found" });
            return;
        }
        db.execute(`SELECT * FROM todo WHERE user_id='${req.user.id}' AND id='${id}'`, (err, result) => {
            if (err) {
                res.status(500).json({"msg": "Internal server error"});
                return;
            }
            res.status(200).send(result[0]);
        });
    });
}

module.exports = { getAllTodos, getTodo, createTodo, delTodo, updateTodo };