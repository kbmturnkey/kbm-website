const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// DB CONNECTION
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "yourpassword",
    database: "kbm_db"
});

db.connect(err => {
    if (err) {
        console.log("DB Error:", err);
    } else {
        console.log("MySQL Connected ✅");
    }
});

// LOGIN API
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    const sql = "SELECT * FROM users WHERE email=? AND password=?";
    
    db.query(sql, [email, password], (err, result) => {
        if (err) {
            return res.status(500).json({ success: false, error: err });
        }

        if (result.length > 0) {
            res.json({ success: true, user: result[0] });
        } else {
            res.json({ success: false, message: "Invalid credentials" });
        }
    });
});

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000 🚀");
});
