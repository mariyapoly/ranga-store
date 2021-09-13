// function for loadProducts
const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};

// call loadProducts function
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product">
      <div class="cart-image">
        <img class="product-image" src=${image}></img>
      </div>
      <h3>${product.title}</h3>
      <p>Category: ${product.category}</p>
      <p>Price: $ ${product.price}</p>
      <div class="d-flex justify-content-between">
        <div class="rating">
          <i class="fas fa-star">
          </i> <i class="fas fa-star"></i>
          <i class="fas fa-star"></i> 
          <i class="fas fa-star-half-alt"></i>
          ${product.rating.rate}
        </div>
        <p class="total-rating"><i class="fas fa-user-check"></i> ${product.rating.count}</p>
      </div>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now">Add To Cart</button>
      <button  data-bs-toggle="modal" data-bs-target="#exampleModal" id="details-btn" onclick="productDetails(${product.id})">Details</button></div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};

// function for addToCart
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);
  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
  updateTotal();
};

// function for getInputValue
const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = (Math.round(total * 100) / 100).toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = (Math.round(value * 100) / 100).toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = (Math.round(grandTotal * 100) / 100).toFixed(2);
};

// product details data load function
const productDetails = (id) => {
  const url = `https://fakestoreapi.com/products/${id}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => productDetailsShow(data));
}

// display product details function
const productDetailsShow = (item) => {
  console.log(item)
  const productDetails = document.getElementById('product-details');
  productDetails.innerHTML = `
    <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="modal-product-img">
              <img src="${item.image}" alt="product-img">
            </div>
            <div class="modal-content">
              <h2>${item.title}</h2>
              <p>product category: ${item.category}</p>
              <p>product price: $ ${item.price}</p>
              <p>${item.description}</p>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="close-btn" data-bs-dismiss="modal">Close</button>
            <button type="button" class="change-btn">Save changes</button>
          </div>
        </div>
  `
}
