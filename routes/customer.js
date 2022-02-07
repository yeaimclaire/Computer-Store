//import express
const express = require("express"); //engine endpoint
const app = express(); //implementasi
app.use(express.json()); //read body

//import md5
const md5 = require("md5"); //enkripsi

//import multer
const multer = require("multer");
const path = require("path");
const fs = require("fs");

//import model
const models = require("../models/index");
const customer = models.customer;

//config storage image
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./image/customer");
  },
  filename: (req, file, cb) => {
    cb(null, "img-" + Date.now() + path.extname(file.originalname));
  },
});
let upload = multer({ storage: storage });

//GET ALL CUSTOMER, METHOD: GET, FUNCTION: findAll
app.get("/", (req, res) => {
  customer
    .findAll()
    .then((result) => {
      res.json({
        customer: result,
      });
    })
    .catch((error) => {
      res.json({
        message: error.message,
      });
    });
});

//GET CUSTOMER BY ID, METHOD: GET, FUNCTION: findOne
app.get("/:customer_id", (req, res) => {
  customer
    .findOne({ where: { customer_id: req.params.customer_id } })
    .then((result) => {
      res.json({
        customer: result,
      });
    })
    .catch((error) => {
      res.json({
        message: error.message,
      });
    });
});

//POST CUSTOMER,METHOD: POST, function: create
app.post("/", upload.single("image"), (req, res) => {
  if (!req.file) {
    res.json({
      message: "No uploaded file",
    });
  } else {
    let data = {
      name: req.body.name,
      phone: req.body.phone,
      adress: req.body.adress,
      image: req.file.filename,
      username: req.body.username,
      password: md5(req.body.password),
    };
    customer
      .create(data)
      .then((result) => {
        res.json({
          message: "data has been inserted",
        });
      })
      .catch((error) => {
        res.json({
          message: error.message,
        });
      });
  }
});

module.exports = app;
