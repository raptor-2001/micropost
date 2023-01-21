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
  const id = document.querySelector('#id').value;

  const data = {
    title: title,
    body: body
  }


  if(title === '' || body === ''){

    ui.showAlerts('Please all add fields', 'alert alert-danger');
  }else{

    

    if(id === ''){
      // Create Post

        http.post('http://localhost:3000/posts',data)
      .then(_data => 
          getPosts(),
          ui.showAlerts("Post added", "alert alert-success"),
          ui.clearFields()
        )
      .catch(err => console.log(err));

    }else{
      // Update Post

        http.put(`http://localhost:3000/posts/${id}`,data)
        .then(_data => 
            getPosts(),
            ui.showAlerts("Post Updated", "alert alert-success"),
            ui.createButton('add')
          )
        .catch(err => console.log(err));

    }
  }

}


// DOM for delete
const removePost = document.querySelector('#posts');
removePost.addEventListener('click',deletePost);


// Delete Post
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


// DOM for edit
const postBtn = document.querySelector('#posts');
postBtn.addEventListener('click', editPost);

// Edit Post;

function editPost(e){

  if(e.target.parentElement.classList.contains('edit')){

    e.preventDefault();

    const id = e.target.parentElement.dataset.id;
    const body = e.target.parentElement.previousElementSibling.textContent;
    const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;

    const data = {
      id,
      title,
      body
    }

    ui.fillForm(data);

  }

}


// DOM for Cancel

const cancel = document.querySelector('.card-form');

cancel.addEventListener('click',cancelEdit);

function cancelEdit(e){
  
  e.preventDefault();

  if(e.target.classList.contains('post-cancel')){
    ui.createButton('cancel');
  }


}