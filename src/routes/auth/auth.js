const { login, register, verifyEmail } = require('../user/user.query');

module.exports = (app, bcrypt) => {
    app.post("/login", (req, res) => {
        const email = req.query.email;
        const password = req.query.password;

        if (!email || !password) {
            res.status(400).json({ "msg": "Bad parameter" });
            return;
        }

        verifyEmail(res, email, (doAccountExist) => {
            if (doAccountExist) {
                login(res, email, password, bcrypt);
            } else {
                res.status(401).json({ "msg": "Invalid Credentials" });
            }
        });
    });

    app.post("/register", (req, res) => {
        const name = req.query.name;
        const firstname = req.query.firstname;
        const email = req.query.email;
        const password = req.query.password;
        
        if (!name || !firstname || !email || !password) {
            res.status(400).json({ "msg": "Bad parameter" });
            return;
        }

        const hashPwd = bcrypt.hashSync(password, 10);

        verifyEmail(res, email, (isEmailAlreadyUsed) => {
            if (isEmailAlreadyUsed) {
                res.status(409).json({ "msg": "Account already exists" });
            } else {
                register(res, name, firstname, email, hashPwd);
            }
        });
    });
}