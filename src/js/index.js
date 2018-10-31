firebase.initializeApp(config);
import Search from './models/Search';
import * as firebase from 'firebase';
import * as searchView from './views/searchView';
import * as uploadView from './views/uploadView';
import { elements } from './views/base';
import { config } from './config/firebase.config';
import * as getFormInputs from './views/uploadView';
import { writeNewPost } from './models/Upload';

const state = {};
let onCurrent = true;

elements.searchCategory.addEventListener('change', () => {
    onCurrent = true;
    console.log(onCurrent);
});
/** 
 * SEARCH CONTROLLER
 */

//Order by Category
const controlSearch = async (val) => {
    // 1) Get query from view
    const query = searchView.getSelectValue();

    console.log(query);
    state.search = new Search(query);
    try {
        await state.search.getResults();
        let results = state.search.result;
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
        } else if (onCurrent && query && query === 'All' || query === 'choose') {
            Object.keys(results).forEach(pic => {
                if (val ? (results[pic].title.toLowerCase().search(value) !== -1) : true) {
                    categoryResults.push(results[pic]);
            
                }
            });
            onCurrent = false;
        }
        categoryResults.reverse();
        categoryResults.forEach(el => {
            let storageReff = firebase.storage().ref(`images/${el.key}`);
            storageReff.getDownloadURL().then(function (url) {
                searchView.renderResults([url]);
            });
        });
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
    if (searchView.getSelectValue() !== 'Choose a categorie..') {
        e.preventDefault();
        elements.searchResPages.innerHTML = '';
        controlSearch();
    }
});

let val;
elements.serachButton.addEventListener('click', e => {
    e.preventDefault();
    elements.searchResPages.innerHTML = '';
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
    elements.uploadForm.style.display = "block";
});
elements.closeForm.addEventListener('click', () => {
    elements.uploadForm.style.display = 'none';
});
