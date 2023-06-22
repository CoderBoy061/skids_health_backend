const express = require('express');
const router = express.Router();
const { addData, updateData, deleteData, getData } = require('../controllers/userData');

router.route("/create").post(addData);
router.route("/update/:id").patch(updateData);
router.route("/delete/:id").delete(deleteData);
router.route("/get/data").get(getData)

module.exports = router;
