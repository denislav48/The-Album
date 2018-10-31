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

/** 
 * SEARCH CONTROLLER
 */

 //Order by Category
const controlSearch = async (val) => {
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
                if (results[pic].category === query && (val ? results[pic].title === val : true)) {
                    categoryResults.push(results[pic]);
                }
            });
            // console.log(categoryResults);
            categoryResults.reverse();
            categoryResults.forEach(el => {
                console.log(el);
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
    if (searchView.getInput() !== 'Choose a categorie..') {
        e.preventDefault();
        elements.searchResPages.innerHTML = '';
        controlSearch();
    }
});

//

elements.serachButton.addEventListener('click', e => {
     e.preventDefault();
    elements.searchResPages.innerHTML = '';
    let val = elements.searchInput.value;
    controlSearch(val);
    console.log(val);
})

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

function orderAllByDate(a) {
    let arr = [];
    let res = [];
    let prom = new Promise((resolve, reject) => {
        datab.orderByChild('date').on('child_added', function (snap) {
            arr.push(snap.val());
            console.log(snap.val());
            resolve('Success');
        })
    });
    prom.then(() => {

        arr.reverse();

        // if (a) {
        //     let resultsRes = arr.filter(el => {
        //         el.title = a;
        //     });
        //     // resultsRes.forEach(el => )
        // }

        arr.forEach(el => {

            //let picTitle = el.title.split(' ');

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


//Search by title 

elements.serachByTitleButton.addEventListener('click', () => {
    //console.log("the button is clicked");
    const searchTitle = elements.searchByTitleInput.value;
    let searchTitleArr = searchTitle.split(' ');
    // console.log(searchTitleArr);

})