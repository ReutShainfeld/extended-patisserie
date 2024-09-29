function pay() {
    var valid = true;
    var cardno = document.getElementById("card-num").value;
    
    if (/^(?:4[0-9]{12}(?:[0-9]{3})?)$/.test(cardno) || cardno.length < 12 || isNaN(cardno)) {
        showCustomAlert("קיימת שגיאה במספר הכרטיס");
        valid = false;
    }
    
    var exp = document.getElementById("exp").value;
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(exp)) {
        showCustomAlert("קיימת שגיאה בתוקף הכרטיס");
        valid = false;
    }
    
    var cvv = document.getElementById("cvv").value;
    if (cvv.length < 3 || isNaN(cvv)) {
        showCustomAlert("cvv שגוי");
        valid = false;
    }

    if (valid) {
        document.getElementById("thank-msg").style.display = "block";
        document.getElementById("card-body").style.display = "none";
        document.getElementById("text-center").style.display = "none";

        const sum = localStorage.getItem('cartSum'); // Retrieve sum from local storage
        const userId = localStorage.getItem('userId'); // Retrieve userId from local storage
        
        const paymentData = {
            cardNo: cardno,
            exp: exp,
            cvv: cvv,
            amount: sum,
            userId: userId
        };

        fetch('/api/payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(paymentData),
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
    }
}

function showCustomAlert(message) {
    document.getElementById('custom-alert-message').textContent = message;
    document.getElementById('custom-alert').style.display = 'flex';
}

function closeCustomAlert() {
    document.getElementById('custom-alert').style.display = 'none';
}
