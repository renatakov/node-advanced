document.querySelector('form').addEventListener('submit', function(e){
    e.preventDefault();
    // console.dir(e.target)
    const pass = e.target.elements.pass.value.trim().toLowerCase();
    const username = e.target.elements.username.value.trim().toLowerCase();
    console.log(pass, username);
    
    fetch(`http://localhost:3000/form/get-form-data?n=${username}&p=${pass}`, {
        method : "GET"
    })
        .then(data => data.json())
        .then(data => console.log(data));
    
});