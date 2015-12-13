var express = require('express');
var router = express.Router();
var schoolDal = require('../dal/school');

/* GET Schools listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/create', function(req, res, next) {
    res.render('schoolFormCreate.ejs', {subtitle: "Lab 09"});
});

router.get('/save', function(req, res, next) {
    console.log("name equals: " + req.query.Title);
    console.log("the street submitted was: " + req.query.Street);
    console.log("city: ", req.query.City);
    console.log("state: ", req.query.State);
    console.log("zip: ", req.query.Zip);

    schoolDal.Insert(req.query, function(err, result){
        if (err) {
            res.send(err);
        }
        else {
            res.send("Successfully saved the data.");
        }
    });
});



module.exports = router;
