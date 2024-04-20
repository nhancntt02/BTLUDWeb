const express = require("express");
const publisher = require("../controllers/nxb.controller");
const books = require("../controllers/book.controller");
const staff = require("../controllers/employee.controller");
const reader = require("../controllers/reader.controller");
const flowbook = require("../controllers/flowbook.controller");


const router = express.Router();

// router nha xuat ban

router.route("/publiser")
    .get(publisher.findAll)
    .post(publisher.create)
    .delete(publisher.deleteAll);

router.route("/publiser/:id")
    .get(publisher.findOne)
    .put(publisher.update)
    .delete(publisher.delete);

//route sach

router.route("/books")
    .get(books.findAll)
    .post(books.create)
    .delete(books.deleteAll);

router.route("/books/:id")
    .get(books.findOne)
    .put(books.update)
    .delete(books.delete);

// router nhan vien

router.route("/staff")
    .get(staff.findAll)
    .post(staff.create)
    .delete(staff.deleteAll);

router.route("/staff/:id")
    .get(staff.findOne)
    .put(staff.update)
    .delete(staff.delete);
router.route('/login')
    .post(staff.login);

// router doc gia

router.route("/reader")
    .get(reader.findAll)
    .post(reader.create)
    .delete(reader.deleteAll);

router.route("/reader/:id")
    .get(reader.findOne)
    .put(reader.update)
    .delete(reader.delete);

// router theo doi muon sach

router.route("/flowbook")
    .get(flowbook.findAll)
    .post(flowbook.create)
    .delete(flowbook.deleteAll);

router.route("/flowbook/:id")
    .get(flowbook.findOne)
    .put(flowbook.update)
    .delete(flowbook.delete);

module.exports = router;
