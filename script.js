// select the file input and preview elements
const input = document.querySelector("input[type='file']");
const preview = document.querySelector("img");

// handle the file input change event
input.addEventListener("change", e => {
  // get the file
  const file = e.target.files[0];

  // create a file reader
  const reader = new FileReader();

  // set the file reader onload event
  reader.onload = e => {
    // set the preview image src to the file data
    preview.src = e.target.result;

    // send the file to the server
    sendImageToServer(file);
  };

  // read the file as data url
  reader.readAsDataURL(file);
});

// function to send the image to the server
function sendImageToServer(file) {
  // create a new FormData object
  const formData = new FormData();

  // append the file to the FormData object
  formData.append("image", file);

  // send the FormData object to the server
  fetch("/process-image", {
    method: "POST",
    body: formData
  })
    .then(response => response.json())
    .then(data => {
      // display the dominant colors on the HTML page
      displayDominantColors(data.colors);
    })
    .catch(error => console.log(error));
}

// function to display the dominant colors on the HTML page
function displayDominantColors(colors) {
  // select the color cards container
  const container = document.querySelector(".color-cards");

  // remove existing color cards
  container.innerHTML = "";

  // create new color cards
  colors.forEach(color => {
    // create a new div element
    const card = document.createElement("div");

    // set the background color of the div element
    card.style.backgroundColor = color;

    // add the div element to the container
    container.appendChild(card);
  });
}
