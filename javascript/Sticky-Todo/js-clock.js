const clock = document.getElementById("js-clock");
const fulldate = document.getElementById("js-date");
const dayNames = [
    "SUN",
    "MON",
    "TUE",
    "WED",
    "THU",
    "FRI",
    "SAT"
];

function getTime(){
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const date = now.getDate();
    const day = dayNames[now.getDay()];
    const hour = now.getHours();
    const minute = now.getMinutes();
    const second = now.getSeconds();

    clock.innerText = `${hour < 10 ? `0${hour}` : hour}:${minute < 10 ? `0${minute}` : minute}:${second < 10 ? `0${second}` : second}`

    fulldate.innerText = `${year} / ${month < 10 ? `0${month}` : month} / ${date < 10 ? `0${date}` : date} / ${day}`;
};


function init(){
    setInterval(getTime, 1000);
};

init();