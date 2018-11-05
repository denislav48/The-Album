import axios from 'axios';
import firebase from 'firebase';


export default class Search {
    constructor(query) {
        this.query = query;
        this.result;
    }

    async getResults() {
        try {
            const res = firebase.database().ref('Album');
            await res.once('value').then((snapshot) => { this.result = snapshot.val() });
        } catch(err) {
            console.log(err);
        }
    }
}

