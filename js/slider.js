// Two sliders for maze - one for width and one for height

let slider1 = document.getElementById("myRange1");
let outputHeight = document.getElementById("height"); // access slider number using "height" id
outputHeight.innerHTML = slider1.value;

// When slider is adjusted, update the height to its new value.
slider1.oninput = function() {
    outputHeight.innerHTML = this.value;
};

let slider2 = document.getElementById("myRange2");
let outputWidth = document.getElementById("width"); // access slider number using "width" id
outputWidth.innerHTML = slider2.value;

// When slider is adjusted, update the width to its new value.
slider2.oninput = function() {
    outputWidth.innerHTML = this.value;
};
