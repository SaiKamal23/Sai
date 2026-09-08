/* =========================================
   PRODUCT DATA
========================================= */

const products = [

    {
        id: 1,
        name: "Laptop",
        category: "electronics",
        price: 1000,
        icon: "💻"
    },

    {
        id: 2,
        name: "Smartphone",
        category: "electronics",
        price: 25000,
        icon: "📱"
    },

    {
        id: 3,
        name: "Headphones",
        category: "electronics",
        price: 3500,
        icon: "🎧"
    },

    {
        id: 4,
        name: "Smart Watch",
        category: "accessories",
        price: 5000,
        icon: "⌚"
    },

    {
        id: 5,
        name: "Backpack",
        category: "fashion",
        price: 1800,
        icon: "🎒"
    },

    {
        id: 6,
        name: "Running Shoes",
        category: "fashion",
        price: 3200,
        icon: "👟"
    },

    {
        id: 7,
        name: "Sunglasses",
        category: "accessories",
        price: 1500,
        icon: "🕶️"
    },

    {
        id: 8,
        name: "Camera",
        category: "electronics",
        price: 45000,
        icon: "📷"
    },

    {
        id: 9,
        name: "T-Shirt",
        category: "fashion",
        price: 900,
        icon: "👕"
    },

    {
        id: 10,
        name: "Wallet",
        category: "accessories",
        price: 1200,
        icon: "👛"
    }

];


/* =========================================
   CART
========================================= */

let cart = JSON.parse(
    localStorage.getItem("shoppingCart")
) || [];


/* =========================================
   DISPLAY PRODUCTS
========================================= */

function displayProducts(productList) {

    const container =
        document.getElementById("product-container");

    container.innerHTML = "";


    if (productList.length === 0) {

        container.innerHTML = `
            <p style="text-align:center; grid-column:1/-1;">
                No products found.
            </p>
        `;

        return;
    }


    productList.forEach(product => {

        const card = document.createElement("div");

        card.classList.add("product-card");


        card.innerHTML = `

            <div class="product-image">
                ${product.icon}
            </div>

            <div class="product-info">

                <h3>${product.name}</h3>

                <p class="category">
                    ${product.category}
                </p>

                <p class="price">
                    ₹${product.price.toLocaleString("en-IN")}
                </p>

                <button
                    class="add-btn"
                    onclick="addToCart(${product.id})"
                >
                    Add to Cart
                </button>

            </div>
        `;


        container.appendChild(card);

    });

}


/* =========================================
   ADD TO CART
========================================= */

function addToCart(productId) {

    const product = products.find(
        item => item.id === productId
    );


    const existingProduct = cart.find(
        item => item.id === productId
    );


    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({

            ...product,

            quantity: 1

        });

    }


    saveCart();

    updateCart();


    alert(`${product.name} added to cart!`);

}


/* =========================================
   UPDATE CART
========================================= */

function updateCart() {

    const cartItems =
        document.getElementById("cart-items");

    const cartCount =
        document.getElementById("cart-count");

    const cartTotal =
        document.getElementById("cart-total");


    cartItems.innerHTML = "";


    if (cart.length === 0) {

        cartItems.innerHTML = `

            <div class="empty-cart">

                <h3>Your cart is empty 🛒</h3>

                <p>
                    Add some products to your cart.
                </p>

            </div>

        `;

    }


    let total = 0;

    let totalItems = 0;


    cart.forEach(item => {

        total += item.price * item.quantity;

        totalItems += item.quantity;


        const cartItem =
            document.createElement("div");


        cartItem.classList.add("cart-item");


        cartItem.innerHTML = `

            <div class="cart-item-icon">
                ${item.icon}
            </div>

            <div class="cart-item-info">

                <h4>${item.name}</h4>

                <p class="cart-item-price">
                    ₹${item.price.toLocaleString("en-IN")}
                </p>


                <div class="quantity-controls">

                    <button
                        onclick="decreaseQuantity(${item.id})"
                    >
                        −
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        onclick="increaseQuantity(${item.id})"
                    >
                        +
                    </button>

                </div>


                <button
                    class="remove-btn"
                    onclick="removeFromCart(${item.id})"
                >
                    Remove
                </button>

            </div>
        `;


        cartItems.appendChild(cartItem);

    });


    cartCount.textContent = totalItems;


    cartTotal.textContent =
        total.toLocaleString("en-IN");

}


/* =========================================
   INCREASE QUANTITY
========================================= */

function increaseQuantity(productId) {

    const item = cart.find(
        item => item.id === productId
    );


    if (item) {

        item.quantity++;

    }


    saveCart();

    updateCart();

}


/* =========================================
   DECREASE QUANTITY
========================================= */

function decreaseQuantity(productId) {

    const item = cart.find(
        item => item.id === productId
    );


    if (!item) return;


    if (item.quantity > 1) {

        item.quantity--;

    } else {

        cart =
            cart.filter(item => item.id !== productId);

    }


    saveCart();

    updateCart();

}


/* =========================================
   REMOVE FROM CART
========================================= */

function removeFromCart(productId) {

    cart =
        cart.filter(item => item.id !== productId);


    saveCart();

    updateCart();

}


/* =========================================
   CLEAR CART
========================================= */

function clearCart() {

    if (cart.length === 0) {

        return;

    }


    const confirmClear =
        confirm("Are you sure you want to clear the cart?");


    if (confirmClear) {

        cart = [];

        saveCart();

        updateCart();

    }

}


/* =========================================
   SEARCH PRODUCTS
========================================= */

function searchProducts() {

    const searchValue =
        document
            .getElementById("search-input")
            .value
            .toLowerCase();


    const filteredProducts =
        products.filter(product =>

            product.name
                .toLowerCase()
                .includes(searchValue)

        );


    displayProducts(filteredProducts);

}


/* =========================================
   FILTER PRODUCTS
========================================= */

function filterProducts() {

    const category =
        document
            .getElementById("category-filter")
            .value;


    const searchValue =
        document
            .getElementById("search-input")
            .value
            .toLowerCase();


    let filteredProducts = products;


    if (category !== "all") {

        filteredProducts =
            filteredProducts.filter(

                product =>
                    product.category === category

            );

    }


    if (searchValue !== "") {

        filteredProducts =
            filteredProducts.filter(

                product =>
                    product.name
                        .toLowerCase()
                        .includes(searchValue)

            );

    }


    displayProducts(filteredProducts);

}


/* =========================================
   OPEN CART
========================================= */

function openCart() {

    document
        .getElementById("cart-sidebar")
        .classList.add("active");


    document
        .getElementById("cart-overlay")
        .classList.add("active");

}


/* =========================================
   CLOSE CART
========================================= */

function closeCart() {

    document
        .getElementById("cart-sidebar")
        .classList.remove("active");


    document
        .getElementById("cart-overlay")
        .classList.remove("active");

}


/* =========================================
   CHECKOUT
========================================= */

function checkout() {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;

    }


    let total = cart.reduce(

        (sum, item) =>
            sum + item.price * item.quantity,

        0

    );


    alert(

        `Order placed successfully! 🎉\n\n` +

        `Total Amount: ₹${total.toLocaleString("en-IN")}`

    );


    cart = [];

    saveCart();

    updateCart();

    closeCart();

}


/* =========================================
   LOCAL STORAGE
========================================= */

function saveCart() {

    localStorage.setItem(

        "shoppingCart",

        JSON.stringify(cart)

    );

}


/* =========================================
   INITIAL LOAD
========================================= */

displayProducts(products);

updateCart();