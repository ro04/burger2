var express = require("express");

var router = express.Router();

// Import the orm to use its database functions.
var db = require("../models");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  db.Burger.findAll({
    include: [{model: db.Eater}]
  }).then(function(data){
    //console.log(data);
    res.render("index", {burger: data});
  })
});

//Create burgers
router.post("/", function(req, res) {
  db.Burger.create({
      burger_name: req.body.burger_name
  }).then(function(burgerData){
    console.log(burgerData);
    res.redirect('/');
 });
});

router.put("/:id", function(req, res) {
  db.Eater.findOne({
    where: {
      eater_name: req.body.eater
    }
  }).then(function(eater){
    if (eater){
      updateBurger(eater, id, req, res);
    }else {
      db.Eater.create({
        eater_name: req.body.eater_name
      }).then(function(eater){
          updateBurger(eater, id, req, res);
      })
    }
  })
});

function updateBurger(eater, id, req, res) {
	db.Burger.update(
		{
			devoured: req.body.devoured,
			EaterId: eater.id
		}, {
			where: {
			id: id
		}
	}).then(function(result) {
		res.redirect('/');
	});
}

// Export routes for server.js to use.
module.exports = router;
