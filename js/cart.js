
const cartIcon=document.getElementById('cartIcon');
const cartPaper=document.getElementById('cartPaper');
const cartList=document.getElementById('cartList');
const cartTotal=document.getElementById('cartTotal');
const cartBadge=document.getElementById('cartBadge');

let cart=JSON.parse(localStorage.getItem('lc_cart')||'[]');

function saveCart(){localStorage.setItem('lc_cart',JSON.stringify(cart));}

function renderCart(){
  cartList.innerHTML='';
  let kg=0,price=0;
  cart.forEach(item=>{
    const li=document.createElement('li');
    li.innerHTML=`<span>${item.name} ${item.kg} kg</span><span>ETB ${(item.kg*2500).toFixed(0)}</span>`;
    cartList.appendChild(li);
    kg+=item.kg;
    price+=item.kg*2500;
  });
  cartTotal.textContent=`${kg.toFixed(1)} kg – ETB ${price.toFixed(0)}`;
  cartBadge.textContent=kg.toFixed(1);
}

cartIcon.addEventListener('click',()=>cartPaper.classList.toggle('show'));
document.addEventListener('click',e=>{
  if(!cartIcon.contains(e.target)) cartPaper.classList.remove('show');
});

function addToCart(name,kg){
  const exist=cart.find(i=>i.name===name);
  exist? exist.kg+=kg : cart.push({name,kg});
  saveCart(); renderCart();

  const toast=document.createElement('div');
  toast.className='toast'; toast.textContent=`${name} ${kg} kg added`;
  document.body.appendChild(toast);
  setTimeout(()=>toast.remove(),2000);
}

renderCart();
