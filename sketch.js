var mapimg;
var clon = 0;
var clat = 0;


//var lat = 0;
//var lon = 0;

var zoom = 1;

var earthquakes;

function preload(){
    mapimg = loadImage('https://api.mapbox.com/styles/v1/mapbox/satellite-v9/static/0,0,1,0,0/1024x512?access_token=pk.eyJ1IjoicmFtMjM0IiwiYSI6ImNpejRjcXJvdjAwczYyd290aHpybHh6b2IifQ.VisV_ssf3HjA51RWeQjrdg');
    earthquakes = loadStrings('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.csv');
}

function mercX(lon){
    lon = radians(lon);
    var a = (256/PI)*pow(2,zoom);
    var b = lon + PI;
    return a*b;
}

function mercY(lat){
    lat = radians(lat);
    var a = (256/PI)*pow(2,zoom);
    var b = tan(PI/4 + lat/2);
    var c = PI - log(b);
    return a*c;
}


function setup() {
    
    createCanvas(1024,512);
    translate(width/2, height/2);
    imageMode(CENTER);
    image(mapimg, 0,0);
    //createP('the color dot mark as eartquake');
    
    var cx = mercX(clon);
    var cy = mercY(clat);
    
    for (var i = 0; i < earthquakes.length; i++){
        var data = earthquakes[i].split(/,/);
        console.log(data);
        var lat = data [1];
        var lon = data [2];
        var mag = data [4];
        
        var x = mercX(lon) - cx;
        var y = mercY(lat) - cy;
        
        mag = pow(10,mag);
        mag = sqrt(mag);
        var magmax = sqrt(pow(10,10));
        var d = map(mag,0,magmax,0,1600);
    
    stroke(250,0,250);
    fill(255,0,250,100);
        
    ellipse(x,y,d,d);
    }
    
    

}



function draw() {
    createP('the dot color, mark as eartquakes');
    
  
}
