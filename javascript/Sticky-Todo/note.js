const body = document.querySelector("body");
const createNoteBtn = document.getElementById("createNoteBtn");
const todoInput = document.getElementById("inputTodo");
const todos_LS = [];
const finishedTodos_LS = [];
const finList = document.querySelector(".finishedList");
//이거 왜 한 번에 panel.style.backgroundColor 하면 안되는 거야....스코프,,?
const panel = document.querySelector(".controls_container");


function saveTodoContent() {    
    localStorage.setItem('todos', JSON.stringify(todos_LS));
}

function saveFinTodo() {
    localStorage.setItem('finishedTodos', JSON.stringify(finishedTodos_LS))
}

function createNote(event) {
    event.preventDefault();

    //새로운 note 요소 생성
    const newNote = document.createElement("section");
    body.appendChild(newNote);
    newNote.classList.add("note");

    function newNoteColor(){
        const newNoteColor = panel.style.backgroundColor;
        newNote.style.backgroundColor = newNoteColor;

    }
    newNoteColor();
    
    //노트 헤더 요소 생성
    const noteHeader = document.createElement("header");
    newNote.appendChild(noteHeader);
    noteHeader.classList.add("noteHeader");

    //노트 삭제 버튼 요소 생성
    const delNoteBtn = document.createElement("button");
    noteHeader.appendChild(delNoteBtn);
    delNoteBtn.classList.add("delnoteBtn")
    delNoteBtn.innerHTML="<i class='fas fa-trash-alt'></i>";

    //Todo텍스트 요소 생성
    const todoText = document.createElement("main");
    newNote.appendChild(todoText);
    todoText.classList.add("todoText");

    //Todo 완료 버튼 요소 생성
    const finishBtn = document.createElement("button");
    newNote.appendChild(finishBtn);
    finishBtn.classList.add("finishBtn");
    finishBtn.innerHTML="<i class='fas fa-check-circle'></i>";

    //타이머 요소 생성
    const noteCD = document.createElement("div");
    const setCDHour = document.createElement("input");
    setCDHour.setAttribute('type', 'number');

    setCDHour.setAttribute('min', '00');
    setCDHour.setAttribute('max', '23');
    setCDHour.setAttribute('value', '0');
    const setCDMin = document.createElement("input");
    setCDMin.setAttribute('type', 'number');
    setCDMin.setAttribute('min', '00');
    setCDMin.setAttribute('max', '59');
    setCDMin.setAttribute('value', '00');
    const setCDBtn = document.createElement("input");
    setCDBtn.setAttribute('type', 'submit');
    setCDBtn.setAttribute('value', '⏰');

    newNote.appendChild(noteCD);
    noteCD.appendChild(setCDHour);
    noteCD.appendChild(setCDMin);
    noteCD.appendChild(setCDBtn);
    noteCD.classList.add("noteCD");
    setCDHour.classList.add("setHour");
    setCDMin.classList.add("setMin");
    setCDBtn.classList.add("setBtn");

    noteCD.addEventListener('submit', (event)=>{
        event.preventDefault();
    })
    setCDBtn.addEventListener('click', startCountdown)

    
    // 타이머 시작 함수
    function startCountdown() {
        let setHour = document.querySelector(".setHour");
        let setMin = document.querySelector(".setMin");
        let inputHour = setHour.value;
        let inputMin = setMin.value;
        let startTime = (inputHour * 3600) + (inputMin * 60);
    
        let displayCD = document.createElement("span");
        displayCD.classList.add("displayClock")
        newNote.appendChild(displayCD);

        function showCountdown(){
            let leftHour = Math.floor(startTime/3600);
            let leftMin = Math.floor((startTime%3600)/60);
            let leftSec = (startTime%3600)%60;
            if(startTime < 0) {
                clearInterval(timer);  
            } else {
                displayCD.innerText = `${leftHour < 10 ? `0${leftHour}` : leftHour}:${leftMin < 10 ? `0${leftMin}` : leftMin}:${leftSec < 10 ? `0${leftSec}` : leftSec}`;
                startTime--;
            }

        }
        const timer = setInterval(showCountdown, 1000);
        //실행된 카운트다운은 삭제하여 setHour, setMin을 초기화시킨다.    
        noteCD.remove();
    }

    //입력받은 todo content를 localstorage에 저장
    const todoContent = todoInput.value;
    const noteObj = {
        content: todoContent,
        id: todos_LS.length + 1,
    }
    todos_LS.push(noteObj);
    saveTodoContent();

    //LS에 저장된 todo content를 소환 + 각 노트에 id 부여
    const loadedContent = localStorage.getItem('todos');
    const loadedTodo = JSON.parse(loadedContent);
    const noteIndex = loadedTodo[loadedTodo.length-1];
    const noteId = noteIndex["id"]; 
    
    function giveId(){        
        if(loadedContent !== null) {
            newNote.setAttribute("id", noteId);
        }
    }

    function loadTodoContent() {
        const noteContent = noteIndex["content"];
        todoText.innerText = '⭐ '+noteContent;
    }

    giveId();
    loadTodoContent();
    todoInput.value = "";

    //deleteNote 함수는 밖으로 꺼내도 되지 않나?
    //delNoteBtn 클릭 시, 해당 노트 삭제(LS에서도)  
    function deleteNote(){
        body.removeChild(newNote);
    
        let parentSection = delNoteBtn.closest("section");
        let parentId = parentSection.id;
        let todos_LSIndex = parentId - 1;
        todos_LS.splice(todos_LSIndex, 1);
        saveTodoContent();
    }
    delNoteBtn.addEventListener('click', deleteNote);

    function finishNote(){
        body.removeChild(newNote);

        let parentSection = finishBtn.closest("section");
        let parentId = parentSection.id;
        let todos_LSIndex = parentId - 1;
        let finishedTodo = todos_LS.splice(todos_LSIndex, 1);
        saveTodoContent();
    
        finishedTodos_LS.push(finishedTodo);
        saveFinTodo();

        const newFinIndex = finishedTodos_LS[finishedTodos_LS.length -1];
        //왜 배열에 인덱스가 생겼지? 객체라서 그런가? 확인할 것... 그거때매 [i]해줘야함
        const newFinContent = newFinIndex[0]["content"];
        function updateFinList(text) {
            const newLi = document.createElement("li");
            finList.appendChild(newLi);
            newLi.innerText = `✔ ${text}`;
        }
        updateFinList(newFinContent);
        
    }
    finishBtn.addEventListener('click', finishNote);

    //드래그 앤 드롭
    newNote.setAttribute("draggable", true);
    body.addEventListener('dragover', dragover);
    newNote.addEventListener('mousedown', handleDragndrop);

    function dragover(e) {
        e.preventDefault();
    }

    function handleDragndrop(e) {
        const clickedX = e.offsetX;
        const clickedY = e.offsetY;

        newNote.addEventListener('dragend', drop);

        function drop(e) {
            const droppedX = e.clientX;
            const droppedY = e.clientY;
    
            newNote.style.left = (droppedX - clickedX) + 'px';
            newNote.style.top = (droppedY - clickedY) +  'px';
        }
    }

};


createNoteBtn.addEventListener('click', createNote);
todoInput.addEventListener('submit', event=> {
    event.preventDefault();
})



// init 함수부터 시작해서 거꾸로 생각해보자. 새로고침해도 날아지 않도록
