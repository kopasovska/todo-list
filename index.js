import{a as D,f as E}from"./assets/vendor-i2X6OA9E.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const d of n.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&s(d)}).observe(document,{childList:!0,subtree:!0});function a(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerPolicy&&(n.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?n.credentials="include":r.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(r){if(r.ep)return;r.ep=!0;const n=a(r);fetch(r.href,n)}})();const i={listInput:document.querySelector(".list-input"),addListForm:document.querySelector(".add-new-list-form"),statsContainer:document.querySelector(".nav-stats"),cardsContainer:document.querySelector(".cards-list"),noCardsInfo:document.querySelector(".no-lists-info"),themeToggleBtn:document.querySelector(".theme-toggle-btn"),root:document.documentElement,weatherWidget:document.querySelector(".weather-widget")},c=()=>JSON.parse(localStorage.getItem("todoApp"))||[],p=t=>{localStorage.setItem("todoApp",JSON.stringify(t))},_=()=>{const t=c();if(!t.length)i.statsContainer.textContent="0/0 tasks completed";else{const e=t.reduce((s,r)=>s+r.tasks.length,0),a=t.reduce((s,r)=>s+r.tasks.filter(n=>n.completed).length,0);i.statsContainer.textContent=`${a||"0"}/${e} tasks completed`}},A=t=>`
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
  `,M=t=>{const e=t.tasks.filter(s=>s.completed).length,a=[...t.tasks.filter(s=>!s.completed),...t.tasks.filter(s=>s.completed)];return`
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
        ${a.map(A).join("")}
      </ul>
    </li>
  `},o=()=>{const t=c();if(i.cardsContainer.innerHTML="",!t.length){i.cardsContainer.classList.add("invisible"),i.noCardsInfo.classList.remove("invisible");return}i.cardsContainer.classList.remove("invisible"),i.noCardsInfo.classList.add("invisible"),i.cardsContainer.innerHTML=t.map(M).join(""),_()},W=t=>{const e=c(),a={id:`list-${Date.now()}`,title:t,tasks:[]};e.push(a),p(e),o()},q=t=>{const a=c().filter(s=>s.id!==t);p(a),o()},N=(t,e)=>{const a=c(),s=a.find(n=>n.id===t);if(!s)return;const r={id:`task-${Date.now()}`,text:e,completed:!1};s.tasks.push(r),p(a),o()},O=(t,e)=>{const a=c(),s=a.find(r=>r.id===t);s&&(s.tasks=s.tasks.filter(r=>r.id!==e),p(a),o())},F=(t,e)=>{const a=c(),s=a.find(n=>n.id===t);if(!s)return;const r=s.tasks.find(n=>n.id===e);r.completed=!r.completed,r.completed?s.tasks=[...s.tasks.filter(n=>n.id!==e),r]:s.tasks=[r,...s.tasks.filter(n=>n.id!==e)],p(a),o()},H=t=>{const e=c();e.find(s=>s.id===t).tasks.map(s=>s.completed=!1),p(e),o()},P=(t,e,a)=>{const s=c(),n=s.find(d=>d.id===t).tasks.find(d=>d.id===e);n.text=a,p(s),o()};function B(){const t=new Date,e=t.toLocaleDateString("en-GB",{weekday:"long"}),a=t.toLocaleTimeString("en-GB",{hour:"2-digit",minute:"2-digit",hour12:!1});return`${e}, ${a}`}function j(t){return Array.from(t).map(e=>{const a=Math.floor(e/3600),s=Math.floor(e%3600/60);return`${a}h ${s.toString().padStart(2,"0")}m`})}function w(t){return t===0?"Clear":[1,2,3].includes(t)?"Cloudy":[45,48].includes(t)?"Fog":t>=51&&t<=67?"Rain":t>=71&&t<=77?"Snow":t>=80&&t<=82?"Rain showers":t>=95&&t<=99?"Thunderstorms":"Unknown"}const R=async()=>{const t=await D.get("https://ipapi.co/json/");return{lat:t.data.latitude,lon:t.data.longitude,city:t.data.city,country:t.data.country_name}},U=async({lat:t,lon:e,city:a,country:s})=>{const h=(await E("https://api.open-meteo.com/v1/forecast",{latitude:t,longitude:e,daily:["weather_code","temperature_2m_max","temperature_2m_min","sunrise","daylight_duration","sunset"],current:["temperature_2m","relative_humidity_2m","rain","snowfall","weather_code","wind_speed_10m","precipitation","is_day"]}))[0],v=h.utcOffsetSeconds(),l=h.current(),m=h.daily(),y=m.variables(3),k=m.variables(5),x=[...m.variables(0).valuesArray()].map(u=>w(u)),S=[...m.variables(1).valuesArray()],I=[...m.variables(2).valuesArray()],$=Array.from({length:7},(u,f)=>{const g=new Date;return g.setDate(g.getDate()+f),g.toLocaleDateString("en-ES",{weekday:"short"})});return{city:a,country:s,current:{time:B(),temperature_2m:Math.round(l.variables(0).value()),relative_humidity_2m:l.variables(1).value(),rain:l.variables(2).value(),snowfall:l.variables(3).value(),weather_code:w(l.variables(4).value()),wind_speed_10m:Math.round(l.variables(5).value()),precipitation:l.variables(6).value(),is_day:l.variables(7).value()},daily:{time:$,weather_code:x,temperature_2m_max:S.map(u=>Math.round(u)),temperature_2m_min:I.map(u=>Math.round(u)),sunrise:[...Array(y.valuesInt64Length())].map((u,f)=>new Date((Number(y.valuesInt64(f))+v)*1e3).toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit",hour12:!0}).toLowerCase()),daylight_duration:j(m.variables(4).valuesArray()),sunset:[...Array(k.valuesInt64Length())].map((u,f)=>new Date((Number(k.valuesInt64(f))+v)*1e3).toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit",hour12:!0}).toLowerCase())}}},b=async()=>{try{const t=await R();return await U(t)}catch(t){console.log(t)}},G=()=>{localStorage.getItem("theme")==="dark"&&i.root.classList.add("dark")},L=(t,e)=>{if(t==="Clear"&&e)return"./img/sprite.svg#icon-sun";if(t==="Clear"&&!e)return"./img/sprite.svg#icon-moon";if(t==="Cloudy"&&e)return"./img/sprite.svg#icon-partly-cloudy";if(t==="Cloudy"&&!e)return"./img/sprite.svg#icon-partly-cloudy-night";if(t==="Fog")return"./img/sprite.svg#icon-cloudy";if(t==="Rain")return"./img/sprite.svg#icon-rainy";if(t==="Snow")return"./img/sprite.svg#icon-snowy";if(t==="Thunderstorms")return"./img/sprite.svg#icon-thunder";if(t==="Unknown")return"./img/sprite.svg#icon-unknown"},J=t=>t?`<div class="today-weather-wrapper glass-effect">
    <div class="today-weather-info">
      <svg class="today-weather-icon" width="80" height="80" aria-hidden="true">
        <use href=${L(t.current.weather_code,t.current.is_day)}></use>
      </svg>
      <span class="today-weather-data-wrapper">
        <p class="weather-text today-date">${t.current.time}</p>
        <p class="weather-text today-weather bold-text">${t.current.weather_code}, ${t.current.temperature_2m}&deg;</p>
        <p class="weather-text today-location">${t.city}, ${t.country}</p>
      </span>
    </div>
    <div class="sun-info-wrapper">
      <span class="sun-wrapper">
        <svg class="sun-icon" width="24" height="24" aria-hidden="true">
          <use href="../img/sprite.svg#icon-sunrise"></use>
        </svg>
        <p class="weather-bright-text">${t.daily.sunrise[0]}</p>
      </span>
      <p class="weather-bright-text">${t.daily.daylight_duration[0]}</p>
      <span class="sun-wrapper">
        <p class="weather-bright-text">${t.daily.sunset[0]}</p>
        <svg class="sun-icon" width="24" height="24" aria-hidden="true">
          <use href="../img/sprite.svg#icon-sunset"></use>
        </svg>
      </span>
    </div>
  </div>
  <div class="rain-info-wrapper glass-effect">
    <svg class="rainy-icon" width="24" height="24" aria-hidden="true">
      <use href="../img/sprite.svg#icon-rainy"></use>
    </svg>
    <p class="weather-text">Rain: <span class="bold-text">${t.current.precipitation}%</span></p>
  </div>
  <div class="additional-info-wrapper">
    <p class="weather-text">Humidity: <span class="bold-text">${t.current.relative_humidity_2m}%</span></p>
    <p class="weather-text">Wind: <span class="bold-text">${t.current.wind_speed_10m} m/s</span></p>
  </div>
  <ul class="forecast-list">
  ${t.daily.time.map((a,s)=>`<li class="forecast-item glass-effect">
      <p class="weather-text day-of-week-text">${s===0?"Today":a}</p>
      <svg class="rainy-icon" width="24" height="24" aria-hidden="true">
        <use href="${L(t.daily.weather_code[s])}"></use>
      </svg>
      <p class="weather-text">${t.daily.temperature_2m_max[s]}&deg;</p>
      <p class="weather-text">${t.daily.temperature_2m_min[s]}&deg;</p>
    </li>`).join("")}
  </ul>`:`<p>Oooops...</p>
  <p>Something went wrong :( </p>
  <p>Try again later!</p>`,K=t=>{i.weatherWidget.innerHTML="",i.weatherWidget.innerHTML=J(t)};i.addListForm.addEventListener("submit",t=>{t.preventDefault();const e=i.listInput.value.trim();e&&(W(e),i.listInput.value="")});i.cardsContainer.addEventListener("click",t=>{if(t.target.closest(".delete-card-btn")){const a=t.target.closest(".cards-item").dataset.id;q(a)}});i.cardsContainer.addEventListener("submit",t=>{const e=t.target.closest(".add-new-task-form");if(e){t.preventDefault();const a=e.querySelector(".task-input"),s=a.value.trim();if(!s)return;const n=e.closest(".cards-item").dataset.id;N(n,s),a.value=""}});i.cardsContainer.addEventListener("click",t=>{if(t.target.closest(".delete-task-btn")){const e=t.target.closest(".task-item"),a=e.dataset.id;if(!a)return;const r=e.closest(".cards-item").dataset.id;O(r,a)}});i.cardsContainer.addEventListener("click",t=>{if(t.target.closest(".task-check")){const e=t.target.closest(".task-item"),a=e.dataset.id;if(!a)return;const r=e.closest(".cards-item").dataset.id;F(r,a)}});i.cardsContainer.addEventListener("click",t=>{if(t.target.closest(".reset-all-tasks-btn")){const a=t.target.closest(".cards-item").dataset.id;H(a)}});i.cardsContainer.addEventListener("click",t=>{if(t.target.closest(".edit-task-btn")){const e=t.target.closest(".task-item"),a=e.querySelector(".task-text"),s=document.createElement("input");s.type="text",s.className="text-input task-input",s.value=a.textContent,a.replaceWith(s),s.focus();const r=e.querySelector(".task-toolbar");r.innerHTML=`<button type="button" class="secondary-btn save-task-btn">
          <i class="fa-solid fa-check"></i>
        </button>
        <button type="button" class="secondary-btn cancel-edit-btn">
          <i class="fa-solid fa-xmark"></i>
        </button>`,e.classList.add("editing")}});const C=(t,e)=>{const s=t.closest(".cards-item").dataset.id,r=t.dataset.id;P(s,r,e)};i.cardsContainer.addEventListener("click",t=>{if(t.target.closest(".save-task-btn")){const e=t.target.closest(".task-item"),a=e.querySelector(".task-input").value.trim();if(!a)return;C(e,a)}});i.cardsContainer.addEventListener("keydown",t=>{if(t.key==="Enter"&&t.target.classList.contains("task-input")){const e=t.target.closest(".task-item"),a=e.querySelector(".task-input").value.trim();if(!a)return;C(e,a)}});i.cardsContainer.addEventListener("click",t=>{t.target.closest(".cancel-edit-btn")&&o()});i.cardsContainer.addEventListener("keydown",t=>{if(t.key==="Escape"&&t.target.classList.contains("task-input")){if(!t.target.closest(".task-item"))return;o()}});i.themeToggleBtn.addEventListener("click",()=>{i.root.classList.toggle("dark"),i.root.classList.contains("dark")?localStorage.setItem("theme","dark"):localStorage.setItem("theme","light")});const z=async()=>{_(),b(),G(),o();const t=await b();K(t)};z();
//# sourceMappingURL=index.js.map
