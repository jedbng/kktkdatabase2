const path = require('path');



module.exports = {

    getHomePage: (req, res) => {
                //check first if nka logIn
                if(req.session.TypeX=="" && req.session.UserX==""){	
                    req.session.UserX ="";
                    req.session.TypeX="";
                    req.session.ImageX ="";
                    res.redirect('/');
                }
            
                //	Home Overview
                var Active=0,Inactive=0,UserCount=0;
            
                //1st querry
                let sql = "Select COUNT(*) as act from tblregistered where ChurchStatus='Active';";
                let query =  connection.query(sql, (err, results) => {
                    if(err) throw err; 
                    Active = results[0].act;
                    //2nd querry
                    sql = "Select COUNT(*) as Inac from tblregistered where not ChurchStatus='Active';";
                    query =  connection.query(sql, (err, results) => {
                        if(err) throw err; 
                        Inactive = results[0].Inac;	
                        //3rd querry	
                        sql = "Select COUNT(*) as UserCount from tbluser ;";
                        query =  connection.query(sql, (err, results) => {
                            if(err) throw err; 
                            UserCount = results[0].UserCount;
                            //4th querry - KKTK Status
                            var SrKKTKAct=0,SrKKTKIn=0,JrKKTKAct=0,JrKKTKIn=0;
                            sql = "select "+
                            "(select count(*)  FROM tblregistered where timestampdiff(Year,bday,current_date())>=25 and ChurchStatus='Active') as SrKKTKAct"+
                            ",(select count(*)  FROM tblregistered where timestampdiff(Year,bday,current_date())>=25 and not ChurchStatus='Active') as SrKKTKIn"+
                            ",(select count(*)  FROM tblregistered where timestampdiff(Year,bday,current_date())<25 and ChurchStatus='Active') as JrKKTKAct"+
                            ",(select count(*)  FROM tblregistered where timestampdiff(Year,bday,current_date())<25 and not ChurchStatus='Active') as JrKKTKIn;";
                            query =  connection.query(sql, (err, results) => {
                                if(err) throw err; 
                                SrKKTKAct = results[0].SrKKTKAct;	
                                SrKKTKIn = results[0].SrKKTKIn;	
                                JrKKTKAct = results[0].JrKKTKAct;	
                                JrKKTKIn = results[0].JrKKTKIn;	
                                                //5th querry - KKTK Celebrants
                                                sql = "select concat(LN,', ',FN,' ',MN) as Name,LN, CAST(BaptismDate AS char(10)) as Date  From tblregistered Where MONTHNAME(BaptismDate)=MONTHNAME(current_date())";
                                                query =  connection.query(sql, (err, results) => {
                                                    if(err) throw err; 
                                                    //Home Launch
                                                    res.render(path.join(__dirname + '/views/000_Home'), { user: req.session.UserX
                                                        ,type:req.session.TypeX
                                                        ,Image:req.session.ImageX
                                                        ,Active:Active
                                                        ,Inactive:Inactive
                                                        ,UserCount:UserCount
                                                        ,SrKKTKAct:SrKKTKAct
                                                        ,SrKKTKIn:SrKKTKIn
                                                        ,JrKKTKAct:JrKKTKAct
                                                        ,JrKKTKIn:JrKKTKIn
                                                        ,results:results}	);
                                                });
                            });
                        });
                    });
                });
    }




};