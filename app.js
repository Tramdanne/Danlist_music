const data = [     
    {         
        song: 'mama boy',         
        singer: 'amme',         
        avatar: './images/01.jpg',         
        mp3: './music/01.mp3'     
    },     
    {         
        song: 'because my mom made us break up',         
        singer: 'miu lê, karik',         
        avatar: './images/02.jpg',         
        mp3: './music/02.mp3'     
    },     
    {         
        song: 'Shay Nắnggg',         
        singer: 'amme, obito',         
        avatar: './images/03.jpg',         
        mp3: './music/03.mp3'     
    },     
    {         
        song: 'run away from this world',         
        singer: 'Da LAB, Phương Ly',         
        avatar: './images/04.jpg',         
        mp3: './music/04.mp3'     
    },     
    {         
        song: 'QUERRY ',         
        singer: 'QNT, TRUNG TRẦN, RPT MCK',         
        avatar: './images/05.jpg',         
        mp3: './music/05.mp3'     
    },     
    {         
        song: 'put aside worries',         
        singer: 'dalab, miu lê',         
        avatar: './images/06.jpg',         
        mp3: './music/06.mp3'     
    },     
    {         
        song: 'matchanah',         
        singer: 'híu, bâu',         
        avatar: './images/07.jpg',         
        mp3: './music/07.mp3'     
    },     
    {         
        song: 'sweet talk',         
        singer: 'lyly, hiếu thứ hai',         
        avatar: './images/08.jpg',         
        mp3: './music/08.mp3'     
    },     
    {         
        song: 'golden girl',         
        singer: 'huyr, tùng viu',         
        avatar: './images/09.jpg',         
        mp3: './music/09.mp3'     
    },     
    {         
        song: 'just for me',         
        singer: 'đen, binz',         
        avatar: './images/10.jpg',         
        mp3: './music/10.mp3'     
    }, 
]  

// 1. Add a leading zero to numbers from 0 to 9
function addZero(number) {     
    if (number >= 0 && number <= 9) return `0${number}`     
    else return number 
}  

// 2. Convert seconds to minutes and format it
function convertSecondsToMinutes(timeType, element = '') {     
    let seconds = 0     
    if (timeType === 'currentTime') {         
        seconds = element.currentTime.toFixed(0)     
    } else if (timeType === 'duration') {         
        seconds = element.duration.toFixed(0)     
    } else {         
        seconds = timeType.toFixed(0)     
    }     
    const minutes = Math.trunc(seconds / 60)     
    return `${addZero(minutes)}:${addZero(seconds - minutes * 60)}` 
}  

// 3. Optimize randomization so that a song doesn't repeat until all songs have played
let random = [] 
function randomOptimization(arr) {     
    const max = arr.length     
    let numberRandom = Math.floor(Math.random() * max)          
    if (random.length >= arr.length) {         
        random = []     
    }                
    while (random.find(num => numberRandom == num) !== undefined) {         
        numberRandom = Math.floor(Math.random() * max)     
    }      
    random.push(numberRandom)     
    return numberRandom 
}  

// 4. Get the horizontal percentage of the mouse position and the timeline
function percentTimeLine(e) {     
    let percent = ''     
    const left = timeLine.offsetLeft     
    const width = timeLine.offsetWidth     
    if (clickDown && e.clientX >= left && e.clientX <= left + width) {         
        percent = (e.clientX - left) / width     
    } else if (clickDown && e.clientX < left) {         
        percent = 0     
    } else if (clickDown && e.clientX > left + width) {         
        percent = 1     
    }          
    return percent 
}  

// Interval for updating current time
function intervalCurrent() {     
    playingTimeLeft.innerHTML = convertSecondsToMinutes('currentTime', document.querySelector('audio.active'))     
    circle.style.left = document.querySelector('audio.active').currentTime / document.querySelector('audio.active').duration * 100 + '%'     
    percentLine.style.width = document.querySelector('audio.active').currentTime / document.querySelector('audio.active').duration * 100 + '%' 
}  

const playList = document.getElementById('playlist')  

// 5. Render the playlist
data.forEach((item, index) => {     
    playList.insertAdjacentHTML('beforeend', `          
        <div class="item" data-index="${index}">     
            <audio class="audio${++index}" src="${item.mp3}"></audio>     
            <span class="item__number">${addZero(index)}</span>     
            <img src="${item.avatar}">     
            <span class="oi item__icon" data-glyph="caret-right"></span>     
            <div class="music">     
                <div class="item__song">${item.song}</div>     
                <div class="item__singer">${item.singer}</div>     
            </div>     
            <span class="item__time">00:00</span>     
        </div>     
    `) 
});  

// 6. Show song duration in the playlist after rendering
document.querySelectorAll('audio').forEach(audio => {     
    audio.addEventListener('loadedmetadata', function() {         
        audio.parentElement.querySelector('.item__time').innerHTML = convertSecondsToMinutes('duration', audio)     
    }) 
})

const listAudio = document.querySelectorAll('audio') 
const listItem = document.querySelectorAll('.item') 
const playingImg = document.querySelector('#playing .thumbnail img') 
const thumbnail = document.querySelector('#playing .thumbnail') 
const playingSong = document.querySelector('#playing .song') 
const playingSinger = document.querySelector('#playing .singer') 
const playingTimeRight = document.querySelector('#playing .time .right') 
const playingTimeLeft = document.querySelector('#playing .time .left') 
const play = document.querySelector('.controls .play') 
const pause = document.querySelector('.controls .pause') 
const forWard = document.querySelector('.controls .forward') 
const backward = document.querySelector('.controls .backward') 
const timeLine = document.querySelector('#playing .time-line') 
const circle = timeLine.querySelector('.circle') 
const percentLine = timeLine.querySelector('.percent') 
const loop = document.querySelector('.controls .loop') 
const randomControl = document.querySelector('.controls .random')   

listItem[0].classList.add('active') 
listAudio[0].classList.add('active')  

let currentTime = ''  

// 7. When clicking on a song
listItem.forEach(item => {     
    item.addEventListener('click', function() {          
        thumbnail.classList.remove('pause')         
        thumbnail.classList.remove('play')                  
        // 7.1 Active effect         
        document.querySelector('.item.active').classList.remove('active')         
        item.classList.add('active')          
        // 7.2 Pause the current audio and reset time to 0         
        document.querySelector('audio.active').pause()         
        document.querySelector('audio.active').currentTime = 0          
        // 7.3 Remove and add active class to the audio         
        document.querySelector('audio.active').classList.remove('active')         
        item.querySelector('audio').classList.add('active')                  
        // 7.4 Change image, song, singer, time         
        playingImg.setAttribute('src', item.querySelector('img').getAttribute('src'))         
        playingSong.innerHTML = item.querySelector('.item__song').innerHTML         
        playingSinger.innerHTML = item.querySelector('.item__singer').innerHTML         
        playingTimeRight.innerHTML = item.querySelector('.item__time').innerHTML          
        // 7.5 Scroll effect, clearInterval, remove active class from loop         
        item.scrollIntoView({behavior: "smooth", block: "center"})         
        clearInterval(currentTime)         
        loop.classList.remove('active')          
        play.click()     
    }) 
})  

// 8. When clicking play
play.addEventListener('click', function() {     
    forWard.style.pointerEvents = 'all'      
    thumbnail.classList.remove('pause')     
    thumbnail.classList.add('play')      
    // 8.1 Change to pause effect     
    play.style.display = 'none'     
    pause.style.display = 'block'          
    // 8.2 Play the active audio     
    document.querySelector('audio.active').play()          
    // 8.3 Current time effect     
    currentTime = setInterval(() => {         
        intervalCurrent()     
    }, 100)      
    // 8.4 When active audio ends     
    document.querySelector('audio.active').onended = function() {         
        clearInterval(currentTime)                  
        // If loop is active         
        if (loop.classList.contains('active')) {             
            play.click()         
        // Default play next song         
        } else {             
            forWard.click()         
        }     
    }       
})  

// 9. When clicking pause
pause.addEventListener('click', function() {     
    pause.style.display = 'none'     
    play.style.display = 'block'      
    thumbnail.classList.remove('play')     
    thumbnail.classList.add('pause')      
    clearInterval(currentTime)     
    document.querySelector('audio.active').pause() 
})  

// 10. When clicking forward
forWard.addEventListener('click', function() {     
    // If random is selected     
    if (randomControl.classList.contains('active'))     
    {         
        listItem[randomOptimization(listItem)].click()     
    }     
    else     
    {         
        const nextItem = document.querySelector('.item.active').nextElementSibling         
        if (nextItem) {             
            nextItem.click()         
        } else {             
            pause.click()             
            this.style.pointerEvents = 'none'         
        }     
    } 
})  

// 11. When clicking backward
backward.addEventListener('click', function() {     
    if (randomControl.classList.contains('active'))     
    {         
        if (document.querySelector('audio.active').currentTime <= 3) {             
            listItem[randomOptimization(listItem)].click()         
        } else {             
            document.querySelector('audio.active').currentTime = 0         
        }     
    }     
    else     
    {         
        const prevItem = document.querySelector('.item.active').previousElementSibling         
        if (prevItem && document.querySelector('audio.active').currentTime <= 3) {             
            prevItem.click()         
        } else {             
            document.querySelector('audio.active').currentTime = 0         
        }     
    }      
})  

let clickDown = false  

// 12. Time line drag effect
window.addEventListener('mousedown', function(e) {     
    if (e.target.matches('.circle') || e.target.matches('.time-line') || e.target.matches('.percent')) {         
        clickDown = true         
        clearInterval(currentTime)     
    } 
})  

window.addEventListener('mousemove', function(e) {     
    this.document.body.style.userSelect = 'none'      
    let percent = percentTimeLine(e)      
    if (clickDown) {         
        clearInterval(currentTime)         
        playingTimeLeft.innerHTML = convertSecondsToMinutes(percent * document.querySelector('audio.active').duration)         
        circle.style.left = percent * 100 + '%'         
        percentLine.style.width = percent * 100 + '%'     
    }      
})  

window.addEventListener('mouseup', function(e) {     
    if (clickDown) {         
        document.querySelector('audio.active').currentTime = percentTimeLine(e) * document.querySelector('audio.active').duration         
        currentTime = setInterval(() => {             
            intervalCurrent()         
        }, 100)         
        clickDown = false     
    } 
})  

timeLine.addEventListener('click', function() {     
    intervalCurrent() 
})  

// 13. When clicking loop
loop.addEventListener('click', function() {     
    randomControl.classList.remove('active')     
    this.classList.toggle('active') 
})  

// 14. When clicking random
randomControl.addEventListener('click', function() {     
    loop.classList.remove('active')     
    this.classList.toggle('active')     
    random = []     
    if (this.classList.contains('active')) {         
        random.push(document.querySelector('.item.active').dataset.index)     
    } 
})  

thumbnail.addEventListener('animationend', function(e) {     
    if (e.animationName === 'rotatePause') {         
        thumbnail.classList.remove('pause')         
        this.style.borderRadius = '20px'     
    } 
})
