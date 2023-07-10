import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  startBtn: document.querySelector('[data-start]'),
  timePicker: document.querySelector('#datetime-picker'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

refs.startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (Date.parse(selectedDates[0]) < Date.now()) {
      Notiflix.Notify.warning('Please select date in future');
      return;
    }
    refs.startBtn.disabled = false;
  },
};

flatpickr(refs.timePicker, options);

let timerId;

refs.startBtn.addEventListener('click', () => {
  timerId = setInterval(countDown, 1000);
  setTimeout(() => {
    clearInterval(timerId);
  }, Date.parse(refs.timePicker.value) - Date.now());
});

function countDown() {
  const time = convertMs(Date.parse(refs.timePicker.value) - Date.now());
  if (time.days.toString() === '-1') {
    return;
  }
  refs.days.textContent = addLeadingZero(time.days.toString());
  refs.hours.textContent = addLeadingZero(time.hours.toString());
  refs.minutes.textContent = addLeadingZero(time.minutes.toString());
  refs.seconds.textContent = addLeadingZero(time.seconds.toString());
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
  return value.padStart(2, '0');
}
