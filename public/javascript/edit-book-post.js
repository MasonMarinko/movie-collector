async function editFormHandler(event) {
    event.preventDefault();

    const book_title = document.querySelector('input[name="post-booktitle"]').value.trim();
    const post_url = document.querySelector('input[name="post-bookurl"]').value.trim();
    const alt_title = document.querySelector('input[name="post-alttitle"]').value.trim();
    const author = document.querySelector('input[name="post-author"]').value.trim();


    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch(`/api/books/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            book_title,
            post_url,
            alt_title,
            author
        }),
        headers: {
            'Content-Type': 'application/json'
        },
    });

    if (response.ok) {
        document.location.replace('/dashboard/');
    } else {
        alert(response.statusText);
    };
}

document.querySelector('.edit-post-form-book').addEventListener('submit', editFormHandler);