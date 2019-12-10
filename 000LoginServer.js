//initialiaze Some
const express = require('express');
const session = require('express-session');
const hbs = require('hbs');//use hbs view engine
const bodyParser = require('body-parser');
const path = require('path');
const router = express.Router();
const fileUpload = require('express-fileupload');
const fs = require('fs');



module.exports = {
    index:(req, res)=>{
        //res.sendFile(path.join(__dirname + '/views/index.hbs')); //__dirname : It will resolve to your project folder.
        res.render(path.join(__dirname + '/views/index'), { message: req.session.LoginMsg});
    },
    /*We need to now handle the POST request, basically what happens here is when the client enters their details in the login form and clicks the submit button,
    the form data will be sent to the server, and with that data our login script will check in our MySQL accounts table to see if the details are correct.*/
    postAuth:(request, response)=>{	
            var username = request.body.txtUser;
            var password = encrypted(request.body.txtPass) ;
            if (username && password) {
                connection.query('SELECT ID,User,Type,Image FROM tbluser WHERE User = ? AND Password = ?', [username, password], function(error, results, fields) {
                    if (results.length > 0) {
                        request.session.loggedin = true;
                        request.session.LoginMsg="";
                        request.session.UserX =results[0].User;
                        request.session.TypeX=results[0].Type;
                        request.session.ImageX =results[0].Image;
                        //
                        InsertUserAct('Login',request.session.UserX); // add user act
                        response.redirect('/Home');
                    } else {
                        request.session.LoginMsg="* Incorrect username or password.";
                        request.session.UserX ="";
                        request.session.TypeX="";
                        request.session.ImageX ="";
                        response.redirect('/');
                    }			
                    response.end();
                });
            } 
    },
    getLogout:(request, response)=>{	
        InsertUserAct('Logout',request.session.UserX); // add user act
        request.session.UserX ="";
        request.session.TypeX="";
        request.session.ImageX ="";
        response.redirect('/');	
        response.end();
    }
};