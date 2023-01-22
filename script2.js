//colorThief part
var imageInput = document.getElementById('image-input');
var previewImage = document.getElementById('preview-image');
var colorThief = new ColorThief();
var colorCards = document.getElementById("color-cards");

imageInput.addEventListener("change", function() {
    if (imageInput.files.length > 0) {
        var image = imageInput.files[0];
        var reader = new FileReader();
        reader.onload = function(e) {
            previewImage.src = e.target.result;
            var colors = colorThief.getPalette(previewImage, 5);
            colorCards.innerHTML = "";
            for (var i = 0; i < colors.length; i++) {
                var colorCard = document.createElement("div");
                colorCard.classList.add("color-card");
                colorCard.style.backgroundColor = `rgb(${colors[i][0]},${colors[i][1]},${colors[i][2]})`;
                colorCards.appendChild(colorCard);
            }
        }
        reader.readAsDataURL(image);
    }
    previewImage.src = ""; //added
});



//color-diff part
colorCards.addEventListener("click", function(e) {
    if (e.target.classList.contains("color-card")) {
        var selectedColor = e.target.style.backgroundColor;
        document.querySelector(".container").style.backgroundColor = "rgba(" + chroma(selectedColor).rgb() + ", 0.3)";


        sidebar.classList.add("show");
        fetch('colors.json')
    .then(response => response.json())
    .then(colorsData => {
        var closestColors = [];
        // Use a regular expression to check if hex code is valid
        var hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
        // Filter out non-hex data and duplicates
        colorsData = colorsData.filter(color => hexRegex.test(color.hex)).filter((color, index, self) => self.findIndex(c => c.hex === color.hex) === index);
        for (var i = 0; i < colorsData.length; i++) {
            var colorRGB = chroma(colorsData[i].hex);
            var diff = chroma.deltaE(selectedColor, colorRGB);
            console.log("diff: ", diff); // added console log
            colorsData[i].diff = diff;
        }
        console.log("colorsData: ", colorsData); // added console log
        colorsData.sort((a, b) => a.diff - b.diff);
        console.log("Sorted ColorsData: ", colorsData); // added console log
        closestColors = colorsData.slice(0, 20);
        console.log("closestColors: ", closestColors); // added console log
        sidebar.innerHTML = "";
        closestColors.forEach(color => {
            var colorCard = document.createElement("div");
            colorCard.classList.add("color-card");
            colorCard.style.backgroundColor = color.hex;
            colorCard.innerHTML = `
            <p>Name: ${color.name}</p>
            <p>Code: ${color.code}</p>
            <p>Hex: ${color.hex}</p>
            <p>Company: ${color.company}</p>
            `;
            sidebar.appendChild(colorCard);
        });
    });

    }
});
