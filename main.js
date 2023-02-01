const timeElement = document.querySelector('.date__time');
const dateElement = document.querySelector('.date__date');
const currentElement = document.querySelector('.secondary__current-info');
const timeZone = document.querySelector('.place__timezone')
const country = document.querySelector('.place__country');
const weatherForecast = document.querySelector('.future-forecast__container')
const currentTemp = document.querySelector('.today__temp');
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const API = '1112672e97707278ec7d092d97544563';



setInterval(()=>{
    const time = new Date();
    const month =  new Date().getMonth();
    const date = new Date().getDate();
    const day = new Date().getDay();
    const hour = new Date().getHours();

    const hoursFormat = hour >= 13 ? hour %12: hour;
    const minutes = new Date().getMinutes();
    const hourInitials = hour >= 12 ? 'PM' : 'AM';

    timeElement.innerHTML = (hoursFormat < 10? '0' + hoursFormat: hoursFormat) + ':'+  (minutes < 10 ? '0' + minutes: minutes) + '' + `<span class='date__initials'> ${hourInitials} </span> `;

    dateElement.innerHTML = days[day] + ',' + date + '' + months[month];

},1000);

getWeather();
function getWeather(){
    navigator.geolocation.getCurrentPosition(success => {

        let {latitud, longitude} = success.coords;
        
        fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${latitud}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API}`).then( res => res.json()).then(data =>{
            console.log(data)
            showWeatherData(data);
        })
    })
}

function showWeatherData(data){
    let {humidity, pressure, sunrise, sunset, wind_speed} = data.current;
    timeZone.innerHTML = data.timeZone;
    country.innerHTML = data.lat + 'N' + data.lon + 'E'
    currentElement.innerHTML =
    `<div class="weather__item">
    <div>Humidity</div>
    <div>${humidity}%</div>
</div>
<div class="weather__item">
    <div>Pressure</div>
    <div>${pressure}</div>
</div>
<div class="weather__item">
    <div>Wind Speed</div>
    <div>${wind_speed}</div>
</div>
<div class="weather__item">
    <div>Sunrise</div>
    <div>${window.moment(sunrise * 1000).format('HH:mm a')}</div>
</div>
<div class="weather__item">
    <div>Sunset</div>
    <div>${window.moment(sunset * 1000).format('HH:mm a')}</div>
</div>

`;
let otherDays = ''
data.daily.forEach((day, index)=>{
    if(index == 0){
        currentTemp.innerHTML = `
        <div class="today-info">
        <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="" class="today-weather__icon">
        <div class="today-other__info">
            <div class="today__day">${window.moment(day.dt*1000).format('ddd')}</div>
            <div class="today__temp">Night - ${day.temp.night}&#176; C</div>
            <div class="today__temp">Day - ${day.temp.day}&#176; C</div>
        </div>
    </div>
        `
    } else{
        otherDays = `  
        <div class="weather-forecast__item">
        <div class="today__day">${window.moment(day.dt*1000).format('ddd')}</div>
        <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="" class="today-weather__icon">
        <div class="today__temp">Night - ${day.temp.night}&#176; C</div>
        <div class="today__temp">Day - ${day.temp.day}#176; C</div>
    </div>`
    }
})

weatherForecast.innerHTML = otherDays;

}