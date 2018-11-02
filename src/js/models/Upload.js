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

  // Write the new post's data simultaneously in the Album list and the images post list.
  let updates = {};
  updates['Album/' + newPostKey] = postData;
  firebase.storage().ref().child('images/' + newPostKey).put(selectedFile).then(() => firebase.storage().ref().child('images/' + newPostKey).getDownloadURL()).then(snap => {
    postData['downloadURL'] = snap;
  }).then(() => {
    console.log('Uploaded a file!');
    firebase.database().ref().update(updates);
  })
}




