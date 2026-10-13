const studioCategories={
  fashion:{label:'FASHION',category:'Dresses & fashion',title:'The occasion edit',hook:'The invitation just arrived.\nThe outfit? Sorted.',opening:'An invitation arrives. A look comes together.',product:'Your dress becomes the centre of an occasion-ready outfit.',cta:'Invite viewers to explore your collection.',cast:'emaan'},
  beauty:{label:'BEAUTY',category:'Cosmetics & skincare',title:'The getting-ready moment',hook:'One more detail.\nThen I’m ready.',opening:'Start with a relatable getting-ready moment.',product:'Introduce your cosmetic or skincare product using the details in your brand brief.',cta:'Invite viewers to discover the featured product.',cast:'emaan'},
  kids:{label:'KIDSWEAR',category:'Kidswear & children’s products',title:'Little outfits. Big personalities.',hook:'They picked the outfits.\nThe poses? Also theirs.',opening:'A playful getting-dressed scene with the little stars.',product:'Feature your kidswear collection through looks and expressive character moments.',cta:'Invite parents to explore your children’s collection.',cast:'kids'},
  bags:{label:'BAGS & SHOES',category:'Bags & shoes',title:'The look is in the details',hook:'The outfit is ready.\nNow for the finishing touch.',opening:'Build a look around one missing finishing touch.',product:'Make your bag or shoes the reveal that completes the outfit.',cta:'Point viewers toward your latest styles.',cast:'emaan'},
  home:{label:'HOME & FAMILY',category:'Home & lifestyle',title:'One home. Their everyday story.',hook:'One home.\nEveryone has an opinion.',opening:'Open on a recognisable everyday home moment.',product:'Give your home product a natural place in the family’s routine.',cta:'Invite viewers to discover what fits their home.',cast:'family'},
  selfcare:{label:'SELF-CARE',category:'Home remedies & self-care',title:'A little time for yourself',hook:'A quieter evening.\nA little time for me.',opening:'Start with an unhurried self-care moment.',product:'Shape a DIY routine or ingredient-led explainer around your supplied content brief.',cta:'Encourage viewers to explore more of your routine content.',cast:'emaan'},
  jewellery:{label:'JEWELLERY',category:'Jewellery & accessories',title:'The smallest detail. The whole look.',hook:'A small detail.\nA completely different look.',opening:'Reveal the difference one accessory makes to a look.',product:'Give your jewellery or accessory a close-up styling moment.',cta:'Invite viewers to find their favourite piece.',cast:'emaan'},
  food:{label:'FOOD & MORE',category:'Food, drinks & other brands',title:'A moment worth sharing',hook:'One table.\nTwo very different opinions.',opening:'A playful conversation starts around an everyday moment.',product:'Bring your product or service into a scene built around your brand message.',cta:'End with a clear invitation to explore your brand.',cast:'couple'}
};
const studioCasts={
  emaan:{label:'Emaan',value:'Emaan',image:'assets/emaan-fashion.jpg',scene:'Emaan introduces the idea with her signature personality.'},
  couple:{label:'the couple',value:'Emaan & Waseeq',image:'assets/latest-couple.jpg',scene:'Emaan and Waseeq bring the idea to life through playful conversation.'},
  family:{label:'the complete family',value:'The Tiny Smiles Family',image:'assets/family.png',scene:'The whole family gives the scene different voices and reactions.'},
  kids:{label:'the little stars',value:'Zara & Ayaan',image:'assets/couple.jpg',scene:'Zara and Ayaan bring playful expressions and little surprises.'}
};
let selectedStudioCategory='fashion';
let selectedStudioCast='emaan';
const studioBrandInput=document.querySelector('#studio-brand');
const studioPosterCopy=document.querySelector('.studio-poster-copy');
function updateStudio(){
  const concept=studioCategories[selectedStudioCategory];const cast=studioCasts[selectedStudioCast];
  document.querySelector('#studio-category-selection').textContent=document.querySelector('[data-studio-category="'+selectedStudioCategory+'"] strong').textContent;
  document.querySelector('#studio-preview-label').textContent=concept.label+' / CONCEPT PREVIEW';
  document.querySelector('#studio-brand-display').textContent=studioBrandInput.value.trim()||'YOUR BRAND';
  document.querySelector('#studio-hook').textContent=concept.hook;
  document.querySelector('#studio-concept-title').textContent=concept.title;
  document.querySelector('#studio-beat-hook').textContent=concept.opening;
  document.querySelector('#studio-beat-product').textContent=concept.product;
  document.querySelector('#studio-beat-cta').textContent=concept.cta;
  document.querySelector('#studio-announcement').textContent='A '+concept.label.toLowerCase()+' concept featuring '+cast.label+'.';
  document.querySelectorAll('[data-studio-category]').forEach(b=>{const active=b.dataset.studioCategory===selectedStudioCategory;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));const check=b.querySelector('.studio-category-check');if(check)check.textContent=active?'✓':'↗';});
  document.querySelectorAll('[data-studio-cast]').forEach(b=>{const active=b.dataset.studioCast===selectedStudioCast;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});
  const image=document.querySelector('#studio-cast-image');
  image.src=cast.image;image.alt=cast.label+' — potential characters for your brand story';image.classList.toggle('family-image',selectedStudioCast==='family');
  if(selectedStudioCast==='emaan'){
    image.hidden=true;heroVideo.hidden=false;
    heroVideo.play().catch(()=>{});
  }else{heroVideo.pause();heroVideo.hidden=true;image.hidden=false;}
  studioPosterCopy.classList.remove('changed');requestAnimationFrame(()=>studioPosterCopy.classList.add('changed'));
}
document.querySelectorAll('[data-studio-category]').forEach(b=>b.addEventListener('click',()=>{selectedStudioCategory=b.dataset.studioCategory;selectedStudioCast=studioCategories[selectedStudioCategory].cast;updateStudio();}));
document.querySelectorAll('[data-studio-cast]').forEach(b=>b.addEventListener('click',()=>{selectedStudioCast=b.dataset.studioCast;updateStudio();}));
studioBrandInput.addEventListener('input',()=>{document.querySelector('#studio-brand-display').textContent=studioBrandInput.value.trim()||'YOUR BRAND';});
document.querySelector('#studio-use-concept').addEventListener('click',()=>{
  const c=studioCategories[selectedStudioCategory];const cast=studioCasts[selectedStudioCast];const form=document.querySelector('#collab-form');
  form.elements.category.value=c.category;form.elements.character.value=cast.value;
  if(studioBrandInput.value.trim())form.elements.brand.value=studioBrandInput.value.trim();
  form.elements.idea.value=`I'd like to explore this Tiny Smiles concept:\n\n${c.title}\n\nCharacters: ${cast.value}\nOpening: ${c.opening}\nCharacter direction: ${cast.scene}\nProduct moment: ${c.product}\nCall to action: ${c.cta}\n\nLet's discuss adapting this idea to our brand.`;
  document.querySelector('#collaborate').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});form.elements.idea.focus({preventScroll:true});
});
