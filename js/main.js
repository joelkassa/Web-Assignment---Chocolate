
const navbar=document.getElementById('navbar');
window.addEventListener('scroll',()=>navbar.classList.toggle('scrolled',window.scrollY>80));


const themeBtn=document.getElementById('themeToggle');
themeBtn.addEventListener('click',()=>{
  document.body.classList.toggle('dark');
  themeBtn.textContent=document.body.classList.contains('dark')?'☀️':'🌙';
  localStorage.setItem('lc_theme',document.body.classList.contains('dark')?'dark':'light');
});
if(localStorage.getItem('lc_theme')==='dark')
    {document.body.classList.add('dark');themeBtn.textContent='☀️';}


const backTop=document.getElementById('backTop');
window.addEventListener('scroll',()=>backTop.classList.toggle('show',window.scrollY>400));
backTop.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));


if(!localStorage.getItem('lc_cookie')){
  const banner=document.createElement('div');
  banner.className='cookie-banner';
  banner.innerHTML=`<p>We use cookies for chocolate magic 🍫 <button id="cookieOK">OK</button></p>`;
  document.body.appendChild(banner);
  document.getElementById('cookieOK').addEventListener('click',()=>{
    localStorage.setItem('lc_cookie','true');
    banner.remove();
  });
}


const ann=document.getElementById('announcement');
const closeAnn=document.getElementById('closeAnnounce');
if(localStorage.getItem('lc_ann')==='hidden') ann.remove();
else ann.style.display='flex';
closeAnn.addEventListener('click',()=>{
  ann.remove(); localStorage.setItem('lc_ann','hidden');
});


if('serviceWorker' in navigator){
  navigator.serviceWorker.register('/sw.js').catch(()=>{});
}


const io=new IntersectionObserver((entries)=>{
  entries.forEach(e=>{if(e.isIntersecting) e.target.classList.add('visible')});
},{threshold:.2});
document.querySelectorAll('.about-card,.value-card,.testimonial-card').forEach(el=>io.observe(el));


const video=document.getElementById('heroVideo');
const playBtn=document.getElementById('playPauseBtn');
const muteBtn=document.getElementById('muteBtn');
if(playBtn){playBtn.addEventListener('click',()=>{
  video.paused?(video.play(),playBtn.textContent='⏸'):(video.pause(),playBtn.textContent='▶');
});
muteBtn.addEventListener('click',()=>{
  video.muted=!video.muted;
  muteBtn.textContent=video.muted?'🔇':'🔊';
});}


const track=document.getElementById('testimonialTrack');
if(track){
let idx=0,set=setInterval(()=>{idx++;if(idx===track.children.length)idx=0;track.style.transform=`translateX(-${idx*370}px)`},3000);
track.addEventListener('mouseenter',()=>clearInterval(set));
track.addEventListener('mouseleave',()=>set=setInterval(()=>{idx++;if(idx===track.children.length)idx=0;track.style.transform=`translateX(-${idx*370}px)`},3000));
}


const txt="Experience the Art of Bean-to-Bar";
const typeEl=document.getElementById('typeWriter');
if(typeEl){
typeEl.style.width='0';let i=0;
const type=()=>{if(i<txt.length){typeEl.textContent+=txt[i];i++;setTimeout(type,80)}};
setTimeout(type,500);
}


const counters=document.querySelectorAll('.count-number');
const run=()=>{
  counters.forEach(c=>{
    const target=+c.dataset.target;
    const inc=target/150; let cur=0;
    const upd=()=>{cur+=inc;c.textContent=Math.floor(cur);if(cur<target)requestAnimationFrame(upd);else c.textContent=target};
    upd();
  });
};
const countIO=new IntersectionObserver((e,o)=>{if(e[0].isIntersecting){run();o.disconnect()}},{threshold:1});
const countRow=document.querySelector('.count-up-row');
if(countRow) countIO.observe(countRow);


if(window.THREE){
const container=document.querySelector('.hero');
const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,1,1000);
const renderer=new THREE.WebGLRenderer({alpha:true});renderer.setSize(window.innerWidth,window.innerHeight);
container.appendChild(renderer.domElement);renderer.domElement.style.position='absolute';renderer.domElement.style.top=0;renderer.domElement.style.left=0;renderer.domElement.style.zIndex=-1;
const geo=new THREE.BufferGeometry();const vertices=[];
for(let i=0;i<600;i++){vertices.push(Math.random()*2-1,Math.random()*2-1,Math.random()*2-1)}
geo.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3));
const mat=new THREE.PointsMaterial({color:0xD2691E,size:.03});
const points=new THREE.Points(geo,mat);scene.add(points);
camera.position.z=1.5;
const ani=()=>{requestAnimationFrame(ani);points.rotation.y+=.0008;renderer.render(scene,camera)};
ani();
window.addEventListener('resize',()=>{camera.aspect=window.innerWidth/window.innerHeight;camera.updateProjectionMatrix();renderer.setSize(window.innerWidth,window.innerHeight)});
}


const aboutCards=document.querySelectorAll('.about-card');
window.addEventListener('scroll',()=>{
  const offset=window.pageYOffset;
  aboutCards.forEach((c,i)=>{c.style.transform=`translateY(${offset*.02*(i+1)}px)`});
});