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
    const sql = "SELECT * FROM classes ORDER BY id ASC"
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






// Fetch students (both original and promoted) with optional filters
const getStudentDetails = (req, res) => {
    const { session_year, class_id, section_id } = req.query;

    // Base query to fetch students
    let sql = `
        SELECT DISTINCT s.id, s.student_name, s.father_name, s.city, s.state, 
            c.class_name, sec.section_name, s.date_of_birth, s.mobile_number, s.session_year
        FROM students s
        JOIN classes c ON s.class_id = c.id
        JOIN sections sec ON s.section_id = sec.id
        LEFT JOIN (
            SELECT ss.student_id, ss.session_id
            FROM student_sessions ss
            JOIN sessions ses ON ss.session_id = ses.id
            WHERE ses.year > ?
        ) AS promoted ON s.id = promoted.student_id
        WHERE promoted.student_id IS NULL
    `;

    // Add filters for original students
    const params = [session_year || "0"];
    if (session_year) sql += " AND s.session_year = ?";
    if (class_id) sql += " AND s.class_id = ?";
    if (section_id) sql += " AND s.section_id = ?";

    // Add promoted students using UNION
    sql += `
        UNION
        SELECT DISTINCT s.id, s.student_name, s.father_name, s.city, s.state, 
            c.class_name, sec.section_name, s.date_of_birth, s.mobile_number, ses.year AS session_year
        FROM student_sessions ss
        JOIN students s ON ss.student_id = s.id
        JOIN sessions ses ON ss.session_id = ses.id
        JOIN classes c ON ss.class_id = c.id
        JOIN sections sec ON ss.section_id = sec.id
        WHERE ss.is_promoted = 1
    `;

    // Add filters for promoted students
    if (session_year) sql += " AND ses.year = ?";
    if (class_id) sql += " AND ss.class_id = ?";
    if (section_id) sql += " AND ss.section_id = ?";

    // Add parameters for the filters
    if (session_year) params.push(session_year);
    if (class_id) params.push(class_id);
    if (section_id) params.push(section_id);
    if (session_year) params.push(session_year);
    if (class_id) params.push(class_id);
    if (section_id) params.push(section_id);

    db.query(sql, params, (err, results) => {
        if (err) {
            console.error("Error fetching student details:", err);
            return res.status(500).json({ message: "Database error", error: err.message });
        }
        return res.status(200).json(results);
    });
};

// Fetch options for dropdowns (sessions, classes, sections)
const getFilterOptions = (req, res) => {
    const queries = [
        { sql: "SELECT * FROM sessions", name: "sessions" },
        { sql: "SELECT * FROM classes ORDER BY id ASC", name: "classes" },
        { sql: "SELECT * FROM sections", name: "sections" },
    ];

    const results = {};
    let completedQueries = 0;

    queries.forEach(({ sql, name }) => {
        db.query(sql, (err, result) => {
            if (err) {
                console.error(`Error fetching ${name}:`, err);
                return res.status(500).json({ message: "Database error", error: err.message });
            }
            results[name] = result;
            completedQueries++;

            if (completedQueries === queries.length) {
                res.status(200).json({
                    sessionYear: results.sessions,
                    classes: results.classes,
                    sectionList: results.sections,
                });
            }
        });
    });
};




module.exports = { studentAdmission, getStudents, getSessionYear, getClasses, getSections, getStudentDetails, getFilterOptions };