import axios from 'axios';
import firebase from 'firebase';


export default class Search {
    constructor(query) {
        this.query = query;
        this.result;
    }

    async getResults() {
        try {
            //const res = await axios.get(`https://the-album-e3cc7.firebaseio.com/Album.json`);
            const res = firebase.database().ref('Album');
            await res.once('value').then((snapshot) => { this.result = snapshot.val() });
            //this.result = res.data;
            //console.log(this.result);

        } catch(err) {

            console.log(err);
        }
    }
}

