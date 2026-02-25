import{a as y,s as p}from"./url-CeekiTZl.js";import{R as s}from"./presence-BUWGs17Q.js";const b={resonant:[s.GUIDE_RESONANT,s.WALKER_RESONANT],dissonant:[s.GUIDE_DISSONANT,s.WALKER_DISSONANT]},E={resonant:"#b57bee",dissonant:"#4db8aa"};async function R(t){const{roomId:r,token:f,team:a}=y(),l=a==="resonant"||a==="dissonant"?a:"dissonant";if(t.style.cssText="font-family:monospace;background:#0d0920;color:#fff;display:flex;align-items:center;justify-content:center;height:100dvh;margin:0",!r||!f){t.innerHTML=`<p style="color:#f66;text-align:center">
            ⚠ Потрібні параметри room та token<br>
            <small style="color:#9080b0">Скопіюй URL з game.html і заміни сторінку на dev-mock</small>
        </p>`;return}const e=b[l],d=E[l],c=[];t.innerHTML=`<div style="display:flex;flex-direction:column;align-items:center;gap:1rem;text-align:center;padding:2rem">
        <p style="font-size:2rem;margin:0">🛠</p>
        <p style="font-size:1.2rem;font-weight:bold;margin:0">DEV MOCK</p>
        <p style="margin:0">Команда: <strong style="color:${d}">${l.toUpperCase()}</strong></p>
        <p style="color:#9080b0;font-size:0.8rem;margin:0">Симулює: ${e.join(" + ")}</p>
        <p style="color:#9080b0;font-size:0.8rem;margin:0">Room: ${r}</p>
        <p id="status" style="color:#666;font-size:0.8rem;margin:0">Підключення…</p>
        <p style="color:#32d46a;font-size:0.8rem;margin:0">✓ Тримай вкладку відкритою</p>
    </div>`;const m=t.querySelector("#status");let o=0;for(const n of e){const i=p.channel("presence-"+r,{config:{presence:{key:n}}});i.subscribe(async g=>{g==="SUBSCRIBED"&&(await i.track({role:n}),o++,m.textContent=o===e.length?"✓ Обидва гравці підключені":`Підключено ${o} / ${e.length}…`,m.style.color=o===e.length?"#32d46a":"#fbbc05")}),c.push(i)}window.addEventListener("beforeunload",()=>{c.forEach(n=>{n.untrack(),p.removeChannel(n)})})}export{R as initDevMock};
