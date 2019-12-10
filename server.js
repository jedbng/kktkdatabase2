//initialiaze Main
const mysql = require('mysql');
const express = require('express');
const session = require('express-session');
const hbs = require('hbs');//use hbs view engine
const bodyParser = require('body-parser');
const path = require('path');
const router = express.Router();
const fileUpload = require('express-fileupload');
const fs = require('fs');
//init routes
const {index,postAuth,getLogout} = require('./000LoginServer.js');
const {getHomePage} = require('./001HomeServer.js');
const {postUserManVal,getUserManPage,saveUM,deleteUM,editUM} = require('./002UserManServer.js');
const {postUserActGetValue,getUserActPage} = require('./003UserActServer.js');
//cryptographys
const crypto = require('crypto');
const encrypted = function (msg) {
	var secretKey="suse";
	var mykey = crypto.createCipher('aes-128-cbc', secretKey);
	var mystr = mykey.update(msg, 'utf8', 'hex')
	mystr += mykey.final('hex');
	return mystr
};
global.encrypted=encrypted;
const decrypted = function (encMsg) {
	var secretKey="suse";
	var mykey = crypto.createDecipher('aes-128-cbc', secretKey);
	var mystr = mykey.update(encMsg, 'hex', 'utf8')
	mystr += mykey.final('utf8');
	return mystr
};
global.decrypted=decrypted;
//connection 
const connection = mysql.createConnection({
    host: "remotemysql.com",
  user: "4bzM4CxTgu",
  password:"J9c5dLyBma",
  database:"4bzM4CxTgu" /**/

  /*  host: "localhost",
  user: "adminUser",
  password:decrypted("8ed38a5e342a0039f3667a57bf12a058"),
  database:"kktkdb"*/
 
});
//connect to database
connection.connect((err) =>{
  if(err) throw err;
  console.log('Mysql Connected...');
});
global.connection = connection;

//--EXPress
const app = express();
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
//set views file
app.set('views',path.join(__dirname,'views'));
//set view engine
app.set('view engine', 'hbs');
// configure fileupload
app.use(fileUpload()); 
//add the router
app.use(express.static(__dirname + '/images/'));
app.use(express.static(__dirname + '/public/css/'));
app.use(express.static(__dirname + '/public/js/'));
app.use('/', router);
//--Login Page
router.get('/',index); //main (index)
app.post('/auth', postAuth); //login validation
router.get('/logout',getLogout); //logout
//--Home
router.get('/Home',getHomePage);//route for Home
//--User Management
router.get('/UserMan',getUserManPage);//route for User Management 
app.post('/UserManGetValue', postUserManVal);//route for User Management get value
app.post('/saveUM',saveUM);//route for insert data of User Management
app.post('/deleteUM',deleteUM);//route for delete User Management Data
app.post('/editUM',editUM);//route for edit data of User Management
//--User Activity
app.post('/UserActGetValue', postUserActGetValue);//router for User Activity Get Value
router.get('/UserAct',getUserActPage);//router for User Activity
InsertUserAct = function(Act="",UserXXX="") {
	var dateNow= new Date();
	var TimeNow = dateNow.getHours() +":"+dateNow.getMinutes()+":"+dateNow.getSeconds();
	var dateNowInput= dateNow.getFullYear() +"-"+(dateNow.getMonth()+1)+"-"+dateNow.getDate()+" "+TimeNow;
	let data = {Date: dateNowInput, Time: TimeNow,User: UserXXX,Activity: Act};
	let sql = "INSERT INTO tbluseract SET ?";
	let query = connection.query(sql, data,(err, results) => {
		if(err) throw err;
		console.log('Insert User activity('+dateNowInput+','+	TimeNow+','+UserXXX+','+Act+')');
	});
}
global.InsertUserAct=InsertUserAct;// Insert User Activity
//
const port = process.env.PORT || 3000;
app.listen(port);
console.log('Running at Port '+port);










