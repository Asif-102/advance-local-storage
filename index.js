function displayLocalStorageCart() {
    const cart = getCart();
    // for (const pd of cart) {
    //     displayProducts(pd.name, pd.quantity, pd.price);
    // }
    cart.map((pd, index)=>displayProducts(pd.name, pd.quantity, pd.price, index))
}


function addItem() {
    const pdName = document.getElementById('product');
    const pdPrice = document.getElementById('price');
    if (!pdName.value || !pdPrice.value) {
        alert('please fil up both field');
    } else {
        // console.log(pdName.value,' ',pdPrice.value)
        addToCart(pdName.value, pdPrice.value);
        document.getElementById('all-products').textContent='';
        displayLocalStorageCart();
        pdName.value = '';
        pdPrice.value = '';
    }
}

function displayProducts(name, quantity, price, index) {
    const ul = document.getElementById('all-products');
    const li = document.createElement('li');
    li.innerHTML = `Name: ${name} || Quantity: ${quantity} || Price: ${price} <button onclick="deleteProduct('${index}')">delete product</button>`;

    ul.appendChild(li);
}

//delete specefic product
function deleteProduct(index){
    const cart =getCart();
    cart.splice(index, 1);
    const cartToString = JSON.stringify(cart);
    localStorage.setItem('cart', cartToString);
}


function getCart() {
    const cart = localStorage.getItem('cart');
    let cartProduct;
    if (cart) {
        cartProduct = JSON.parse(cart);
    }
    else {
        cartProduct = [];
    }
    return cartProduct;
}

function addToCart(name, price) {
    const cart = getCart();
    let update = 0;
    for (const product of cart) {
        if (product['name'].toLowerCase() == name.toLowerCase()) {

            product['price'] =parseInt(product['price'])+ parseInt(price);
            product['quantity'] += 1;
            update = update + 1;
        }
    }
    if (update == 0) {
        const pd = {};
        pd['name'] = name;
        pd['quantity'] = 1;
        pd['price'] = price;
        cart.push(pd);
    }
    const cartToString = JSON.stringify(cart);
    localStorage.setItem('cart', cartToString);
}

function placeOrder() {
    document.getElementById('all-products').textContent = '';
    localStorage.removeItem('cart');
}

displayLocalStorageCart();


