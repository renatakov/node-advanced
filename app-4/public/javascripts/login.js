console.log('work');

document.addEventListener("DOMContentLoaded", function (event) {

    document.querySelector('.send-code').addEventListener('click', setCode);

    function setCode(event) {
        event.preventDefault();
        const email = document.querySelector('#email').value.trim().toLowerCase();
        console.log(email);

        const urlencoded = new URLSearchParams();
        urlencoded.append('email', email);

        fetch('/email/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: urlencoded,
        })
        .then(response => response.json())
        .then(response => {
            console.log(response);
            if (response) {
                document.querySelector('#email').setAttribute('readonly', true);
                document.querySelector('.code-block').classList.remove('d-none');
                document.querySelector('.send-code').textContent = 'Sent code';
                document.querySelector('.send-code').removeEventListener('click', setCode);
                document.querySelector('.send-code').setAttribute('type', 'submit');
                // document.querySelector('.send-code').addEventListener('click', sendCode);
            }
        });
        }
});