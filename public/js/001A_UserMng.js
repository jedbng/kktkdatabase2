
////SearchBy auto complete Function 
function searchbySelect(UserList,UserTypeList){   
     document.getElementById("txtSearch").disabled = true;
     if(document.getElementById("txtSearchBy").value==1) {
         autocomplete(document.getElementById("txtSearch"), UserList.split(","));
         document.getElementById("txtSearch").disabled = false;
     }
     else if(document.getElementById("txtSearchBy").value==2){
         autocomplete(document.getElementById("txtSearch"), UserTypeList.split(","));
         document.getElementById("txtSearch").disabled = false;
     }
 }

//--MODal Form
function loadModalForm(frmAction)
{

  $('#frmAddEdit').attr("action", "/saveUM");
  $('#lblRemember').show();
  //
  if (frmAction==="Add")  document.getElementById("lblTitle").innerHTML ="Add User" ;
  else if(frmAction==="Edit")  document.getElementById("lblTitle").innerHTML = "Edit User";

  //
  // When the modal is shown, we want a fixed body
  document.body.style.position = 'fixed';
  document.body.style.top = `-${window.scrollY}px`;
}
function closeModalFormEffects()
{
    // When the modal is hidden, we want to remain at the top of the scroll position
    document.body.style.position = '';
    document.body.style.top = '';
}
//Delete confirmation
function confirmation() {
  var txt;
  if (confirm("Delete Data?")) {
    txt = "Data deleted!";
  } else {
    txt = "Cancel!";
  }
 alert(txt);
}


// JQuery Codes............
$(document).ready(function(){
      //Upload Image
      function readURL(input) {
        debugger;
        if (input.files && input.files[0]) {
          var reader = new FileReader();
          reader.onload = function(e) {
            $('#imgUser').attr('src', e.target.result);
          }
          reader.readAsDataURL(input.files[0]);
        }
      }
      $("#imgInp").change(function() {
        readURL(this);
      });


      //showing modal for delete record 
        $(".aDelete").click(function(){
          // action goes here!!
          $("#id02").css({"display": "block"});
          var ID = $(this).data('id');
          var User = $(this).data('user');
          $('.inpID').val(ID);
          $('.pUser').text(User);
        });
      
    //showing modal for edit record 
    $(".aEdit").click(function(){
      // action goes here!!
      $("#id01").css({"display": "block"});
      var ID = $(this).data('id');
      var User = $(this).data('user');
      var Type = $(this).data('type');
      var Image = $(this).data('image');
      
      $('#frmAddEdit').attr("action", "/editUM");lbldetails
      $('#lblTitle').text("Edit User");
      $('#lbldetails').text("Please fill in this form to edit an account.");
      $('#txtuser').val(User);
      $('#selType').val(Type);
      if(Image!="" || Image!=undefined)$('#imgUser').attr("src", "/profiles/"+Image);
      $('.inpID').val(ID);
      $('#lblRemember').hide();
      document.getElementById("imgInp").required = false;
      document.getElementById("cbremember").required = false;
    });

});