const cfg=window.PROGRESS_CONFIG||{};
const configured=Boolean(cfg.supabaseUrl&&cfg.supabaseAnonKey);
const $=s=>document.querySelector(s);
const TEMPLATES={
 "dashi-astrology":{
  phaseNames:["啟動與定位假設","內容測試與客群觀察","第一季檢討與定位校準","服務實驗啟動","案例與方法萃取","網站與搜尋資產","課程需求驗證","課程方向定版","正式製課啟動","課程製作與系統建置","首航準備與測試交易","正式上線與年度總結"],
  taskNames:[
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
  ],
  recurring:m=>[`短影音 第 ${(m-1)*4+1}–${m*4} 支`,`社群文章 第 ${(m-1)*4+1}–${m*4} 篇`,`每月共創討論與集中拍攝`]
 },
 "gd-gym":{
  phaseNames:["合作啟動與品牌盤點","客群問題與內容測試","第一季數據檢討","服務與會員需求研究","品牌方法與課程方向","網站與搜尋資產","課程需求驗證","課程方向定版","正式製課啟動","課程製作與系統建置","首航準備與測試交易","正式上線與年度交接"],
  taskNames:[
   ["合作啟動會議與年度排程","品牌與教練訪談","既有社群、Google 商家及網站數據基線","客群與商圈初步盤點"],
   ["內容支柱與測試題目定案","既有會員問題整理","第一輪短影音主題測試","LINE 或名單入口基礎規劃"],
   ["第一季內容數據檢討","高反應題目與客戶語言整理","品牌定位假設第一次校準","YouTube 影片第 1 支"],
   ["服務項目與會員需求盤點","黃金客戶或既有會員訪談","課程問題庫初步整理","名單磁鐵方向初稿"],
   ["教練方法與服務流程整理","課程主題候選比較","客戶案例整理","SEO 文章第 1 篇"],
   ["品牌網站架構確認","SEO 關鍵字與文章規劃","SEO 文章第 2 篇","YouTube 影片第 2 支","半年內容與市場檢討"],
   ["課程利基候選比較","名單磁鐵製作","候補名單頁規劃","課程承諾測試","SEO 文章第 3 篇"],
   ["課程方向與目標學員定案","課程章節與學習成果","課程拍攝前置","SEO 文章第 4 篇","YouTube 影片第 3 支"],
   ["課程腳本協作","課程銷售頁架構初稿","課程拍攝第一階段","線上課程影片第 1–5 支"],
   ["課程拍攝第二階段","線上課程影片第 6–10 支","課程影片剪輯與上架","綠界金流串接","課程權限自動開通流程","SEO 文章第 5 篇"],
   ["線上課程影片第 11–15 支","課程銷售頁正式版","測試交易","課程權限與自動交付測試","YouTube 影片第 4 支","網站與銷售系統整合上線"],
   ["課程正式上線","SEO 文章第 6 篇","首批學員回饋與 FAQ","全年成果報告","網站、素材與平台帳號交接","第二年營運建議"]
  ],
  recurring:m=>[`短影音第 ${(m-1)*4+1}–${m*4} 支`,`社群文章第 ${(m-1)*4+1}–${m*4} 篇`,`每月共創討論與集中拍攝`,`Google 商家日常維護`,`當月成果與數據檢核`]
 },
 "woniu-takara":{
  hasPrep:true,
  prepTasks:["素材蒐集","品牌與服務資料盤點","窩牛與 Takara 雙主線初步訪談","現有帳號與權限盤點","年度內容方向與執行流程確認"],
  phaseNames:["合作啟動與雙主線盤點","內容支柱與拍攝流程","第一季內容檢核","內容庫穩定產出","內容轉譯與素材系統","半年檢核與內部帶訓啟動","內部操作微任務","簡易製作與流程接手","第三季檢核","內容系統文件化","交接測試與缺口補強","年度總結與正式交接"],
  taskNames:[
   ["合作啟動會議與年度排程","窩牛品牌與服務訪談","Takara 產品與原廠資料盤點","既有案例與素材整理","第一批選題確認",{name:"當月到場服務",kind:"qtyVisit"},{name:"當月短影音製作",kind:"qtyVideo"},"當月週進度回報"],
   ["窩牛內容支柱定案","Takara 內容支柱定案","批次拍攝流程建立","送審與發布流程建立","素材命名規則建立",{name:"當月到場服務",kind:"qtyVisit"},{name:"當月短影音製作",kind:"qtyVideo"},"當月週進度回報"],
   ["第一季內容成果整理","窩牛／Takara 題材比例檢核","高反應主題整理","下一季選題調整","第一次季度檢核",{name:"當月到場服務",kind:"qtyVisit"},{name:"當月短影音製作",kind:"qtyVideo"},"當月週進度回報"],
   ["第二季選題庫建立","案例型內容製作","工程與空間知識內容製作","Takara 產品教育內容製作",{name:"當月到場服務",kind:"qtyVisit"},{name:"當月短影音製作",kind:"qtyVideo"},"當月週進度回報"],
   ["客戶常見問題整理","專業語言轉譯","展間與產品素材整理","拍攝素材分類規則",{name:"當月到場服務",kind:"qtyVisit"},{name:"當月短影音製作",kind:"qtyVideo"},"當月週進度回報"],
   ["半年內容成果檢核","第二次季度檢核","內容資產整理","內部素材命名與整理帶訓","選題／腳本模板初步帶訓",{name:"當月到場服務",kind:"qtyVisit"},{name:"當月短影音製作",kind:"qtyVideo"},"當月週進度回報"],
   ["內部人員素材整理實作","選題模板填寫","發布前檢核流程實作","固定場景基礎拍攝帶訓",{name:"當月到場服務",kind:"qtyVisit"},{name:"當月短影音製作",kind:"qtyVideo"},"當月週進度回報"],
   ["簡易套版剪輯帶訓","素材交接流程測試","發布排程維護實作","內部操作問題整理",{name:"當月到場服務",kind:"qtyVisit"},{name:"當月短影音製作",kind:"qtyVideo"},"當月週進度回報"],
   ["第三次季度檢核","內部帶訓成熟度檢查","題材與內容比例調整","第四季內容方向確認",{name:"當月到場服務",kind:"qtyVisit"},{name:"當月短影音製作",kind:"qtyVideo"},"當月週進度回報"],
   ["選題庫整理","素材命名規則整理","腳本模板整理","發布流程整理","教學紀錄整理",{name:"當月到場服務",kind:"qtyVisit"},{name:"當月短影音製作",kind:"qtyVideo"},"當月週進度回報"],
   ["內部操作流程測試","帳號及權限檢核","素材庫與文件缺口補強","未完成項目盤點","年度資產清單初稿",{name:"當月到場服務",kind:"qtyVisit"},{name:"當月短影音製作",kind:"qtyVideo"},"當月週進度回報"],
   ["第四次季度檢核","全年 96 支短影音交付檢核","全年 24 次到場服務檢核","年度成果報告","選題庫、素材規則與發布流程交接","教學紀錄與內部能力交接","成品與原始素材交接","第二年合作或自主營運建議","當月週進度回報"]
  ],
  recurring:()=>[]
 }
};
function getTemplate(slug){return TEMPLATES[slug]||TEMPLATES["dashi-astrology"]}
let tpl=TEMPLATES["dashi-astrology"];
function esc(v=""){return v.replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function lines(v){return v.split("\n").map(x=>x.trim()).filter(Boolean)}
function taskMeta(entry){return typeof entry==="string"?{name:entry,kind:"checklist"}:{kind:"checklist",...entry}}
function defaultData(slug){
 const t=getTemplate(slug);
 const monthTasks=t.taskNames.flatMap((a,i)=>[...a,...t.recurring(i+1)].map((entry,j)=>[`m${i+1}-${j}`,{name:taskMeta(entry).name,status:"todo",date:"",note:"",qty:0,links:[]}]));
 const prepTasks=(t.prepTasks||[]).map((entry,j)=>[`prep-${j}`,{name:taskMeta(entry).name,status:"todo",date:"",note:"",qty:0,links:[]}]);
 return {updated:new Date().toISOString().slice(0,10),currentMonth:0,status:"提案階段｜尚未啟動",weekly:{done:["專案尚未啟動"],wait:["確認合作與正式啟動日"],next:["簽署契約與安排啟動訪談"]},tasks:Object.fromEntries([...prepTasks,...monthTasks])}
}
function render(){
 $('#status').value=data.status||"";$('#updated').value=data.updated||"";$('#weekly-done').value=(data.weekly?.done||[]).join("\n");$('#weekly-wait').value=(data.weekly?.wait||[]).join("\n");$('#weekly-next').value=(data.weekly?.next||[]).join("\n");
 const monthOptions=Array.from({length:12},(_,i)=>`<option value="${i+1}" ${data.currentMonth===i+1?'selected':''}>第 ${i+1} 個月</option>`).join('');
 if(tpl.hasPrep){
  $('#current-month').innerHTML=`<option value="0" ${data.currentMonth===0?'selected':''}>尚未啟動</option><option value="prep" ${data.currentMonth==='prep'?'selected':''}>準備期進行中</option>${monthOptions}`;
 }else{
  $('#current-month').innerHTML=`<option value="0" ${data.currentMonth===0?'selected':''}>尚未啟動</option>${monthOptions}`;
 }
 const prepHtml=tpl.prepTasks?`<details class="month" ${data.currentMonth==='prep'?'open':''}><summary>準備期　贈送，不計入 12 個月</summary><div class="month-body">${tpl.prepTasks.map((fallback,j)=>taskEditor(`prep-${j}`,fallback)).join('')}</div></details>`:'';
 const monthsHtml=tpl.taskNames.map((special,i)=>{const m=i+1,names=[...special,...tpl.recurring(m)];return `<details class="month" ${data.currentMonth===m?'open':''}><summary>Month ${String(m).padStart(2,'0')}　${tpl.phaseNames[i]}</summary><div class="month-body">${names.map((fallback,j)=>taskEditor(`m${m}-${j}`,fallback)).join('')}</div></details>`}).join('');
 $('#months').innerHTML=prepHtml+monthsHtml;
 document.querySelectorAll('.add-link').forEach(b=>b.onclick=()=>addLink(b.dataset.id));document.querySelectorAll('.remove').forEach(b=>b.onclick=()=>removeLink(b.dataset.id,Number(b.dataset.index)));
}
function taskEditor(id,fallback){
 const meta=taskMeta(fallback);
 const t=data.tasks[id]||(data.tasks[id]={name:meta.name,status:"todo",date:"",note:"",qty:0,links:[]});
 const qtyLabel=meta.kind==='qtyVideo'?'本月完成短影音支數':meta.kind==='qtyVisit'?'本月完成到場次數':null;
 const qtyRow=qtyLabel?`<div style="margin-top:10px;max-width:220px"><label>${qtyLabel}</label><input data-field="qty" type="number" min="0" value="${Number(t.qty)||0}"></div>`:'';
 return `<article class="task" data-id="${id}"><div class="task-head"><div><label>工作項目</label><input data-field="name" value="${esc(t.name)}"></div><div><label>狀態</label><select data-field="status"><option value="todo" ${t.status==='todo'?'selected':''}>尚未開始</option><option value="active" ${t.status==='active'?'selected':''}>進行中</option><option value="review" ${t.status==='review'?'selected':''}>等待確認</option><option value="complete" ${t.status==='complete'?'selected':''}>已完成</option></select></div><div><label>完成日期</label><input data-field="date" type="date" value="${esc(t.date)}"></div></div>${qtyRow}<div style="margin-top:10px"><label>執行說明</label><textarea data-field="note">${esc(t.note)}</textarea></div><div class="links"><label>成果連結（可新增多個）</label>${(t.links||[]).map((l,k)=>`<div class="link-row"><input data-link="label" data-index="${k}" placeholder="按鈕名稱" value="${esc(l.label)}"><input data-link="url" data-index="${k}" placeholder="https://" value="${esc(l.url)}"><input data-link="note" data-index="${k}" placeholder="連結說明（選填）" value="${esc(l.note||'')}"><button class="remove" data-id="${id}" data-index="${k}" type="button">移除</button></div>`).join('')}<button class="add-link" data-id="${id}" type="button">＋ 新增成果連結</button></div></article>`
}
function collect(){
 data.status=$('#status').value;
 const cmVal=$('#current-month').value;data.currentMonth=cmVal==='prep'?'prep':Number(cmVal);
 data.updated=$('#updated').value;data.weekly={done:lines($('#weekly-done').value),wait:lines($('#weekly-wait').value),next:lines($('#weekly-next').value)};
 document.querySelectorAll('.task').forEach(el=>{const t=data.tasks[el.dataset.id];el.querySelectorAll('[data-field]').forEach(x=>{t[x.dataset.field]=x.dataset.field==='qty'?(Number(x.value)||0):x.value});const rows=[...el.querySelectorAll('.link-row')];t.links=rows.map(row=>({label:row.querySelector('[data-link="label"]').value,url:row.querySelector('[data-link="url"]').value,note:row.querySelector('[data-link="note"]').value})).filter(x=>x.url)});
}
function addLink(id){collect();data.tasks[id].links.push({label:"成果連結",url:"",note:""});render();document.querySelector(`[data-id="${id}"]`).scrollIntoView({block:"center"})}
function removeLink(id,k){collect();data.tasks[id].links.splice(k,1);render()}
function publicUrl(slug){return `progress.html?project=${encodeURIComponent(slug)}`}
let db,data,projects=[],activeProject=null;
function showProjects(){activeProject=null;$('#editor').classList.add('hidden');$('#projects').classList.remove('hidden');$('#project-grid').innerHTML=projects.map(p=>`<button class="project-card" data-slug="${esc(p.slug)}"><strong>${esc(p.name)}</strong><span>${esc(p.slug)}　最近更新 ${p.updated_at?new Date(p.updated_at).toLocaleDateString('zh-TW'):'尚未發布'}</span></button>`).join('')||'<p>目前沒有專案，請先建立第一個客戶專案。</p>';document.querySelectorAll('.project-card').forEach(x=>x.onclick=()=>openProject(x.dataset.slug))}
async function loadProjects(){const result=await db.from('progress_projects').select('slug,name,data,updated_at').order('name');if(result.error){$('#project-message').textContent=`無法載入：${result.error.message}`;return}projects=result.data||[];showProjects()}
function openProject(slug){activeProject=projects.find(p=>p.slug===slug);if(!activeProject)return;tpl=getTemplate(slug);data={...defaultData(slug),...(activeProject.data||{})};$('#projects').classList.add('hidden');$('#editor').classList.remove('hidden');$('#active-project-name').textContent=activeProject.name;$('#public-link').href=$('#public-link-top').href=publicUrl(slug);render();scrollTo({top:0})}
async function boot(){if(!configured){$('#setup').classList.remove('hidden');return}db=supabase.createClient(cfg.supabaseUrl,cfg.supabaseAnonKey);const {data:{session}}=await db.auth.getSession();if(!session){$('#login').classList.remove('hidden');$('#email').value=cfg.adminEmail||"";return}await loadProjects()}
$('#send-login').onclick=async()=>{const {error}=await db.auth.signInWithOtp({email:$('#email').value,options:{emailRedirectTo:location.href}});$('#login-message').textContent=error?error.message:"登入連結已寄出，請至信箱開啟。"};
$('#create-project').onclick=async()=>{const name=$('#new-name').value.trim(),slug=$('#new-slug').value.trim().toLowerCase().replace(/[^a-z0-9-]+/g,'-').replace(/^-|-$/g,'');if(!name||!slug){$('#project-message').textContent='請填寫專案名稱與網址代號。';return}$('#project-message').textContent='建立中…';const initial=defaultData(slug);const {error}=await db.from('progress_projects').insert({name,slug,data:initial});if(error){$('#project-message').textContent=`建立失敗：${error.message}`;return}$('#new-name').value=$('#new-slug').value='';$('#project-message').textContent='專案已建立。';await loadProjects();openProject(slug)};
$('#publish').onclick=async()=>{if(!activeProject)return;collect();data.updated=new Date().toISOString().slice(0,10);$('#updated').value=data.updated;$('#message').textContent="發布中…";const now=new Date().toISOString();const {error}=await db.from('progress_projects').update({data,updated_at:now}).eq('slug',activeProject.slug);if(!error){activeProject.data=data;activeProject.updated_at=now}$('#message').textContent=error?`發布失敗：${error.message}`:"發布成功，客戶重新整理頁面即可看到。"};
const back=()=>showProjects();$('#back-projects').onclick=back;$('#back-projects-bottom').onclick=back;
$('#logout-projects').onclick=async()=>{await db.auth.signOut();location.reload()};boot();
