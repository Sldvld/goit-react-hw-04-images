import axios from 'axios';

const API_KEY = '34227071-e179ea07013280bd68b79052b';
const BASE_URL = 'https://pixabay.com/api/';

export async function FetchImages(query, page) {
  return await axios
    .get(
      `${BASE_URL}?key=${API_KEY}&q=${query}&image_type=photo&
      orientation=horizontal&
      safesearch=true&per_page=12&page=${page}`
    )
    .then(response => response.data);
}
