const time_el = document.getElementById('countdown')
const startbutton = document.getElementById("startbutton");
const pausebutton = document.getElementById("pausebutton");
const resetbutton = document.getElementById("resetbutton");


let seconds = 0;
let interval = null;

//Events Listeners

startbutton.addEventListener('click', start);
pausebutton.addEventListener('click', pause);
resetbutton.addEventListener('click', reset);



//Timer Function

function timer(){
    seconds++;

    //Format the time
    let hours = Math.floor(seconds / 3600);
    let mins = Math.floor((seconds - (hours *3600)) / 60);
    let secs = seconds % 60;

    


    let secondDigitSeconds = Math.floor(secs / 10);
    let secondDigitMinutes = Math.floor(mins/10);
    let secondDigitHours = Math.floor(hours/10);

    let formattedTime = `${secondDigitHours === 0 ? '0' : ''}${hours}:${secondDigitMinutes === 0 ? '0' : ''}${mins}:${secondDigitSeconds === 0 ? '0' : ''}${secs}`;

    time_el.innerText = formattedTime;
}


// Action Button Functions


function start(){
    if (interval){
        return;
    }

    interval = setInterval(timer, 1000);
}

function pause(){
    clearInterval(interval);
    interval = null;
}


function reset(){
    pause();
    seconds = 0;
    time_el.innerText = '00:00:00';
}