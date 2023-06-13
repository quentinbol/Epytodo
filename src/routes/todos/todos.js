const auth = require('../../middelware/auth');
const { getAllTodos, getTodo, createTodo, delTodo, updateTodo } = require ("./todos.query.js");

module.exports = (app) => {
    app.get("/todos", auth, (req, res) => {
        getAllTodos(req, res);
    });

    app.get("/todos/:id", auth, (req, res) => {
        getTodo(req, res, req.params.id);
    });

    app.post("/todos", auth, (req, res) => {
        if (req.query.user_id != req.user.id) {
            res.status(403).json({ "msg": "Token is not valid" });
            return;
        }
        createTodo(req, res);
    });

    app.put("/todos/:id", auth, (req, res) => {
        if (req.query.user_id != req.user.id) {
            res.status(403).json({ "msg": "Token is not valid" });
            return;
        }
        updateTodo(req, res, req.params.id);
    });

    app.delete(`/todos/:id`, auth, (req, res) => {
        delTodo(req, res, req.params.id);
    });
}