import{c as h}from"./gameStore-BPAqR2vV.js";import{f as v}from"./fitText-CKNkjoIc.js";import{g as _}from"./renderCell-C7h02id-.js";import{a as w,g as o,G as $,t as E,D as B}from"./url-oOUZ7you.js";import{b as x}from"./auth-Cy9wPIq3.js";import{I as i}from"./icons-DY9imHO6.js";async function T(a){const{roomId:r,token:m}=w();if(!r||!m){window.location.href=o()+"/index.html";return}a.innerHTML=`
        <div class="app">
            <div class="lobby-screen">
                <h1 class="lobby__title">${$}</h1>
                <p>${E(B).loading}</p>
            </div>
        </div>`;const t=h(r);if(await t.init(),!t.getState()){window.location.href=o()+"/index.html";return}function u(n){const{cells:s}=n,f=s.filter(e=>e.role==="resonant").length,g=s.filter(e=>e.role==="dissonant").length,b=s.filter(e=>e.role==="resonant"&&e.revealed).length,p=s.filter(e=>e.role==="dissonant"&&e.revealed).length;document.body.className=`team-${n.turn.team}`,a.innerHTML=`
        <div class="game">
            <div class="grid grid--5">
                ${s.map(e=>`
                    <div class="${_(e)}">
                        <span class="cell__content">${e.word}</span>
                    </div>
                `).join("")}
            </div>
        </div>

        <div class="game__score">
            <span class="game__score-item game__score-item--resonant">${b} / ${f}</span>
            <span class="game__score-item game__score-item--dissonant">${p} / ${g}</span>
        </div>

        <button class="btn-back btn-icon" id="backBtn">${i.arrowLeft}</button>
        <button class="btn-profile btn-icon" id="profileBtn">${i.user}</button>
        <button class="fullscreen-btn btn-icon" id="fullscreenBtn">${i.maximize}</button>
        `,document.getElementById("backBtn").addEventListener("click",()=>{window.location.href=o()+"/index.html"}),document.getElementById("profileBtn").addEventListener("click",async()=>{await x(),window.location.href=o()+"/index.html"}),document.getElementById("fullscreenBtn").addEventListener("click",()=>{var e,c,d;document.fullscreenElement?(d=document.exitFullscreen)==null||d.call(document):(c=(e=document.documentElement).requestFullscreen)==null||c.call(e)}),requestAnimationFrame(()=>v(a))}function l(){const n=t.getState();if(t.getLanguage(),!n){window.location.href=o()+"/index.html";return}if(n.phase==="lobby"){t.startGame();return}u(n)}t.subscribe(l),l()}export{T as initGame};
