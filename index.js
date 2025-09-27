(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function a(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=a(s);fetch(s.href,r)}})();const c={listInput:document.querySelector(".list-input"),addListForm:document.querySelector(".add-new-list-form"),statsContainer:document.querySelector(".nav-stats"),cardsContainer:document.querySelector(".cards-list"),noCardsInfo:document.querySelector(".no-lists-info")},i=()=>JSON.parse(localStorage.getItem("todoApp"))||[],d=t=>{localStorage.setItem("todoApp",JSON.stringify(t))},u=()=>{const t=i();if(!t.length)c.statsContainer.textContent="0/0 tasks completed";else{const e=t.reduce((n,s)=>n+s.tasks.length,0),a=t.reduce((n,s)=>n+s.tasks.filter(r=>r.completed).length,0);c.statsContainer.textContent=`${a||"0"}/${e} tasks completed`}},f=t=>`
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
  `,p=t=>{const e=t.tasks.filter(a=>a.completed).length;return`
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
        <input type="text" name="taskName" placeholder="Add a new task" class="add-new-input task-input" />
        <button type="submit" class="primary-btn add-new-task-btn">
          <i class="fa-solid fa-plus"></i>
        </button>
      </form>
      <ul class="tasks-list">
        ${t.tasks.map(f).join("")}
      </ul>
    </li>
  `},o=()=>{const t=i();if(c.cardsContainer.innerHTML="",!t.length){c.cardsContainer.classList.add("invisible"),c.noCardsInfo.classList.remove("invisible");return}c.cardsContainer.classList.remove("invisible"),c.noCardsInfo.classList.add("invisible"),c.cardsContainer.innerHTML=t.map(p).join(""),u()},m=t=>{const e=i(),a={id:`list-${Date.now()}`,title:t,tasks:[]};e.push(a),d(e),o()},k=t=>{const a=i().filter(n=>n.id!==t);d(a),o()},b=(t,e)=>{const a=i(),n=a.find(r=>r.id===t);if(!n)return;const s={id:`task-${Date.now()}`,text:e,completed:!1};n.tasks.push(s),d(a),o()},v=(t,e)=>{const a=i(),n=a.find(s=>s.id===t);n&&(n.tasks=n.tasks.filter(s=>s.id!==e),d(a),o())},g=(t,e)=>{const a=i(),n=a.find(r=>r.id===t);if(!n)return;const s=n.tasks.find(r=>r.id===e);s.completed=!s.completed,s.completed?n.tasks=[...n.tasks.filter(r=>r.id!==e),s]:n.tasks=[s,...n.tasks.filter(r=>r.id!==e)],d(a),o()},y=t=>{const e=i();e.find(n=>n.id===t).tasks.map(n=>n.completed=!1),d(e),o()};c.addListForm.addEventListener("submit",t=>{t.preventDefault();const e=c.listInput.value.trim();e&&(m(e),c.listInput.value="")});c.cardsContainer.addEventListener("click",t=>{if(t.target.closest(".delete-card-btn")){const a=t.target.closest(".cards-item").dataset.id;k(a)}});c.cardsContainer.addEventListener("submit",t=>{const e=t.target.closest(".add-new-task-form");if(e){t.preventDefault();const a=e.querySelector(".task-input"),n=a.value.trim();if(!n)return;const r=e.closest(".cards-item").dataset.id;b(r,n),a.value=""}});c.cardsContainer.addEventListener("click",t=>{if(t.target.closest(".delete-task-btn")){const e=t.target.closest(".task-item"),a=e.dataset.id;if(!a)return;const s=e.closest(".cards-item").dataset.id;v(s,a)}});c.cardsContainer.addEventListener("click",t=>{if(t.target.closest(".task-check")){const e=t.target.closest(".task-item"),a=e.dataset.id;if(!a)return;const s=e.closest(".cards-item").dataset.id;g(s,a)}});c.cardsContainer.addEventListener("click",t=>{if(t.target.closest(".reset-all-tasks-btn")){const a=t.target.closest(".cards-item").dataset.id;y(a)}});const h=()=>{u(),o()};h();
//# sourceMappingURL=index.js.map
