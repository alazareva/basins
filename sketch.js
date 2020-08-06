let power_slider;
let extent_slider;

let w = 500;
let h = 500;
let max_iter = 100;
let tolerance = 0.0000001;


function display(){
    let p = power_slider.value();
    let extent = (2.5 - extent_slider.value()) ** 2;
    // compute equation and derivative based on input
    let f = (z) => math.subtract(math.pow(z, p), 1) 
    let f_prime = (z) => math.multiply(p, math.pow(z, p - 1))
    document.getElementById("equation").innerHTML = 'z ^ ' + p + ' - 1';
    for (let i = 0; i < w; i ++) {
        for (let j = 0; j < h; j ++) {
            let x = map(i, 0, w, -extent, extent);
            let y = map(j, 0, h, -extent, extent);
            let z = math.complex(x, y);
            let n_res = newton(z, f, f_prime, max_iter, tolerance);
            let iter = n_res[0]
            let hue = map(iter, 0, 50, 0, 360);
            let c = color((hue + 200) % 360, 50, 100);
            set(i, j, c);
        } 
    }
    updatePixels();
}


function add_slider(x, y, minval, maxval, start, label){
    group = createDiv('');
    group.position(x, y);  
    slider = createSlider(minval, maxval, start);
    slider.parent(group);
    label = createSpan('  ' + label);
    label.parent(group);
    return slider;
}


function setup() {
    var canvas = createCanvas(w, h);
    canvas.parent("canvas");
    colorMode(HSB, 360, 100, 100)
    power_slider = add_slider(10, h + 115, 3, 10, 5, 'power of z');
    extent_slider = add_slider(10, h + 145, 0.05, 2.2, 1, 'zoom');
    display();
    power_slider.input(display);
    extent_slider.input(display);
  }

function draw() {
}