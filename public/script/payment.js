function pay() {
    var valid = true;
    // card number validation
    var cardno = document.getElementById("card-num").value;
    if(/^(?:4[0-9]{12}(?:[0-9]{3})?)$/.test(cardno) || cardno.length < 12 || isNaN(cardno)){
        alert("קיימת שגיאה במספר הכרטיס");
        valid = false;
    }
    // date validate
    var exp = document.getElementById("exp").value;
    if(!/^(0[1-9]|1[0-2])\/\d{2}$/.test(exp)){
        alert("קיימת שגיאה בתוקף הכרטיס");
        valid = false;
    }
    var cvv = document.getElementById("cvv").value;
    if(cvv.length < 3 || isNaN(cvv)){
        alert("cvv שגוי");
        valid = false;
    }

    if(valid){
        document.getElementById("thank-msg").style.display = "block";
        document.getElementById("card-body").style.display = "none";
        document.getElementById("text-center").style.display = "none";
    }
}