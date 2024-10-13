document.querySelector('form').addEventListener('submit', function(e){
    e.preventDefault();
    // console.dir(e.target)
    const pass = e.target.elements.pass.value.trim().toLowerCase();
    const username = e.target.elements.username.value.trim().toLowerCase();
    console.log(pass, username);
    
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    const data = new URLSearchParams();
    data.append('username1', username);
    data.append('pass', pass);

    fetch('/form/post-form-data', {
        method: 'POST',
        headers: headers,
        body: data
    })
    .then(data => data.json())
    .then(data => console.log(data));
    
    
});