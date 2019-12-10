
////SearchBy auto complete Function 
function searchbySelect(UserList,UserActList){   
     document.getElementById("txtSearch").disabled = true;
     if(document.getElementById("txtSearchBy").value=="a") { //date only
        document.getElementById("txtSearch").innerHTML = "";
        document.getElementById("txtSearch").disabled = true;
     }
     else if(document.getElementById("txtSearchBy").value=="b"){ //time
        document.getElementById("txtSearch").innerHTML = "";
        document.getElementById("txtSearch").disabled = false;
     }
     else if(document.getElementById("txtSearchBy").value=="c"){ //user
         autocomplete(document.getElementById("txtSearch"), UserList.split(","));
         document.getElementById("txtSearch").disabled = false;
     }
     else if(document.getElementById("txtSearchBy").value=="d"){ //activity
         autocomplete(document.getElementById("txtSearch"), UserActList.split(","));
         document.getElementById("txtSearch").disabled = false;
     }
 }
