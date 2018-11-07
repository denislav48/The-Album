firebase.initializeApp(config);
import Search from './models/Search';
import * as firebase from 'firebase';
import * as searchView from './views/searchView';
import * as eventsView from './views/eventsView';
import { elements } from './views/base';
import { config } from './config/firebase.config';
import * as getFormInputs from './views/uploadView';
import { writeNewPost } from './models/Upload';

//SEARCH CONTROLLER
const state = {};
export const controlSearch = async (page, val) => {
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
eventsView.events();