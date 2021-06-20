const greeting = document.querySelector(".js-greeting");
const userInput = document.getElementById("inputUser");
const USER_NAME = localStorage.getItem("user_name");
const doneBtn = document.getElementById("doneListBtn");
const doneList = document.querySelector(".doneTodosContainer");
const resetBtn = document.querySelector(".resetBtn");

function saveUsername(name) {
    localStorage.setItem('user_name', name);
}

function showGreeting(text) {
    greeting.innerText = `Keep It Up, ${text}!`;
}

function handleSubmit(event){
    event.preventDefault();

    const userName = userInput.value;

    saveUsername(userName);
    showGreeting(userName);
}

function slideDoneList(){
    doneList.classList.toggle('active');
}

function reset(){
    if (confirm("정말 초기화하시겠습니까?")) {
        localStorage.clear();
        location.reload();
    }   
}


function init() {
    if(USER_NAME === null) {
        greeting.addEventListener('submit', handleSubmit);
    } else {
        showGreeting(USER_NAME);
    }
    
    doneBtn.addEventListener('click', slideDoneList)
    resetBtn.addEventListener('click', reset);
}

init();

// 리팩토링 필요: userName, USER_NAME 구분해서 쓰지 않고 하나만 공통으로 쓸 수 있는 로직은?

//
