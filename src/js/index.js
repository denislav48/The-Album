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
let a = [];
/** 
 * SEARCH CONTROLLER
 */
//Order by Category
const controlSearch = async (val) => {
    // 1) Get query from view
    const query = searchView.getSelectValue();

    //console.log(query);
    state.search = new Search(query);
    try {
        await state.search.getResults();
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
        searchView.renderResults(categoryResults);
        // categoryResults.forEach((el, index, arr) => {
        //     // let storageReff = firebase.storage().ref(`images/${el.key}`);
        //     // storageReff.getDownloadURL().then(function (url) {
        //     //    searchView.renderResults([url]);
        //     // });
        //     arr[index] = 
        //    //console.log(el);
        // });
        // console.log(a);
      
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