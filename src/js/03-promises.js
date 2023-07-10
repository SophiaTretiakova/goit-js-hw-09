import Notiflix from 'notiflix';
const refs = {
  form: document.querySelector('.form'),
};

refs.form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  const {
    elements: { delay, step, amount },
  } = event.currentTarget;

  let delayValue = +delay.value;
  let stepValue = +step.value;
  let amountValue = +amount.value;
  for (let i = 1; i <= amountValue; i++) {
    createPromise(i, delayValue)
      .then(({ position, delay }) => {
        setTimeout(() => {
          Notiflix.Notify.success(
            `✅ Fulfilled promise ${position} in ${delay}ms`,
            { useIcon: false }
          );
        }, delay);
      })
      .catch(({ position, delay }) => {
        setTimeout(() => {
          Notiflix.Notify.failure(
            `❌ Rejected promise ${position} in ${delay}ms`,
            { useIcon: false }
          );
        }, delay);
      });
    delayValue += stepValue;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    return Promise.resolve({ position: position, delay: delay });
  } else {
    return Promise.reject({ position: position, delay: delay });
  }
}
