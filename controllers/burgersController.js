var express = require("express");

var router = express.Router();

// Import the orm to use its database functions.
var db = require("../models");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  db.Burger.findAll({}).then(function(data){
    console.log(data);
    res.render("index", {burger: data});
  })
});

router.post("/", function(req, res) {
  db.Burger.create({
      burger_name: req.body.burger_name
  }).then(function(result){
    res.redirect('/');
 });
});

router.put("/:id", function(req, res) {
  db.Burger.update({
    //burger_name: req.body.burger_name,
    devoured: req.body.devoured
  }, {
    where: {
      id: req.params.id
    }
  }).then(function(data){
     res.redirect('/');
  });

});

// Export routes for server.js to use.
module.exports = router;
