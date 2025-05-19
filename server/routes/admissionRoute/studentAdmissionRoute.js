const express = require("express");
const router = express.Router();
const studentAdmissionRoute = require("../../controllers/admission/studentAdmission")

router.route("/student-admission").post(studentAdmissionRoute.studentAdmission)
router.route("/get-students").get(studentAdmissionRoute.getStudents)

module.exports = router;