require("dotenv").config();
const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const port = process.env.PORT;

require("./routes/auth/auth")(app);
app.use(bodyparser.urlencoded({ extended : false}));

app.get('/', (req, res) => {
    res.send(`<h1>Welcome</h1>`);
});

app.listen(port, () => {
    console.log(`connected to port: http://localhost:${port}`);
});
