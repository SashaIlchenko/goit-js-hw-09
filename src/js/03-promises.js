import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form')
form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  const amount = Number(form[2].value);
  const delay = Number(form[0].value);
  const step = Number(form[1].value);
  for (let i = 1; i <= amount; i += 1) {
    const delayStep = Number(delay + step * (i - 1));
    createPromise(i, delayStep).then(onSuccess).catch(onError);
  }
};

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
  return promise;
}

function onSuccess({ position, delay }) {
  Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
}
function onError({ position, delay }) {
  Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
}