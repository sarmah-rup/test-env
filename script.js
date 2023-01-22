var imageInput = document.getElementById('image-input');
var previewImage = document.getElementById('preview-image');
var colorThief = new ColorThief();
var colorCards = document.getElementById("color-cards");
var sidebar = document.getElementById("sidebar");

imageInput.addEventListener("change", function() {
    if (imageInput.files.length > 0) {
        var image = imageInput.files[0];
        var reader = new FileReader();
        reader.onload = function(e) {
            previewImage.src = e.target.result;
            previewImage.addEventListener("load", function() {
                var colors = colorThief.getPalette(previewImage, 5);
                console.log(colors);
                colorCards.innerHTML = "";
                for (var i = 0; i < colors.length; i++) {
                    var colorCard = document.createElement("div");
                    colorCard.classList.add("color-card");
                    colorCard.style.backgroundColor = `rgb(${colors[i][0]},${colors[i][1]},${colors[i][2]})`;
                    colorCards.appendChild(colorCard);
                }
                // added click event on colorCards
                colorCards.addEventListener("click", function() {
                    sidebar.classList.toggle("show");
                });
            });
        }
        reader.readAsDataURL(image);
    }
});

fetch('/colors.json')
    .then(response => response.json())
    .then(colorsData => {
        // code to compare colors goes here
    });
