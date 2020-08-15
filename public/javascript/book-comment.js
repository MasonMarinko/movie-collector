// added book to bookCommentFormHandler
async function bookCommentFormHandler(event) {
    event.preventDefault();
    // added book to book_comment_text and to book-comment-body
    const book_comment_text = document.querySelector('textarea[name="book-comment-body"]').value.trim();
  
    const post_id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
    // added book_ to comment text
    if (book_comment_text) {
        const response = await fetch('/api/book/comments', {
          method: 'POST',
          body: JSON.stringify({
            post_id,
            book_comment_text
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
      
        if (response.ok) {
          document.location.reload();
        } else {
          alert(response.statusText);
        }
      }
  }
  // added book to comment-form and to commentFormHandler
  document.querySelector('.book-comment-form').addEventListener('submit', bookCommentFormHandler);