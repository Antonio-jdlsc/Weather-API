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

    timeElement.innerHTML = hoursFormat + ':'+  minutes + '' + `<span class='date__initials'> ${hourInitials} </span> `;

    dateElement.innerHTML = days[day] + ',' + date + '' + months[month];

},1000);

getWeather();
function getWeather(){
    navigator.geolocation.getCurrentPosition(success => {

        let {latitud, longitude} = success.coords;

        fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${latitud}&lon=${longitude}&exclude={part}&appid=${API}`).then( res => res.json()).then(data =>{
            console.log(data)
        })
    })
}