const cartInfo=document.querySelector(".cart-btn");
const cartMenu=document.querySelector(".cart-menu");
const cartButton=document.querySelectorAll(".cart-img");
const totalAmout=document.querySelector(".cart-total");
const clearCart=document.querySelector(".clear-cart");
const productView=document.querySelectorAll(".product-view");
const checkout=document.querySelector(".checkout");
let CartDataValues=[]
//show and Hide cart
function showCart(){
    cartInfo.addEventListener("click",()=>{
        cartMenu.classList.toggle("show-cart");
    })
}
let cartData=[]
//add Items to the cart
function addToCart(){
    cartButton.forEach(buttons=>{
            buttons.addEventListener("click",(e)=>{
                if(e.target.classList.contains("cart-img")){
            let imgPath=e.target.previousElementSibling.getAttribute("src");
            const items={};
            items.image=`${imgPath}`;
            items.name=`${e.target.parentElement.nextElementSibling.children[0].innerText}`;
            items.price=`${e.target.parentElement.nextElementSibling.children[1].innerText}`;
            items.finalPrice=parseFloat(items.price.slice(1).trim());
            const cartItemsData=document.createElement('div');
            cartItemsData.classList.add('single-product');
            cartItemsData.innerHTML=`
            <img class="cart-products" src="${items.image}" alt="cart-product"/>
                <div class="cart-details">
                    <span class="cart-title">
                        ${items.name}
                    </span>
                    <span class="cart-price">
                       ${items.price}
                    </span>
                </div>
                <img src="img/trash.svg" class="remove-cart" alt="Remove Cart"/>
            `;
            let inCart=false
            if(cartData.length>0){
                inCart=cartData.find(data=>data.name===e.target.parentElement.nextElementSibling.children[0].innerText.trim());
            }
            if(!inCart){
                cartData.unshift(items)
                buttons.style.display="none";
                cartMenu.insertBefore(cartItemsData,totalAmout);
                cartMenu.classList.add("show-cart");
                showTotal(cartData);
                CartDataValues=[...document.querySelectorAll(".single-product")];
            }else{
                buttons.style.display="none";
            }
        }
        })
    })}
function showTotal(cartData){
    let totalAmoutValue=0;
    cartData.map(data=>{
        return totalAmoutValue+=Number(data.finalPrice)
    })
    totalAmout.children[1].innerText=`$ ${totalAmoutValue}`;
    cartInfo.innerText=`${cartData.length} items- $ ${totalAmoutValue}`
}
clearCart.addEventListener("click",(e)=>{
        if(cartData.length>0){
            CartDataValues.forEach(data=>{
                cartMenu.removeChild(e.target.parentElement.parentElement.children[0]);
                cartData.pop();
                showTotal(cartData);
                cartButton.forEach(buttons=>{
                    buttons.style.display="block";
                })
        })
        CartDataValues=[];
    }
    })
checkout.addEventListener('click',(e)=>{
    alert("Shopping completed")
    if(cartData.length>0){
        CartDataValues.forEach(data=>{
            cartMenu.removeChild(e.target.parentElement.parentElement.children[0]);
            cartData.pop();
            showTotal(cartData);
            cartButton.forEach(buttons=>{
                buttons.style.display="block";
            })
    })
    CartDataValues=[];
}
})
cartMenu.addEventListener("click",(e)=>{
        if(e.target.classList.contains("remove-cart")){
            e.target.parentElement.parentElement.removeChild(e.target.parentElement);
            productView.forEach(product=>{
                if(product.children[1].children[0].innerText.trim()===e.target.parentElement.children[1].children[0].innerText.trim()){
                    product.children[0].children[1].style.display="block";
                    CartDataValues.pop();
                }
            })
            cartData=cartData.filter(data=>{
                return data.name!==e.target.parentElement.children[1].children[0].innerText.trim();
            })
            }
            if(cartData.length>0){
                showTotal(cartData);
            }else{
                totalAmout.children[1].innerText=`$ ${0}`;
                    cartInfo.innerText=`${0} items- $ ${0}`
            }
    })
showCart();
addToCart();