module.exports = (app) => {
    app.post("/login", (req, res) => {
        const email = req.query.email;
        const password = req.query.password;
        if (!password || !email) {
            res.status(500).send("{\n\"msg\": \"Internal server error\"\n}")
            return;
        }
        console.log(email, password);
        res.send("{\n}");
    });

    app.post("/register", (req, res) => {
        const name = req.query.name;
        const firstName = req.query.firstName;
        const email = req.query.email;
        const password = req.query.password;
        const createdAt = Date.now();
        console.log(name, firstName, email, password, createdAt);
        res.send("OK");
    });
}