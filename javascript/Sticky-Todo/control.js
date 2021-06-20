const openPanelBtn = document.getElementById("startAppBtn");
const panelBackground = document.querySelector(".control_background");
const controlPanel = document.querySelector(".controls_container");
const delBtn = document.querySelector(".deleteBtn");
const buttonColors = document.getElementsByClassName("colorBtn");


const SHOW = "show";

function showPanel() {
    controlPanel.classList.add(SHOW);
    panelBackground.classList.add(SHOW);
}

function closePanel(event) {
    event.preventDefault();

    controlPanel.classList.remove(SHOW);
    panelBackground.classList.remove(SHOW);
}

function changePanelcolor() {
    //여기서 this가 뭘 가르키는지 정확히 확인해볼 것.
    controlPanel.style.backgroundColor = this.style.backgroundColor;
}

openPanelBtn.addEventListener('click', showPanel);
delBtn.addEventListener('click', closePanel);
panelBackground.addEventListener('click', closePanel);

Array.from(buttonColors).forEach(color =>
    color.addEventListener("click", changePanelcolor)
  );