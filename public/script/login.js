function register() {
    var valid = true;
    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var phone = document.getElementById('phone').value;

    if (firstName.length < 1 || /[0-9]/.test(firstName)) {
        showCustomAlert("שם פרטי לא תקין");
        valid = false;
    }
    if (lastName.length < 1 || /[0-9]/.test(lastName)) {
        showCustomAlert("שם משפחה לא תקין");
        valid = false;
    }
    if (email.length < 1 || !/^\S+@\S+\.\S+$/.test(email)) {
        showCustomAlert("כתובת אמייל לא תקינה");
        valid = false;
    }
    if (!/^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/.test(phone)) {
        showCustomAlert("מספר טלפון לא תקין");
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
                showCustomAlert("הרשמה הושלמה בהצלחה!");
                localStorage.setItem("connect", true);
                localStorage.setItem("fullName", firstName + ' ' + lastName);
                localStorage.setItem("userId", data.userId);
                console.log(localStorage.getItem("userId"));
                document.getElementById('welcome_msg').style.display = "block";
            } else {
                showCustomAlert(data.message);
            }
        })
        .catch(error => {
            showCustomAlert('An error occurred. Please try again.');
            console.error('Error:', error);
        });
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
        console.log("Response data: ", data); // Log the entire response to check if userId is returned
        
        if (data.message === 'Login successful') {
            showCustomAlert('התחברות הצליחה!');
            localStorage.setItem("connect", true);
            localStorage.setItem("fullName", data.fullName);
            localStorage.setItem("userId", data.userId); // Store userId in localStorage
            
            console.log("userId set in localStorage: ", localStorage.getItem("userId")); // Log the userId after setting it
            
            window.location.href = "/html/shop.html"; // Redirect to shop page
        } else {
            showCustomAlert(data.message);
        }
    })
    .catch(error => {
        showCustomAlert('An error occurred. Please try again.');
        console.error('Error:', error);
    });
}

function showCustomAlert(message) {
    document.getElementById('custom-alert-message').textContent = message;
    document.getElementById('custom-alert').style.display = 'flex';
}

function closeCustomAlert() {
    document.getElementById('custom-alert').style.display = 'none';
}
