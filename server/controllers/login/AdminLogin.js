const bcrypt = require("bcrypt");
const db = require("../../connection/db");


const addAdminUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res
                .status(400)
                .json({ message: "Email and password are required." });
        }

        const checkEmail = "SELECT * FROM admin_users WHERE email = ?";
        db.query(checkEmail, [email], async (err, result) => {
            if (err) {
                console.error("Database error:", err.message);
                return res
                    .status(500)
                    .json({ message: "Database error. Try again later." });
            }

            if (result.length > 0) {
                return res.status(400).json({
                    message: "Email already exists. Try another one!",
                });
            }
            console.log(password)
            const hashedPassword = await bcrypt.hash(password, 10);

            const sqlQuery =
                "INSERT INTO admin_users (email, password) VALUES (?, ?)";
            const data = [email, hashedPassword];

            db.query(sqlQuery, data, (err) => {
                if (err) {
                    console.error("Database error:", err.message);
                    return res
                        .status(500)
                        .json({ message: "Database query error. Please try again later." });
                }

                return res
                    .status(201)
                    .json({ message: "Admin User added successfully." });
            });
        });
    } catch (error) {
        console.error("Error adding user:", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
};


const loginAdminUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required." });
        }

        const sql = "SELECT * FROM admin_users WHERE email = ?";

        db.query(sql, [email], async (err, results) => {
            if (err) {
                console.error("Database query error:", err.message);
                return res.status(500).json({ message: "Server error" });
            }

            if (results.length === 0) {
                return res.status(401).json({ message: "Invalid email or password" });
            }

            const user = results[0];

            // if (user.status === "inactive") {
            //     return res.status(403).json({ message: "Your account is inactive. Please contact support." });
            // }
  
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (isPasswordValid) {
                return res.status(200).json({ message: "Login successful" });
            }

            return res.status(401).json({ message: "Invalid email or password" });
        });
    } catch (error) {
        console.error("Error:", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { addAdminUser, loginAdminUser };
