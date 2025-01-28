let weather_api = 'https://api.open-meteo.com/v1/forecast?latitude=34.2583&longitude=108.9286&current_weather=true&hourly=temperature_2m,precipitation_probability&daily=temperature_2m_max,temperature_2m_min';
let currentTemp, dayNight, tempInTwoHours, precipProbInTwoHours;
let stars = [];

async function getWeather() {
    let data = await fetch(weather_api);
    let j_data = await data.json();
    currentTemp = j_data.current_weather.temperature; // current_weather.temperature
    dayNight = j_data.current_weather.is_day; // current_weather.is_day
    tempInTwoHours = j_data.hourly.temperature_2m[2]; // hourly.temperature_2m[2]
    precipProbInTwoHours = j_data.hourly.precipitation_probability[2]; // hourly.precipitation_probability[2]
}

function setup() {
    createCanvas(400, 400);
    getWeather();

    for (let i = 0; i < 5; i++) {
        stars.push({
            x: random(width),
            y: random(height / 2),
            radius1: 20,
            radius2: 10
        });
    }
}

function draw() {
    background(220);

   
    if (currentTemp !== undefined) {
        text("Current temperature is: " + currentTemp + "°C", 20, 100);
        text("Day or night? " + (dayNight === 1 ? "Day" : "Night"), 20, 120);
        text("Temperature in 2 hours: " + tempInTwoHours + "°C", 20, 140);
        text("Precipitation probability in 2 hours: " + precipProbInTwoHours + "%", 20, 160);
    } else {
        text("Loading weather data...", 20, 100);
    }

    if (dayNight === 1) {
        fill(0); 
    } else {
        fill(255, 255, 0); 
    }

  
    noStroke();
    for (let star of stars) {
        drawStar(star.x, star.y, star.radius1, star.radius2);
    }
}


function drawStar(x, y, radius1, radius2) {
    beginShape();
    let angle = TWO_PI / 5;
    for (let a = -PI / 2; a < TWO_PI - PI / 2; a += angle) {
        let sx = x + cos(a) * radius1;
        let sy = y + sin(a) * radius1;
        vertex(sx, sy);
        let sx2 = x + cos(a + angle / 2) * radius2;
        let sy2 = y + sin(a + angle / 2) * radius2;
        vertex(sx2, sy2);
    }
    endShape(CLOSE);
}
