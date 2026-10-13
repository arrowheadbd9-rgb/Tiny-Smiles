// Web3Forms access keys are intentionally public; the key routes to the owner's verified inbox.
export function buildInquiryPayload(entries){
  const fields={};for(const name of ['name','brand','email','category','character','type','budget','timeline','idea'])fields[name]=String(entries[name]??'').trim();
  if(!fields.name||!fields.brand||!fields.idea)throw new Error('Please complete your name, brand and campaign idea.');
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))throw new Error('Please enter a valid business email.');
  if(!/^[a-f\d]{8}(?:-[a-f\d]{4}){3}-[a-f\d]{12}$/i.test(entries.access_key??''))throw new Error('The enquiry form is unavailable. Please contact us directly.');
  if(entries.botcheck)throw new Error('Unable to submit this enquiry. Please contact us directly.');
  return {
    access_key:entries.access_key,
    subject:'Tiny Smiles collaboration — '+fields.brand.replace(/[\r\n]/g,' '),
    from_name:'Tiny Smiles Website',
    name:fields.name,email:fields.email,replyto:fields.email,
    brand:fields.brand,product_category:fields.category,characters:fields.character,
    collaboration_type:fields.type,budget:fields.budget,timeline:fields.timeline||'Let’s discuss',
    message:fields.idea,botcheck:false
  };
}
export async function submitInquiry(payload,send=fetch){
  const response=await send('https://api.web3forms.com/submit',{
    method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},
    body:JSON.stringify(payload)
  });
  let result;try{result=await response.json();}catch{throw new Error('We could not confirm submission. Please contact us directly before trying again.');}
  if(!response.ok||result.success!==true)throw new Error(result.message||result.body?.message||'Your enquiry could not be sent. Please try again or contact us directly.');
  return result;
}
if(typeof document!=='undefined'){
  const form=document.querySelector('#collab-form');
  const button=document.querySelector('#send-inquiry');
  const status=document.querySelector('#send-status');
  let sending=false;
  document.querySelector('#email-availability').textContent='Your enquiry will be sent directly to Tiny Smiles.';
  form.addEventListener('submit',async event=>{
    event.preventDefault();if(sending||!form.reportValidity())return;
    let payload;try{payload=buildInquiryPayload(Object.fromEntries(new FormData(form)));}catch(error){status.textContent=error.message;status.className='send-status error';return;}
    sending=true;button.disabled=true;button.textContent='Sending…';form.setAttribute('aria-busy','true');
    status.textContent='Submitting your enquiry…';status.className='send-status';
    try{
      await submitInquiry(payload);
      status.textContent='Thank you! Your enquiry has been sent to Tiny Smiles. We’ll get back to you at the email you provided.';
      status.className='send-status success';form.reset();
    }catch(error){
      status.textContent=error instanceof TypeError?'We could not confirm submission. Please contact us directly before trying again.':error.message;
      status.className='send-status error';
    }finally{
      sending=false;button.disabled=false;button.innerHTML='Send enquiry directly <span>↗</span>';form.removeAttribute('aria-busy');
      status.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'nearest'});
    }
  });
}
