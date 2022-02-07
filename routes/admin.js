//import library
const express = require("express");
const bodyParser = require("body-parser");

//implementasi
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const md5 = require("md5");

//import model
const models = require("../models/index");
const admin = models.admin;

//endpoint menampilkan semua data admin,method: GET, function: FINDALL()
app.get("/", (req, res) => {
  admin
    .findAll()
    .then((admin) => {
      res.json(admin);
    })
    .catch((error) => {
      res.json({
        message: error.message,
      });
    });
});

//endpoint untuk menyimpan data admin,METHOD: POST, function: create
app.post("/", (req, res) => {
  let data = {
    name: req.body.name,
    username: req.body.username,
    password: md5(req.body.password),
  };

  admin
    .create(data)
    .then((result) => {
      res.json({
        message: "data has been inserted",
      });
    })
    .catch((error) => {
      message: error.message;
    });
});

//endpoint mengupdate data admin, METHOD: PUT, function: update
app.put("/:id", (req, res) => {
  let param = {
    admin_id: req.params.id,
  };
  let data = {
    name: req.body.name,
    username: req.body.username,
    password: md5(req.body.password),
  };
  admin
    .update(data, { where: param })
    .then((result) => {
      res.json({
        message: "data has been updated",
      });
    })
    .catch((error) => {
      res.json({
        message: error.message,
      });
    });
});

//endpoint menghapus data admin, METHOD: DELETE, function: destroy
app.delete("/:id", (req, res) => {
  let param = {
    admin_id: req.params.id,
  };
  admin
    .destroy({ where: param })
    .then((result) => {
      res.json({
        message: "data has been deleted",
      });
    })
    .catch((error) => {
      res.json({
        message: error.message,
      });
    });
});

module.exports = app;
