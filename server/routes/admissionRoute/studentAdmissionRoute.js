const express = require("express");
const router = express.Router();
const studentAdmissionRoute = require("../../controllers/admission/studentAdmission")

router.route("/student-admission").post(studentAdmissionRoute.studentAdmission)
router.route("/get-students").get(studentAdmissionRoute.getStudents)
router.route("/get-session-year").get(studentAdmissionRoute.getSessionYear)
router.route("/get-class").get(studentAdmissionRoute.getClasses)
router.route("/get-section").get(studentAdmissionRoute.getSections)

router.route("/api/student-details/students").get(studentAdmissionRoute.getStudentDetails)
router.route("/api/student-details/options").get(studentAdmissionRoute.getFilterOptions)

module.exports = router;