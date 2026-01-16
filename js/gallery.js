
const grid=document.getElementById('galleryGrid');
const items=[...grid.querySelectorAll('.gallery-item')];
const filterBtns=document.querySelectorAll('.filter-btn');
const uploadInput=document.getElementById('uploadInput');
const uploadPreview=document.getElementById('uploadPreview');
let currentFilter='all';


filterBtns.forEach(btn=>{
  btn.addEventListener('click',()=>{
    currentFilter=btn.dataset.filter;
    filterBtns.forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    items.forEach(it=>{
      if(currentFilter==='all'||it.dataset.category===currentFilter) it.style.display='block';
      else it.style.display='none';
    });
  });
});


const lightbox=document.createElement('div'); lightbox.className='lightbox'; document.body.appendChild(lightbox);
items.forEach(item=>{
  item.addEventListener('click',()=>{
    const img=item.querySelector('img').cloneNode();
    lightbox.innerHTML=''; lightbox.appendChild(img);
    const close=document.createElement('span'); close.className='close'; close.innerHTML='&times;';
    lightbox.appendChild(close);
    lightbox.classList.add('show');
    close.addEventListener('click',()=>lightbox.classList.remove('show'));
  });
});
lightbox.addEventListener('click',e=>{if(e.target===lightbox) lightbox.classList.remove('show')});


uploadInput.addEventListener('change',e=>{
  const file=e.target.files[0];
  if(!file) return;
  const reader=new FileReader();
  reader.onload=()=>{
    uploadPreview.innerHTML=`<img src="${reader.result}" alt="Preview">`;
  };
  reader.readAsDataURL(file);
});
document.getElementById('uploadBtn').addEventListener('click',()=>{
  if(!uploadInput.files[0]) return alert('Choose an image first');
  const reader=new FileReader();
  reader.onload=()=>{
    let uploads=JSON.parse(localStorage.getItem('lc_uploads')||'[]');
    uploads.push(reader.result);
    localStorage.setItem('lc_uploads',JSON.stringify(uploads));
    alert('Uploaded! (Admin can see it in dashboard)');
    uploadPreview.innerHTML='';
  };
  reader.readAsDataURL(uploadInput.files[0]);
});