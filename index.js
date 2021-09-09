function displayLocalStorageCart() {
    const cart = getCart();
    // for (const pd of cart) {
    //     displayProducts(pd.name, pd.quantity, pd.price);
    // }
    cart.map((pd, index) => displayProducts(pd.name, pd.quantity, pd.price, pd.issue, index))
}


function addItem() {
    const pdName = document.getElementById('product');
    const pdPrice = document.getElementById('price');
    if (!pdName.value || !pdPrice.value) {
        alert('please fil up both field');
    } else {
        // console.log(pdName.value,' ',pdPrice.value)
        addToCart(pdName.value, pdPrice.value);
        document.getElementById('all-products').textContent = '';
        displayLocalStorageCart();
        pdName.value = '';
        pdPrice.value = '';
    }
}

//display list of products
function displayProducts(name, quantity, price, issue, index) {
    const ul = document.getElementById('all-products');
    const li = document.createElement('li');
    li.classList.add("pdList");
    li.innerHTML = `Issue: <b>${issue}</b> Name: ${name} || Quantity: ${quantity} || Price: ${price} <button onclick="deleteProduct('${index}')" class="delete-btn">delete product</button> <button class="add-btn" onclick="closeIssue('${index}')">close</button>`;

    ul.appendChild(li);
}

//close issue
function closeIssue(index){
    const cart = getCart();
    console.log(cart[index]);
    cart[index]['issue'] = 'closed';
    const cartToString = JSON.stringify(cart);
    localStorage.setItem('cart', cartToString);
    document.getElementById('all-products').textContent = '';
    displayLocalStorageCart();
}

//delete specefic product
function deleteProduct(index) {
    const cart = getCart();
    cart.splice(index, 1);
    const cartToString = JSON.stringify(cart);
    localStorage.setItem('cart', cartToString);
    document.getElementById('all-products').textContent = '';
    displayLocalStorageCart();

    document.getElementById('delete').innerText = 'Product Deleted Successfully';
    setTimeout(() => {
        document.getElementById('delete').innerText = '';
    }, 2000)
}

//get data from local storage
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

// add new product and update similar product
function addToCart(name, price) {
    const cart = getCart();
    let update = 0;
    for (const product of cart) {
        if (product['name'].toLowerCase() == name.toLowerCase()) {

            product['price'] = parseInt(product['price']) + parseInt(price);
            product['quantity'] += 1;
            update = update + 1;

            document.getElementById('add-update').innerText = 'Product Updated Successfully';
            setTimeout(() => {
                document.getElementById('add-update').innerText = '';
            }, 2000)
        }
    }
    if (update == 0) {
        const pd = {};
        pd['name'] = name;
        pd['quantity'] = 1;
        pd['price'] = price;
        pd['issue'] = 'open';
        cart.push(pd);

        document.getElementById('add-update').innerText = 'New Product added successfully';
        setTimeout(() => {
            document.getElementById('add-update').innerText = '';
        }, 2000)
    }
    const cartToString = JSON.stringify(cart);
    localStorage.setItem('cart', cartToString);
}

//clear local storage
function placeOrder() {
    document.getElementById('all-products').textContent = '';
    localStorage.removeItem('cart');

    document.getElementById('complete-order').innerText = 'Your Order Completed Successfully...';
    setTimeout(() => {
        document.getElementById('complete-order').innerText = '';
    }, 2000)
}

displayLocalStorageCart();


