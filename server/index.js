var express = require('express');
var morgan = require('morgan');
var async = require('async');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var server_Port = 8083;
var expApp = express();
var service = require('./apiService');
var servFunction = require('./function');
var sess="";




expApp.use(morgan('dev'));
expApp.use(express.static(__dirname + "/../client"));
expApp.use(cookieParser());
expApp.use(session({secret:"Secret",cookie:{maxAge:5000}}));



// expApp.get('/',function(req,res){
// res.redirect('/public/index.html');
// });
// expApp.get('/login',function(req,res){
//     res.redirect('/public/view/login.html');
// });
expApp.get('/cookiecheck/:id',function(req,res){
// res.cookie("user",(req.params.val).toString()).send('cookie set'+JSON.stringify(req.cookies));
// var sess = req.session;
// servFunction.setSess(req.params.id);
req.session.userid = req.params.id;
res.cookie('name',(req.params.id.toString()));
// console.log(sess);
// if (servFunction.sessCheck(req.params.id)) {
  res.setHeader('Content-Type', 'text/html');
  res.write('<p>Session: ' + req.session.userid + '</p>');
  res.write('<p>Cookie: ' + req.cookies.name + '</p>');
  res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>');
  
//   req.session.sess++;
// } 

res.end();

});
expApp.get('/cookiecheckclear',function(req,res){
    servFunction.clearSess(req.params.id);
   
    console.log('Cookies status: ',req.cookies);
    });

expApp.use('/api',service);

expApp.listen(server_Port,function(err,res){
if(err) console.log('Error starting server');
console.log('server started and listening in localhost:' + server_Port);
});

