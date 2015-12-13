var express = require('express');
var router = express.Router();
var accountDal   = require('../dal/account');

router.get('/all', function(req, res) {
  accountDal.GetAll(function (err, result) {
      if (err) throw err;
      res.render('displayAllAccounts.ejs', {rs: result});


        }
    );
});

router.get('/', function (req, res) {
  accountDal.GetByID(req.query.email, function (err, result) {
          if (err) throw err;

          res.render('AccountInfo.ejs', {rs: result, email: req.query.email});
        }
    );
});




router.get('/GetUserJob', function(req, res) {
    accountDal.GetUserJob(function (err, result) {
        if (err) throw err;
        res.render('displayUserJob.ejs', {rs:result});
    })
});
module.exports = router;
