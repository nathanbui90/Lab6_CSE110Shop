// Script.js
var cartCount = 0;
var cart = [];
storage = window.localStorage;

window.addEventListener('DOMContentLoaded', () => {
  // TODO
  if(!(localStorage.getItem("items")==true)){
    fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(data => localStorage.setItem("items", JSON.stringify(data)));
  }

  let items = localStorage.getItem("items");
  let previousCart = localStorage.getItem("prevCart")
  
  JSON.parse(items).forEach(productItem);
  
  if(previousCart){
    JSON.parse(previousCart).forEach(resetCart);
  }
});

function productItem(item){
  var product = `<product-item srcImg="${item.image}" altImg="${item.title}" title="${item.title}" price="${item.price}" id="${item.id}">`;
  document.getElementById("product-list").insertAdjacentHTML('beforeend', product);
}


function addTo(event){
  if(event.target.innerHTML == "Add to Cart"){
    alert('Added to Cart!');
    event.target.innerHTML = "Remove from Cart";
    cartCount++;
    document.getElementById("cart-count").innerHTML = cartCount;
    cart.push(event.target.name);
    localStorage.setItem("prevCart", JSON.stringify(cart));
  }
  else{
    event.target.innerHTML = "Add to Cart";
    cartCount--;
    document.getElementById("cart-count").innerHTML = cartCount;
    cart.splice(cart.indexOf(event.target.name), 1);
    localStorage.setItem("prevCart", JSON.stringify(cart));
  }
}

function resetCart(item){
  cartCount++;
  document.getElementById("cart-count").innerHTML = cartCount;
  cart.push(item);
  document.getElementById(item).shadowRoot.querySelector('button').innerHTML = "Remove from Cart";
}
