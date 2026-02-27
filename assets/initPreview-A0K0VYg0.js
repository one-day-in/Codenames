import{c as x}from"./boardFactory-CFSUbiZD.js";import{f as y,g as $,a as S}from"./renderCell-j9Yfrae9.js";import{I as u}from"./icons-DY9imHO6.js";const E=`
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
    padding: 6px 11px;
    background: var(--game-btn-bg);
    color: var(--game-btn-color);
    border: var(--game-btn-border);
    border-radius: 8px;
    box-shadow: var(--game-btn-shadow);
    font-size: 11px;
    font-family: monospace;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    cursor: pointer;
    white-space: nowrap;
    transition: background 0.15s, border-color 0.15s, color 0.15s, box-shadow 0.15s;
}
.preview-nav__btn--active {
    background: var(--game-btn-bg-active);
    border-color: var(--resonant-light);
    color: var(--text-main);
    box-shadow: 0 0 20px rgba(255, 223, 174, 0.34);
}
.preview-nav__btn:hover:not(.preview-nav__btn--active) {
    background: var(--game-btn-bg-hover);
    border-color: rgba(230,205,165,0.75);
    color: var(--game-btn-color-hover);
    box-shadow: var(--game-btn-shadow-hover);
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
`,L=["МРІЯ","ТІНЬ","ХВИЛЯ","ЗІРКА","КРИЛО","МІСЯЦЬ","ВОГОНЬ","ЛІХТАР","ДОРОГА","ПІСНЯ","КАМІНЬ","ВІТЕР","ОЗЕРО","РАНОК","ЛИСТОК","ТУМАН","БЕРЕГ","НЕБО","СТРУНА","КВІТКА","ЖАРА","ДУМКА","СЛОВО","МОРЕ","КЛЮЧ"],C=[{id:"game",label:"Game"},{id:"guide-resonant",label:"Guide R"},{id:"guide-dissonant",label:"Guide D"},{id:"walker-resonant",label:"Walker R"},{id:"walker-dissonant",label:"Walker D"},{id:"home",label:"Home"}];function A(){const{cells:t,startsFirst:e}=x({size:5,words:L});return{phase:"game",size:5,cells:t,turn:{team:e,guideLimit:3,dreamwalkerMoves:1},gameOver:!1,winner:null}}function T(t){document.body.className=`team-${t.turn.team}`;const{cells:e}=t,s=e.filter(n=>n.role==="resonant").length,i=e.filter(n=>n.role==="dissonant").length,c=e.filter(n=>n.role==="resonant"&&n.revealed).length,d=e.filter(n=>n.role==="dissonant"&&n.revealed).length;return`
    <div class="game preview-clickable">
        <div class="grid grid--5">
            ${e.map((n,b)=>`
                <div class="${$(n)}" data-index="${b}">
                    <span class="cell__content">${n.word}</span>
                </div>
            `).join("")}
        </div>
    </div>

    <div class="game__score">
        <span class="game__score-item game__score-item--resonant">${c} / ${s}</span>
        <span class="game__score-item game__score-item--dissonant">${d} / ${i}</span>
    </div>

    <button class="btn-back btn-icon">${u.arrowLeft}</button>
    <button class="btn-profile btn-icon">${u.user}</button>
    <button class="fullscreen-btn btn-icon">${u.maximize}</button>`}function h(t,e){document.body.className="";const{guideLimit:s,team:i}=t.turn,c=i===e,d=s!==null,n=e.charAt(0).toUpperCase()+e.slice(1),b=c&&!d?`${n} guide : your turn`:`${n} guide`,o=Array.from({length:8},(r,a)=>{const v=a+1;return`<button class="guide__num-btn ${s===v?"guide__num-btn--chosen":""}" ${c&&!d?"":"disabled"}>${v}</button>`}).join("");return`
    <div class="guide guide--${e} preview-clickable">
        <div class="grid grid--5">
            ${t.cells.map((r,a)=>`
                <div class="${S(r)}" data-index="${a}">
                    <span class="cell__content">${r.word}</span>
                </div>
            `).join("")}
        </div>
    </div>

    <div class="guide__status">${b}</div>
    <div class="guide__btns">${o}</div>`}function k(t,e){document.body.className=`team-${t.turn.team}`;const{team:s,guideLimit:i}=t.turn,c=s===e,d=c&&i!==null,n=e.charAt(0).toUpperCase()+e.slice(1),b=c&&i!==null?`${n} walker : ${i} steps`:`${n} walker`;return`
    <div class="walker walker--${e} preview-clickable">
        <div class="grid grid--5">
            ${t.cells.map((o,r)=>`
                <div class="${$(o)}" data-index="${r}">
                    <span class="cell__content">${o.word}</span>
                </div>
            `).join("")}
        </div>
    </div>

    <div class="walker__status">${b}</div>

    <button class="walker__end-turn" ${d?"":"disabled"}>
        End Turn
    </button>`}function N(){return document.body.className="",`
    <div class="app">
        <div class="lang-toggle">
            <button class="lang-toggle__btn lang-toggle__btn--active">UK</button>
            <button class="lang-toggle__btn">EN</button>
            <button class="lang-toggle__btn">RU</button>
        </div>
        <div class="lobby-screen">
            <h1 class="lobby__title">SleepWalkers</h1>
            <div class="lobby-screen__actions">
                <button class="lobby__btn lobby__btn--continue">Продовжити гру</button>
                <button class="lobby__btn lobby__btn--newgame">Нова гра</button>
            </div>
        </div>
    </div>
    <button class="btn-profile btn-icon">${u.user}</button>
    <button class="fullscreen-btn btn-icon">${u.maximize}</button>`}function M(t){const e=document.createElement("style");e.textContent=E,document.head.appendChild(e);const s=A();function i(){return new URLSearchParams(location.search).get("screen")||"game"}function c(r){const a=new URL(location.href);a.searchParams.set("screen",r),history.pushState({},"",a),o()}function d(r){const a=s.cells[r];a&&(a.revealed=!a.revealed,o())}function n(){s.cells.forEach(r=>r.revealed=!0),o()}function b(){s.cells.forEach(r=>r.revealed=!1),o()}function o(){var m,_,w;const r=i();let a="";switch(r){case"game":a=T(s);break;case"guide-resonant":a=h(s,"resonant");break;case"guide-dissonant":a=h(s,"dissonant");break;case"walker-resonant":a=k(s,"resonant");break;case"walker-dissonant":a=k(s,"dissonant");break;case"home":a=N();break}const v=s.cells.filter(l=>l.revealed).length,g=s.cells.length,p=`
        <nav class="preview-nav">
            ${C.map(l=>`
                <button
                    class="preview-nav__btn ${l.id===r?"preview-nav__btn--active":""}"
                    data-screen="${l.id}"
                >${l.label}</button>
            `).join("")}

            <div class="preview-nav__sep"></div>

            <button class="preview-nav__btn" data-action="hide-all">✕ All</button>
            <button class="preview-nav__btn" data-action="reveal-all">✓ All</button>

            <div class="preview-nav__sep"></div>

            <span class="preview-nav__btn" style="cursor:default; opacity:0.5;">
                ${v}/${g}
            </span>
        </nav>`;t.innerHTML=a+p,t.querySelectorAll(".preview-nav__btn[data-screen]").forEach(l=>{l.addEventListener("click",()=>c(l.dataset.screen))}),(m=t.querySelector('[data-action="reveal-all"]'))==null||m.addEventListener("click",n),(_=t.querySelector('[data-action="hide-all"]'))==null||_.addEventListener("click",b),(w=t.querySelector(".grid"))==null||w.addEventListener("click",l=>{const f=l.target.closest("[data-index]");f&&d(Number(f.dataset.index))}),requestAnimationFrame(()=>y(t))}window.addEventListener("popstate",o),o()}export{M as initPreview};
