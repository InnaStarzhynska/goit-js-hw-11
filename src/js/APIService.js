import axios from 'axios';
import { refs } from './refs';

const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '34728091-aad7c1a347ba4d65085b0c300';

export default class APIService {
    constructor() {
        this.page = 1,
        this.searchQuery = '';
    }

    resetPage() {
        this.page = 1
    }

    updatePage() {
        this.page += 1
    }

    updateSearchQuery() {
        this.searchQuery = refs.form.elements.searchQuery.value.trim();
    }

    async searchImages() {
       const response = await axios.get(`${BASE_URL}/?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`);
       return response
    }
}
