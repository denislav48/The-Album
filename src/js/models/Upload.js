import * as firebase from 'firebase';
import { elements } from '../views/base';

//take the photo file name
let selectedFile,
  selectedFileName;
elements.uploadFormUploadFile.addEventListener('change', (e) => {
  selectedFile = e.target.files[0];
  selectedFileName = selectedFile.name;
  console.log(selectedFileName);
});

export const writeNewPost = (title, username, category) => {

  // Get a key for a new Post.
  const newPostKey = firebase.database().ref().child('Album').push().key;

  const postData = {
    title: title,
    date: new Date(),
    username: username,
    category: category,
    key: newPostKey
  };

  // Writting the new post's data simultaneously in the Album list and in the images post list.
  let updates = {};

  //Create new post reference key with it's coresponding data
  updates['Album/' + newPostKey] = postData;
  
  //Create new reference key to firebase storage
  firebase.storage().ref().child('images/' + newPostKey)
    .put(selectedFile)
    //get the url of the postet photo
    .then(() => firebase.storage().ref().child('images/' + newPostKey).getDownloadURL())
    //add downloadURL property to the post data object
    .then(snap => {
      postData['downloadURL'] = snap;
    })
    //write postData to firebase database
    .then(() => {
      firebase.database().ref().update(updates);
    })
}




