firebase.initializeApp(config);
import Search from './models/Search';
import * as firebase from 'firebase';
import * as searchView from './views/searchView';
import * as uploadView from './views/uploadView';
import { elements } from './views/base';
import { config } from './config/firebase.config';
import * as getFormInputs from './views/uploadView';
import { writeNewPost } from './models/Upload';

// let data = ref.on('value', function (snapshot) {
//     // Do whatever
//     return snapshot.val();
// });

const state = {};

/** 
 * SEARCH CONTROLLER
 */
//Order by Category
const controlSearch = async (page,val) => {
    // 1) Get query from view
    const query = searchView.getSelectValue();
    //console.log(query);
    state.search = new Search(query);
    try {
        await state.search.getResults();
        searchView.orderByCategory(state, val, query, page);
    } catch (err) {
        alert(err);
    }
}
controlSearch();

elements.searchInput.addEventListener('keyup', event => {
    event.stopPropagation();
    console.log(event.keyCode);
    if (event.keyCode === 13) {
        elements.serachButton.click();
    }
});

elements.searchCategory.addEventListener('change', e => {
    if (searchView.getSelectValue() !== 'choose') {
        e.preventDefault();
        elements.searchResPages.innerHTML = '';
        elements.paginationNavigation.innerHTML = '';
        controlSearch();
    }
});

let val;
elements.serachButton.addEventListener('click', e => {
    e.preventDefault();
    elements.searchResPages.innerHTML = '';
    elements.paginationNavigation.innerHTML = '';
    val = elements.searchInput.value;
    controlSearch(val);
    console.log(val);
});

//Upload COntroller

uploadView.send().addEventListener('click', () => {
    let title = getFormInputs.getTitle(),
        user = getFormInputs.getUserName(),
        category = getFormInputs.getCategory();
    if (title && user && category) {
        writeNewPost(title, user, category);
    } else {
        console.log('Missing field!')
    }
});

//Form control
elements.uploadPhotoButton.addEventListener('click', () => {
    elements.uploadForm.style.display = 'block';
});
elements.closeForm.addEventListener('click', () => {
    elements.uploadForm.style.display = 'none';
});

elements.formUploadButton.addEventListener('click', () => {
    elements.popupForm.style.display = 'none';
})

// const dbRef = firebase.database().ref().child('Album');
// dbRef.on('value', snap => console.log(snap.val()));

elements.navButtons.addEventListener('click', (e) => {
    if(e.target.classList.contains('pagination-button')){
    let page = e.target.value;
    elements.searchResPages.innerHTML = '';
    elements.paginationNavigation.innerHTML = '';
    controlSearch(page);
    }
});