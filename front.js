
/* front.js - improved premium features */
(function(){
  function getProducts(){ try{ return JSON.parse(localStorage.getItem('swt_products')||'[]') }catch(e){ return [] } }
  function seed(){ var p = getProducts(); if(p.length===0){ p = [
    {id:101,name:'Wireless Headphones',img:'https://images.unsplash.com/photo-1517336714731-489689fd1ca8',desc:'HD sound & noise cancellation',price:2599,cat:'electronics',rating:4.5},
    {id:102,name:'Smart Watch',img:'https://images.unsplash.com/photo-1512499617640-c2f999098c01',desc:'Fitness & notifications',price:3499,cat:'electronics',rating:4.2},
    {id:103,name:'Backpack',img:'https://images.unsplash.com/photo-1585386959984-a4155228c3f8',desc:'Durable travel backpack',price:1499,cat:'travel',rating:4.6},
    {id:104,name:'Bluetooth Speaker',img:'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',desc:'Powerful bass',price:1299,cat:'electronics',rating:4.1},
    {id:105,name:'Sunglasses',img:'https://images.unsplash.com/photo-1511920170033-f8396924c348',desc:'UV protected',price:899,cat:'fashion',rating:4.0}
  ]; localStorage.setItem('swt_products',JSON.stringify(p)); } return p; }

  function renderGrid(products){ var grid=document.getElementById('products-grid'); if(!grid) return; grid.innerHTML=''; products.forEach(function(pr){ var div=document.createElement('div'); div.className='product card'; div.innerHTML='<img src="'+pr.img+'"><div style="padding:12px"><h4>'+pr.name+'</h4><p class="muted">'+pr.desc+'</p><div class="price">₹'+pr.price+'</div><div class="product-actions"><button class="btn" onclick="addToCart('+pr.id+')">Add</button> <button class="btn ghost" onclick="viewProduct('+pr.id+')">View</button></div></div>'; grid.appendChild(div); }); }

  function renderDeals(){ var d=document.getElementById('deals-grid'); if(!d) return; var p=seed(); d.innerHTML=''; p.slice(0,4).forEach(function(pr){ var el=document.createElement('div'); el.className='deals-item'; el.innerHTML='<img src="'+pr.img+'" style="width:100%;height:100px;object-fit:cover;border-radius:8px"><h4>'+pr.name+'</h4><div class="price">₹'+pr.price+'</div>'; d.appendChild(el); }); }

  window.viewProduct=function(id){ location.href='product.html?id='+id; }
  window.addToCart=function(id){ var cart=JSON.parse(localStorage.getItem('swt_cart')||'[]'); var p=getProducts().find(x=>x.id===id); cart.push(p); localStorage.setItem('swt_cart',JSON.stringify(cart)); updateCartCount(); showToast(p.name+' added to cart'); }

  function updateCartCount(){ var cart=JSON.parse(localStorage.getItem('swt_cart')||'[]'); var el=document.getElementById('cart-count'); if(el) el.textContent=cart.length; }

  function applyFilters(){ var cat=document.getElementById('filter-category').value; var sort=document.getElementById('sort-by').value; var products=getProducts(); if(cat!=='all') products=products.filter(p=>p.cat===cat); if(sort==='price-asc') products.sort((a,b)=>a.price-b.price); if(sort==='price-desc') products.sort((a,b)=>b.price-a.price); renderGrid(products); }

  function showToast(msg){ var t=document.getElementById('toast'); if(!t) return; t.textContent=msg; t.classList.remove('hidden'); setTimeout(()=>t.classList.add('hidden'),2000); }

  /* Hero slider */
  function startSlider(){
    var slides=document.querySelectorAll('#hero-slider .slide'); if(!slides.length) return; var i=0; slides[i].classList.add('active');
    setInterval(function(){ slides[i].classList.remove('active'); i=(i+1)%slides.length; slides[i].classList.add('active'); },4000);
  }

  document.addEventListener('DOMContentLoaded',function(){ seed(); renderDeals(); applyFilters(); updateCartCount(); startSlider(); document.getElementById('filter-category').onchange=applyFilters; document.getElementById('sort-by').onchange=applyFilters; document.getElementById('search').oninput=function(e){ var q=e.target.value.toLowerCase(); var products=getProducts().filter(p=>p.name.toLowerCase().includes(q)||p.desc.toLowerCase().includes(q)); renderGrid(products); } });
})();