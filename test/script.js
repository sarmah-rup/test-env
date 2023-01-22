// Get the file input element, the image display element, and the color display element
var fileInput = document.getElementById("fileInput");
var imageDisplay = document.getElementById("imageDisplay");
var colorDisplay = document.getElementById("colorDisplay");

// Listen for the file input to change
fileInput.addEventListener("change", function() {
  // Get the selected file
  var file = fileInput.files[0];
  
  // Create a new FormData object
  var formData = new FormData();
  
  // Append the file to the FormData object
  formData.append("image", file);
  
  // Create an XMLHttpRequest object
  var xhr = new XMLHttpRequest();
  
  // Open a post request to the server
  xhr.open("POST", "/upload");
  
  // Send the FormData object
  xhr.send(formData);
  
  // Listen for the server response
  xhr.onload = function() {
    if (xhr.status === 200) {
      // Get the response from the server
      var response = JSON.parse(xhr.response);
      
      // Display the image in the browser
      imageDisplay.src = response.imageUrl;
      
      // Get the dominant colors
      var dominantColors = response.dominantColors;
      
      // Remove any existing color display elements
      while (colorDisplay.firstChild) {
        colorDisplay.removeChild(colorDisplay.firstChild);
      }
      
      // Create a div element for each color and add it to the color display element
      dominantColors.forEach(function(color) {
        var colorDiv = document.createElement("div");
        colorDiv.style.backgroundColor = "rgb(" + color[0] + "," + color[1] + "," + color[2] + ")";
        colorDiv.style.width = "50px";
        colorDiv.style.height = "50px";
        colorDiv.style.display = "inline-block";
        colorDisplay.appendChild(colorDiv);
      });
    } else {
      alert("Error uploading image.");
    }
  };
});
