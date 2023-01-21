document.getElementById("upload-image").addEventListener("change", function() {
    var file = this.files[0];
    var reader = new FileReader();
    reader.onload = function() {
        var image_data = reader.result;
        // send the image data to the server
        fetch('/process-image', {
            method: 'POST',
            body: image_data
        })
        .then(response => response.json())
        .then(data => {
            // update the color cards with the dominant colors
            updateColorCards(data.dominant_colors);
        })
        .catch(error => console.error('Error:', error));
    }
    reader.readAsDataURL(file);
});
