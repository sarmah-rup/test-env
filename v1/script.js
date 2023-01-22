Papa.parse("colours.csv", {
    download: true,
    complete: function(results) {
        var csvColors = results.data;
        var imageInput = document.getElementById('image-input');
        var previewImage = document.getElementById('preview-image');
        imageInput.addEventListener("change", function() {
            previewImage.src = URL.createObjectURL(imageInput.files[0]);
            previewImage.addEventListener("load", function() {
                var colorThief = new ColorThief();
                var colors = colorThief.getPalette(previewImage, 5);
                console.log(colors);
                var colorCards = document.getElementById("color-cards");
                colorCards.innerHTML = "";
                for (var i = 0; i < colors.length; i++) {
                    var colorCard = document.createElement("div");
                    colorCard.classList.add("color-card");
                    colorCard.style.backgroundColor = `rgb(${colors[i][0]},${colors[i][1]},${colors[i][2]})`;
                    colorCards.appendChild(colorCard);
                }
                colors.forEach(function(color) {
                    var closestColor = null;
                    var closestDiff = Number.MAX_VALUE;
                    csvColors.forEach(function(csvColor) {
                        var csvRgb = [csvColor[1], csvColor[2], csvColor[3]];
                        var diff = colorDiff.diff(color, csvRgb);
                        if (diff < closestDiff) {
                            closestDiff = diff;
                            closestColor = csvColor;
                        }
                    });
                    console.log(closestColor[0]);
                });
            });
        });
    }
});
