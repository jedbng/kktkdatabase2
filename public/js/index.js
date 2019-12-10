//OnLoad
function onLoad(){
  //retrieve localStorage
  if(localStorage.KKTKdbUserName!=undefined)document.getElementById("txtUser").value=localStorage.KKTKdbUserName;
}


//Show and hide  password
function showPass(){  
  var xxx = document.getElementById("txtPass");
  xxx.type="Text";
 }
 function hidePass(){  
  var xxx = document.getElementById("txtPass");
  xxx.type="Password";
 }

//Validate Form
 function validateForm() {
  var x = document.forms["LoginForm"]["usrnm"].value;
  var y = document.getElementById("txtPass").value;
  if (x == "" || y=="") {
    alert("Username and Password must be filled out");
    return false;
  }else{ 
    alert("Success");
    window.location.href = "000_Home.html";
  }
}

//Remember Me
function RememberMe(){
  var cbRemember = document.getElementById("myCheck").checked;
  var user = document.getElementById("txtUser").value;
  if (cbRemember===true) localStorage.setItem("KKTKdbUserName", user); //store
  else if (cbRemember===false) localStorage.setItem("KKTKdbUserName", ""); //clear
}



