//import express
const express = require("express"); //engine endpoint
const app = express(); //implementasi
app.use(express.json()); //read body

//import multer
const multer = require("multer");
const path = require("path");
const fs = require("fs");

//import model
const models = require("../models/index");
const product = models.product;

//config storage image
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./image/product");
  },
  filename: (req, file, cb) => {
    cb(null, "img-" + Date.now() + path.extname(file.originalname));
  },
});
let upload = multer({ storage: storage });

//GET ALL PRODUCT, METHOD: GET, FUNCTION: findAll
app.get("/", (req, res) => {
  product
    .findAll()
    .then((result) => {
      res.json({
        product: result,
      });
    })
    .catch((error) => {
      res.json({
        message: error.message,
      });
    });
});

//GET PRODUCT BY ID, METHOD: GET, FUNCTION: findOne
app.get("/:product_id", (req, res) => {
  product
    .findOne({ where: { product_id: req.params.product_id } })
    .then((result) => {
      res.json({
        product: result,
      });
    })
    .catch((error) => {
      res.json({
        message: error.message,
      });
    });
});

//POST PRODUCT,METHOD: POST, function: create
app.post("/", upload.single("image"), (req, res) => {
  if (!req.file) {
    res.json({
      message: "No uploaded file",
    });
  } else {
    let data = {
      name: req.body.name,
      price: req.body.price,
      stock: req.body.stock,
      image: req.file.filename,
    };
    product
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
