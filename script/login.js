function register() {
    var valid = true;
    // name validation
    var firstName = document.getElementById("firstName").value;
    if (firstName.length < 1 || /[0-9]/.test(firstName)) {
        alert("שם פרטי לא תקין");
        valid = false;
    }
    var lastName = document.getElementById("lastName").value;
    if (lastName.length < 1 || /[0-9]/.test(lastName)) {
        alert("שם משפחה לא תקין");
        valid = false;
    }
    //email validation
    var mail = document.getElementById("email").value;
    if(mail.length < 1 || !/^\S+@\S+\.\S+$/.test(mail)){
        alert("כתובת אמייל לא תקינה");
        valid = false;
    }
    //phone validation
    var phone = document.getElementById('phone').value;
    if(!/^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/.test(phone)){
        alert("מספר טלפון לא תקין");
        valid = false;
    }
    var fullName = firstName+' '+lastName;
    if(valid){
        localStorage.setItem("connect", true);
        localStorage.setItem("fullName", fullName);
        document.getElementById('welcome_msg').style.display = "block";
    }

    if (valid) {
        fetch('http://localhost:3000/register', {
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

    fetch('http://localhost:3000/login', {
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
            window.location.href = "front-page.html"; // Redirect after login
        } else {
            alert(data.message);
        }
    })
    .catch(error => console.error('Error:', error));
}
