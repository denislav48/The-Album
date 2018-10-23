import '../css/style.css';
import Search from './models/Search';

// import Recipe from './models/Recipe';
// import List from './models/List';
// import Likes from './models/Likes';
import * as searchView from './views/searchView';
// import * as recipeView from './views/recipeView';
// import * as listView from './views/listView';
// import * as likesView from './views/likesView';
import { elements } from './views/base';

// /** Global state of the app
//  * - Search object
//  * - Current recipe object
//  * - Shopping list object
//  * - Liked recipes
//  */
const state = {};

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
            results.forEach(pic => {
                if (pic.mainCategory === query) {
                    console.log(pic);
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

