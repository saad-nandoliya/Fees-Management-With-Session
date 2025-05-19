const db = require("../../connection/db")



const studentAdmission = (req, res) => {
    const {
        student_name,
        father_name,
        city,
        state,
        class_name,
        date_of_birth,
        mobile_number,
        session_year,
    } = req.body;

    const sql = `
    INSERT INTO students 
    (student_name, father_name, city, state, class, date_of_birth, mobile_number, session_year) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [student_name,
        father_name,
        city,
        state,
        class_name,
        date_of_birth,
        mobile_number,
        session_year,]
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error inserting admission form:", err);
            return res.status(500).json({ message: "Database error" });
        }
        res.status(200).json({ message: "Admission form submitted successfully" });
    }
    );
};



const getStudents = (req, res) => {
    const sql = `SELECT * FROM students`
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error Getting Student's", err);
            return res.status(500).json({ message: "Database error" });
        }
        return res.status(200).json(results);
    })
}

module.exports = { studentAdmission, getStudents };