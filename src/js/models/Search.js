
import firebase from 'firebase';


export default class Search {
    constructor(query) {
        this.query = query;
    }
    async getResults() {
        try {
            //reference to firebase datababse ALbum object
            const databaseReference = firebase.database().ref('Album');
            await databaseReference.once('value').then((snapshot) => { this.result = snapshot.val() });
        } catch(err) {
            console.log(err);
        }
    }
}

