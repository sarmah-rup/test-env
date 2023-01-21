const input = document.getElementById('image-input');
const image = document.getElementById('image');
const colorCards = document.querySelectorAll('.card');

//first you have to install the color-thief library via npm
import ColorThief from 'color-thief'; 

input.addEventListener('change', function() {
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = function(e) {
      image.src = e.target.result;
    };
    reader.readAsDataURL(input.files[0]);
  }
});

image.addEventListener('load', function() {
  //create a new instance of color thief
  const colorThief = new ColorThief();
  //get dominant color from the image
  const dominantColors = colorThief.getPalette(image, 5);
  
  colorCards.forEach((card, index) => {
    card.style.backgroundColor = `rgb(${dominantColors[index][0]}, ${dominantColors[index][1]}, ${dominantColors[index][2]})`;
  });
});
