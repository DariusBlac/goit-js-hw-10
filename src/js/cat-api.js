import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_15EJj8L8xuocRWiOZFjhPYYpgoybwoLIIk0W8SHnQwwkqwQR0Uz2EXXg2s1RnUJy';

const BASE_URL = 'https://api.thecatapi.com/v1';

function fetchBreeds() {
  return axios.get(`${BASE_URL}/breeds`).then(response => {
    if (response.status !== 200) {
      throw new Error('Error message');
    }
    return response.data;
  });
}

function fetchCatByBreed(breedId) {
  return axios
    .get(`${BASE_URL}/images/search?breed_ids=${breedId}`)
    .then(response => {
      if (response.status !== 200) {
        throw new Error('Error message');
      }
      return response.data;
    });
}

export { fetchBreeds, fetchCatByBreed };
