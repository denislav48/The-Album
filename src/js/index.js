firebase.initializeApp(config);
import Search from './models/Search';
import * as firebase from 'firebase';
import * as searchView from './views/searchView';
import * as uploadView from './views/uploadView';
import { elements } from './views/base';
import { config } from './config/firebase.config';
import * as getFormInputs from './views/uploadView';
import { writeNewPost } from './models/Upload';


//SEARCH CONTROLLER
const state = {};
const controlSearch = async (page, val) => {
    // 1) Get query from view
    const query = searchView.getSelectValue();
    state.search = new Search(query);
    try {
        await state.search.getResults();
        searchView.orderByCategory(state, val, query, page);
    } catch (err) {
        alert(err);
    }
}
controlSearch();

//Serach by title on Enter
elements.searchInput.addEventListener('keyup', event => {
    event.stopPropagation();
    console.log(event.keyCode);
    if (event.keyCode === 13) {
        elements.serachButton.click();
    }
});

//Search by category
elements.searchCategory.addEventListener('change', e => {
    e.preventDefault();
    elements.searchResPages.innerHTML = '';
    elements.paginationNavigation.innerHTML = '';
    controlSearch();
});

//Search by title
let val;
elements.serachButton.addEventListener('click', e => {
    e.preventDefault();
    elements.searchResPages.innerHTML = '';
    elements.paginationNavigation.innerHTML = '';
    val = elements.searchInput.value;
    controlSearch(undefined, val);
    console.log(val);
});

//Upload COntroller

uploadView.send().addEventListener('click', () => {
    let title = getFormInputs.getTitle(),
        user = getFormInputs.getUserName(),
        category = getFormInputs.getCategory();
    if (title && user && category) {
        writeNewPost(title, user, category);
        elements.uploadFormUserName.value = '';
        elements.uploadFormTitle.value = '';
        elements.uploadFormUploadFile.value = '';
        elements.uploadFormSelect.value = '';
    } else {
        console.log('Missing field!')
    }
});

//Form controls
elements.uploadPhotoButton.addEventListener('click', () => {
    elements.uploadForm.style.display = 'block';
    elements.uploadPhotoButton.style.display = 'none';
});

elements.closeForm.addEventListener('click', () => {
    elements.uploadForm.style.display = 'none';
    elements.uploadFormUserName.value = '';
    elements.uploadFormTitle.value = '';
    elements.uploadFormSelect.value = 'choose';
    elements.uploadPhotoButton.style.display = 'block';
});

elements.formUploadButton.addEventListener('click', () => {
    elements.popupForm.style.display = 'none';
})

//Pagination Control
let currenPage,
    lastPage;
elements.navButtons.addEventListener('click', (e) => {
    if (e.target.classList.contains('pagination-button')) {
        let page = e.target.value;

        currenPage = page;

        let activeEl = document.querySelectorAll('.nav-buttons button');
        console.log(activeEl);
        activeEl.forEach(el => {
            console.log(el);
            el.classList.remove('active');
            event.target.classList.add('active');
        });

        if (lastPage !== currenPage) {
            lastPage = currenPage;
            val = elements.searchInput.value;
            elements.searchResPages.innerHTML = '';
            if (currenPage === 1) {
                elements.paginationNavigation.innerHTML = '';
            }
            controlSearch(page, val);
        }
    }
});

