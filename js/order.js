const form=document.getElementById('orderForm');
const dateInput=document.getElementById('date');
const timeInput=document.getElementById('time');
const liveTotal=document.getElementById('liveTotal');
const inputs=['name','email','phone','place'].map(id=>document.getElementById(id));


const now=new Date();
dateInput.min=now.toISOString().split('T')[0];
dateInput.addEventListener('change',()=>{
  if(dateInput.value===dateInput.min){
    const minTime=new Date(now.getTime()+2*60*60*1000).toTimeString().slice(0,5);
    timeInput.min=minTime;
  }else timeInput.min='00:00';
});


function updateLiveTotal(){
  const kg=['dark','almond','strawberry','milk','peanut'].reduce((sum,id)=>{
    return sum+ +(document.getElementById(id).value||0);
  },0);
  const price=kg*2500;
  liveTotal.textContent=`${kg.toFixed(1)} kg – ETB ${price.toFixed(0)}`;
}
document.querySelectorAll('#dark,#almond,#strawberry,#milk,#peanut').forEach(inp=>inp.addEventListener('input',updateLiveTotal));
updateLiveTotal(); 


function validate(){
  let ok=true;
  inputs.forEach(inp=>{
    if(!inp.value.trim()){
      inp.classList.add('error');
      if(!inp.nextElementSibling||!inp.nextElementSibling.classList.contains('error-text')){
        const err=document.createElement('span');
        err.className='error-text'; err.textContent='Required';
        inp.parentNode.appendChild(err);
      }
      ok=false;
    }else{
      inp.classList.remove('error');
      if(inp.nextElementSibling&&inp.nextElementSibling.classList.contains('error-text')){
        inp.nextElementSibling.remove();
      }
    }
  });
  return ok;
}
form.addEventListener('submit',e=>{
  const kg=+liveTotal.textContent.split(' ')[1];
  if(!validate() || kg<=0){
    e.preventDefault();
    alert('Please fill all fields and order at least 0.1 kg.');
  }
});


inputs.forEach(inp=>{
  inp.addEventListener('input',()=>localStorage.setItem('lc_order_'+inp.id,inp.value));
  const saved=localStorage.getItem('lc_order_'+inp.id);
  if(saved) inp.value=saved;
});