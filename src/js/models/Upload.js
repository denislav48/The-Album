import * as firebase from 'firebase';
export const writeNewPost = (title, username, category) => {
    // A post entry.
    const postData = {
      title: title,
      date: new Date(),
      username: username,
      category: category,
    };
  
    // Get a key for a new Post.
    const newPostKey = firebase.database().ref().child('Album').push().key;
  
    // Write the new post's data simultaneously in the posts list and the user's post list.
    let updates = {};
    updates['Album/' + newPostKey] = postData;
    //updates['/user-posts/' + uid + '/' + newPostKey] = postData;
  
    return firebase.database().ref().update(updates);
  }
 