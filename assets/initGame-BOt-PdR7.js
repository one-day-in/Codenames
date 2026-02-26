import{o as v,c as _,e as w}from"./sanitize-s2klz6Q2.js";import{g as $,f as m}from"./renderCell-j9Yfrae9.js";import{a as E,g as a,G as B,t as x,D as y}from"./url-oOUZ7you.js";import{b as L}from"./auth-Cy9wPIq3.js";import{I as o}from"./icons-DY9imHO6.js";async function C(i){const{roomId:r,token:u}=E();if(!r||!u){window.location.href=a()+"/index.html";return}i.innerHTML=`
        <div class="app">
            <div class="lobby-screen">
                <h1 class="lobby__title">${B}</h1>
                <p>${x(y).loading}</p>
            </div>
        </div>`;const t=_(r);if(await t.init(),!t.getState()){window.location.href=a()+"/index.html";return}function f(n){const{cells:s}=n,g=s.filter(e=>e.role==="resonant").length,b=s.filter(e=>e.role==="dissonant").length,p=s.filter(e=>e.role==="resonant"&&e.revealed).length,h=s.filter(e=>e.role==="dissonant"&&e.revealed).length;document.body.className=`team-${n.turn.team}`,i.innerHTML=`
        <div class="game">
            <div class="grid grid--5">
                ${s.map(e=>`
                    <div class="${$(e)}">
                        <span class="cell__content">${w(e.word)}</span>
                    </div>
                `).join("")}
            </div>
        </div>

        <div class="game__score">
            <span class="game__score-item game__score-item--resonant">${p} / ${g}</span>
            <span class="game__score-item game__score-item--dissonant">${h} / ${b}</span>
        </div>

        <button class="btn-back btn-icon" id="backBtn">${o.arrowLeft}</button>
        <button class="btn-profile btn-icon" id="profileBtn">${o.user}</button>
        <button class="fullscreen-btn btn-icon" id="fullscreenBtn">${o.maximize}</button>
        `,document.getElementById("backBtn").addEventListener("click",()=>{window.location.href=a()+"/index.html"}),document.getElementById("profileBtn").addEventListener("click",async()=>{await L(),window.location.href=a()+"/index.html"}),document.getElementById("fullscreenBtn").addEventListener("click",()=>{var e,c,d;document.fullscreenElement?(d=document.exitFullscreen)==null||d.call(document):(c=(e=document.documentElement).requestFullscreen)==null||c.call(e)}),requestAnimationFrame(()=>m(i))}function l(){const n=t.getState();if(t.getLanguage(),!n){window.location.href=a()+"/index.html";return}if(n.phase==="lobby"){t.startGame();return}f(n)}t.subscribe(l),v(()=>m(i)),l()}export{C as initGame};
