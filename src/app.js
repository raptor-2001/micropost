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
  .then(_data => 
      getPosts(),
      ui.showAlerts("Post added", "alert alert-success"),
      ui.clearFields()
    )
  .catch(err => console.log(err));
}


// DOM for delete
const removePost = document.querySelector('#posts');
removePost.addEventListener('click',deletePost);

function deletePost(e){
  e.preventDefault();

  if(e.target.parentElement.classList.contains('delete')){
    const id = e.target.parentElement.dataset.id;
    if(confirm('Are you surely want to delete the post')){
      http.delete(`http://localhost:3000/posts/${id}`)
      .then(_data => 
          getPosts(),
          ui.showAlerts("Post deleted", "alert alert-success")
        )
      .catch(err => console.log(err))
    }
  };
}
