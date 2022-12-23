import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const inputDate = document.querySelector('#datetime-picker');
const button = document.querySelector('[data-start]');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

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
            Notify.warning('Please choose a date in the future');
        }
        console.log(selectedDates[0]);
    },

};
flatpickr(inputDate, options);

button.addEventListener('click', onBtnClick);
function onBtnClick() {
    setInterval(() => {
        const currentDate = new Date();
        const selectedDate = new Date(inputDate.value);
        const timer = convertMs(selectedDate - currentDate);
        const formatDate = addLeadingZero(timer);
        setDataTime(formatDate);
    }, 1000);
};
function setDataTime(date) {

    days.textContent = date.days;
    hours.textContent = date.hours;
    minutes.textContent = date.minutes;
    seconds.textContent = date.seconds;

};

function convertMs(ms) {

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;


    const days = Math.floor(ms / day);

    const hours = Math.floor((ms % day) / hour);

    const minutes = Math.floor(((ms % day) % hour) / minute);

    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
};

function addLeadingZero(value) {
    const formatingDate = {
        days: value.days.toString().padStart(2, '0'),
        hours: value.hours.toString().padStart(2, '0'),
        minutes: value.minutes.toString().padStart(2, '0'),
        seconds: value.seconds.toString().padStart(2, '0'),
    };
    return formatingDate;
};