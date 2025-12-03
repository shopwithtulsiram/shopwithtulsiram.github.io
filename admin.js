
(function(){
  var ADMIN_PASS='admin123';
  var loginSection=document.getElementById('login-section');
  var dashboard=document.getElementById('dashboard');
  var loginBtn=document.getElementById('login-btn');
  var logoutBtn=document.getElementById('logout');
  var passInput=document.getElementById('admin-pass');
  var addBtn=document.getElementById('add-product');
  var tableBody=document.querySelector('#products-table tbody');

  function getProducts(){ try{return JSON.parse(localStorage.getItem('swt_products')||'[]')}catch(e){return[]} }
  function setProducts(p){ localStorage.setItem('swt_products',JSON.stringify(p)); }

  loginBtn.onclick=function(){
    if(passInput.value===ADMIN_PASS){ sessionStorage.setItem('swt_admin','ok'); loginSection.classList.add('hidden'); dashboard.classList.remove('hidden'); renderTable(); } else { alert('Wrong password') }
  };
  logoutBtn.onclick=function(){ sessionStorage.removeItem('swt_admin'); dashboard.classList.add('hidden'); loginSection.classList.remove('hidden'); passInput.value=''; };

  function renderTable(){ var p=getProducts(); tableBody.innerHTML=''; p.forEach(function(item,idx){ var tr=document.createElement('tr'); tr.innerHTML='<td>'+item.name+'</td><td>₹'+item.price+'</td><td><button class="btn small" onclick="editProduct('+item.id+')">Edit</button> <button class="btn ghost" onclick="deleteProduct('+item.id+')">Delete</button></td>'; tableBody.appendChild(tr); }); }

  window.editProduct=function(id){ var p=getProducts(); var idx=p.findIndex(x=>x.id===id); if(idx===-1){ alert('Not found'); return; } var newName=prompt('Name:',p[idx].name); if(!newName) return; var newImg=prompt('Image URL:',p[idx].img); var newDesc=prompt('Description:',p[idx].desc); var newPrice=prompt('Price:',p[idx].price); p[idx].name=newName; if(newImg) p[idx].img=newImg; if(newDesc) p[idx].desc=newDesc; if(newPrice) p[idx].price=parseFloat(newPrice); setProducts(p); renderTable(); alert('Updated'); };

  window.deleteProduct=function(id){ if(!confirm('Delete product?')) return; var p=getProducts(); p=p.filter(x=>x.id!==id); setProducts(p); renderTable(); alert('Deleted'); };

  addBtn.onclick=function(){ var name=document.getElementById('p-name').value.trim(); var img=document.getElementById('p-img').value.trim(); var price=document.getElementById('p-price').value.trim(); var cat=document.getElementById('p-cat').value; var desc=document.getElementById('p-desc').value.trim(); if(!name||!img||!price){ alert('Please add name, image and price'); return; } var p=getProducts(); var obj={id:Date.now(),name:name,img:img,desc:desc,price:parseFloat(price),cat:cat}; p.push(obj); setProducts(p); document.getElementById('p-name').value=''; document.getElementById('p-img').value=''; document.getElementById('p-price').value=''; document.getElementById('p-desc').value=''; renderTable(); alert('Product added'); };

  if(sessionStorage.getItem('swt_admin')==='ok'){ loginSection.classList.add('hidden'); dashboard.classList.remove('hidden'); renderTable(); }
  window.onload=renderTable;
})();