const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const PORT = process.env.PORT;
const URL = process.env.URL;



const db = require("./connection/db");
const studentAdmission = require("./routes/admissionRoute/studentAdmissionRoute")
const adminLogin = require("./routes/loginRoute/AdminLoginRoute")
const promoteStudentRoutes = require('./routes/promoteStudentRoute/promoteStudentRoute');




const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/", studentAdmission)
app.use("/", adminLogin)
app.use("/", promoteStudentRoutes);








db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
    } else {
        console.log("Connected to MySQL Database");
        app.listen(PORT, () => {
            console.log(`Server is running on : ${URL}`);
        });
    }
});