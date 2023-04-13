const { createNewUser, loginController } = require("../controllers/userController");

const router = require("express").Router();

router.post("/user/add-user", createNewUser);
router.post("/user/login", loginController);

module.exports = router;
