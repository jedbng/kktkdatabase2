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
    postUserManVal: (req,res)=>{
        req.session.SearchByVal=req.body.SearchBy;
        req.session.SearchVal = req.body.txtSearch;
        res.redirect('/UserMan');    
    },
    getUserManPage: (req,res)=>{
                //init
                var srchByValue=req.session.SearchByVal,
                searchValue=req.session.SearchVal;

                //check first if nka logIn
                if(req.session.TypeX=="" && req.session.UserX==""){	
                    req.session.UserX ="";
                    req.session.TypeX="";
                    req.session.ImageX ="";
                    res.redirect('/');
                }

                //Get auto Complete Values
                var UserList=[],UserTypeList=[];
                let sql = "SELECT distinct User FROM tbluser";
                let query = connection.query(sql, (err, results) => {
                    if(err) throw err;
                    for (let i = 0; i < results.length; i++) {
                        UserList.push(results[i].User);
                    }
                });
                sql = "SELECT distinct Type FROM tbluser";
                query = connection.query(sql, (err, results) => {
                    if(err) throw err;
                    for (let i = 0; i < results.length; i++) {
                        UserTypeList.push(results[i].Type);
                    }
                });

                //table values
                sql = "SELECT * FROM tbluser";
                if(srchByValue == 0)sql = "SELECT ID,User,Type,Image FROM tbluser";
                else if(srchByValue == 1)sql = "SELECT  ID,User,Type,Image FROM tbluser Where User='"+searchValue+"'";
                else if(srchByValue == 2)sql = "SELECT  ID,User,Type,Image FROM tbluser Where Type='"+searchValue+"'";
                query = connection.query(sql, (err, results) => {
                        if(err) throw err;
                        res.render(path.join(__dirname + '/views/001A_UserMng'), {  results: results,srchByValue:srchByValue, user: req.session.UserX,type:req.session.TypeX,UserList: UserList,UserTypeList:UserTypeList });	
                });	
    },  
    saveUM: (req,res)=>{
            //init
            if (!req.files) {
                return res.status(400).send("No files were uploaded.");
            }
            let username = req.body.txtuser;
            let uploadedFile = req.files.imgInp;
            let image_name = uploadedFile.name;
            let fileExtension = uploadedFile.mimetype.split('/')[1];
            image_name = username + '.' + fileExtension;
        
            //Validation
            //check if admin
            if (req.session.TypeX!="Administrator") {
                return res.send('Only admin can insert data, press back to try again');
            }
        
            connection.query('SELECT * FROM tbluser WHERE User = ? ', [username], function(error, results, fields) {
                    if (results.length > 0) return res.send('* User already exist, press back to try again');	
                    if (req.body.txtpsw!=req.body.txtpsw_repeat ) return res.send('* Password is different from repeated password, press back to try again');	
        
                    //Responce
                    // check the filetype before uploading it
                    if (uploadedFile.mimetype === 'image/png' || uploadedFile.mimetype === 'image/jpeg' || uploadedFile.mimetype === 'image/gif') {
                        // upload the file to the /public/assets/img directory
                        uploadedFile.mv(`images/profiles/${image_name}`, (err ) => {
                            if (err) {
                                return res.status(500).send(err);
                            }
                            // send the player's details to the database
                            //Insert
                            let data = {User: req.body.txtuser, Password: encrypted(req.body.txtpsw) ,Type: req.body.selSearchBy,Image: image_name};
                            let sql = "INSERT INTO tbluser SET ?";
                            let query = connection.query(sql, data,(err, results) => {
                                if(err) throw err;
                                //
                                InsertUserAct('Add new user '+req.body.txtuser,req.session.UserX); // add user act
                                res.redirect('/UserMan');
                            });
                        });
                    } else {
                        console.log( "Invalid File format. Only 'gif', 'jpeg' and 'png' images are allowed.");
                    }	
            });
    },
    deleteUM: (req,res)=>{
		//check if admin
		if (req.session.TypeX!="Administrator") {
			return res.send('Only admin can delete data,, press back to try again');
		}

		let sql = "DELETE FROM tbluser WHERE ID="+req.body.inpID+"";
		let query = connection.query(sql, (err, results) => {
		if(err) throw err;

		InsertUserAct('Delete user# '+req.body.inpID,req.session.UserX); // add user act
			res.redirect('/UserMan');
		});
    },
    editUM: (req,res)=>{
        //Validate first
		//check if admin
		if (req.session.TypeX!="Administrator") {
			return res.send('Only admin can edit data');
		}
		if (req.body.txtpsw!=req.body.txtpsw_repeat ) {
            return res.send('* Password is different from repeated password, press back to try again');
		} 
		

		//file validataion first
		if (!req.files) { //if ndi magbago ng image
			//Update
			let sql = "UPDATE tbluser SET User='"+req.body.txtuser+"', Password='"+encrypted(req.body.txtpsw)+"', Type='"+req.body.selSearchBy+"' "+
			" WHERE ID="+req.body.inpID;
			let query = connection.query(sql, (err, results) => {
				if(err) throw err;

				//
				InsertUserAct('Edit user# '+req.body.inpID,req.session.UserX); // add user act
				res.redirect('/UserMan');
			});
							   
		}else{
			let username = req.body.txtuser;
			let uploadedFile = req.files.imgInp;
			let image_name = uploadedFile.name;
			let fileExtension = uploadedFile.mimetype.split('/')[1];
			image_name = username + '.' + fileExtension;	 
			
			// check the filetype before uploading it
			if (uploadedFile.mimetype === 'image/png' || uploadedFile.mimetype === 'image/jpeg' || uploadedFile.mimetype === 'image/gif') {
			   // upload the file to the /public/assets/img directory
			   uploadedFile.mv(`images/profiles/${image_name}`, (err ) => {
				   if (err) {
					   return res.status(500).send(err);
				   }

				   //Update
				   let sql = "UPDATE tbluser SET User='"+req.body.txtuser+"', Password='"+encrypted(req.body.txtpsw)+"', Type='"+req.body.selSearchBy+"' "+
				   ",Image='"+image_name+"' WHERE ID="+req.body.inpID;
				   let query = connection.query(sql, (err, results) => {
					   if(err) throw err;
					   //
						InsertUserAct('Edit user# '+req.body.inpID,req.session.UserX); // add user act
						res.redirect('/UserMan');
				   });
			   });
		   } else {
			   console.log( "Invalid File format. Only 'gif', 'jpeg' and 'png' images are allowed.");
		   }						
		}
    }



};