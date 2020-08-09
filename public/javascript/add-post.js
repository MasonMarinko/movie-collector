async function newFormHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('input[name="post-title"]').value;
    const post_url = document.querySelector('input[name="post-url"]').value;
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
  
  document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);