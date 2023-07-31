import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';
import 'slim-select/dist/slimselect.css';
import { fetchBreeds, fetchCatByBreed } from './js/cat-api';

Notiflix.Notify.init({
  timeout: 2000,
  position: 'left-top',
  width: '400px',
  fontSize: '16px',
  cssAnimationStyle: 'from-bottom',
});

const selectEl = document.querySelector('.breed-select');
const catInfoEl = document.querySelector('.cat-info');
const loaderEl = document.querySelector('.loader');

const errorMessage = 'Oops! Something went wrong! Try reloading the page!';

selectEl.addEventListener('change', onClickCatInfo);

fetchBreeds()
  .then(breeds => {
    renderSelect(breeds);
    selectEl.classList.remove('is-hidden');
    loaderEl.classList.add('is-hidden');
  })
  .catch(() => {
    loaderEl.classList.add('is-hidden');
    Notiflix.Notify.failure(errorMessage);
  });

function renderSelect(breeds) {
  const markup = breeds
    .map(({ name, id }) => {
      return `<option value="${id}">${name}</option>`;
    })
    .join();

  selectEl.innerHTML = markup;
  new SlimSelect({
    select: selectEl,
  });
}

function onClickCatInfo(event) {
  catInfoEl.style.opacity = 0.2;
  loaderEl.classList.remove('is-hidden');
  const breedId = event.currentTarget.value;
  fetchCatByBreed(breedId)
    .then(breeds => {
      catInfoEl.style.opacity = 1;
      renderCardCat(breeds);
      loaderEl.classList.add('is-hidden');
    })
    .catch(() => {
      loaderEl.classList.add('is-hidden');
      Notiflix.Notify.failure(errorMessage);
    });
}

function renderCardCat(breeds) {
  const markup = breeds
    .map(
      ({
        url,
        breeds: [{ name, temperament, description, wikipedia_url }],
      }) => {
        return `
      <img class="cat-info-cat-img" src="${url}" alt="cat ${name}" width="460px">
      <div class="cat-info-box">
        <h2 class="cat-info-tittle">${name}</h2>
        <p class="cat-info-description">${description}</p>
        <p class="cat-info-temperament"><span class="cat-info-subtitle">Temperament:</span> ${temperament}</p>
        <p class="cat-info-subtitle">Wikipedia: <a href="${wikipedia_url}" target="blank">${wikipedia_url}</a></p>
      </div>`;
      }
    )
    .join();

  catInfoEl.innerHTML = markup;
}
