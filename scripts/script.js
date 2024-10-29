console.log("JavaScript is loaded");
document.addEventListener("DOMContentLoaded", function () {
  const products = [
    {
      name: "Essentials Men's Regular-Fit Long-Sleeve T-Shirt",
      price: 300,
      sale: false,
      img: "https://m.media-amazon.com/images/I/81GVn0iq6+L._AC_SX466_.jpg",
      ratings: 345,
      stock: "Only 8 items left",
    },
    {
      name: "The pixel designs co. T-Shirt",
      price: 1800,
      sale: true,
      img: "https://images-na.ssl-images-amazon.com/images/I/71Zohcg-WjL._SLDPMOBCAROUSELAUTOCROP288221_MCnd_AC_SR462,693_.jpg",
      ratings: 345,
      stock: "Only 29 items left",
      oldPrice: 3000,
    },
    {
      name: "Nova Apparel",
      price: 5000,
      sale: false,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQijLgRWfVfSk4-D-iHUVPGVguflpBqygcb0g&s",
      ratings: 345,
      stock: "Only 6 items left",
    },
    {
      name: "Hanes Men's Beefyt T-Shirt",
      price: 1000,
      sale: true,
      img: "https://content.jdmagicbox.com/quickquotes/images_main/glow-in-dark-sticker-t-shirt-2111349432-3ffc0wdz.jpg?impolicy=queryparam&im=Resize=(360,360),aspect=fit",
      ratings: 345,
      stock: "Let buy now",
      oldPrice: 2000,
    },
    {
      name: "Hanes Men's Beefyt T-Shirt",
      price: 1000,
      sale: true,
      img: "https://content.jdmagicbox.com/quickquotes/images_main/glow-in-dark-sticker-t-shirt-2111349432-3ffc0wdz.jpg?impolicy=queryparam&im=Resize=(360,360),aspect=fit",
      ratings: 345,
      stock: "Let buy now",
      oldPrice: 2000,
    },
  ];

  // Render products
  function renderProducts(products) {
    const productContainer = document.getElementById("productContainer");
    productContainer.innerHTML = "";

    products.forEach((product) => {
      const productDiv = document.createElement("div");
      productDiv.className = "product";
      productDiv.innerHTML = `
        <img alt="${product.name}" height="200" src="${
        product.img
      }" width="200" />
        <h3>${product.name}</h3>
        <div class="ratings">${'<i class="fas fa-star"></i>'.repeat(5)} (${
        product.ratings
      } ratings)</div>
        <div class="price">₹${product.price}.00${
        product.oldPrice
          ? `<span class="old-price"> ₹${product.oldPrice}.00 </span>`
          : ""
      }</div>
        <div class="stock"><i class="fas fa-bolt"></i> ${product.stock}</div>
        <button class="product-add-cart" data-product="${
          product.name
        }">ADD TO CART</button>
      `;

      productContainer.appendChild(productDiv);
    });

    attachAddToCartListeners();
  }

  // Initialize an empty cart
  let cart = [];

  // Function to add item to the cart
  function addToCart(productName) {
    const existingProduct = cart.find((item) => item.name === productName);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      const product = products.find((item) => item.name === productName);
      cart.push({ ...product, quantity: 1 });
    }

    updateCartCount();
    showCartItems();
  }

  // Function to remove item or reduce quantity
  function updateQuantity(productName, action) {
    const product = cart.find((item) => item.name === productName);
    if (action === "increase") {
      product.quantity += 1;
    } else if (action === "decrease" && product.quantity > 1) {
      product.quantity -= 1;
    } else if (action === "decrease" && product.quantity === 1) {
      cart = cart.filter((item) => item.name !== productName);
    }

    updateCartCount();
    showCartItems();
  }

  // Function to update cart count in the navbar
  function updateCartCount() {
    const cartCount = document.getElementById("cart-count");
    cartCount.textContent = cart.reduce(
      (total, item) => total + item.quantity,
      0
    );
  }

  function showCartItems() {
    const cartItemsList = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    cartItemsList.innerHTML = "";

    if (cart.length === 0) {
      cartItemsList.innerHTML = "<p>Cart is empty</p>";
      cartTotal.textContent = "Total: ₹0.00";
      return;
    }

    let totalPrice = 0;
    cart.forEach((item) => {
      const itemTotal = item.price * item.quantity;
      totalPrice += itemTotal;

      const li = document.createElement("li");
      li.className = "cart-item";
      li.innerHTML = `
        <img src="${item.img}" alt="${item.name}" width="50" height="50" />
        <div class="cart-item-details">
          <h4>${item.name}</h4>
          <p>Price: ₹${item.price}</p>
          <div class="quantity-controls">
            <button class="decrease-btn">-</button>
            <span>${item.quantity}</span>
            <button class="increase-btn">+</button>
          </div>
          <p>Total: ₹${itemTotal}</p>
        </div>
      `;
      cartItemsList.appendChild(li);

      // Add event listeners for increase and decrease buttons
      li.querySelector(".decrease-btn").addEventListener("click", () =>
        updateQuantity(item.name, "decrease")
      );
      li.querySelector(".increase-btn").addEventListener("click", () =>
        updateQuantity(item.name, "increase")
      );
    });

    cartTotal.textContent = `Total: ₹${totalPrice}.00`;
  }

  // Function to attach 'Add to Cart' button listeners
  function attachAddToCartListeners() {
    document.querySelectorAll(".product-add-cart").forEach((button) => {
      button.addEventListener("click", (event) => {
        const productName = event.target.getAttribute("data-product");
        addToCart(productName);

        const popup = document.getElementById("popup");
        popup.classList.add("show");

        setTimeout(() => {
          popup.classList.remove("show");
        }, 3000);
      });
    });
  }

  // Event listener for the cart icon to open the cart modal with animation
  document.getElementById("add-to-cart").addEventListener("click", () => {
    const cartModal = document.getElementById("cart-modal");
    cartModal.style.display = "block";
    cartModal.classList.add("slide-in");
    cartModal.classList.remove("slide-out");
  });

  // Event listener for closing the cart modal
  document.getElementById("close-cart").addEventListener("click", () => {
    const cartModal = document.getElementById("cart-modal");
    cartModal.classList.remove("slide-in");
    cartModal.classList.add("slide-out");
  });
  // Initial render of products
  renderProducts(products);
});
