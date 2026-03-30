const express = require("express");
const sql = require("mssql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// SQL SERVER CONFIG
const config = {
    user: "your_username",
    password: "your_password",
    server: "localhost", // or server name
    database: "kbm_db",
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};

// CONNECT
sql.connect(config)
    .then(() => console.log("SQL Server Connected ✅"))
    .catch(err => console.log("DB Error:", err));


// ✅ REGISTER API
app.post("/register", async (req, res) => {
    const { company_name, name, mobile, email, password } = req.body;

    try {
        const pool = await sql.connect(config);

        // Check existing user
        const check = await pool.request()
            .input("email", sql.VarChar, email)
            .query("SELECT * FROM users WHERE email = @email");

        if (check.recordset.length > 0) {
            return res.json({ success: false, message: "Email already exists ❌" });
        }

        // Insert user
        await pool.request()
            .input("company_name", sql.VarChar, company_name)
            .input("name", sql.VarChar, name)
            .input("mobile", sql.VarChar, mobile)
            .input("email", sql.VarChar, email)
            .input("password", sql.VarChar, password)
            .query(`
                INSERT INTO users (company_name, name, mobile, email, password)
                VALUES (@company_name, @name, @mobile, @email, @password)
            `);

        res.json({ success: true, message: "Registered Successfully ✅" });

    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});


// ✅ LOGIN API
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const pool = await sql.connect(config);

        const result = await pool.request()
            .input("email", sql.VarChar, email)
            .input("password", sql.VarChar, password)
            .query("SELECT * FROM users WHERE email=@email AND password=@password");

        if (result.recordset.length > 0) {
            res.json({ success: true, user: result.recordset[0] });
        } else {
            res.json({ success: false, message: "Invalid credentials ❌" });
        }

    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});


app.listen(5000, () => {
    console.log("Server running on http://localhost:5000 🚀");
});
