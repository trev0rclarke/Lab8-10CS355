var express = require('express');
var router = express.Router();
var schoolDal = require('../dal/school');


router.get('/allSchools', function (req, res) {
    schoolDal.GetAllSchools(function(err, result) {
            if (err) throw err;
            res.render('displayAllSchools.ejs', {rs: result});
        }
    );

});


router.get('/', function (req, res) {
    schoolDal.GetSchoolByName(req.query.school, function (err, result) {
            if (err) throw err;

            res.render('SchoolInfo.ejs', {rs: result, name: req.query.school});
        }
    );
});



module.exports = router;