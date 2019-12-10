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
    postUserActGetValue: (req,res)=>{
        req.session.UserActsbValue=req.body.SearchBy;
        req.session.UserActsearchValue = req.body.txtSearch;
        req.session.UserActdateFrom =  req.body.dateFrom;
        req.session.UserActdateTo =  req.body.dateTo;
        res.redirect('/UserAct');
    },
    getUserActPage: (req,res)=>{  
            //check first if nka logIn
            if(req.session.TypeX=="" && req.session.UserX==""){	
                req.session.UserX ="";
                req.session.TypeX="";
                req.session.ImageX ="";
                res.redirect('/');
            }
        
            //Get auto Complete Values
            var UserList=[],UserActList=[];
            let sql = "SELECT distinct User FROM tbluser";
            let query = connection.query(sql, (err, results) => {
                if(err) throw err;
                for (let i = 0; i < results.length; i++) {
                    UserList.push(results[i].User);
                }
            });
            sql = "SELECT distinct Activity FROM tbluseract";
            query = connection.query(sql, (err, results) => {
                if(err) throw err;
                for (let i = 0; i < results.length; i++) {
                    UserActList.push(results[i].Activity);
                }
            });
        
            //table values
            var srchByValue = req.session.UserActsbValue,
            searchValue =  req.session.UserActsearchValue ,
            dateFrom = req.session.UserActdateFrom ,
            dateTo = req.session.UserActdateTo;
            //
            sql = "SELECT CAST(Date AS char(10)) as Date,Time,User,Activity FROM tbluseract Order By ID Desc Limit 10";
            if(srchByValue === "a")sql = "SELECT CAST(Date AS char(10)) as Date,Time,User,Activity FROM tbluseract Where  Date Between '"+dateFrom+"' and '"+dateTo+"' Order By Date Desc";
            else if(srchByValue === "b")sql = "SELECT CAST(Date AS char(10)) as Date,Time,User,Activity FROM tbluseract Where Time like '%"+searchValue+"%'  and Date Between '"+dateFrom+"' and '"+dateTo+"'  Order By Time Desc ";
            else if(srchByValue === "c")sql = "SELECT CAST(Date AS char(10)) as Date,Time,User,Activity FROM tbluseract Where User='"+searchValue+"' and  Date Between '"+dateFrom+"' and '"+dateTo+"'  Order By ID Desc ";
            else if(srchByValue === "d")sql = "SELECT CAST(Date AS char(10)) as Date,Time,User,Activity FROM tbluseract Where Activity like '%"+searchValue+"%'  and Date Between '"+dateFrom+"' and '"+dateTo+"'  Order By ID Desc  ";
            query = connection.query(sql, (err, results) => {
                    if(err) throw err;
                    res.render(path.join(__dirname + '/views/001B_UserAct'), {  results: results,srchByValue:srchByValue, user: req.session.UserX,type:req.session.TypeX,UserList: UserList,UserActList:UserActList });	
                    
            });	
    }


};


