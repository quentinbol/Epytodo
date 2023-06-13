const db = require('../../config/db');
const jwt = require('jsonwebtoken');

function login(res, email, password, bcrypt) {
    db.execute(`SELECT * FROM user WHERE email='${email}';`, (err, result) => {
        if (err) {
            res.status(500).json({ "msg": "Internal server error" });
            return;
        }
        if (bcrypt.compareSync(password, result[0].password)) {
            const token = jwt.sign({ id: result[0].id, mail: email }, process.env.SECRET, { expiresIn: 1800 });
            res.status(200).json({ "token": token });
            return;
        }
        res.status(401).json({ "msg": "Invalid Credentials" });
    });
}

function register(res, name, firstname, email, password) {
    db.execute(`INSERT INTO user (name, firstname, email, password) VALUES ('${name}', '${firstname}', '${email}', '${password}');`, (err) => {
        if (err) {
            res.status(500).json({ "msg": "Internal server error" });
            return;
        }
        db.execute(`SELECT * FROM user WHERE email='${email}';`, (err, result) => {
            if (err) {
                res.status(500).json({ "msg": "Internal server error" });
                return;
            }
            const token = jwt.sign({ id: result[0].id, mail: email }, process.env.SECRET, { expiresIn: 1800 });
            res.status(200).json({ "token": token });
        });
    });
}

function verifyEmail(res, email, callback) {
    db.execute(`SELECT email FROM user WHERE email='${email}';`, (err, result) => {
        if (err) {
            res.status(500).json({ "msg": "Internal server error" });
            return;
        }
        if (result.length != 0) {
            callback(true);
        } else {
            callback(false);
        }
    });
}

function getUser(req, res) {
    db.execute(`SELECT * FROM user WHERE email='${req.user.mail}';`, (err, result) => {
        if (err) {
            res.status(500).json({ "msg": "Internal server error" });
            return;
        }
        res.status(200).send(result[0]);
    });
}

function getUserTodos(req, res) {
    db.execute(`SELECT id FROM user WHERE email='${req.user.mail}';`, (err, result) => {
        if (err) {
            res.status(500).json({ "msg": "Internal server error" });
            return;
        }

        const userId = result[0].id;

        db.execute(`SELECT * FROM todo WHERE user_id='${userId}';`, (err, result) => {
            if (err) {
                res.status(500).json({ "msg": "Internal server error" });
                return;
            }
            res.status(200).json(result);
        });
    });
}

function updateUser(req, res, bcrypt) {
    const newEmail = req.query.email;
    const newPwd = bcrypt.hashSync(req.query.password, 10);
    const newFirstname = req.query.firstname;
    const newName = req.query.name;

    db.execute(`UPDATE user SET email='${newEmail}', password='${newPwd}', firstname='${newFirstname}', name='${newName}' WHERE id='${req.params.id}';`, (err) => {
        if (err) {
            res.status(500).json({"msg": "Internal server error"});
            return;
        }
        db.execute(`SELECT * FROM user WHERE id='${req.params.id}';`, (err, result) => {
            if (err) {
                res.status(500).json({ "msg": "Internal server error" });
                return;
            }
            res.status(200).json(result[0]);
        });
    });
}

function deleteUser(req, res) {
    db.execute(`DELETE FROM user WHERE id='${req.params.id}';`, (err) => {
        if (err) {
            res.status(500).json({"msg": "Internal server error"});
            return;
        }
        res.status(200).json({ "msg": `Successfully deleted record number: ${req.params.id}` });
    });
}

module.exports = { login, register, verifyEmail, getUser, getUserTodos, updateUser, deleteUser };