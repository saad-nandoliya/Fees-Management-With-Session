const db = require('../../connection/db');

// Students ko filter karo (session, class, section ke basis pe)
const getStudents = (req, res) => {
    const { session_year, class_id, section_id } = req.query;

    // Validate inputs
    if (!session_year || !class_id || !section_id) {
        return res.status(400).json({ message: 'Session year, class, aur section zaruri hai' });
    }

    // Students fetch karo
    const getStudentsSql = `
        SELECT s.id, s.student_name, s.father_name, c.class_name, sec.section_name, s.session_year
        FROM students s
        JOIN classes c ON s.class_id = c.id
        JOIN sections sec ON s.section_id = sec.id
        WHERE s.session_year = ? AND s.class_id = ? AND s.section_id = ?`;
    db.query(getStudentsSql, [session_year, class_id, section_id], (err, students) => {
        if (err) {
            console.error('Students fetch karne mein error:', err);
            return res.status(500).json({ message: 'Database error', error: err.message });
        }
        res.status(200).json(students);
    });
};

// Selected students ko promote karo
const promoteStudents = (req, res) => {
    const { student_ids, new_session_year, new_class_id, new_section_id } = req.body;

    // Validate inputs
    if (!student_ids || !Array.isArray(student_ids) || student_ids.length === 0) {
        return res.status(400).json({ message: 'Kam se kam ek student select karo' });
    }
    if (!new_session_year || !new_class_id || !new_section_id) {
        return res.status(400).json({ message: 'Naya session, class, aur section zaruri hai' });
    }

    // Session_id fetch karo
    const getSessionIdSql = 'SELECT id FROM sessions WHERE year = ?';
    db.query(getSessionIdSql, [new_session_year], (err, sessionResult) => {
        if (err) {
            console.error('Session query mein error:', err);
            return res.status(500).json({ message: 'Database error', error: err.message });
        }
        if (sessionResult.length === 0) {
            return res.status(400).json({ message: `Invalid session year: ${new_session_year}` });
        }
        const new_session_id = sessionResult[0].id;

        // Promotion records insert karo
        const insertSql = `
            INSERT INTO student_sessions 
            (student_id, session_id, class_id, section_id, is_promoted) 
            VALUES (?, ?, ?, ?, 1)`;
        let errors = [];
        let inserted = 0;

        student_ids.forEach((student_id, index) => {
            db.query(insertSql, [student_id, new_session_id, new_class_id, new_section_id], (err) => {
                if (err) {
                    console.error(`Student ${student_id} promote karne mein error:`, err);
                    errors.push({ student_id, error: err.message });
                } else {
                    inserted++;
                }

                // Jab sab queries complete ho jaye, tab response do
                if (index === student_ids.length - 1) {
                    if (errors.length > 0) {
                        return res.status(500).json({
                            message: `Partial success: ${inserted} students promoted`,
                            errors,
                        });
                    }
                    res.status(200).json({ message: `${inserted} students successfully promoted` });
                }
            });
        });
    });
};

module.exports = { getStudents, promoteStudents };