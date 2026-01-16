const quickModal=document.getElementById('quickView');
const closeQuick=document.getElementById('closeQuick');
const quickAdd=document.getElementById('quickAdd');
let currentProduct='';

document.querySelectorAll('.product-card').forEach(card=>{
  const name=card.dataset.name;
  const img=card.querySelector('img').src;
  const desc=card.querySelector('.product-description').textContent;
  const ing=card.querySelector('.ingredient').textContent;
  const nutri=card.querySelector('.nutrition-info').innerHTML;


  const input=card.querySelector('.qty');
  const sub=card.querySelector('.subtotal');
  input.addEventListener('input',()=>{
    sub.textContent=`ETB ${(input.value*2500).toFixed(0)}`;
  });


  card.querySelector('.add-cart-btn').addEventListener('click',()=>{
    const kg=+input.value||0;
    if(kg>0) addToCart(name,kg);
  });


  card.querySelector('.quick-view-btn').addEventListener('click',()=>{
    document.getElementById('quickImg').src=img;
    document.getElementById('quickTitle').textContent=name;
    document.getElementById('quickDesc').textContent=desc;
    document.getElementById('quickIng').textContent=ing;
    document.getElementById('quickNutri').innerHTML=nutri;
    quickModal.classList.add('show');
    currentProduct=name;
  });


  const sprite=card.querySelector('.sprite360');
  if(sprite){
    let frame=0; const frames=36;
    sprite.addEventListener('mousemove',e=>{
      const rect=sprite.getBoundingClientRect();
      const x=e.clientX-rect.left;
      frame=Math.floor((x/rect.width)*frames);
      sprite.style.backgroundPosition=`-${frame*250}px 0`;
    });
  }


  const canvas=card.querySelector('.radar-canvas');
  if(canvas){
    const ctx=canvas.getContext('2d');
    canvas.width=200; canvas.height=200;
    const data=(canvas.dataset.flavours||'80,60,90,70,50').split(',').map(Number);
    const labels=['Nutty','Fruity','Bitter','Sweet','Earthy'];
    const center=100, radius=80, angle=Math.PI*2/labels.length;

    ctx.strokeStyle='#ddd'; ctx.lineWidth=1;
    [20,40,60,80,100].forEach(r=>{
      ctx.beginPath();
      for(let i=0;i<5;i++){
        const x=center+Math.cos(i*angle-Math.PI/2)*radius*(r/100);
        const y=center+Math.sin(i*angle-Math.PI/2)*radius*(r/100);
        if(i===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
      }
      ctx.closePath(); ctx.stroke();
    });

    ctx.strokeStyle='#8B4513'; ctx.fillStyle='rgba(139,69,19,.2)'; ctx.lineWidth=2;
    ctx.beginPath();
    data.forEach((d,i)=>{
      const x=center+Math.cos(i*angle-Math.PI/2)*radius*(d/100);
      const y=center+Math.sin(i*angle-Math.PI/2)*radius*(d/100);
      if(i===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
    });
    ctx.closePath(); ctx.fill(); ctx.stroke();

    ctx.fillStyle='#2C1810'; ctx.font='12px Inter';
    labels.forEach((l,i)=>{
      ctx.fillText(l,center+Math.cos(i*angle-Math.PI/2)*(radius+10)-10,center+Math.sin(i*angle-Math.PI/2)*(radius+10));
    });
  }
});

closeQuick.addEventListener('click',()=>quickModal.classList.remove('show'));
quickAdd.addEventListener('click',()=>{
  const kg=+document.getElementById('quickQty').value;
  if(kg>0) addToCart(currentProduct,kg);
  quickModal.classList.remove('show');
});