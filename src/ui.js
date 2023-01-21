class UI{

  constructor(){
    this.post = document.querySelector('#posts');
    this.titleInput = document.querySelector('#title');
    this.bodyInput = document.querySelector('#body');
    this.idInput = document.querySelector('#id');
    this.postSubmit = document.querySelector('.post-submit');
    this.forState = 'add';
  }

  showPosts(posts){
    let output="";

    posts.forEach(post => {
      output+=`
      <div class="card mb-3">
      <div class="card-body">
        <h4 class="card-title">${post.title}</h4>
        <p class="card-text">${post.body}</p>
        <a href="#" class="edit card-link" data-id="${post.id}">
        <i class="fa fa-pencil"></i>
        </a>
        <a href="#" class="delete card-link" data-id="${post.id}">
        <i class="fa fa-trash"></i>
      </a>
      </div>
    </div>
      `

    });
    this.post.innerHTML = output;
    
  }

  showAlerts(message, alertClass){
    this.clearAlert();

    // create div
    const div = document.createElement('div');
    div.className = alertClass;
    div.appendChild(document.createTextNode(message));

    // parent element
    const postContainer = document.querySelector('.postsContainer');

    // neighbour
    const posts = document.querySelector('#posts');

    // insert div
    postContainer.insertBefore(div,posts);

    setTimeout(() => {
      this.clearAlert()
    },3000);


  }

  clearAlert(){

    
    const alertDiv = document.querySelector('.alert');

    if(alertDiv){
      alertDiv.remove();
    }

  }

  clearFields(){

     this.bodyInput.value = "";
     this.titleInput.value = "";

  }
  clearId(){

     this.idInput.value = "";
  }

  fillForm(data){

      this.idInput.value = data.id;
      this.titleInput.value = data.title;
      this.bodyInput.value = data.body;

      this.createButton('edit');
  }

  createButton(type){

      if(document.querySelector('.post-cancel')){
        document.querySelector('.post-cancel').remove();
      }
      if(type === 'edit'){

        this.postSubmit.textContent = 'Update It';
        this.postSubmit.className = 'post-submit btn btn-warning';
        
        // cancel button
        const button = document.createElement('button');
        button.className = 'post-cancel btn btn-block btn-light mt-3';
        button.appendChild(document.createTextNode('Cancel Edit'));

        // Parent
        const form = document.querySelector('.card-form');
        
        // beforeElement
        const formEnd = document.querySelector('.form-end');

        form.insertBefore(button,formEnd);


      }else{

        this.postSubmit.textContent = 'Post It';
        this.postSubmit.className = 'post-submit btn btn-primary';

        if(document.querySelector('.post-cancel')){
          document.querySelector('.post-cancel').remove();
        }

        this.clearFields();
        this.clearId();

      }
  }
}

export const ui = new UI();