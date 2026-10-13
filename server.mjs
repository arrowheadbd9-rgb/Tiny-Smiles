import http from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {createReadStream} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.join(path.dirname(fileURLToPath(import.meta.url)),'dist');
const port=Number(process.env.PORT||4173);
const token=process.env.INSTAGRAM_ACCESS_TOKEN;
const userId=process.env.INSTAGRAM_USER_ID;
const version=process.env.INSTAGRAM_API_VERSION||'v25.0';
let cachedPosts=[];let lastSuccess=0;let nextAttempt=0;let pending;
async function updateFeed(){
  if(!token||!userId)return;
  if(pending)return pending;
  if(Date.now()<nextAttempt)return;
  nextAttempt=Date.now()+5*60*1000;
  pending=(async()=>{try{
    const url=new URL(`https://graph.instagram.com/${version}/${encodeURIComponent(userId)}/media`);
    url.searchParams.set('fields','id,media_type,media_url,thumbnail_url,permalink,timestamp');url.searchParams.set('limit','12');
    const response=await fetch(url,{headers:{Authorization:`Bearer ${token}`},signal:AbortSignal.timeout(15000)});
    if(!response.ok)throw new Error('Instagram feed request failed');
    const result=await response.json();if(!Array.isArray(result.data))throw new Error('Invalid feed response');
    cachedPosts=result.data.map(p=>({id:p.id,mediaType:p.media_type,image:p.media_type==='VIDEO'?p.thumbnail_url:p.media_url,permalink:p.permalink,caption:p.media_type==='VIDEO'?'Watch our latest video':'Our latest Instagram moment',timestamp:p.timestamp})).filter(p=>p.image&&p.permalink?.startsWith('https://www.instagram.com/')).sort((a,b)=>new Date(b.timestamp)-new Date(a.timestamp));
    lastSuccess=Date.now();
  }catch{console.warn('Instagram sync unavailable. Keeping the last successful feed. Check account credentials and API permissions.');}finally{pending=undefined;}})();
  return pending;
}
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.jpg':'image/jpeg','.png':'image/png','.svg':'image/svg+xml','.mp4':'video/mp4'};
const server=http.createServer(async(req,res)=>{try{
  const requestPath=new URL(req.url,'http://localhost').pathname;
  if(req.method!=='GET'&&req.method!=='HEAD'){res.writeHead(405);res.end();return;}
  if(requestPath==='/api/instagram'){
    if(!token||!userId){res.writeHead(200,{'Content-Type':'application/json','Cache-Control':'no-store'});res.end(JSON.stringify({connected:false,posts:[]}));return;}
    if(Date.now()-lastSuccess>5*60*1000)await updateFeed();
    res.writeHead(200,{'Content-Type':'application/json','Cache-Control':'no-store'});res.end(JSON.stringify({connected:true,posts:cachedPosts,stale:Date.now()-lastSuccess>10*60*1000,lastUpdated:lastSuccess?new Date(lastSuccess).toISOString():null}));return;
  }
  const file=path.resolve(root,'.'+decodeURIComponent(requestPath==='/'?'/index.html':requestPath));
  if(!file.startsWith(root+path.sep)){res.writeHead(403);res.end();return;}
  if(path.extname(file)==='.mp4'){
    const {size}=await stat(file);let start=0;let end=size-1;let partial=false;
    if(req.headers.range){
      const match=/^bytes=(\d*)-(\d*)$/.exec(req.headers.range);
      if(!match||(!match[1]&&!match[2])){res.writeHead(416,{'Content-Range':`bytes */${size}`});res.end();return;}
      if(!match[1])start=Math.max(0,size-Number(match[2]));
      else{start=Number(match[1]);end=match[2]?Math.min(Number(match[2]),size-1):size-1;}
      if(!Number.isSafeInteger(start)||!Number.isSafeInteger(end)||start>end||start>=size){res.writeHead(416,{'Content-Range':`bytes */${size}`});res.end();return;}
      partial=true;
    }
    const headers={'Content-Type':'video/mp4','Content-Length':end-start+1,'Accept-Ranges':'bytes','X-Content-Type-Options':'nosniff'};
    if(partial)headers['Content-Range']=`bytes ${start}-${end}/${size}`;
    res.writeHead(partial?206:200,headers);
    if(req.method==='HEAD'){res.end();return;}
    const stream=createReadStream(file,{start,end});stream.on('error',()=>res.destroy());res.on('close',()=>stream.destroy());stream.pipe(res);return;
  }
  const data=await readFile(file);res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','X-Content-Type-Options':'nosniff','Cache-Control':'no-store'});res.end(req.method==='HEAD'?undefined:data);
}catch{res.writeHead(404);res.end('Not found');}});
server.listen(port,'127.0.0.1',()=>console.log(`Tiny Smiles preview: http://127.0.0.1:${port}`));
if(token&&userId){updateFeed();const timer=setInterval(updateFeed,5*60*1000);timer.unref();}
