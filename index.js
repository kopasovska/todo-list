(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const c of n)if(c.type==="childList")for(const d of c.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&s(d)}).observe(document,{childList:!0,subtree:!0});function a(n){const c={};return n.integrity&&(c.integrity=n.integrity),n.referrerPolicy&&(c.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?c.credentials="include":n.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function s(n){if(n.ep)return;n.ep=!0;const c=a(n);fetch(n.href,c)}})();const r={listInput:document.querySelector(".list-input"),addListForm:document.querySelector(".add-new-list-form"),statsContainer:document.querySelector(".nav-stats"),cardsContainer:document.querySelector(".cards-list"),noCardsInfo:document.querySelector(".no-lists-info")},o=()=>JSON.parse(localStorage.getItem("todoApp"))||[],l=t=>{localStorage.setItem("todoApp",JSON.stringify(t))},u=()=>{const t=o();if(!t.length)r.statsContainer.textContent="0/0 tasks completed";else{const e=t.reduce((s,n)=>s+n.tasks.length,0),a=t.reduce((s,n)=>s+n.tasks.filter(c=>c.completed).length,0);r.statsContainer.textContent=`${a||"0"}/${e} tasks completed`}},p=t=>`
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
  `,m=t=>{const e=t.tasks.filter(s=>s.completed).length,a=[...t.tasks.filter(s=>!s.completed),...t.tasks.filter(s=>s.completed)];return`
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
  `},i=()=>{const t=o();if(r.cardsContainer.innerHTML="",!t.length){r.cardsContainer.classList.add("invisible"),r.noCardsInfo.classList.remove("invisible");return}r.cardsContainer.classList.remove("invisible"),r.noCardsInfo.classList.add("invisible"),r.cardsContainer.innerHTML=t.map(m).join(""),u()},k=t=>{const e=o(),a={id:`list-${Date.now()}`,title:t,tasks:[]};e.push(a),l(e),i()},b=t=>{const a=o().filter(s=>s.id!==t);l(a),i()},v=(t,e)=>{const a=o(),s=a.find(c=>c.id===t);if(!s)return;const n={id:`task-${Date.now()}`,text:e,completed:!1};s.tasks.push(n),l(a),i()},g=(t,e)=>{const a=o(),s=a.find(n=>n.id===t);s&&(s.tasks=s.tasks.filter(n=>n.id!==e),l(a),i())},y=(t,e)=>{const a=o(),s=a.find(c=>c.id===t);if(!s)return;const n=s.tasks.find(c=>c.id===e);n.completed=!n.completed,n.completed?s.tasks=[...s.tasks.filter(c=>c.id!==e),n]:s.tasks=[n,...s.tasks.filter(c=>c.id!==e)],l(a),i()},L=t=>{const e=o();e.find(s=>s.id===t).tasks.map(s=>s.completed=!1),l(e),i()},I=(t,e,a)=>{const s=o(),c=s.find(d=>d.id===t).tasks.find(d=>d.id===e);c.text=a,l(s),i()};r.addListForm.addEventListener("submit",t=>{t.preventDefault();const e=r.listInput.value.trim();e&&(k(e),r.listInput.value="")});r.cardsContainer.addEventListener("click",t=>{if(t.target.closest(".delete-card-btn")){const a=t.target.closest(".cards-item").dataset.id;b(a)}});r.cardsContainer.addEventListener("submit",t=>{const e=t.target.closest(".add-new-task-form");if(e){t.preventDefault();const a=e.querySelector(".task-input"),s=a.value.trim();if(!s)return;const c=e.closest(".cards-item").dataset.id;v(c,s),a.value=""}});r.cardsContainer.addEventListener("click",t=>{if(t.target.closest(".delete-task-btn")){const e=t.target.closest(".task-item"),a=e.dataset.id;if(!a)return;const n=e.closest(".cards-item").dataset.id;g(n,a)}});r.cardsContainer.addEventListener("click",t=>{if(t.target.closest(".task-check")){const e=t.target.closest(".task-item"),a=e.dataset.id;if(!a)return;const n=e.closest(".cards-item").dataset.id;y(n,a)}});r.cardsContainer.addEventListener("click",t=>{if(t.target.closest(".reset-all-tasks-btn")){const a=t.target.closest(".cards-item").dataset.id;L(a)}});r.cardsContainer.addEventListener("click",t=>{if(t.target.closest(".edit-task-btn")){const e=t.target.closest(".task-item"),a=e.querySelector(".task-text"),s=document.createElement("input");s.type="text",s.className="text-input task-input",s.value=a.textContent,a.replaceWith(s),s.focus();const n=e.querySelector(".task-toolbar");n.innerHTML=`<button type="button" class="secondary-btn save-task-btn">
          <i class="fa-solid fa-check"></i>
        </button>
        <button type="button" class="secondary-btn cancel-edit-btn">
          <i class="fa-solid fa-xmark"></i>
        </button>`,e.classList.add("editing")}});const f=(t,e)=>{const s=t.closest(".cards-item").dataset.id,n=t.dataset.id;I(s,n,e)};r.cardsContainer.addEventListener("click",t=>{if(t.target.closest(".save-task-btn")){const e=t.target.closest(".task-item"),a=e.querySelector(".task-input").value.trim();if(!a)return;f(e,a)}});r.cardsContainer.addEventListener("keydown",t=>{if(t.key==="Enter"&&t.target.classList.contains("task-input")){const e=t.target.closest(".task-item"),a=e.querySelector(".task-input").value.trim();if(!a)return;f(e,a)}});r.cardsContainer.addEventListener("click",t=>{t.target.closest(".cancel-edit-btn")&&i()});r.cardsContainer.addEventListener("keydown",t=>{if(t.key==="Escape"&&t.target.classList.contains("task-input")){if(!t.target.closest(".task-item"))return;i()}});const C=()=>{u(),i()};C();
//# sourceMappingURL=index.js.map
