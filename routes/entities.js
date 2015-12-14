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

router.get('/save', function(req, res) {
    console.log("name equals: " + req.query.name);

    companyDal.Insert(req.query, function(err, result){
        if (err) {
            res.send(err);
        }
        else {
            // Company Specified has been inserted, now update CompanyLocations.
            companyDal.InsertCompanyLocation(req.query, function(err, result){
                if(err){
                    res.send('Error adding new company. <br />' + err)
                }
                else {
                    res.send('Company Successfully Added');
                }
            })

            //res.send("Successfully saved the data.");
        }
    });

});

router.get('/delete', function(req, res) {
    console.log(req.query.name);

    companyDal.Delete(req.query.name, function(err, result) {
        res.send(req.query.name + ' was successfully deleted.');
    });
});

router.get('/edit', function(req, res) {
    var company = req.query.name;
    console.log("company_id: " + company);
    companyDal.GetByCompany(company, function(err, company_results){

        if(err) {
            var alert_class = 'alert-danger';
            var data = {
                message: "Error retrieving company with name " + company + "<p>" + err + "</p>",
                alert_class: alert_class
            };
            res.render('companyFormEdit.ejs', data);
        }
        else {
            companyDal.GetAllAddies(function(err, address_results) {

                console.log(company_results);
                var data = {
                    company: company_results,
                    address: address_results,
                };
                res.render('companyFormEdit.ejs', data);
            })
        }
    });

});

router.get('/update', function(req, res) {
    companyDal.Update(req.query, function(err, result){
        var name = req.query.name;
        console.log("company name: " + name);
        var alert_class = 'alert-danger';
        if (err){
            var data = {
                message: "Error : " + err + "<br />",
                alert_class: alert_class
            };
            res.render('companyFormEdit.ejs', data);
        }

        companyDal.GetByCompany(name, function(err, company_results){

            if(err) {
                var alert_class = 'alert-danger';
                var data = {
                    message: "Error retrieving company with id " + name + "<p>" + err + "</p>",
                    alert_class: alert_class
                };
                res.render('companyFormEdit.ejs', data);
            }
            else {
                companyDal.GetAllAddies(function(err, address_results) {

                    var alert_class = 'alert-success';
                    var message = "Successfully Updated!";

                    console.log(company_results);
                    var data = {
                        message: message,
                        alert_class: alert_class,
                        company: company_results,
                        address: address_results
                    };
                    res.render('companyFormEdit.ejs', data);
                })
            }
        });
    })
});

module.exports = router;
