import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const inputDate = document.querySelector('#datetime-picker');
const button = document.querySelector('[data-start]');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');
// console.dir(text);
// let timerId = null;
button.disabled = true;
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,

    onClose(selectedDates) {

        if (selectedDates[0] > options.defaultDate) {
            button.disabled = false;
        } else {

            Notiflix.Notify.warning('Please choose a date in the future');
        }
        console.log(selectedDates[0]);
    },

};
flatpickr(inputDate, options);

button.addEventListener('click', onBtnClick);
function onBtnClick() {
    setInterval(() => {
        const selectedDate = new Date(inputDate.value);
        const timer = convertMs(selectedDate - options.defaultDate);
        setDataTime(timer);
    }, 1000);
}
function setDataTime(date) {
    days.textContent = date.days;
    hours.textContent = date.hours;
    minutes.textContent = date.minutes;
    seconds.textContent = date.seconds;
}

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
};