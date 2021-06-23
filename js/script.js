/* Interaction 1: Automatic and Manual Image slide show for 
Home, Stay, Activities, Food and Beverages page */

// Keep track of current image in slideshow
var imgIndex = 0;
var img, dots;

// Run auto slideshow on files other than Discover.html and About.html
var fileName = location.pathname.split("/").slice(-1);
if (fileName != "Discover.html" && fileName != "About.html") {
    auto_change();
}

/**
 * Automatically change the image on the slideshow in a loop every
 * 5 secoonds.
 *  */ 
function auto_change() {
    var i;
    // Images
    img = document.getElementsByClassName("mySlides");
    // Dots below image
    dots = document.getElementsByClassName("dot");

    // Incrementing index every time function is called
    imgIndex++;

    // Turns of display for all images
    for (i = 0; i < img.length; i++) {
        img[i].style.display = "none";  
    }
    // Relooping image index if exceeds length(similar to Mod)
    if (imgIndex > img.length) {
        imgIndex = 1;
    }    
    // Turns off active mode for all dots
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    // Displaying the current dot and image on the slideshow
    img[imgIndex-1].style.display = "block";  
    dots[imgIndex-1].className += " active";
    setTimeout(auto_change, 5000); // Change image every 5 seconds
}

/**
 * Manually change image on slideshow when a dot is clicked. Also
 * change the current image variable for the automatic slideshow.
 * 
 * @param {integer} number position of the dot selected/clicked
 */
function current_image(number) {
    // Changes current image position for automatic slideshow
    imgIndex = number;

    // Relooping image index if exceeds length(similar to Mod)
    if (number > img.length) {
        imgIndex = 1;
    }

    // Turns of display for all images
    for (i = 0; i < img.length; i++) {
        img[i].style.display = "none";  
    }

    // Turns off active mode for all dots
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    // Displaying the current dot and image on the slideshow
    img[number-1].style.display = "block";  
    dots[number-1].className += " active";
}

/* Interaction 2: Navbar change background-colour & hide logo on scroll and width for
all pages */

/**
 * Changes navigation bar background colour and hide/show logo depending
 * on scroll position and width.
 *     -If scroll pos > 1000px -> Hide logo and change background to black
 *     -else if scroll pos < 1000px and page width > 1093px -> Remove background
 *      and show logo. 
 */
 $(document).ready(function(){
    $(window).scroll(function() {   
      if ($(document).scrollTop() > 1000) { 
        // Scroll pos > 1000px
        $("#navbar").css("background-color", "black");  
        $(".nav-left").hide();
      } else if ($(document).scrollTop() < 1000 && $(window).width() > 1093) {
        // Scroll pos < 1000px and width > 1093px
        $("#navbar").css("background-color", "transparent"); 
        $(".nav-left").show();
      }
    });
  });

 /* Interaction 3: Turning on overlay whenever button is clicked */  

/**
 * Turns overlay on with booking content for Stay and Activities page
 */
function overlay_on() {
    document.getElementById("overlay").style.display = "block";
    document.getElementById("bookbox-overlay").style.display = "block";
}
  
/**
 * Turns booking content overlay off 
 */
function overlay_off() {
    document.getElementById("overlay").style.display = "none";
    document.getElementById("bookbox-overlay").style.display = "none";
}

/**
 * Turns overlay on for main menu in Food and Beverages page
 */
function open_menu() {
    document.getElementById("overlay").style.display = "block"; 
    document.getElementById("foodmenu").style.display = "block";
}
/**
 * Turns overlay off for main menu
 * 
 */
function close_menu() {
    document.getElementById("overlay").style.display = "none";
    document.getElementById("foodmenu").style.display = "none";
}

/* Interaction 4: Validating input fields for calendar, prompting
users with appropriate messages and instructions(Stay and Activities page) */

/**
 * Validates input fields for start date and end date. Also confirms
 * inputs and process booking if they are correct.
 *     -If one or both fields are empty -> Invalid
 *     -If end date is before start date -> Invalid
 *     -Else -> Valid -> Confirmation booking
 * @returns back with nothing, ending function procedures if invalid inputs
 */
function submit() {
    // Getting values inputted by users(end and start dates)
    var start = $("#startDate").val(); 
    var end = $("#endDate").val();

    // Empty fields
    if (!start || !end) {
        alert("Please enter inputs on both fields");
        return;
    }

    // Converting to numeric/date inputs for comparison
    var startDate = new Date($("#startDate").val());
    var endDate = new Date($("#endDate").val());

    if (startDate > endDate) { // End date before start date
        alert("End date cannot be before start date!");
    } else { // Valid inputs procedures
        if (confirm("Are you sure you want to make the booking?")) {
            // Books and closes overlay if valid
            document.getElementById("overlay").style.display = "none";
            document.getElementById("bookbox-overlay").style.display = "none";
            alert("Your booking has been made");
        } 
    }
}

/* Interaction 5: Randomises images everytime button is pressed for Discover page*/

/**
 * @returns a randomised image out of list whenever called upon. Contains
 * a hidden easter egg if user gets lucky.
 */
function randomise_image() {
    // List of images possible
    myImages = new Array();
    myImages[0] = "images&files/marsrock.jpg";
    myImages[1] = "images&files/rock2.jpg";
    myImages[2] = "images&files/discover3.jpg";
    myImages[3] = "images&files/discover4.jpg";
    myImages[4] = "images&files/discover5.jpg";
    myImages[5] = "images&files/discover6.jpg";

    // Randomising index position between 0 - 5, including
    var randomNum = Math.floor(Math.random() * myImages.length);
    if (randomNum == 5) { // Easter egg
        alert("Hey there, you have found the hidden Easter Egg. Have an awesome day");
    }
    return myImages[randomNum];
}

/**
 * Loads the randomised image for users whenever button is pressed
 */
$(".submit").click(function(){
    // Getting randomised image
    var randomImage = randomise_image(); 
    // Loading image
    $("#image").html("<img src='"+ randomImage +"' alt='One of the 6 wonders of Mars'/>");
});
