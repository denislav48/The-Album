firebase.initializeApp(config);
import Search from './models/Search';
import * as firebase from 'firebase';
import * as searchView from './views/searchView';
import * as uploadView from './views/uploadView';
import { elements } from './views/base';
import { config } from './config/firebase.config';
import * as getFormInputs from './views/uploadView';
import { writeNewPost } from './models/Upload';


/** 
 * SEARCH CONTROLLER
 */

 //Order by Category
const controlSearch = async () => {
    // 1) Get query from view
    const query = searchView.getInput();
    if (query && query !== 'All') {
        console.log(query);
        state.search = new Search(query);
        try {
            //Search for photos
            await state.search.getResults();
            let results = state.search.result;
            let categoryResults = [];
            Object.keys(results).forEach(pic => {
                if (results[pic].category === query) {
                    categoryResults.push(results[pic]);
                }
            });
            // console.log(categoryResults);
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
    } else if (query === 'All') {
        orderAllByDate();
    }
}


elements.searchCategory.addEventListener('change', e => {
    if(searchView.getInput() !== 'Choose a categorie..') {
    e.preventDefault();
    elements.searchResPages.innerHTML = '';
    controlSearch();
    }
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

//Order by last post
var datab = firebase.database().ref('Album');

function orderAllByDate() {
    let arr = [];
    let prom = new Promise((resolve, reject) => {
        datab.orderByChild('date').on('child_added', function (snap) {
            arr.push(snap.val());
            resolve('Success');
        })
    });
    prom.then(result => {

        arr.reverse();

        arr.forEach(el => {
            let storageReff = firebase.storage().ref(`images/${el.key}`);
            storageReff.getDownloadURL().then(function (url) {
                searchView.renderResults([url]);
            })
                .catch((err) => console.log(err));
        });

    });
}
orderAllByDate();


//Form control

elements.uploadPhotoButton.addEventListener('click', () => {
    elements.uploadForm.style.display = "block";
});
elements.closeForm.addEventListener('click', () => {
    elements.uploadForm.style.display = 'none';
});
