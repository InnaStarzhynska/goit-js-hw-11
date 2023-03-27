import Notiflix from 'notiflix';
import renderingMarkup from './js/renderingMarkup';
import smoothScroll from './js/smoothScroll';
import { refs } from './js/refs';
import APIService from './js/APIService';

const searchService = new APIService;

refs.form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    refs.buttonLoadMore.classList.remove('visually-button');
    refs.linkToStartPage.classList.remove('visually-link');
    refs.galleryImages.innerHTML = '';
    searchService.resetPage();
    searchService.updateSearchQuery();
    
    try {
        searchService.searchImages().then(({ data }) => {
            renderingMarkup(data);
            smoothScroll();
            refs.buttonLoadMore.classList.add('visually-button');

            if (data.hits.length === 0) {
            Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
            return
            }
            
            if (this.page === 1) {
            Notiflix.Notify.info(`Hooray! We found ${response.data.totalHits} images.`)
            }
            
            if (searchService.page === Math.ceil(data.totalHits/40)) {
                Notiflix.Notify.warning('Were sorry, but youve reached the end of search results.');
                refs.buttonLoadMore.classList.remove('visually-button');
            }
            searchService.updatePage()
        }).catch(error => console.log(error));
    } catch (error) {
        console.log(error.message)
    }
    refs.linkToStartPage.classList.add('visually-link');
})

refs.buttonLoadMore.addEventListener('click', () => {
    try {
        searchService.searchImages().then(({ data }) => {
            renderingMarkup(data);
            smoothScroll();

            if (searchService.page === Math.ceil(data.totalHits/40)) {
                Notiflix.Notify.warning('Were sorry, but youve reached the end of search results.');
                refs.buttonLoadMore.classList.remove('visually-button');
            }

            searchService.updatePage()
        }).catch(error => console.log(error));
    } catch (error) {
        console.log(error.message)
    }
})

