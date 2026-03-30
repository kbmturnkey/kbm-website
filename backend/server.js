
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "yourpassword",
    database: "kbm_db"
});

// LOGIN API
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    const sql = "SELECT * FROM users WHERE email=? AND password=?";
    db.query(sql, [email, password], (err, result) => {
        if (err) return res.send(err);

        if (result.length > 0) {
            res.send({ success: true, user: result[0] });
        } else {
            res.send({ success: false });
        }
    });
});

// REGISTER API
app.post("/register", (req, res) => {
    const { email, password } = req.body;

    const sql = "INSERT INTO users (email, password) VALUES (?, ?)";
    db.query(sql, [email, password], (err, result) => {
        if (err) return res.send(err);

        res.send({ success: true });
    });
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
