
import firebase from 'firebase';


export default class Search {
    constructor(query) {
        this.query = query;
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

