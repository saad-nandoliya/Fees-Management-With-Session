const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const PORT = process.env.PORT;
const URL = process.env.URL;



const db = require("./connection/db");
const studentAdmission = require("./routes/admissionRoute/studentAdmissionRoute")





const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/", studentAdmission)








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