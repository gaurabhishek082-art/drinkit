const products=[
{id:1,name:"Fresh Apples",cat:"Fruits",price:120,unit:"1 kg",emoji:"🍎"},
{id:2,name:"Bananas",cat:"Fruits",price:55,unit:"1 dozen",emoji:"🍌"},
{id:3,name:"Potato Chips",cat:"Snacks",price:40,unit:"100 g",emoji:"🍟"},
{id:4,name:"Chocolate Bar",cat:"Snacks",price:60,unit:"50 g",emoji:"🍫"},
{id:5,name:"Orange Juice",cat:"Drinks",price:110,unit:"1 L",emoji:"🧃"},
{id:6,name:"Cola",cat:"Drinks",price:45,unit:"750 ml",emoji:"🥤"},
{id:7,name:"Basmati Rice",cat:"Grocery",price:180,unit:"1 kg",emoji:"🍚"},
{id:8,name:"Wheat Flour",cat:"Grocery",price:65,unit:"1 kg",emoji:"🌾"},
{id:9,name:"Cooking Oil",cat:"Grocery",price:145,unit:"1 L",emoji:"🫗"},
{id:10,name:"Shampoo",cat:"Personal Care",price:199,unit:"340 ml",emoji:"🧴"},
{id:11,name:"Toothpaste",cat:"Personal Care",price:95,unit:"150 g",emoji:"🪥"},
{id:12,name:"Cookies",cat:"Snacks",price:35,unit:"120 g",emoji:"🍪"}];
let cart=JSON.parse(localStorage.getItem("drinkitCart")||"[]"), current="All";
const grid=document.getElementById("grid");
function render(list=products){grid.innerHTML=list.map(p=>`<article class="card"><div class="pic">${p.emoji}</div><h3>${p.name}</h3><div class="meta">${p.unit} • ${p.cat}</div><div class="priceRow"><span class="price">₹${p.price}</span><button class="add" onclick="add(${p.id})">ADD +</button></div></article>`).join("");document.getElementById("resultText").textContent=`${list.length} items`}
function filterCat(cat,btn){current=cat;document.querySelectorAll(".cats button").forEach(b=>b.classList.remove("active"));btn.classList.add("active");applySearch()}
function applySearch(){let q=document.getElementById("search").value.toLowerCase();render(products.filter(p=>(current==="All"||p.cat===current)&&p.name.toLowerCase().includes(q)))}
document.getElementById("search").addEventListener("input",applySearch);
function add(id){let x=cart.find(i=>i.id===id);x?x.qty++:cart.push({id,qty:1});save();openCart()}
function change(id,d){let x=cart.find(i=>i.id===id);if(!x)return;x.qty+=d;if(x.qty<=0)cart=cart.filter(i=>i.id!==id);save()}
function save(){localStorage.setItem("drinkitCart",JSON.stringify(cart));renderCart()}
function renderCart(){let box=document.getElementById("cartItems");if(!cart.length){box.innerHTML='<p style="color:#777;text-align:center;margin-top:50px">Your cart is empty 🛒</p>'}else box.innerHTML=cart.map(i=>{let p=products.find(x=>x.id===i.id);return `<div class="cartItem"><div class="cartEmoji">${p.emoji}</div><div style="flex:1"><b>${p.name}</b><div class="meta">₹${p.price} × ${i.qty}</div><div class="qty"><button onclick="change(${p.id},-1)">−</button> ${i.qty} <button onclick="change(${p.id},1)">+</button></div></div><b>₹${p.price*i.qty}</b></div>`}).join("");let sub=cart.reduce((s,i)=>s+products.find(p=>p.id===i.id).price*i.qty,0);document.getElementById("subtotal").textContent=`₹${sub}`;document.getElementById("total").textContent=`₹${sub+(sub?20:0)}`;document.getElementById("cartCount").textContent=cart.reduce((s,i)=>s+i.qty,0)}
function openCart(){document.getElementById("drawer").classList.add("open");document.getElementById("overlay").classList.add("show");renderCart()}
function closeCart(){document.getElementById("drawer").classList.remove("open");document.getElementById("overlay").classList.remove("show")}
function checkout(){if(!cart.length)return alert("Cart is empty!");alert("Checkout demo: connect your payment/order backend here.");}
render();renderCart();