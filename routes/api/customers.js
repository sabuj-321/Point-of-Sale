/**
 * Created by Pierre on 05.04.16.
 */
var express = require("express");
var router = express.Router({
    mergeParams: true
});
var customer = require("../../models/customers");
var middleware = require("../../middleware/index.js");
//TODO add a way for pagination
//INDEX - show all Customers
router.get("/", function(req, res) {
    var re = new RegExp(req.query.search);
    var offset = 0;
    if (req.query.offset) {
        offset = req.query.offset;
        console.log(offset)
    }
    customer.find().or([{
        'name': {
            $regex: re
        }
    }, {
        'mail': {
            $regex: re
        }
    }, {
        'phone': {
            $regex: re
        }
    }, {
        'customernumber': {
            $regex: re
        }
    }, {
        'street': {
            $regex: re
        }
    }]).skip(parseInt(offset)).limit(20).exec(function(err, allCustomers) {
        if (err) {
            console.log(err);
        } else if (allCustomers.length === 0) {
            res.sendStatus(404);
        } else {
            res.end(JSON.stringify(allCustomers));
        }
    });
});

// TODO add findsingle for id

module.exports = router;