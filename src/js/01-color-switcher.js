// Напиши скрипт, який після натискання кнопки «Start», раз на секунду змінює колір фону <body> на випадкове значення, використовуючи інлайн стиль.
// Натисканням на кнопку «Stop» зміна кольору фону повинна зупинятися.
// Враховуй, що на кнопку «Start» можна натиснути нескінченну кількість разів.
// Зроби так, щоб доки зміна теми запущена, кнопка «Start» була неактивною(disabled).
const refs = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
  body: document.querySelector('body'),
};
let timerId;
refs.startBtn.addEventListener('click', () => {
  refs.body.style.backgroundColor = getRandomHexColor();
  timerId = setColorChange();
  refs.startBtn.disabled = true;
  refs.stopBtn.disabled = false;
});

refs.stopBtn.addEventListener('click', () => {
  clearInterval(timerId);
  refs.startBtn.disabled = false;
  refs.stopBtn.disabled = true;
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

function setColorChange() {
  return setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}
