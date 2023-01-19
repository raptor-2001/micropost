import {http} from './http'
import {ui} from './ui'


// DOM for post
document.addEventListener('DOMContentLoaded',getPosts);

// Get Post
function getPosts(){
  http.get('http://localhost:3000/posts')
  .then(data => ui.showPosts(data))
  .catch(err => console.log(err))
}

// DOM for submit post
const submitButton = document.querySelector('.post-submit');
submitButton.addEventListener('click',submitPost);




// Submit Post
function submitPost(){
  const title = document.querySelector('#title').value;
  const body = document.querySelector('#body').value;

  const data = {
    title: title,
    body: body
  }

  http.post('http://localhost:3000/posts',data)
  .then(data => 
      getPosts(),
      ui.showAlerts("Post added", "alert alert-success"),
      ui.clearFields()
    )
  .catch(err => console.log(err));
}

