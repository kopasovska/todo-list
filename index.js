import{a as u}from"./assets/vendor-CWxt7QI6.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const d of o.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&s(d)}).observe(document,{childList:!0,subtree:!0});function a(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(n){if(n.ep)return;n.ep=!0;const o=a(n);fetch(n.href,o)}})();const c={listInput:document.querySelector(".list-input"),addListForm:document.querySelector(".add-new-list-form"),statsContainer:document.querySelector(".nav-stats"),cardsContainer:document.querySelector(".cards-list"),noCardsInfo:document.querySelector(".no-lists-info"),themeToggleBtn:document.querySelector(".theme-toggle-btn"),root:document.documentElement},i=()=>JSON.parse(localStorage.getItem("todoApp"))||[],l=t=>{localStorage.setItem("todoApp",JSON.stringify(t))},m=()=>{const t=i();if(!t.length)c.statsContainer.textContent="0/0 tasks completed";else{const e=t.reduce((s,n)=>s+n.tasks.length,0),a=t.reduce((s,n)=>s+n.tasks.filter(o=>o.completed).length,0);c.statsContainer.textContent=`${a||"0"}/${e} tasks completed`}},p=t=>`
    <li class="task-item" data-id="${t.id}">
      <span class="task-info-wrapper">
        <i class="task-check fa-regular ${t.completed?"fa-circle-check":"fa-circle"}"></i>
        <p class="task-text ${t.completed?"muted-text":""}">${t.text}</p>
      </span>
      <div class="task-toolbar">
        <button type="button" class="secondary-btn edit-task-btn">
          <i class="fa-solid fa-pen"></i>
        </button>
        <button type="button" class="secondary-btn delete-task-btn">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    </li>
  `,k=t=>{const e=t.tasks.filter(s=>s.completed).length,a=[...t.tasks.filter(s=>!s.completed),...t.tasks.filter(s=>s.completed)];return`
    <li class="cards-item" data-id="${t.id}">
      <div class="card-header">
        <span class="card-title-wrapper">
          <i class="fa-solid fa-paperclip"></i>
          <p class="card-title">${t.title}</p>
        </span>
        <div class="card-toolbar">
          <div class="card-stats">${e}/${t.tasks.length} completed</div>
          <button type="button" class="secondary-btn reset-all-tasks-btn">
            <i class="fa-solid fa-rotate-right"></i>
          </button>
          <button type="button" class="secondary-btn delete-card-btn">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
      <form class="add-new-task-form">
        <input type="text" name="taskName" placeholder="Add a new task" class="text-input task-input" />
        <button type="submit" class="primary-btn add-new-task-btn">
          <i class="fa-solid fa-plus"></i>
        </button>
      </form>
      <ul class="tasks-list">
        ${a.map(p).join("")}
      </ul>
    </li>
  `},r=()=>{const t=i();if(c.cardsContainer.innerHTML="",!t.length){c.cardsContainer.classList.add("invisible"),c.noCardsInfo.classList.remove("invisible");return}c.cardsContainer.classList.remove("invisible"),c.noCardsInfo.classList.add("invisible"),c.cardsContainer.innerHTML=t.map(k).join(""),m()},g=t=>{const e=i(),a={id:`list-${Date.now()}`,title:t,tasks:[]};e.push(a),l(e),r()},b=t=>{const a=i().filter(s=>s.id!==t);l(a),r()},y=(t,e)=>{const a=i(),s=a.find(o=>o.id===t);if(!s)return;const n={id:`task-${Date.now()}`,text:e,completed:!1};s.tasks.push(n),l(a),r()},v=(t,e)=>{const a=i(),s=a.find(n=>n.id===t);s&&(s.tasks=s.tasks.filter(n=>n.id!==e),l(a),r())},h=(t,e)=>{const a=i(),s=a.find(o=>o.id===t);if(!s)return;const n=s.tasks.find(o=>o.id===e);n.completed=!n.completed,n.completed?s.tasks=[...s.tasks.filter(o=>o.id!==e),n]:s.tasks=[n,...s.tasks.filter(o=>o.id!==e)],l(a),r()},L=t=>{const e=i();e.find(s=>s.id===t).tasks.map(s=>s.completed=!1),l(e),r()},I=(t,e,a)=>{const s=i(),o=s.find(d=>d.id===t).tasks.find(d=>d.id===e);o.text=a,l(s),r()},C="aece857dab4839405411e9fc4ad000b3",w=async()=>{const t=await u.get("http://ip-api.com/json/");return{country:t.data.countryCode,city:t.data.city}},S=async(t,e)=>{try{return(await u.get("https://api.openweathermap.org/data/2.5/forecast/",{params:{q:`${e},${t}`,appid:C,units:"metric",lang:"en"}})).data}catch(a){console.log(a)}},T=async()=>{const t=await w();console.log("Location: ",t);const e=await S(t.countryCode,t.city);console.log("Forecast: ",e)},E=()=>{localStorage.getItem("theme")==="dark"&&c.root.classList.add("dark")};c.addListForm.addEventListener("submit",t=>{t.preventDefault();const e=c.listInput.value.trim();e&&(g(e),c.listInput.value="")});c.cardsContainer.addEventListener("click",t=>{if(t.target.closest(".delete-card-btn")){const a=t.target.closest(".cards-item").dataset.id;b(a)}});c.cardsContainer.addEventListener("submit",t=>{const e=t.target.closest(".add-new-task-form");if(e){t.preventDefault();const a=e.querySelector(".task-input"),s=a.value.trim();if(!s)return;const o=e.closest(".cards-item").dataset.id;y(o,s),a.value=""}});c.cardsContainer.addEventListener("click",t=>{if(t.target.closest(".delete-task-btn")){const e=t.target.closest(".task-item"),a=e.dataset.id;if(!a)return;const n=e.closest(".cards-item").dataset.id;v(n,a)}});c.cardsContainer.addEventListener("click",t=>{if(t.target.closest(".task-check")){const e=t.target.closest(".task-item"),a=e.dataset.id;if(!a)return;const n=e.closest(".cards-item").dataset.id;h(n,a)}});c.cardsContainer.addEventListener("click",t=>{if(t.target.closest(".reset-all-tasks-btn")){const a=t.target.closest(".cards-item").dataset.id;L(a)}});c.cardsContainer.addEventListener("click",t=>{if(t.target.closest(".edit-task-btn")){const e=t.target.closest(".task-item"),a=e.querySelector(".task-text"),s=document.createElement("input");s.type="text",s.className="text-input task-input",s.value=a.textContent,a.replaceWith(s),s.focus();const n=e.querySelector(".task-toolbar");n.innerHTML=`<button type="button" class="secondary-btn save-task-btn">
          <i class="fa-solid fa-check"></i>
        </button>
        <button type="button" class="secondary-btn cancel-edit-btn">
          <i class="fa-solid fa-xmark"></i>
        </button>`,e.classList.add("editing")}});const f=(t,e)=>{const s=t.closest(".cards-item").dataset.id,n=t.dataset.id;I(s,n,e)};c.cardsContainer.addEventListener("click",t=>{if(t.target.closest(".save-task-btn")){const e=t.target.closest(".task-item"),a=e.querySelector(".task-input").value.trim();if(!a)return;f(e,a)}});c.cardsContainer.addEventListener("keydown",t=>{if(t.key==="Enter"&&t.target.classList.contains("task-input")){const e=t.target.closest(".task-item"),a=e.querySelector(".task-input").value.trim();if(!a)return;f(e,a)}});c.cardsContainer.addEventListener("click",t=>{t.target.closest(".cancel-edit-btn")&&r()});c.cardsContainer.addEventListener("keydown",t=>{if(t.key==="Escape"&&t.target.classList.contains("task-input")){if(!t.target.closest(".task-item"))return;r()}});c.themeToggleBtn.addEventListener("click",()=>{c.root.classList.toggle("dark"),c.root.classList.contains("dark")?localStorage.setItem("theme","dark"):localStorage.setItem("theme","light")});const x=()=>{m(),T(),E(),r()};x();
//# sourceMappingURL=index.js.map
