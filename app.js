const reels = [
  {id:'DcbRgtfkYBO', image:'besties.jpg', category:'BESTIE COMEDY', title:'The bestie with all the answers'},
  {id:'DcgZlnDANpL', image:'couple.jpg', category:'LITTLE STARS', title:'Brains or money? A very cheeky answer'},
  {id:'DeZaZG-jIt4', image:'latest-couple.jpg', category:'OUR LATEST COUPLE', title:'Everyday life, with Emaan and her partner'},
  {id:'DcVwgzujPsI', image:'moment.jpg', category:'ANIMATED STORIES', title:'A little imagination after dark'}
];
const featured = document.querySelector('#featured');
reels.forEach(r => { const a=document.createElement('a'); a.className='reel-card'; a.href=`https://www.instagram.com/reel/${r.id}/`; a.target='_blank'; a.rel='noopener'; a.innerHTML=`<div class="reel-cover"><img src="assets/${r.image}" alt="${r.title}" loading="lazy"><span class="play" aria-hidden="true">▶</span></div><small>${r.category}</small><h3>${r.title}</h3><span class="watch">Watch on Instagram ↗</span>`; featured.append(a); });
const feed=document.querySelector('#instagram-feed');
let currentFeed=[
  {id:'DeZenzNlPq-',image:'latest-besties.jpg',caption:'Best friends. Unexpected comebacks.'},
  {id:'DeZaZG-jIt4',image:'latest-couple.jpg',caption:'Emaan and her partner: everyday desi life.'},
  {id:'DeUTSQKAYiA',image:'couple-conversation.jpg',caption:'When the conversation takes a comic turn.'},
  {id:'DeUQWT5kgro',image:'emaan-fashion.jpg',caption:'Emaan’s wedding season look.'},
  {id:'DeSMYXKRk-S',image:'couple-love.jpg',caption:'Some moments say more than words.'},
  {id:'DeCB0ApFAt6',image:'emaan.jpg',caption:'Meet Emaan.'}
].map(p=>({...p,image:'assets/'+p.image,permalink:`https://www.instagram.com/reel/${p.id}/`,mediaType:'VIDEO'}));
let feedFilter='all';
function renderFeed(posts){feed.replaceChildren(); const filtered=posts.filter(p=>feedFilter!=='reels'||p.mediaType==='VIDEO');filtered.forEach(p=>{if(!p.permalink?.startsWith('https://www.instagram.com/'))return;const a=document.createElement('a');a.className='feed-item';a.href=p.permalink;a.target='_blank';a.rel='noopener';const img=document.createElement('img');img.src=p.image;img.alt=p.caption || 'Tiny Smiles Instagram post';img.loading='lazy';const icon=document.createElement('span');icon.className='ig-media-icon';icon.textContent=p.mediaType==='VIDEO'?'▷':p.mediaType==='CAROUSEL_ALBUM'?'▣':'▧';icon.setAttribute('aria-hidden','true');const overlay=document.createElement('span');overlay.className='ig-post-overlay';overlay.textContent='View on Instagram ↗';a.setAttribute('aria-label',img.alt+' — open on Instagram');a.append(img,icon,overlay);feed.append(a);});if(!filtered.length){const empty=document.createElement('p');empty.className='ig-empty';empty.textContent='No reels available in this selection.';feed.append(empty);}}
renderFeed(currentFeed);
document.querySelectorAll('[data-feed-filter]').forEach(button=>button.addEventListener('click',()=>{feedFilter=button.dataset.feedFilter;document.querySelectorAll('[data-feed-filter]').forEach(b=>{const active=b===button;b.classList.toggle('active',active);b.setAttribute('aria-selected',String(active));});renderFeed(currentFeed);}));
async function refreshFeed(){try{const res=await fetch('/api/instagram');if(!res.ok)return;const data=await res.json();if(data.posts?.length){currentFeed=data.posts;renderFeed(currentFeed);document.querySelector('#feed-status').textContent=data.stale?'Instagram connection temporarily unavailable · showing last synced posts.':'Connected to Instagram · latest uploads refresh automatically';}}catch{ /* Selected posts remain available when the connection is unavailable. */ }}
refreshFeed();setInterval(refreshFeed,5*60*1000);
document.querySelectorAll('.select-character').forEach(button=>button.addEventListener('click',()=>{document.querySelector('#character-select').value=button.dataset.character;document.querySelector('#collaborate').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});document.querySelector('#character-select').focus({preventScroll:true});}));
document.querySelector('#collab-form').addEventListener('submit',event=>{event.preventDefault();const f=new FormData(event.currentTarget);const brief=`Hi Tiny Smiles! I'd like to discuss a collaboration.\n\nName: ${f.get('name')}\nBrand: ${f.get('brand')}\nBusiness email: ${f.get('email')}\nProduct category: ${f.get('category')}\nCharacters: ${f.get('character')}\nFormat: ${f.get('type')}\nBudget: ${f.get('budget')}\nTimeline: ${f.get('timeline')||'Let’s discuss'}\n\nCampaign idea:\n${f.get('idea')}`;document.querySelector('#brief-text').value=brief;document.querySelector('#email-brief').href='mailto:tinysmileskidstv@gmail.com?subject='+encodeURIComponent('Tiny Smiles collaboration — '+f.get('brand'))+'&body='+encodeURIComponent(brief);document.querySelector('#brief-result').hidden=false;document.querySelector('#brief-result').scrollIntoView({behavior:'smooth',block:'center'});});
document.querySelector('#copy-brief').addEventListener('click',async()=>{const field=document.querySelector('#brief-text');try{await navigator.clipboard.writeText(field.value);document.querySelector('#copy-status').textContent='Copied! Send it by email or in a message to @tinysmileskidstv.';}catch{field.focus();field.select();document.querySelector('#copy-status').textContent='Select and copy the inquiry, then send it by email or Instagram.';}});
document.querySelector('#collab-form').addEventListener('submit',()=>{document.querySelector('#whatsapp-brief').href='https://wa.me/923254313433?text='+encodeURIComponent(document.querySelector('#brief-text').value);});
const menuToggle=document.querySelector('#menu-toggle');
menuToggle.addEventListener('click',()=>{const open=menuToggle.getAttribute('aria-expanded')!=='true';menuToggle.setAttribute('aria-expanded',String(open));document.querySelector('#site-nav').classList.toggle('open',open);});
document.querySelectorAll('#site-nav a').forEach(a=>a.addEventListener('click',()=>{menuToggle.setAttribute('aria-expanded','false');document.querySelector('#site-nav').classList.remove('open');}));

document.querySelectorAll('[data-category]').forEach(button=>button.addEventListener('click',()=>{document.querySelector('#category-select').value=button.dataset.category;document.querySelector('#collaborate').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});document.querySelector('#category-select').focus({preventScroll:true});}));

const heroVideo=document.querySelector('#hero-video');
if(heroVideo)heroVideo.play().catch(()=>{});
