var express = require('express');
var router = express.Router();
var companyDal = require('../dal/company');

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});



router.get('/create', function(req, res, next) {
    companyDal.GetAllAddies(function(err, result){
        console.log(result);
        res.render('companyFormCreate.ejs', {location : result});
    })
});

router.get('/save', function(req, res, next) {
    console.log("name equals: " + req.query.name);

    companyDal.Insert(req.query, function(err, result){
        if (err) {
            res.send(err);
        }
        else {
            // Company Specified has been inserted, now update CompanyLocations.
            companyDal.InsertCompanyLocation(req.query.location)

            res.send("Successfully saved the data.");
        }
    });

});

router.get('/delete', function(req, res) {
    console.log(req.query.name);

    companyDal.Delete(req.query.name, function(err, result) {
        res.send(req.query.name + ' was successfully deleted.');
    });
});

module.exports = router;
