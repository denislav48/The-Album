import axios from 'axios';


export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResults() {
        try {
            const res = await axios.get(`https://the-album-e3cc7.firebaseio.com/Album.json`);
            this.result = res.data;
        } catch (error) {
            alert(error);
        }
    }
}
