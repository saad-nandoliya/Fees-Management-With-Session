const express = require('express');
const router = express.Router();

const adminUserRouter = require("../../controllers/login/AdminLogin")

router.post("/add-admin-user", adminUserRouter.addAdminUser)
router.post("/admin-login", adminUserRouter.loginAdminUser)



module.exports = router;