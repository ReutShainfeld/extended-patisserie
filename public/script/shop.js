var cart = [];
function filter(category) {
    const singleProducts = document.getElementsByClassName('single_product');

    for (let i = 0; i < singleProducts.length; i++) {
        const product = singleProducts[i];

        var productCat = product.getAttribute('data-category');
        if(category == "הכל"){
            product.style.display = "block";
        }else{
            if(category == productCat){
                product.style.display = "block";
            }else{
                product.style.display = "none"
            }
        }
        
    }

}

function openCart() {
    document.getElementById("myCart").style.width = "480px";
}
  
function closeCart() {
    document.getElementById("myCart").style.width = "0%";
}

function plus(item) {
    let sum = Number(document.getElementById("sum_products").innerHTML);
    sum+= 1;
    document.getElementById("sum_products").innerHTML = sum;
    addToCart(item);
}

function minus(item) {
    let sum = Number(document.getElementById("sum_products").innerHTML);
    if(sum != 0){
        sum-= 1;
        document.getElementById("sum_products").innerHTML = sum;
        removeCart(item)
    }
}

function addToCart(item) {
    let exist = false;
    if(cart.length == 0){
        cart.push(item);
        document.getElementById(item.id).innerHTML = item.qty; 
    }else{
        cart.forEach(element => {
            if(element.name == item.name){
                element.qty++;
                document.getElementById(item.id).innerHTML = element.qty;
                exist = true;
            }
        });
        if(!exist){
            cart.push(item);
            document.getElementById(item.id).innerHTML = item.qty;            
        }
    }
    console.log(cart);
    updateCart();
}

function removeCart(item) {

    for (let i = 0; i < cart.length; i++) {
        if(cart[i].name == item.name){
            if(cart[i].qty > 1){
                cart[i].qty--;
                document.getElementById(item.id).innerHTML = cart[i].qty;
            }else if(cart[i].qty == 1){
                cart.splice(i, 1);
                document.getElementById(item.id).innerHTML = 0;
            }           
        }
    }
    updateCart();
    console.log(cart);
}

function deleteRow(id, qty) {
    console.log(qty);
    let row = document.getElementById("tr"+id);
    let sum_product_header = Number(document.getElementById("sum_products").innerHTML);
    document.getElementById("sum_products").innerHTML = sum_product_header - qty;
    document.getElementById(id).innerHTML = "0";
    row.remove();
    for (let i = 0; i < cart.length; i++) {
        if(cart[i].id == id){
            cart.splice(i, 1);         
        }
    }
    updateCart();
    console.log(cart);
}

function updateCart() {
    let cart_rows = document.getElementById("table_cart");
    let htmlStrig = '';
    let sum = 0;
    cart_rows.innerHTML = htmlStrig;
    if(cart.length > 0){
        document.getElementById("empty_msg").style.display = "none";
        document.getElementById("payment").style.display = "block";    
        if(localStorage.getItem("connect") && localStorage.getItem("connect") != 0){
            document.getElementById("payment").disabled = false;
        }else{
            document.getElementById("payment").disabled = true;
            document.getElementById("connect_cart_msg").style.display = "block";
        }
        htmlStrig += '<tr>';
        htmlStrig += '<th>מספר מוצר</th>';
        htmlStrig += '<th>קטגוריה</th>';
        htmlStrig += '<th>שם</th>';      
        htmlStrig += '<th>מחיר</th>';
        htmlStrig += '<th>כמות</th>';
        htmlStrig += '<th>    </th>';
        htmlStrig += '</tr>';
        for (let i = 0; i < cart.length; i++) {
            sum += cart[i].price * cart[i].qty;
            htmlStrig += '<tr id="tr'+cart[i].id+'">';
            htmlStrig += '<td>'+cart[i].id+'</td>';
            htmlStrig += '<td>'+cart[i].category+'</td>';
            htmlStrig += '<td>'+cart[i].name+'</td>';
            htmlStrig += '<td>'+cart[i].price+'</td>';
            htmlStrig += '<td>'+cart[i].qty+'</td>';
            htmlStrig += '<td><button class="deleteFromCart" onclick="deleteRow('+cart[i].id+', '+cart[i].qty+')"><i class="fa fa-trash-o"></i></button></td>';
            htmlStrig += '</tr>';
        }
    }else{
        document.getElementById("summary").innerHTML = '';
        document.getElementById("empty_msg").style.display = "block";
        document.getElementById("payment").style.display = "none";
        document.getElementById("connect_cart_msg").style.display = "none";
    }
    document.getElementById("summary").innerHTML = sum+' ש"ח ';
    cart_rows.innerHTML = htmlStrig;
}