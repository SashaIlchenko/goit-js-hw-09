const body = document.querySelector('body');
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

startBtn.addEventListener('click', onStartBtnClick);
stopBtn.addEventListener('click', onStopBtnClick);
let timerId = null;

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onStartBtnClick() {
    startBtn.disabled = true;
    stopBtn.disabled = false;
    timerId = setInterval(() => {
        body.style.backgroundColor = getRandomHexColor();
    }, 1000);

}
function onStopBtnClick() {
    startBtn.disabled = false;
    stopBtn.disabled = true;
    clearInterval(timerId);
}
