import{c as x}from"./boardFactory-CFSUbiZD.js";import{g as h,a as y}from"./renderCell-C7h02id-.js";import{f as L}from"./fitText-CKNkjoIc.js";import{I as b}from"./icons-DY9imHO6.js";const S=`
/* NAV */
.preview-nav {
    position: fixed;
    bottom: 0; left: 0; right: 0;
    z-index: 9999;
    display: flex;
    gap: 4px;
    padding: 6px 8px;
    background: rgba(0,0,0,0.92);
    backdrop-filter: blur(12px);
    overflow-x: auto;
    border-top: 1px solid rgba(255,255,255,0.1);
    -webkit-overflow-scrolling: touch;
}
.preview-nav__btn {
    flex-shrink: 0;
    padding: 5px 11px;
    background: rgba(255,255,255,0.08);
    color: rgba(255,255,255,0.65);
    border: 1px solid rgba(255,255,255,0.15);
    border-radius: 5px;
    font-size: 11px;
    font-family: monospace;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    cursor: pointer;
    white-space: nowrap;
    transition: background 0.15s, color 0.15s;
}
.preview-nav__btn--active {
    background: rgba(123,47,190,0.55);
    border-color: rgba(180,123,238,0.5);
    color: #fff;
}
.preview-nav__btn:hover:not(.preview-nav__btn--active) {
    background: rgba(255,255,255,0.15);
    color: #fff;
}
.preview-nav__sep {
    width: 1px;
    background: rgba(255,255,255,0.15);
    flex-shrink: 0;
    margin: 4px 2px;
}
/* Всі клітинки клікабельні в preview */
.preview-clickable .cell {
    cursor: pointer;
    outline: none;
}
.preview-clickable .cell:hover {
    outline: 1px solid rgba(255,255,255,0.3);
    outline-offset: -1px;
}
`,E=["МРІЯ","ТІНЬ","ХВИЛЯ","ЗІРКА","КРИЛО","МІСЯЦЬ","ВОГОНЬ","ЛІХТАР","ДОРОГА","ПІСНЯ","КАМІНЬ","ВІТЕР","ОЗЕРО","РАНОК","ЛИСТОК","ТУМАН","БЕРЕГ","НЕБО","СТРУНА","КВІТКА","ЖАРА","ДУМКА","СЛОВО","МОРЕ","КЛЮЧ"],C=[{id:"game",label:"Game"},{id:"guide-resonant",label:"Guide R"},{id:"guide-dissonant",label:"Guide D"},{id:"walker-resonant",label:"Walker R"},{id:"walker-dissonant",label:"Walker D"},{id:"home",label:"Home"}];function A(){const{cells:n,startsFirst:e}=x({size:5,words:E});return{phase:"game",size:5,cells:n,turn:{team:e,guideLimit:3,dreamwalkerMoves:1},gameOver:!1,winner:null}}function T(n){document.body.className=`team-${n.turn.team}`;const{cells:e}=n,s=e.filter(t=>t.role==="resonant").length,i=e.filter(t=>t.role==="dissonant").length,c=e.filter(t=>t.role==="resonant"&&t.revealed).length,d=e.filter(t=>t.role==="dissonant"&&t.revealed).length;return`
    <div class="game preview-clickable">
        <div class="grid grid--5">
            ${e.map((t,u)=>`
                <div class="${h(t)}" data-index="${u}">
                    <span class="cell__content">${t.word}</span>
                </div>
            `).join("")}
        </div>
    </div>

    <div class="game__score">
        <span class="game__score-item game__score-item--resonant">${c} / ${s}</span>
        <span class="game__score-item game__score-item--dissonant">${d} / ${i}</span>
    </div>

    <button class="btn-back btn-icon">${b.arrowLeft}</button>
    <button class="btn-profile btn-icon">${b.user}</button>
    <button class="fullscreen-btn btn-icon">${b.maximize}</button>`}function k(n,e){document.body.className="";const{guideLimit:s,team:i}=n.turn,c=i===e,d=s!==null,t=e.charAt(0).toUpperCase()+e.slice(1),u=c&&!d?`${t} guide : your turn`:`${t} guide`,r=Array.from({length:8},(l,a)=>{const v=a+1;return`<button class="guide__num-btn ${s===v?"guide__num-btn--chosen":""}" ${c&&!d?"":"disabled"}>${v}</button>`}).join("");return`
    <div class="guide guide--${e} preview-clickable">
        <div class="grid grid--5">
            ${n.cells.map((l,a)=>`
                <div class="${y(l)}" data-index="${a}">
                    <span class="cell__content">${l.word}</span>
                </div>
            `).join("")}
        </div>
    </div>

    <div class="guide__status">${u}</div>
    <div class="guide__btns">${r}</div>`}function $(n,e){document.body.className=`team-${n.turn.team}`;const{team:s,guideLimit:i}=n.turn,c=s===e,d=c&&i!==null,t=e.charAt(0).toUpperCase()+e.slice(1),u=c&&i!==null?`${t} walker : ${i} steps`:`${t} walker`;return`
    <div class="walker walker--${e} preview-clickable">
        <div class="grid grid--5">
            ${n.cells.map((r,l)=>`
                <div class="${h(r)}" data-index="${l}">
                    <span class="cell__content">${r.word}</span>
                </div>
            `).join("")}
        </div>
    </div>

    <div class="walker__status">${u}</div>

    <button class="walker__end-turn" ${d?"":"disabled"}>
        End Turn
    </button>`}function N(){return document.body.className="",`
    <div class="app">
        <div class="lang-toggle">
            <button class="lang-toggle__btn lang-toggle__btn--active">UA</button>
            <button class="lang-toggle__btn">EN</button>
        </div>
        <div class="lobby-screen">
            <h1 class="lobby__title">SleepWalkers</h1>
            <div class="lobby-screen__actions">
                <button class="lobby__btn lobby__btn--continue">Продовжити гру</button>
                <button class="lobby__btn lobby__btn--newgame">Нова гра</button>
            </div>
        </div>
        <button class="sign-out-btn btn-icon" title="user@mail.com" aria-label="Logout">${b.arrowLeft}</button>
        <button class="btn-profile btn-icon">${b.user}</button>
        <button class="fullscreen-btn btn-icon">${b.maximize}</button>
    </div>`}function W(n){const e=document.createElement("style");e.textContent=S,document.head.appendChild(e);const s=A();function i(){return new URLSearchParams(location.search).get("screen")||"game"}function c(l){const a=new URL(location.href);a.searchParams.set("screen",l),history.pushState({},"",a),r()}function d(l){const a=s.cells[l];a&&(a.revealed=!a.revealed,r())}function t(){s.cells.forEach(l=>l.revealed=!0),r()}function u(){s.cells.forEach(l=>l.revealed=!1),r()}function r(){var m,_,f;const l=i();let a="";switch(l){case"game":a=T(s);break;case"guide-resonant":a=k(s,"resonant");break;case"guide-dissonant":a=k(s,"dissonant");break;case"walker-resonant":a=$(s,"resonant");break;case"walker-dissonant":a=$(s,"dissonant");break;case"home":a=N();break}const v=s.cells.filter(o=>o.revealed).length,p=s.cells.length,g=`
        <nav class="preview-nav">
            ${C.map(o=>`
                <button
                    class="preview-nav__btn ${o.id===l?"preview-nav__btn--active":""}"
                    data-screen="${o.id}"
                >${o.label}</button>
            `).join("")}

            <div class="preview-nav__sep"></div>

            <button class="preview-nav__btn" data-action="hide-all">✕ All</button>
            <button class="preview-nav__btn" data-action="reveal-all">✓ All</button>

            <div class="preview-nav__sep"></div>

            <span class="preview-nav__btn" style="cursor:default; opacity:0.5;">
                ${v}/${p}
            </span>
        </nav>`;n.innerHTML=a+g,n.querySelectorAll(".preview-nav__btn[data-screen]").forEach(o=>{o.addEventListener("click",()=>c(o.dataset.screen))}),(m=n.querySelector('[data-action="reveal-all"]'))==null||m.addEventListener("click",t),(_=n.querySelector('[data-action="hide-all"]'))==null||_.addEventListener("click",u),(f=n.querySelector(".grid"))==null||f.addEventListener("click",o=>{const w=o.target.closest("[data-index]");w&&d(Number(w.dataset.index))}),requestAnimationFrame(()=>L(n))}window.addEventListener("popstate",r),r()}export{W as initPreview};
