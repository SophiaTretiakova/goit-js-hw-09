import Notiflix from 'notiflix';
const refs = {
  formEl: document.querySelector('.form'),
};

refs.formEl.addEventListener('submit', handlSub);

function handlSub(event) {
  event.preventDefault();
  const {
    elements: { delay, step, amount },
  } = event.currentTarget;
  let delayValue = +delay.value;
  let stepValue = +step.value;
  let amountValue = +amount.value;
  for (let i = 1; i <= amountValue; i++) {
    createPromise(i, delayValue);
    delayValue += stepValue;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(
          Notiflix.Notify.success(
            `✅ Fulfilled promise ${position} in ${delay}ms`,
            { useIcon: false }
          )
        );
      }, delay);
    });
  } else {
    return new Promise(reject => {
      setTimeout(
        () =>
          reject(
            Notiflix.Notify.failure(
              `❌ Rejected promise ${position} in ${delay}ms`,
              { useIcon: false }
            )
          ),
        delay
      );
    });
  }
}
