function register() {
    var valid = true;
    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var phone = document.getElementById('phone').value;

    if (firstName.length < 1 || /[0-9]/.test(firstName)) {
        alert("שם פרטי לא תקין");
        valid = false;
    }
    if (lastName.length < 1 || /[0-9]/.test(lastName)) {
        alert("שם משפחה לא תקין");
        valid = false;
    }
    if (email.length < 1 || !/^\S+@\S+\.\S+$/.test(email)) {
        alert("כתובת אמייל לא תקינה");
        valid = false;
    }
    if (!/^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/.test(phone)) {
        alert("מספר טלפון לא תקין");
        valid = false;
    }

    if (valid) {
        fetch('http://localhost:3000/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ firstName, lastName, email, password, phone })
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'User registered successfully') {
                alert('Registration successful!');
                localStorage.setItem("connect", true);
                localStorage.setItem("fullName", firstName + ' ' + lastName);
                document.getElementById('welcome_msg').style.display = "block";
            } else {
                alert(data.message);
            }
        })
        .catch(error => console.error('Error:', error));
    }
}

function login() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Login successful') {
            alert('Login successful');
            localStorage.setItem("connect", true);
            localStorage.setItem("fullName", data.fullName);
            window.location.href = "/html/shop.html";
        } else {
            alert(data.message);
        }
    })
    .catch(error => console.error('Error:', error));
}
