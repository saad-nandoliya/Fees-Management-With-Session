const db = require("../../connection/db")



const studentAdmission = (req, res) => {
  const {
    student_name,
    father_name,
    city,
    state,
    class_name,
    section,
    date_of_birth,
    mobile_number,
    session_year,
  } = req.body;


  const getClassIdQuery = "SELECT id FROM classes WHERE class_name = ?";
  db.query(getClassIdQuery, [class_name], (err, classResult) => {
    if (err || classResult.length === 0) {
      console.error("Error fetching class_id:", err);
      return res.status(500).json({ message: "Invalid class name" });
    }
    const class_id = classResult[0].id;
    

    const getSectionIdQuery = "SELECT id FROM sections WHERE section_name = ?";
    db.query(getSectionIdQuery, [section], (err, sectionResult) => {
      if (err || sectionResult.length === 0) {
        console.error("Error fetching section_id:", err);
        return res.status(500).json({ message: "Invalid section name" });
      }

      const section_id = sectionResult[0].id;

  
      const insertQuery = `
        INSERT INTO students 
        (student_name, father_name, city, state, class_id, section_id, date_of_birth, mobile_number, session_year) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

      const values = [
        student_name,
        father_name,
        city,
        state,
        class_id,
        section_id,
        date_of_birth,
        mobile_number,
        session_year,
      ];

      db.query(insertQuery, values, (err, result) => {
        if (err) {
          console.error("Error inserting admission form:", err);
          return res.status(500).json({ message: "Database error" });
        }
        res.status(200).json({ message: "Admission form submitted successfully" });
      });
    });
  });
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


const getSessionYear = (req, res) => {
    const sql = "SELECT * FROM sessions"
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error Getting SessionYear", err);
            return res.status(500).json({ message: "Database error" });
        }
        return res.status(200).json(results);
    })
} 


const getClasses = (req, res) => {
    const sql = "SELECT * FROM classes"
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error Getting Classes", err);
            return res.status(500).json({ message: "Database error" });
        }
        return res.status(200).json(results);
    })
} 


const getSections = (req, res) => {
    const sql = "SELECT * FROM sections"
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error Getting Sections", err);
            return res.status(500).json({ message: "Database error" });
        }
        return res.status(200).json(results);
    })
}

module.exports = { studentAdmission, getStudents, getSessionYear, getClasses, getSections };