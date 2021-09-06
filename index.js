function displayLocalStorageCart() {
    const cart = getCart();
    for (const pd of cart) {
        displayProducts(pd.name, pd.quantity, pd.price);
    }
}


function addItem() {
    const pdName = document.getElementById('product');
    const pdPrice = document.getElementById('price');
    if (!pdName.value || !pdPrice.value) {
        alert('please fil up both field');
    } else {
        // console.log(pdName.value,' ',pdPrice.value)
        addToCart(pdName.value, pdPrice.value);
        location.reload();
        pdName.value = '';
        pdPrice.value = '';
    }
}

function displayProducts(name, quantity, price) {
    const ul = document.getElementById('all-products');
    const li = document.createElement('li');
    li.innerText = `Name: ${name} || Quantity: ${quantity} || Price: ${price}`;
    ul.appendChild(li);
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
        if (product['name'] == name) {
            product['price'] = price;
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


