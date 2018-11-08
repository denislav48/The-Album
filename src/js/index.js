firebase.initializeApp(config);
import Search from './models/Search';
import * as firebase from 'firebase';
import * as searchView from './views/searchView';
import * as eventsView from './views/eventsView';
import { config } from './config/firebase.config';

//SEARCH CONTROLLER
const state = {};
export const controlSearch = async (page, val) => {
    // 1) Get query from view
    const query = searchView.getSelectValue();
    state.search = new Search(query);
    try {
        await state.search.getResults();
        searchView.orderResult(state, val, query, page);
    } catch (err) {
        console.log(err);
    }
}
//Load all photos
controlSearch();
eventsView.events();