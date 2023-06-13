require('dotenv').config();
const express = require('express');
const app = express();
const bcrypt = require('bcryptjs');
const bodyparser = require('body-parser');
const port = process.env.PORT;

require("./routes/auth/auth")(app, bcrypt);
require("./routes/user/user")(app, bcrypt);
require("./routes/todos/todos")(app);
require("./middelware/notFound")(app);

app.use(bodyparser.urlencoded({ extended : false}));

app.get('/', (req, res) => {
    res.send(`<h1>Welcome</h1>` + `please login via -> /login` + `or register via ->/register`);
});

app.listen(port, () => {
    console.log(`Connected to port: http://localhost:${port}`);
});
