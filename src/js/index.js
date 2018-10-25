firebase.initializeApp(config);
import Search from './models/Search';
import * as firebase from 'firebase';
import * as searchView from './views/searchView';
import * as uploadView from './views/uploadView';
import { elements } from './views/base';
import { config } from './config/firebase.config';
import * as getFormInputs from './views/uploadView';
import { writeNewPost } from './models/Upload';

//filter
const state = {};
firebase.database().ref('Album/').once('value').then(function (snapshot) {
    let res = snapshot.val();
    for (let i in res) {
        if (res.hasOwnProperty(i) && res[i].category === 'nature') {

        }
    }
});

/** 
 * SEARCH CONTROLLER
 */
const controlSearch = async () => {
    // 1) Get query from view
    const query = searchView.getInput();
    if (query) {
        state.search = new Search(query);
        try {
            //Search for photos
            await state.search.getResults();
            let results = state.search.result;
            let categoryResults = [];
            Object.keys(results).forEach(pic => {
                if (results[pic].category === query) {
                    categoryResults.push(pic);
                }
            });
            searchView.renderResults(categoryResults);
        } catch (err) {
            alert(err);
        }
    }
}


elements.searchCategory.addEventListener('change', e => {
    e.preventDefault();
    elements.searchResPages.innerHTML = '';
    controlSearch();
});

//Upload COntroller

uploadView.send().addEventListener('click', () => {
    writeNewPost(getFormInputs.getTitle(), getFormInputs.getUserName(), getFormInputs.getCategory());
});

//Order by last post
var datab = firebase.database().ref('Album');
console.log(datab.toString());
function orderByLastAdded() {
    let arr = [];
    let prom = new Promise((resolve, reject) => {
        datab.orderByChild('date').on('child_added', function (snap, v) {
            arr.push(snap.val());
            resolve('Success');
        })
    });
    prom.then(result => {
        console.log(arr.reverse(), result)
    });
}
orderByLastAdded();
