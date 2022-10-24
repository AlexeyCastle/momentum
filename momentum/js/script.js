
import audioPlaylist from './playList.js';

async function getWeather(){
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=08f2a575dda978b9c539199e54df03b0&units=metric`;
    const res = await fetch(url)
    const data = await res.json()
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    humidity.textContent =`humidity: ${data.main.humidity}%` ;
    pressure.textContent = `pressure: ${data.main.pressure}mmHg`;
    wind.textContent = `wind speed: ${data.wind.speed}m/s`;
}

let playNum = 0
const name = document.getElementById('name')
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const humidity = document.querySelector('.humidity')
const pressure = document.querySelector('.pressure')
const wind = document.querySelector('.wind')
const input = document.getElementById('city')
const time = document.querySelector('.time')
const calendar = document.querySelector('.calendar')
const greeting = document.querySelector('.greeting-text')
const play = document.querySelector('.play')
const stop = document.querySelector('.pause')
const playPrev = document.querySelector('.play-prev')
const playNext = document.querySelector('.play-next')
input.addEventListener('change', getWeather)
const playListContainer = document.querySelector('.play-list')
const li = document.querySelector('.play-item')
const slidePrev = document.querySelector('.prev-slide')
const slideNext = document.querySelector('.next-slide')
const body = document.querySelector('.body')
const audio = new Audio()
const date = new Date()


audioPlaylist.forEach(element=>{
    const li = document.createElement('li')
    li.classList.add('play-item')
    li.textContent=element.name
    playListContainer.append(li)
    playListContainer.children[0].classList.add('active')
})


function playAudio(){
    audio.src=audioPlaylist[playNum].src
    play.classList.toggle('none')
    stop.classList.toggle('none')
    audio.play()
}

function stopAudio(){
    audio.pause()
    play.classList.toggle('none')
    stop.classList.toggle('none')

}

function prevSound(){
    if(playNum===0) {
        playListContainer.children[playNum].classList.remove('active')
        playNum = audioPlaylist.length - 1
        playListContainer.children[audioPlaylist.length-1].classList.add('active')
    } else {
        playNum--
        playListContainer.children[playNum+1].classList.remove('active')
        playListContainer.children[playNum].classList.add('active')
    }
    audio.pause()
    stop.classList.add('none')
    play.classList.remove('none')
}
function nextSound(){
    if(playNum === audioPlaylist.length-1){
        playListContainer.children[audioPlaylist.length-1].classList.remove('active')
        playNum = 0
        playListContainer.children[playNum].classList.add('active')
    }
    else {
        playNum++
        playListContainer.children[playNum].classList.add('active')
        playListContainer.children[playNum-1].classList.remove('active')
    }
    audio.pause()
    stop.classList.add('none')
    play.classList.remove('none')
}


play.addEventListener('click',playAudio)
stop.addEventListener('click',stopAudio)
playNext.addEventListener('click',nextSound)
playPrev.addEventListener('click',prevSound)


function setBg(){
    const img = new Image()
    img.src = `img/background/${timeOfDay}/${currentNumber}.jpg`
    img.onload=()=>{
        body.style.cssText = `
 background: url("img/background/${timeOfDay}/${currentNumber}.jpg")no-repeat;
 background-size: cover;`
    }
    const date = new Date();
    const hours = date.getHours()
    const timeOfDay = getTimeOfDay(hours)
    getTimeOfDay(hours)
    const currentNumber = randNumber()
}
setInterval(setBg,300000)


function showTime() {
    const date = new Date();
    const currentTime = date.toLocaleTimeString();
    const hours = date.getHours()
    const timeOfDay = getTimeOfDay(hours)
    const greetingText = `Good ${timeOfDay}, `
    greeting.textContent = greetingText
    time.textContent = currentTime;
    showDate()
    setTimeout(showTime, 1000);
}
showTime();

function showDate(){
    const date = new Date()
    const options = {month: 'long', day: 'numeric', weekday:'long'};
    const currentDate = date.toLocaleDateString('en-US', options);
    calendar.textContent = currentDate
}

function getTimeOfDay(hours){
    if(hours >= 0 && hours < 6){
        return 'night'
    }
    else if(hours >= 6 && hours < 12){
        return 'morning'
    }
    else if(hours>=12 && hours < 18){
        return 'afternoon'
    }
    else if(hours >= 18 && hours <=23){
        return 'evening'
    }
}

function setLocalStorage() {
    localStorage.setItem('name', name.value);

}
window.addEventListener('beforeunload', setLocalStorage)
function getLocalStorage() {
    if(localStorage.getItem('name')) {
        name.value = localStorage.getItem('name');
    }
}
window.addEventListener('load', getLocalStorage)




function randNumber(){
    let random = String(Math.floor(Math.random()*20))
    if(random==='0'){
        random='01'
        return random
    }
    if(random.length===1){
        return String(random.padStart(2,'0'))
    }
    return random
}
slidePrev.addEventListener('click',function (event){
    const hours = date.getHours()
    const timeOfDay = getTimeOfDay(hours)
    getTimeOfDay(hours)
    const currentNumber = randNumber()
    body.style.cssText = `
 background: url("img/background/${timeOfDay}/${currentNumber}.jpg")no-repeat;
 background-size: cover;`
    slidePrev.setAttribute('disabled', 'disabled')
    slideNext.setAttribute('disabled', 'disabled')
    setTimeout(function(){
        slidePrev.removeAttribute('disabled')
    },3000)
    setTimeout(function(){
        slideNext.removeAttribute('disabled')
    },3000)
})
slideNext.addEventListener('click',function (event){
    const date = new Date();
    const hours = date.getHours()
    const timeOfDay = getTimeOfDay(hours)
    getTimeOfDay(hours)
    const currentNumber = randNumber()
    body.style.cssText = `
 background: url("img/background/${timeOfDay}/${currentNumber}.jpg")no-repeat;
 background-size: cover;`
    slidePrev.setAttribute('disabled', 'disabled')
    slideNext.setAttribute('disabled', 'disabled')
    setTimeout(function(){
        slideNext.removeAttribute('disabled')
    },3000)
    setTimeout(function(){
        slidePrev.removeAttribute('disabled')
    },3000)
})


