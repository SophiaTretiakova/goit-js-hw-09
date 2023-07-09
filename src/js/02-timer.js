import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
import 'flatpickr/dist/flatpickr.min.css';

refs = {
  startBtn: document.querySelector('[data-start]'),
  timePicker: document.querySelector('#datetime-picker'),
  daysEl: document.querySelector('[data-days]'),
  hoursEl: document.querySelector('[data-hours]'),
  minutesEl: document.querySelector('[data-minutes]'),
  secondsEl: document.querySelector('[data-seconds]'),
};

let timerID;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (Date.parse(selectedDates[0]) < Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      return;
    } else {
      refs.startBtn.disabled = false;
    }
  },
};

flatpickr('#datetime-picker', options);

refs.startBtn.addEventListener('click', () => {
  timerID = setInterval(countDown, 1000);
  setTimeout(() => {
    clearInterval(timerID);
  }, Date.parse(refs.timePicker.value) - Date.now());
});

function countDown() {
  const time = convertMs(Date.parse(refs.timePicker.value) - Date.now());
  refs.daysEl.textContent = addLeadingZero(time.days.toString());
  refs.hoursEl.textContent = addLeadingZero(time.hours.toString());
  refs.minutesEl.textContent = addLeadingZero(time.minutes.toString());
  refs.secondsEl.textContent = addLeadingZero(time.seconds.toString());
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
}

function addLeadingZero(value) {
  if (value === '0' || value.length < 2) {
    return value.padStart(2, '0');
  }

  return value;
}
