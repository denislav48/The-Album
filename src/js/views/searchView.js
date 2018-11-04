import { elements } from './base';

export const getSelectValue = () => elements.searchCategory.value;

const createButton = (page) => `
      <button class="pagination-button" type="button" value="${page}"">${page}</button>
`;

 const  renderButtons = (page, totalPhotos, photosPerPage) => {
    const pages = Math.ceil(totalPhotos / photosPerPage);

    let button = createButton(1);
    console.log(page);
    console.log(pages);
    if (page === 1 && pages === 1) {
        // Only button to go to next page
        button = `
        ${createButton(page)}
        `;
    } else if (page <= pages) {
        // Both buttons
         for (let i = 2; i <= pages; i += 1) {
             button += `
             ${createButton(i)}
             `;
         }
    }
 elements.paginationNavigation.insertAdjacentHTML('beforeend', button);
}

const renderPhoto = photo => {
    const markup = `
        <div class="picFrame">
            <img class="renderedPics" src="${photo.downloadURL} alt="${photo.title}"> 
        </div>
    `;
    elements.searchResPages.insertAdjacentHTML('beforeend', markup);
};
export const renderResults = (photos, page = 1, photosPerPage = 10) => {
    const start = (page - 1) * photosPerPage,
        end = page * photosPerPage;
    photos.slice(start, end).forEach(renderPhoto);
    renderButtons(page, photos.length, photosPerPage);
} 

export const orderByCategory = (state,val,query,page) => {
    let results = state.search.result;
    console.log(results);
    let categoryResults = [];
    let value;
   
    if (val) {
        value = val.toLowerCase();
    }
    if (query && query !== 'All' && query !== 'choose') {
        Object.keys(results).forEach(pic => {
            if (results[pic].category === query && (val ? (results[pic].title.toLowerCase().search(value) !== -1) : true)) {
                categoryResults.push(results[pic]);
            }
        });
    } else if (query && query === 'All' || query === 'choose') {
        Object.keys(results).forEach(pic => {
            if (val ? (results[pic].title.toLowerCase().search(value) !== -1) : true) {
                categoryResults.push(results[pic]);
            }
        });
    }
  
    categoryResults.reverse();
    console.log(categoryResults.length);
    renderResults(categoryResults, page);
}

