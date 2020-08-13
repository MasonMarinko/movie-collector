async function newMovieFormHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('input[name="post-title"]').value.trim();
    const post_url = document.querySelector('input[name="post-url"]').value.trim();
    const director = document.querySelector('input[name="post-director"]').value.trim();
    const actors = document.querySelector('input[name="post-actors"]').value.trim();
  
    const response = await fetch(`/api/movies`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        post_url,
        director,
        actors
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }

  async function newBookFormHandler(event) {
    event.preventDefault();
  
    const book_title = document.querySelector('input[name="post-booktitle"]').value;
    const post_url = document.querySelector('input[name="post-bookurl"]').value;
    const alt_title = document.querySelector('input[name="post-alttitle"]').value.trim();
    const author = document.querySelector('input[name="post-author"]').value.trim();
  
    const response = await fetch(`/api/books`, {
      method: 'POST',
      body: JSON.stringify({
        book_title,
        post_url,
        alt_title,
        author
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('.new-post-form-movie').addEventListener('submit', newMovieFormHandler);
  document.querySelector('.new-post-form-book').addEventListener('submit', newBookFormHandler);