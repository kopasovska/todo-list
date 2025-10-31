import{a as D,f as W}from"./assets/vendor-i2X6OA9E.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const l of i.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&a(l)}).observe(document,{childList:!0,subtree:!0});function s(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(n){if(n.ep)return;n.ep=!0;const i=s(n);fetch(n.href,i)}})();const r={listInput:document.querySelector(".list-input"),addListForm:document.querySelector(".add-new-list-form"),statsContainer:document.querySelector(".nav-stats"),cardsContainer:document.querySelector(".cards-list"),noCardsInfo:document.querySelector(".no-lists-info"),themeToggleBtn:document.querySelector(".theme-toggle-btn"),root:document.documentElement,weatherButton:document.querySelector(".weather-button"),faSunIcon:document.querySelector(".fa-sun"),faCloudIcon:document.querySelector(".fa-cloud"),weatherWidget:document.querySelector(".weather-widget")},d=()=>JSON.parse(localStorage.getItem("todoApp"))||[],m=t=>{localStorage.setItem("todoApp",JSON.stringify(t))},$=()=>{const t=d();if(!t.length)r.statsContainer.textContent="0/0 tasks completed";else{const e=t.reduce((a,n)=>a+n.tasks.length,0),s=t.reduce((a,n)=>a+n.tasks.filter(i=>i.completed).length,0);r.statsContainer.textContent=`${s||"0"}/${e} tasks completed`}},q=t=>`
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
  `,A=t=>{const e=t.tasks.filter(a=>a.completed).length,s=[...t.tasks.filter(a=>!a.completed),...t.tasks.filter(a=>a.completed)];return`
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
        ${s.map(q).join("")}
      </ul>
    </li>
  `},c=()=>{const t=d();if(r.cardsContainer.innerHTML="",!t.length){r.cardsContainer.classList.add("invisible"),r.noCardsInfo.classList.remove("invisible");return}r.cardsContainer.classList.remove("invisible"),r.noCardsInfo.classList.add("invisible"),r.cardsContainer.innerHTML=t.map(A).join(""),$()},M=t=>{const e=d(),s={id:`list-${Date.now()}`,title:t,tasks:[]};e.push(s),m(e),c()},N=t=>{const s=d().filter(a=>a.id!==t);m(s),c()},O=(t,e)=>{const s=d(),a=s.find(i=>i.id===t);if(!a)return;const n={id:`task-${Date.now()}`,text:e,completed:!1};a.tasks.push(n),m(s),c()},B=(t,e)=>{const s=d(),a=s.find(n=>n.id===t);a&&(a.tasks=a.tasks.filter(n=>n.id!==e),m(s),c())},P=(t,e)=>{const s=d(),a=s.find(i=>i.id===t);if(!a)return;const n=a.tasks.find(i=>i.id===e);n.completed=!n.completed,n.completed?a.tasks=[...a.tasks.filter(i=>i.id!==e),n]:a.tasks=[n,...a.tasks.filter(i=>i.id!==e)],m(s),c()},F=t=>{const e=d();e.find(a=>a.id===t).tasks.map(a=>a.completed=!1),m(e),c()},H=(t,e,s)=>{const a=d(),i=a.find(l=>l.id===t).tasks.find(l=>l.id===e);i.text=s,m(a),c()};function j(){const t=new Date,e=t.toLocaleDateString("en-GB",{weekday:"long"}),s=t.toLocaleTimeString("en-GB",{hour:"2-digit",minute:"2-digit",hour12:!1});return`${e}, ${s}`}function R(t){return Array.from(t).map(e=>{const s=Math.floor(e/3600),a=Math.floor(e%3600/60);return`${s}h ${a.toString().padStart(2,"0")}m`})}function b(t){return t===0?"Clear":[1,2,3].includes(t)?"Cloudy":[45,48].includes(t)?"Fog":t>=51&&t<=67?"Rain":t>=71&&t<=77?"Snow":t>=80&&t<=82?"Rain showers":t>=95&&t<=99?"Thunderstorms":"Unknown"}const U=async()=>{const t=await D.get("https://ipapi.co/json/");return{lat:t.data.latitude,lon:t.data.longitude,city:t.data.city,country:t.data.country_name}},G=async({lat:t,lon:e,city:s,country:a})=>{const y=(await W("https://api.open-meteo.com/v1/forecast",{latitude:t,longitude:e,daily:["weather_code","temperature_2m_max","temperature_2m_min","sunrise","daylight_duration","sunset"],current:["temperature_2m","relative_humidity_2m","rain","snowfall","weather_code","wind_speed_10m","precipitation","is_day"]}))[0],v=y.utcOffsetSeconds(),u=y.current(),f=y.daily(),k=f.variables(3),w=f.variables(5),_=[...f.variables(0).valuesArray()].map(p=>b(p)),I=[...f.variables(1).valuesArray()],x=[...f.variables(2).valuesArray()],T=Array.from({length:7},(p,h)=>{const g=new Date;return g.setDate(g.getDate()+h),g.toLocaleDateString("en-ES",{weekday:"short"})});return{city:s,country:a,current:{time:j(),temperature_2m:Math.round(u.variables(0).value()),relative_humidity_2m:u.variables(1).value(),rain:u.variables(2).value(),snowfall:u.variables(3).value(),weather_code:b(u.variables(4).value()),wind_speed_10m:Math.round(u.variables(5).value()),precipitation:u.variables(6).value(),is_day:u.variables(7).value()},daily:{time:T,weather_code:_,temperature_2m_max:I.map(p=>Math.round(p)),temperature_2m_min:x.map(p=>Math.round(p)),sunrise:[...Array(k.valuesInt64Length())].map((p,h)=>new Date((Number(k.valuesInt64(h))+v)*1e3).toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit",hour12:!0}).toLowerCase()),daylight_duration:R(f.variables(4).valuesArray()),sunset:[...Array(w.valuesInt64Length())].map((p,h)=>new Date((Number(w.valuesInt64(h))+v)*1e3).toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit",hour12:!0}).toLowerCase())}}},L=async()=>{try{const t=await U();return await G(t)}catch(t){console.log(t)}},J=()=>{localStorage.getItem("theme")==="dark"&&r.root.classList.add("dark")},o="/todo-list/assets/sprite-B4SLLCvi.svg",S=(t,e)=>{if(t==="Clear"&&e)return`${o}#icon-sun`;if(t==="Clear"&&!e)return`${o}#icon-moon`;if(t==="Cloudy"&&e)return`${o}#icon-partly-cloudy`;if(t==="Cloudy"&&!e)return`${o}#icon-partly-cloudy-night`;if(t==="Fog")return`${o}#icon-cloudy`;if(t==="Rain")return`${o}#icon-rainy`;if(t==="Snow")return`${o}#icon-snowy`;if(t==="Thunderstorms")return`${o}#icon-thunder`;if(t==="Unknown")return`${o}#icon-unknown`},K=t=>t?`<div class="today-weather-wrapper glass-effect">
    <div class="today-weather-info">
      <svg class="today-weather-icon" width="80" height="80" aria-hidden="true">
        <use href=${S(t.current.weather_code,t.current.is_day)}></use>
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
          <use href="${o}#icon-sunrise"></use>
        </svg>
        <p class="weather-bright-text">${t.daily.sunrise[0]}</p>
      </span>
      <p class="weather-bright-text">${t.daily.daylight_duration[0]}</p>
      <span class="sun-wrapper">
        <p class="weather-bright-text">${t.daily.sunset[0]}</p>
        <svg class="sun-icon" width="24" height="24" aria-hidden="true">
          <use href="${o}#icon-sunset"></use>
        </svg>
      </span>
    </div>
  </div>
  <div class="rain-info-wrapper glass-effect">
    <svg class="rainy-icon" width="24" height="24" aria-hidden="true">
      <use href="${o}#icon-rainy"></use>
    </svg>
    <p class="weather-text">Rain: <span class="bold-text">${t.current.precipitation}%</span></p>
  </div>
  <div class="additional-info-wrapper">
    <p class="weather-text">Humidity: <span class="bold-text">${t.current.relative_humidity_2m}%</span></p>
    <p class="weather-text">Wind: <span class="bold-text">${t.current.wind_speed_10m} m/s</span></p>
  </div>
  <ul class="forecast-list">
  ${t.daily.time.map((s,a)=>`<li class="forecast-item glass-effect">
      <p class="weather-text day-of-week-text">${a===0?"Today":s}</p>
      <svg class="rainy-icon" width="24" height="24" aria-hidden="true">
        <use href="${S(t.daily.weather_code[a])}"></use>
      </svg>
      <p class="weather-text">${t.daily.temperature_2m_max[a]}&deg;</p>
      <p class="weather-text">${t.daily.temperature_2m_min[a]}&deg;</p>
    </li>`).join("")}
  </ul>`:`<p>Oooops...</p>
  <p>Something went wrong :( </p>
  <p>Try again later!</p>`,z=t=>{r.weatherWidget.innerHTML="",r.weatherWidget.innerHTML=K(t)};r.addListForm.addEventListener("submit",t=>{t.preventDefault();const e=r.listInput.value.trim();e&&(M(e),r.listInput.value="")});r.cardsContainer.addEventListener("click",t=>{if(t.target.closest(".delete-card-btn")){const s=t.target.closest(".cards-item").dataset.id;N(s)}});r.cardsContainer.addEventListener("submit",t=>{const e=t.target.closest(".add-new-task-form");if(e){t.preventDefault();const s=e.querySelector(".task-input"),a=s.value.trim();if(!a)return;const i=e.closest(".cards-item").dataset.id;O(i,a),s.value=""}});r.cardsContainer.addEventListener("click",t=>{if(t.target.closest(".delete-task-btn")){const e=t.target.closest(".task-item"),s=e.dataset.id;if(!s)return;const n=e.closest(".cards-item").dataset.id;B(n,s)}});r.cardsContainer.addEventListener("click",t=>{if(t.target.closest(".task-check")){const e=t.target.closest(".task-item"),s=e.dataset.id;if(!s)return;const n=e.closest(".cards-item").dataset.id;P(n,s)}});r.cardsContainer.addEventListener("click",t=>{if(t.target.closest(".reset-all-tasks-btn")){const s=t.target.closest(".cards-item").dataset.id;F(s)}});r.cardsContainer.addEventListener("click",t=>{if(t.target.closest(".edit-task-btn")){const e=t.target.closest(".task-item"),s=e.querySelector(".task-text"),a=document.createElement("input");a.type="text",a.className="text-input task-input",a.value=s.textContent,s.replaceWith(a),a.focus();const n=e.querySelector(".task-toolbar");n.innerHTML=`<button type="button" class="secondary-btn save-task-btn">
          <i class="fa-solid fa-check"></i>
        </button>
        <button type="button" class="secondary-btn cancel-edit-btn">
          <i class="fa-solid fa-xmark"></i>
        </button>`,e.classList.add("editing")}});const C=(t,e)=>{const a=t.closest(".cards-item").dataset.id,n=t.dataset.id;H(a,n,e)};r.cardsContainer.addEventListener("click",t=>{if(t.target.closest(".save-task-btn")){const e=t.target.closest(".task-item"),s=e.querySelector(".task-input").value.trim();if(!s)return;C(e,s)}});r.cardsContainer.addEventListener("keydown",t=>{if(t.key==="Enter"&&t.target.classList.contains("task-input")){const e=t.target.closest(".task-item"),s=e.querySelector(".task-input").value.trim();if(!s)return;C(e,s)}});r.cardsContainer.addEventListener("click",t=>{t.target.closest(".cancel-edit-btn")&&c()});r.cardsContainer.addEventListener("keydown",t=>{if(t.key==="Escape"&&t.target.classList.contains("task-input")){if(!t.target.closest(".task-item"))return;c()}});r.themeToggleBtn.addEventListener("click",()=>{r.root.classList.toggle("dark"),r.root.classList.contains("dark")?localStorage.setItem("theme","dark"):localStorage.setItem("theme","light")});r.weatherButton.addEventListener("click",t=>{t.stopPropagation(),r.weatherWidget.classList.contains("opened")?(r.weatherWidget.classList.remove("opened"),r.faSunIcon.classList.remove("hidden"),r.faCloudIcon.classList.remove("opened")):(r.weatherWidget.classList.add("opened"),r.faSunIcon.classList.add("hidden"),r.faCloudIcon.classList.add("opened"))});document.addEventListener("click",t=>{r.weatherWidget.contains(t.target)||r.weatherWidget.classList.remove("opened")});const Q=async()=>{$(),L(),J(),c();const t=await L();z(t)};Q();
//# sourceMappingURL=index.js.map
