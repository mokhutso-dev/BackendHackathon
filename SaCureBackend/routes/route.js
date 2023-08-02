const express = require("express");
const router = express.Router();

const { 
    createUser, 
    getAllUsers, 
    getaUser, 
    update, 
    deletedUser
} = require("../controllers/controller");

router.post("/user/register", createUser);
router.get("/users/all", getAllUsers);
router.get("/user", getaUser);
router.put("/:id", update);
router.delete("/:id", deletedUser);

module.exports = router;                //since we are "paths" is called in index.js,
                                 //should this router be changed to paths or remain as router?  