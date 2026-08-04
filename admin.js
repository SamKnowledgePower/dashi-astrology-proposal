const cfg=window.PROGRESS_CONFIG||{};
const configured=Boolean(cfg.supabaseUrl&&cfg.supabaseAnonKey);
const $=s=>document.querySelector(s);
const phaseNames=["啟動與定位假設","內容測試與客群觀察","第一季檢討與定位校準","服務實驗啟動","案例與方法萃取","網站與搜尋資產","課程需求驗證","課程方向定版","正式製課啟動","課程製作與系統建置","首航準備與測試交易","正式上線與年度總結"];
const taskNames=[
 ["合作啟動會議與年度排程","達達老師專業與品牌訪談","既有案例及高頻問題盤點","競品與市場初步研究"],
 ["內容支柱與測試題目定案","既有客戶訪談第一輪","社群平台與 LINE 基線建立"],
 ["第一季內容數據檢討","高反應問題與客群整理","定位假設第一次校準","YouTube 旗艦長片 第 1 支"],
 ["MVP 服務架構與流程","招募測試客戶","專業判讀邊界初稿","Bonus Podcast 第 1 集"],
 ["MVP 執行與客戶回饋","案例去識別化整理","品牌方法論初稿","SEO 專題 第 1 篇","Bonus Podcast 第 2 集"],
 ["品牌測試網站上線","SEO 主題與關鍵字規劃","半年市場驗證報告","SEO 專題 第 2 篇","YouTube 旗艦長片 第 2 支"],
 ["課程利基候選比較","候補名單頁與名單磁鐵","課程承諾測試","SEO 專題 第 3 篇","Bonus Podcast 第 3 集"],
 ["課程方向與目標客群定案","課程章節與學習成果","製課拍攝前置","SEO 專題 第 4 篇","YouTube 旗艦長片 第 3 支"],
 ["課程腳本協作","銷售頁架構初稿","課程拍攝第一階段","Bonus Podcast 第 4 集"],
 ["課程拍攝第二階段","課程影片剪輯與上架","金流與權限流程串接","SEO 專題 第 5 篇","Bonus Podcast 第 5 集"],
 ["銷售頁正式版","測試交易與自動交付","候補名單招生暖身","YouTube 旗艦長片 第 4 支"],
 ["課程正式上線","首批學員回饋與 FAQ","全年成果與資產交接","第二年營運建議","SEO 專題 第 6 篇","Bonus Podcast 第 6 集"]
];
const recurring=m=>[`短影音 第 ${(m-1)*4+1}–${m*4} 支`,`社群文章 第 ${(m-1)*4+1}–${m*4} 篇`,`每月共創討論與集中拍攝`];
const defaultData=()=>({updated:new Date().toISOString().slice(0,10),currentMonth:0,status:"提案階段｜尚未啟動",weekly:{done:["專案尚未啟動"],wait:["確認合作與正式啟動日"],next:["簽署契約與安排啟動訪談"]},tasks:Object.fromEntries(taskNames.flatMap((a,i)=>[...a,...recurring(i+1)].map((name,j)=>[`m${i+1}-${j}`,{name,status:"todo",date:"",note:"",links:[]}])))});
let db,data;
function esc(v=""){return v.replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function lines(v){return v.split("\n").map(x=>x.trim()).filter(Boolean)}
function render(){
 $('#status').value=data.status||"";$('#updated').value=data.updated||"";$('#weekly-done').value=(data.weekly?.done||[]).join("\n");$('#weekly-wait').value=(data.weekly?.wait||[]).join("\n");$('#weekly-next').value=(data.weekly?.next||[]).join("\n");
 $('#current-month').innerHTML=Array.from({length:13},(_,i)=>`<option value="${i}" ${Number(data.currentMonth)===i?'selected':''}>${i===0?'尚未啟動':`第 ${i} 個月`}</option>`).join('');
 $('#months').innerHTML=taskNames.map((special,i)=>{const m=i+1,names=[...special,...recurring(m)];return `<details class="month" ${data.currentMonth===m?'open':''}><summary>Month ${String(m).padStart(2,'0')}　${phaseNames[i]}</summary><div class="month-body">${names.map((fallback,j)=>taskEditor(`m${m}-${j}`,fallback)).join('')}</div></details>`}).join('');
 document.querySelectorAll('.add-link').forEach(b=>b.onclick=()=>addLink(b.dataset.id));document.querySelectorAll('.remove').forEach(b=>b.onclick=()=>removeLink(b.dataset.id,Number(b.dataset.index)));
}
function taskEditor(id,fallback){const t=data.tasks[id]||(data.tasks[id]={name:fallback,status:"todo",date:"",note:"",links:[]});return `<article class="task" data-id="${id}"><div class="task-head"><div><label>工作項目</label><input data-field="name" value="${esc(t.name)}"></div><div><label>狀態</label><select data-field="status"><option value="todo" ${t.status==='todo'?'selected':''}>尚未開始</option><option value="active" ${t.status==='active'?'selected':''}>進行中</option><option value="review" ${t.status==='review'?'selected':''}>等待確認</option><option value="complete" ${t.status==='complete'?'selected':''}>已完成</option></select></div><div><label>完成日期</label><input data-field="date" type="date" value="${esc(t.date)}"></div></div><div style="margin-top:10px"><label>執行說明</label><textarea data-field="note">${esc(t.note)}</textarea></div><div class="links"><label>成果連結（可新增多個）</label>${(t.links||[]).map((l,k)=>`<div class="link-row"><input data-link="label" data-index="${k}" placeholder="按鈕名稱" value="${esc(l.label)}"><input data-link="url" data-index="${k}" placeholder="https://" value="${esc(l.url)}"><input data-link="note" data-index="${k}" placeholder="連結說明（選填）" value="${esc(l.note||'')}"><button class="remove" data-id="${id}" data-index="${k}" type="button">移除</button></div>`).join('')}<button class="add-link" data-id="${id}" type="button">＋ 新增成果連結</button></div></article>`}
function collect(){data.status=$('#status').value;data.currentMonth=Number($('#current-month').value);data.updated=$('#updated').value;data.weekly={done:lines($('#weekly-done').value),wait:lines($('#weekly-wait').value),next:lines($('#weekly-next').value)};document.querySelectorAll('.task').forEach(el=>{const t=data.tasks[el.dataset.id];el.querySelectorAll('[data-field]').forEach(x=>t[x.dataset.field]=x.value);const rows=[...el.querySelectorAll('.link-row')];t.links=rows.map(row=>({label:row.querySelector('[data-link="label"]').value,url:row.querySelector('[data-link="url"]').value,note:row.querySelector('[data-link="note"]').value})).filter(x=>x.url)});}
function addLink(id){collect();data.tasks[id].links.push({label:"成果連結",url:"",note:""});render();document.querySelector(`[data-id="${id}"]`).scrollIntoView({block:"center"})}
function removeLink(id,k){collect();data.tasks[id].links.splice(k,1);render()}
async function boot(){if(!configured){$('#setup').classList.remove('hidden');return}db=supabase.createClient(cfg.supabaseUrl,cfg.supabaseAnonKey);const {data:{session}}=await db.auth.getSession();if(!session){$('#login').classList.remove('hidden');$('#email').value=cfg.adminEmail||"";return}const result=await db.from('progress_projects').select('data').eq('id',cfg.projectId).maybeSingle();data=result.data?.data||defaultData();$('#editor').classList.remove('hidden');render()}
$('#send-login').onclick=async()=>{const {error}=await db.auth.signInWithOtp({email:$('#email').value,options:{emailRedirectTo:location.href}});$('#login-message').textContent=error?error.message:"登入連結已寄出，請至信箱開啟。"};
$('#publish').onclick=async()=>{collect();data.updated=new Date().toISOString().slice(0,10);$('#message').textContent="發布中…";const {error}=await db.from('progress_projects').upsert({id:cfg.projectId,data,updated_at:new Date().toISOString()});$('#message').textContent=error?`發布失敗：${error.message}`:"發布成功，客戶頁面已更新。"};
$('#logout').onclick=async()=>{await db.auth.signOut();location.reload()};boot();
