
document.addEventListener("DOMContentLoaded",()=>{

  const products = [
        { id: 1, name: "Product 1", price: 29.99 },
        { id: 2, name: "Product 2", price: 19.99 },
        { id: 3, name: "Product 3", price: 59.999 },
      ];

  let cart = [];
  const productList = document.querySelector("#product-list")
  const cartItems = document.querySelector("#cart-items")
  const emptyCartMessage =  document.querySelector("#empty-cart")
  const cartTotalDisplay = document.querySelector("#cart-total")
  const totalPriceDisplay = document.querySelector("#total-price")
  const checkoutButton = document.querySelector("#checkout-btn")
  
  products.forEach(product => {
    let productDiv = document.createElement('div');
    productDiv.classList.add('product');
    productDiv.innerHTML = `<span>${product.name} - $${product.price}</span>
    <button buttonId ="${product.id}" >Add</button>`
    productList.appendChild(productDiv);
  })

  productList.addEventListener('click',(e)=>
  {
    if(e.target.tagName=="BUTTON")
    {
      e.stopPropagation();
      const productId = parseInt(e.target.getAttribute("buttonId"));

      // const item = products.find(product => product.id===productId);
      // another way
      const [item] = products.filter(product => 
        product.id === productId);
      addToCart(item);

    }

  })

  function addToCart(product){
    cart.push(product);
    renderCart();
  }

  function renderCart(){
    cartItems.innerHTML = ""; // this is important
    if(cart.length>0)
    {
      emptyCartMessage.classList.add("hidden");
      cartTotalDisplay.classList.remove("hidden");

      let total=0;
      cart.forEach((product)=>{
        total += product.price;

        let item = document.createElement('div');
        item.classList.add('product');
        item.innerHTML = `<span>${product.name} - $${product.price}</span>`
        cartItems.appendChild(item);

        totalPriceDisplay.textContent = total;
      })
    }
    else
    {
      emptyCartMessage.classList.remove("hidden");
      cartTotalDisplay.classList.add("hidden");
    }
  }

  checkoutButton.addEventListener("click", () => {
    cart.length=0;
    emptyCartMessage.classList.remove("hidden");
    cartTotalDisplay.classList.add("hidden");
    // cartItems.innerHTML = "";
    renderCart();

  });

});
