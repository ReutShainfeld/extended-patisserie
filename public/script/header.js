function checkRegister() {
    if(localStorage.getItem("connect") && localStorage.getItem("connect") != 0){
        document.getElementById("username").innerHTML = localStorage.getItem("fullName");
    }else{
        console.log(document.getElementById('shop_connect_msg'));
        localStorage["connect"] = 0;
        document.getElementById("logout").style.display = "none";
        if(document.getElementById('shop_connect_msg')){
            document.getElementById('shop_connect_msg').style.display = "block";
            document.getElementById("payment").disabled = true;
            document.getElementById("payment").style.color = "gray";

        }
    }
}

function user() {
    localStorage.removeItem("connect");
    localStorage.removeItem("fullName");
    let result = "front-page.html";
    setTimeout(window.location.href = result, 5000);
}