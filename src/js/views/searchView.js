import { elements } from './base';

export const getSelectValue = () => elements.searchCategory.value;

//Crate pagination buttons, one of them with class active
const createButton = (page) => {
    if (page === 1) {
        return `<button class="btn pagination-button active" type="button" value="${page}"">${page}</button>`
    } else {
        return `<button class="btn pagination-button" type="button" value="${page}"">${page}</button>`
    }
};

//Render pagination buttons
const renderButtons = (page, totalPhotos, photosPerPage) => {
    const pages = Math.ceil(totalPhotos / photosPerPage);

    let buttons = createButton(1);
    //If there is one page
    if (page === 1 && pages === 1) {
        //if there is only one button
        buttons = `${createButton(page)}`;

        //If there is more than one page
    } else if (page <= pages) {
        for (let i = 2; i <= pages; i += 1) {
            buttons += `${createButton(i)}`;
        }
    }

    elements.paginationNavigation.innerHTML = buttons;
}
//Photos rendering template
const renderPhoto = photo => {

    function isTitleLessThan20Symbols() {
        if (photo.title.length <= 20) {
            return photo.title;
        } else {
            return photo.title.split('').splice(0, 21).join('') + '...';
        }
    }
    if (photo) {
        const markup = `
            <div class="picFrame myImg">
                <ul class="picInfo list-inline mx-auto justify-content-center">
                    <li class="list-inline-item"><span class="date">${isTitleLessThan20Symbols()}</span></li>            
                </ul>
                <img class="renderedPics" src="${photo.downloadURL} alt="${photo.title}"> 
                <ul class="picInfo list-inline mx-auto justify-content-center">
                    <li class="list-inline-item">Posted by <span class="name">${photo.username}</span></li>
                    <li class="list-inline-item"><span class="date">${photo.date.split('T').splice(0, 1)}</span></li>            
                </ul>
             </div>
        `;

        elements.searchResPages.innerHTML += markup;
    } else {
        const empty = `
            <p class="error">No results found</p>
        `;

        elements.searchResPages.innerHTML = empty;
        elements.paginationNavigation.innerHTML = '';
    }
};

//Reder photos and buttons on the page
const renderResults = (photos, page = 1, photosPerPage = 10) => {
    const start = (page - 1) * photosPerPage,
        end = page * photosPerPage;

    //Render buttons only on new search
    if (page === 1) {
        renderButtons(page, photos.length, photosPerPage);
    }

    photos.slice(start, end).forEach(photo => renderPhoto(photo));
}

//Search by category and title
export const orderByCategory = (state, val, query, page) => {
    const results = state.search.result;
    let categoryResults = [];
    let value;

    if (val) {
        value = val.toLowerCase();
    }
    if (query !== 'All') {
        Object.keys(results).forEach(pic => {
            if (results[pic].category === query && (val ? (results[pic].title.toLowerCase().search(value) !== -1) : true)) {
                categoryResults.push(results[pic]);
            }
        });
    } else if (query === 'All') {
        Object.keys(results).forEach(pic => {
            if (val ? (results[pic].title.toLowerCase().search(value) !== -1) : true) {
                categoryResults.push(results[pic]);
            }
        });
    }

    categoryResults.reverse();
    
    if (categoryResults.length > 0) {
        renderResults(categoryResults, page);
        //If nothing meets search criteria
    } else {
        renderResults([null], page);
    }
}

