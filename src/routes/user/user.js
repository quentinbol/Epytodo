const auth = require('../../middelware/auth');
const { getUser, getUserTodos, updateUser, deleteUser } = require('./user.query');

module.exports = (app, bcrypt) => {
    app.get("/user", auth, (req, res) => {
        getUser(req, res);
    });

    app.get("/user/todos", auth, (req, res) => {
        getUserTodos(req, res);
    });

    app.get("/users/:data", auth, (req, res) => {
        const idString = req.params.data.match(/\d/);

        if (idString && idString.length == req.params.data.length) {
            const id = parseInt(req.params.data);

            if (id != req.user.id) {
                res.status(403).json({ "msg": "Token is not valid" });
                return;
            }
            getUser(req, res);
        } else {
            const email = req.params.data;

            if (email != req.user.mail) {
                res.status(403).json({ "msg": "Token is not valid" });
                return;
            }
            getUser(req, res);
        }
    });

    app.put("/users/:id", auth, (req, res) => {
        if (id != req.user.id) {
            res.status(403).json({ "msg": "Token is not valid" });
            return;
        }
        updateUser(req, res, bcrypt);
    });

    app.delete("/users/:id", auth, (req, res) => {
        if (id != req.user.id) {
            res.status(403).json({ "msg": "Token is not valid" });
            return;
        }
        deleteUser(req, res);
    });
}