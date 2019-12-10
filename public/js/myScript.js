// ^^^^^^^^^^^^ NAVBAR JS
 /* When the user clicks on the button, toggle between hiding and showing the dropdown content */
function dropdownClick(x) {
          document.getElementById("myDropdownData").classList.remove("show");
          document.getElementById("myDropdownReport").classList.remove("show");
          document.getElementById("myDropdownUser").classList.remove("show");
          if(x==1)document.getElementById("myDropdownData").classList.toggle("show");  
          else if(x==2)document.getElementById("myDropdownReport").classList.toggle("show");
          else if(x==3)document.getElementById("myDropdownUser").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(e) {
          if (!e.target.matches('.dropbtn')) {
            var myDropdown = document.getElementById("myDropdownData");
            var myDropdown2 = document.getElementById("myDropdownReport");
            var myDropdown3 = document.getElementById("myDropdownUser");
            if (myDropdown.classList.contains('show')) myDropdown.classList.remove('show');
            if (myDropdown2.classList.contains('show')) myDropdown2.classList.remove('show');
            if (myDropdown3.classList.contains('show')) myDropdown3.classList.remove('show');
          }
}
// Responsive Navbar
function responsiveNavBar() {
          var x = document.getElementById("navbar");
          if (x.className === "navbar" || x.className === "navbar sticky") {
            x.className += " responsive";
          } else {
            var str = x.className
            x.className = str.replace("responsive","").trim();
          }
}

// ^^^^^^^^^^ Sticky Navbar-->
function LoadSticky(){
    var navbar = document.getElementById("navbar");
    var sticky = navbar.offsetTop;

    window.onscroll = function() {myFunctionSticky()};
    function myFunctionSticky() {
      if (window.pageYOffset >= sticky) {
        navbar.classList.add("sticky")
      } else {
        navbar.classList.remove("sticky");
      }
    }
}

// ^^^^^^^^^^ Overlayed Search Window Codes-->
// Open the full screen search box 
function openSearch() {
          document.getElementById("myOverlaySearch").style.display = "block";
}

 // Close the full screen search box 
function closeSearch() {
          document.getElementById("myOverlaySearch").style.display = "none";
}


// ^^^^^^^^^^ Back To Top-->
// When the user scrolls down 20px from the top of the document, show the button

function scrollFunction() {
          if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            document.getElementById("myBtn").style.display = "block";
          } else {
            document.getElementById("myBtn").style.display = "none";
          }
}
// When the user clicks on the button, scroll to the top of the document
 function topFunction() {
          document.body.scrollTop = 0; // For Safari
          document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}


