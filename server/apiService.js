var express = require('express');
var router = express.Router();
var expApp = express();
var fs = require('fs');

var MongoClient = require('mongodb').MongoClient;
var mongoServer = "mongodb://127.0.0.1:27017/";
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data
expApp.use(cookieParser());
expApp.use(session({ secret: "Secret", cookie: { maxAge: 5000 } }));

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

var mongodb, dbObj, searchText, sumData, result1;
var dateFormat = require('dateformat');
var dateTime = new Date();





router.get('/loginAuth/:username', function (req, res) {

    MongoClient.connect(mongoServer, function (err, database) {
        if (err) console.log(err);
        else {
            conStr = database.db('test').collection('authentication');
            username = (req.params.username).toString();
            conStr.findOne({ username: username }, function (err, data) {
                if (err) console.log(err);
                else if (data) {
                    // res.cookie('name', searchText, {maxAge: 50000});
                    // req.session.userid = username;
                    res.cookie('name', username);
                    res.status(200).send(data);
                    res.end();
                }
                else {
                    console.log("No user found");
                    res.send("No user found");
                    res.end();
                };
            })
        };
    });

});
router.post('/d', function (req, res) {
    dat = dateFormat(dateTime, "dd-MM-yyyy hh:MM:ss");


    res.send("Date in string " + dat + "  Date type : " + typeof (dat));
    res.end();
})
router.get('/d', function (req, res) {
    dat = dateFormat(dateTime, "dd-MM-yyyy hh:MM:ss");

    res.send("Date in string " + dat + "  Date type : " + typeof (dat));
    res.end();
})
router.post('/register', upload.array(), function (req, res) {

    MongoClient.connect(mongoServer, function (err, database) {
        if (err) console.error(err);
        else {

            conStr = database.db('test').collection('registration');
            conStrLogin = database.db('test').collection('authentication');
            email = (req.body.Regemail);
            userId = (req.body.ReguserId);
            newPassword = (req.body.Regpassword);
            name = (req.body.RegName);
            phoneNum = (req.body.RegphoneNumbr);
            regDate = dateFormat(dateTime, "dd-MM-yyyy hh:MM:ss");;
            registration = { Name: name, userId: userId, email: email, Number: phoneNum, password: newPassword, registeredOn: regDate };
            Login = { username: userId, password: newPassword }
            console.log(registration);
            conStr.findOne({ email: email }, function (err, data) {
                if (err) console.error(err);
                conStr.findOne({ userId: userId }, function (err, data1) {
                    if (!data && !data1) {
                        conStr.insertOne(registration, function (err, data) {
                            if (err) console.error(err);
                            else {

                                result = "Registration Successfull";
                                conStrLogin.insertOne(Login);
                                res.end(result);
                            };
                        })
                    }
                    else if (data) {
                        result1 = "Email already registered Please try Login ";
                        res.end(result1);
                    }
                    else {
                        result1 = "User Id already exist please try another name";
                        res.end(result1);

                    };

                });


            });

        }
    })
})
router.get('/summary.json', function (req, res) {
    MongoClient.connect(mongoServer, function (err, database) {
        if (err) console.log(err);
        else {
            dbObj = database.db('test');
            dbObj.collection("accountSummary").find({}).toArray(function (err, data) {
                if (err) console.log(err);
                else if (data) {
                    res.status(200).send(data);
                    res.end();
                }
                else {
                    console.log("No data found");
                }
            })
        };
    });

});
router.get('/transaction.json', function (req, res) {

    MongoClient.connect(mongoServer, function (err, database) {
        if (err) console.log(err);
        else {
            dbObj = database.db('test');
            dbObj.collection("accountTransaction").find({}).toArray(function (err, data) {
                if (err) console.log(err);
                else if (data) {
                    res.status(200).send(data);
                    res.end();
                }
                else {
                    console.log("No data found");
                }
            })
        };
    });
});
// function dbConnect(){
//     MongoClient.connect(mongoServer, function (err, database) {
//         if (err) {
//             console.log(err);

//         }
//         else {
//           var dbObj = database.db('test');
//           dbObj.collection("authentication").findOne({ "username": "test2" }, function (err, data) {
//             if (err) console.log(err);
//             else {
//                 console.log(data.username);
//             }
//             database.close();
//         })
//         };
//     });
// }



function sendSuccess(res, data1) {
    res.setHeader('200', { 'Content-Type': 'application/json' });
    res.status(200).send(JSON.parse(data1));
    res.end();
};
module.exports = router;