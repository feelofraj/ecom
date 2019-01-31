var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var expApp = express();

expApp.use(cookieParser());
expApp.use(session({secret:"Secret",cookie:{maxAge:5000}}));



module.exports = {
 sessCheck : function ( userId ){
    if ( userid && req.cookies ) {
      return true;  
     }
 },
  setSess : function (userId){
    req.session.userid = userId;
    res.cookie('name',userId);
 },
  clearSess : function (userId){
    req.session.userid = "";
    res.cookie('name', userId );
    res.send('cookie expiry');
    res.end();
 },

};