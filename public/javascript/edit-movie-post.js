async function editFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="post-title"]').value.trim();
    const post_url = document.querySelector('input[name="post-url"]').value.trim();
    const director = document.querySelector('input[name="post-director"]').value.trim();
    const actors = document.querySelector('input[name="post-actors"]').value.trim();


    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch(`/api/movies/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title,
            post_url,
            director,
            actors
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

document.querySelector('.edit-post-form-movie').addEventListener('submit', editFormHandler);