/**
 * Created by Trevor on 11/16/2015.
 */
var express = require('express');
var router = express.Router();
var companyDal   = require('../dal/company');
// var addressDal = require....

router.get('/', function (req, res) {
    companyDal.GetByCompany(req.query.company, function (err, result) {
            if (err) throw err;

            res.render('CompanyInfo.ejs', {rs: result, company: req.query.company});
        }
    );
});

router.get('/GetCompanyGpa', function(req, res) {
    companyDal.GetCompanyGpa(function (err, result) {
        if (err) throw err;
        res.render('displayCompanyGpa.ejs', {rs:result});
    })
});

router.get('/all', function(req, res) {
    companyDal.GetAll(function (err, result) {
            if (err) throw err;
            res.render('displayAllCompanyInfo.ejs', {rs: result});


        }
    );
});


module.exports = router;