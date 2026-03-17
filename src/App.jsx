import { useState, useRef, useEffect } from “react”;

const B = “#41708C”;
const BL = “#EBF3F7”;
const BD = “#2e5068”;

// ── ICONS ────────────────────────────────────────────────────────────────────
const IShield = ({size=20,color=“currentColor”}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
const IHome   = ({size=20,color=“currentColor”}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
const IStore  = ({size=20,color=“currentColor”}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>;
const ISend   = ({size=16}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2" fill="#fff"/></svg>;
const ICheck  = ({size=14,color=”#16a34a”}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;
const IWarn   = ({size=13,color=”#B45309”}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>;
const IPin    = ({size=11}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>;
const ICal    = ({size=11}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
const ICard   = ({size=14}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>;
const IStar   = ({size=12}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="#FBBF24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
const IUp     = ({size=11}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>;

// ── DATA ─────────────────────────────────────────────────────────────────────
const PRE = [
{id:1, match:“México vs Argentina”,  venue:“Estadio Azteca”,  city:“CDMX”,        date:“15 Jun 2026”, price:”$8,200”,  cat:“Cat 2”},
{id:2, match:“Brasil vs Alemania”,   venue:“Estadio Akron”,   city:“Guadalajara”,  date:“18 Jun 2026”, price:”$6,800”,  cat:“Cat 3”},
{id:3, match:“Final del Torneo”,     venue:“MetLife Stadium”, city:“Nueva York”,   date:“19 Jul 2026”, price:”$14,500”, cat:“Cat 1”},
];
const MKT = [
{id:1, match:“España vs Portugal”,    city:“CDMX”,        date:“20 Jun 2026”, price:”$9,100”,  orig:”$12,000”, seller:“Carlos M.”, rating:4.9, cat:“Cat 2”, hot:true},
{id:2, match:“Francia vs Inglaterra”, city:“Monterrey”,   date:“22 Jun 2026”, price:”$7,400”,  orig:”$9,500”,  seller:“Ana R.”,    rating:5.0, cat:“Cat 3”, hot:false},
{id:3, match:“EUA vs México”,         city:“Dallas”,      date:“25 Jun 2026”, price:”$11,200”, orig:”$15,000”, seller:“Diego L.”,  rating:4.8, cat:“Cat 1”, hot:true},
{id:4, match:“Argentina vs Brasil”,   city:“Los Ángeles”, date:“28 Jun 2026”, price:”$13,800”, orig:”$18,000”, seller:“Sofía T.”,  rating:4.7, cat:“Cat 2”, hot:false},
];
const TH_M = [{icon:“🔄”,text:“Analizando inventario disponible…”},{icon:“⚡”,text:“Cruzando con tu liquidez (b)…”},{icon:“✅”,text:“Estructurando plan de pagos…”}];
const TH_V = [{icon:“🔄”,text:“Calculando costo VIP…”},{icon:“⚠️”,text:“Cruzando con liquidez actual…”},{icon:“✅”,text:“Buscando alternativa viable…”}];

const nowT = () => new Date().toLocaleTimeString(“es-MX”,{hour:“2-digit”,minute:“2-digit”});
const disc  = (p,o) => Math.round((1-parseInt(p.replace(/[$,]/g,””))/parseInt(o.replace(/[$,]/g,””)))*100);

// ── TOAST ────────────────────────────────────────────────────────────────────
function Toast({msg,show}) {
return (
<div style={{position:“fixed”,top:20,left:“50%”,transform:`translateX(-50%) translateY(${show?0:-70}px)`,opacity:show?1:0,transition:“all 0.3s”,zIndex:9999,pointerEvents:“none”}}>
<div style={{background:”#16a34a”,color:”#fff”,padding:“10px 18px”,borderRadius:16,fontSize:13,fontWeight:600,display:“flex”,alignItems:“center”,gap:7,boxShadow:“0 8px 24px rgba(0,0,0,0.2)”}}>
<ICheck size={14} color="#fff"/> {msg}
</div>
</div>
);
}

// ── THINKING ─────────────────────────────────────────────────────────────────
function Thinking({steps,cur}) {
return (
<div style={{background:”#fff”,border:“1px solid #E2E8F0”,borderRadius:16,padding:“12px 14px”,maxWidth:268}}>
<p style={{fontSize:10,color:”#94A3B8”,fontWeight:700,letterSpacing:“0.06em”,margin:“0 0 8px”,textTransform:“uppercase”}}>Yunus está procesando</p>
{steps.map((s,i)=>(
<div key={i} style={{display:“flex”,alignItems:“center”,gap:8,marginBottom:i<steps.length-1?7:0,opacity:i<=cur?1:0.3,transition:“opacity 0.4s”}}>
<span style={{fontSize:14,lineHeight:1}}>{s.icon}</span>
<span style={{fontSize:12,fontWeight:500,color:i<cur?”#94A3B8”:i===cur?”#334155”:”#94A3B8”,textDecoration:i<cur?“line-through”:“none”,flex:1}}>{s.text}</span>
{i<cur && <ICheck size={12} color="#16a34a"/>}
{i===cur && (
<span style={{display:“flex”,gap:3}}>
{[0,1,2].map(d=><span key={d} style={{width:5,height:5,borderRadius:“50%”,background:B,display:“inline-block”,animation:“ybounce 0.8s infinite”,animationDelay:`${d*150}ms`}}/>)}
</span>
)}
</div>
))}
<style>{`@keyframes ybounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}`}</style>
</div>
);
}

// ── PLAN CARD ────────────────────────────────────────────────────────────────
function PlanCard({plan,onPay,paid}) {
return (
<div style={{border:“1px solid #E2E8F0”,borderRadius:18,overflow:“hidden”,background:”#fff”,maxWidth:290}}>
<div style={{background:`linear-gradient(135deg,${B},${BD})`,padding:“12px 14px”,display:“flex”,justifyContent:“space-between”,alignItems:“flex-start”}}>
<div>
{plan.type===“soft_no” && <span style={{fontSize:10,background:“rgba(255,255,255,0.2)”,color:”#fff”,padding:“2px 8px”,borderRadius:20,fontWeight:600,display:“inline-block”,marginBottom:4}}>Contraoferta 💡</span>}
<p style={{color:”#fff”,fontWeight:700,fontSize:13,margin:0}}>{plan.match}</p>
<p style={{color:“rgba(255,255,255,0.7)”,fontSize:11,margin:“2px 0 0”,display:“flex”,alignItems:“center”,gap:4}}><IPin size={10}/>{plan.city} · {plan.date}</p>
{plan.qty && <p style={{color:“rgba(255,255,255,0.85)”,fontSize:11,marginTop:3,fontWeight:600}}>{plan.qty}</p>}
</div>
<span style={{fontSize:10,background:“rgba(255,255,255,0.2)”,color:”#fff”,padding:“3px 8px”,borderRadius:12,fontWeight:700,flexShrink:0,marginLeft:8}}>{plan.cat}</span>
</div>
<div style={{padding:“12px 14px”}}>
<div style={{display:“grid”,gridTemplateColumns:“1fr 1fr 1fr”,gap:6,marginBottom:10}}>
{[
{label:“Total”,value:plan.total,bg:BL,color:B},
{label:“Anticipo”,value:plan.anticipo,bg:”#FFF7ED”,color:”#EA580C”},
{label:`${plan.quincenas}x Quinc.`,value:plan.cuota,bg:”#F0FDF4”,color:”#16a34a”},
].map(c=>(
<div key={c.label} style={{background:c.bg,borderRadius:10,padding:“6px 4px”,textAlign:“center”}}>
<p style={{fontSize:10,color:”#64748B”,margin:0}}>{c.label}</p>
<p style={{fontSize:12,fontWeight:700,color:c.color,margin:0}}>{c.value}</p>
</div>
))}
</div>
<div style={{marginBottom:10}}>
<p style={{fontSize:10,color:”#94A3B8”,marginBottom:5,fontWeight:600,letterSpacing:“0.05em”}}>CALENDARIO DE PAGOS</p>
<div style={{display:“flex”,gap:4}}>
{Array.from({length:plan.quincenas}).map((_,i)=>(
<div key={i} style={{flex:1,height:5,borderRadius:4,background:i===0&&paid?B:”#E2E8F0”,transition:“background 0.4s”}}/>
))}
</div>
<p style={{fontSize:10,color:”#94A3B8”,marginTop:3}}>{plan.cuota}/quincena</p>
</div>
{paid ? (
<div style={{background:”#F0FDF4”,borderRadius:12,padding:9,display:“flex”,alignItems:“center”,justifyContent:“center”,gap:6,fontSize:13,fontWeight:600,color:”#16a34a”}}>
<ICheck size={14}/> Enganche pagado ✓
</div>
) : (
<button onClick={onPay} style={{width:“100%”,padding:“9px 0”,borderRadius:12,background:B,color:”#fff”,border:“none”,fontSize:13,fontWeight:600,cursor:“pointer”,display:“flex”,alignItems:“center”,justifyContent:“center”,gap:6}}>
<ICard size={14}/> Pagar Enganche ({plan.anticipo})
</button>
)}
</div>
</div>
);
}

// ── PRE-APPROVED CAROUSEL (rendered inline inside chat) ───────────────────────
function CarouselCard({ci,setCi}) {
return (
<div style={{marginBottom:4}}>
<div style={{display:“flex”,justifyContent:“space-between”,alignItems:“center”,marginBottom:6}}>
<p style={{fontSize:10,fontWeight:700,color:”#94A3B8”,letterSpacing:“0.07em”,textTransform:“uppercase”,margin:0}}>⚡ Pre-aprobados Mundial 2026</p>
<div style={{display:“flex”,gap:4}}>
<button onClick={()=>setCi(i=>(i-1+PRE.length)%PRE.length)} style={{width:20,height:20,borderRadius:“50%”,border:“none”,background:”#F1F5F9”,cursor:“pointer”,fontSize:13,color:”#64748B”,display:“flex”,alignItems:“center”,justifyContent:“center”,lineHeight:1}}>‹</button>
<button onClick={()=>setCi(i=>(i+1)%PRE.length)}            style={{width:20,height:20,borderRadius:“50%”,border:“none”,background:”#F1F5F9”,cursor:“pointer”,fontSize:13,color:”#64748B”,display:“flex”,alignItems:“center”,justifyContent:“center”,lineHeight:1}}>›</button>
</div>
</div>
<div style={{background:`linear-gradient(135deg,${B},${BD})`,borderRadius:16,padding:“12px 14px”,position:“relative”,overflow:“hidden”}}>
<div style={{position:“absolute”,top:-16,right:-16,width:80,height:80,borderRadius:“50%”,background:“rgba(255,255,255,0.07)”}}/>
<div style={{display:“flex”,justifyContent:“space-between”,alignItems:“flex-start”}}>
<div>
<span style={{fontSize:10,background:“rgba(255,255,255,0.2)”,color:”#fff”,padding:“2px 7px”,borderRadius:20,fontWeight:600}}>Pre-aprobado ✓</span>
<p style={{color:”#fff”,fontWeight:700,fontSize:13,margin:“5px 0 2px”}}>{PRE[ci].match}</p>
<p style={{color:“rgba(255,255,255,0.7)”,fontSize:11,margin:0,display:“flex”,alignItems:“center”,gap:3}}><IPin size={10}/>{PRE[ci].venue}, {PRE[ci].city}</p>
<p style={{color:“rgba(255,255,255,0.7)”,fontSize:11,margin:“2px 0 0”,display:“flex”,alignItems:“center”,gap:3}}><ICal size={10}/>{PRE[ci].date}</p>
</div>
<div style={{textAlign:“right”,flexShrink:0,marginLeft:10}}>
<p style={{color:“rgba(255,255,255,0.7)”,fontSize:10,margin:0}}>{PRE[ci].cat}</p>
<p style={{color:”#fff”,fontWeight:800,fontSize:18,margin:“2px 0 0”}}>{PRE[ci].price}</p>
</div>
</div>
<div style={{display:“flex”,gap:4,marginTop:8}}>
{PRE.map((_,i)=><div key={i} style={{flex:1,height:3,borderRadius:3,background:i===ci?”#fff”:“rgba(255,255,255,0.3)”,transition:“background 0.3s”}}/>)}
</div>
</div>
</div>
);
}

// ── BUBBLE ───────────────────────────────────────────────────────────────────
function Bubble({msg,onPay,paid}) {
const u = msg.role===“user”;
return (
<div style={{display:“flex”,justifyContent:u?“flex-end”:“flex-start”,marginBottom:14}}>
{!u && <div style={{width:28,height:28,borderRadius:“50%”,background:B,color:”#fff”,fontSize:12,fontWeight:700,display:“flex”,alignItems:“center”,justifyContent:“center”,marginRight:8,flexShrink:0,marginTop:2}}>Y</div>}
<div style={{maxWidth:“84%”}}>
{msg.type===“thinking” && <Thinking steps={msg.steps} cur={msg.cur}/>}
{msg.type===“text” && (
<div style={{padding:“10px 13px”,borderRadius:18,borderTopLeftRadius:u?18:4,borderTopRightRadius:u?4:18,background:u?B:”#fff”,color:u?”#fff”:”#334155”,fontSize:13,lineHeight:1.55,boxShadow:u?“none”:“0 1px 4px rgba(0,0,0,0.07)”,border:u?“none”:“1px solid #F1F5F9”}}>
{msg.content}
</div>
)}
{msg.type===“carousel” && (
<div style={{width:290}}>
<CarouselCard ci={msg.ci} setCi={msg.setCi}/>
</div>
)}
{(msg.type===“plan”||msg.type===“soft_no”) && (
<div>
{msg.content && (
<div style={{padding:“10px 13px”,borderRadius:18,borderTopLeftRadius:4,background:”#fff”,color:”#334155”,fontSize:13,lineHeight:1.55,boxShadow:“0 1px 4px rgba(0,0,0,0.07)”,border:“1px solid #F1F5F9”,marginBottom:8}}>
{msg.content}
</div>
)}
{msg.type===“soft_no” && (
<div style={{background:”#FFFBEB”,border:“1px solid #FDE68A”,borderRadius:12,padding:“9px 12px”,marginBottom:8}}>
<p style={{fontSize:11,fontWeight:700,color:”#B45309”,margin:“0 0 3px”,display:“flex”,alignItems:“center”,gap:5}}><IWarn size={12}/> Análisis de Riesgo Financiero</p>
<p style={{fontSize:12,color:”#92400E”,margin:0}}>{msg.warning}</p>
</div>
)}
<PlanCard plan={msg.plan} onPay={()=>onPay(msg.plan)} paid={paid}/>
</div>
)}
<p style={{fontSize:10,color:”#94A3B8”,marginTop:3,paddingLeft:2}}>{msg.time}</p>
</div>
</div>
);
}

// ══════════════════════════════════════════════════════════════════
// BÓVEDA — empty state until purchases are made
// ══════════════════════════════════════════════════════════════════
function Boveda({tickets}) {
const [resell,setResell] = useState(null);
const all = tickets.map(t=>({
id:t.id, match:t.match, city:t.city, date:t.date, cat:t.cat,
paid:1, total:t.quincenas,
pct:Math.round(100/t.quincenas),
pagado:t.anticipo,
rest:`$${(parseInt(t.total.replace(/[$,]/g,""))-parseInt(t.anticipo.replace(/[$,]/g,""))).toLocaleString("es-MX")}`
}));

return (
<div style={{flex:1,overflowY:“auto”,display:“flex”,flexDirection:“column”}}>
{/* Header */}
<div style={{padding:“16px 20px 14px”,background:”#fff”,flexShrink:0}}>
<p style={{fontSize:11,fontWeight:700,color:B,letterSpacing:“0.08em”,textTransform:“uppercase”,margin:0}}>Tu espacio seguro</p>
<h1 style={{fontSize:26,fontWeight:800,color:”#0F172A”,margin:“2px 0 0”}}>Bóveda 🔒</h1>
</div>

```
  {all.length === 0 ? (
    /* ── EMPTY STATE ── */
    <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"40px 32px",background:"#F8FAFC"}}>
      <div style={{width:72,height:72,borderRadius:24,background:BL,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:16,fontSize:32}}>
        🎫
      </div>
      <p style={{fontSize:17,fontWeight:700,color:"#0F172A",margin:"0 0 8px",textAlign:"center"}}>Tu bóveda está vacía</p>
      <p style={{fontSize:13,color:"#94A3B8",margin:"0 0 24px",textAlign:"center",lineHeight:1.5}}>Cuando adquieras un boleto aparecerá aquí con su plan de pagos y toda la información.</p>
      <div style={{background:"#fff",border:"1px dashed #CBD5E1",borderRadius:16,padding:"14px 18px",width:"100%",maxWidth:280}}>
        <p style={{fontSize:11,fontWeight:700,color:"#94A3B8",textTransform:"uppercase",letterSpacing:"0.06em",margin:"0 0 8px"}}>¿Cómo funciona?</p>
        {["Descubre boletos en el chat con Yunus","Yunus analiza tu liquidez y te propone un plan","Paga el enganche y el boleto aparece aquí"].map((s,i)=>(
          <div key={i} style={{display:"flex",gap:10,marginBottom:i<2?8:0,alignItems:"flex-start"}}>
            <div style={{width:20,height:20,borderRadius:"50%",background:BL,color:B,fontSize:11,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1}}>{i+1}</div>
            <p style={{fontSize:12,color:"#64748B",margin:0,lineHeight:1.4}}>{s}</p>
          </div>
        ))}
      </div>
    </div>
  ) : (
    /* ── TICKETS ── */
    <div style={{padding:"4px 20px 24px",background:"#F8FAFC",flex:1}}>
      {/* Summary pill */}
      <div style={{background:BL,borderRadius:14,padding:"11px 14px",display:"flex",justifyContent:"space-between",marginBottom:14}}>
        <div><p style={{fontSize:11,color:"#64748B",margin:0}}>Boletos activos</p><p style={{fontSize:26,fontWeight:800,color:B,margin:0}}>{all.length}</p></div>
        <div style={{textAlign:"right"}}>
          <p style={{fontSize:11,color:"#64748B",margin:0}}>Valor total</p>
          <p style={{fontSize:18,fontWeight:800,color:"#0F172A",margin:0}}>${all.reduce((_,t)=>parseInt(t.pagado.replace(/[$,]/g,"")),0).toLocaleString("es-MX")} pagados</p>
        </div>
      </div>
      <p style={{fontSize:11,fontWeight:700,color:"#94A3B8",letterSpacing:"0.07em",textTransform:"uppercase",marginBottom:10}}>Mis Boletos</p>
      {all.map(t=>(
        <div key={t.id} style={{background:"#fff",borderRadius:18,overflow:"hidden",border:"1px solid #F1F5F9",boxShadow:"0 1px 4px rgba(0,0,0,0.05)",marginBottom:12}}>
          <div style={{background:`linear-gradient(135deg,${B},${BD})`,padding:"11px 14px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div>
              <p style={{color:"#fff",fontWeight:700,fontSize:14,margin:0}}>{t.match}</p>
              <p style={{color:"rgba(255,255,255,0.7)",fontSize:11,margin:"2px 0 0",display:"flex",alignItems:"center",gap:4}}><IPin size={10}/>{t.city} · {t.date}</p>
            </div>
            <span style={{fontSize:10,background:"rgba(255,255,255,0.2)",color:"#fff",padding:"3px 8px",borderRadius:12,fontWeight:700}}>{t.cat}</span>
          </div>
          <div style={{padding:"12px 14px"}}>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:"#64748B",marginBottom:5}}>
              <span>Progreso de pago</span><span style={{color:B,fontWeight:700}}>{t.paid}/{t.total} quincenas</span>
            </div>
            <div style={{height:7,background:"#E2E8F0",borderRadius:6,overflow:"hidden",marginBottom:6}}>
              <div style={{width:`${t.pct}%`,height:"100%",background:B,borderRadius:6}}/>
            </div>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:11,marginBottom:10}}>
              <span style={{color:"#64748B"}}>Pagado: <strong style={{color:"#16a34a"}}>{t.pagado}</strong></span>
              <span style={{color:"#64748B"}}>Restante: <strong style={{color:"#334155"}}>{t.rest}</strong></span>
            </div>
            <button onClick={()=>setResell(t)} style={{width:"100%",padding:"8px 0",borderRadius:12,background:"#FFF1F2",border:"1px solid #FECDD3",color:"#E11D48",fontSize:12,fontWeight:600,cursor:"pointer"}}>
              🔁 Revender Boleto
            </button>
          </div>
        </div>
      ))}
    </div>
  )}

  {resell && (
    <div onClick={()=>setResell(null)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.45)",zIndex:50,display:"flex",alignItems:"flex-end",justifyContent:"center"}}>
      <div onClick={e=>e.stopPropagation()} style={{background:"#fff",borderRadius:"24px 24px 0 0",padding:"20px 20px 32px",width:"100%",maxWidth:390}}>
        <div style={{width:36,height:4,background:"#E2E8F0",borderRadius:4,margin:"0 auto 16px"}}/>
        <p style={{fontWeight:800,fontSize:17,color:"#0F172A",margin:"0 0 4px"}}>Revender Boleto</p>
        <p style={{fontSize:13,color:"#64748B",margin:"0 0 14px"}}>{resell.match} · {resell.city}</p>
        <div style={{background:"#FFF7ED",borderRadius:14,padding:"12px 14px",marginBottom:14}}>
          <p style={{fontSize:11,fontWeight:700,color:"#B45309",margin:"0 0 4px",display:"flex",alignItems:"center",gap:5}}><IWarn/> Precio sugerido de reventa</p>
          <p style={{fontSize:26,fontWeight:800,color:"#EA580C",margin:0}}>$11,200 MXN</p>
          <p style={{fontSize:11,color:"#EA580C",margin:"2px 0 0"}}>Yunus cobra 4% de comisión</p>
        </div>
        <button onClick={()=>setResell(null)} style={{width:"100%",padding:"12px 0",borderRadius:14,background:"#E11D48",color:"#fff",border:"none",fontSize:14,fontWeight:700,cursor:"pointer",marginBottom:8}}>Publicar en Marketplace</button>
        <button onClick={()=>setResell(null)} style={{width:"100%",padding:"8px 0",borderRadius:14,background:"none",color:"#94A3B8",border:"none",fontSize:13,cursor:"pointer"}}>Cancelar</button>
      </div>
    </div>
  )}
</div>
```

);
}

// ══════════════════════════════════════════════════════════════════
// DISCOVERY — full chat, no header, carousel as chat message
// ══════════════════════════════════════════════════════════════════
function Discovery({paidTickets,onPay}) {
const [input,setInput]    = useState(””);
const [busy,setBusy]      = useState(false);
const [toast,setToast]    = useState({show:false,msg:””});
const [ci,setCi]          = useState(0);  // carousel index, lives in state so it updates

// Initial messages: greeting + carousel as chat bubbles
const [msgs,setMsgs] = useState([
{id:0, role:“ai”, type:“text”,     content:”¡Hola! 👋 Soy Yunus, tu asistente de viajes con inteligencia financiera. Analicé tu perfil y tengo estas opciones pre-aprobadas para ti:”,     time:“10:00 AM”},
{id:1, role:“ai”, type:“carousel”, ci:0, time:“10:00 AM”},
{id:2, role:“ai”, type:“text”,     content:”¿Te interesa alguno? O cuéntame a dónde quieres ir al Mundial 2026 y lo busco para ti 🏆”, time:“10:00 AM”},
]);

const bottomRef = useRef(null);
useEffect(()=>{ bottomRef.current?.scrollIntoView({behavior:“smooth”}); },[msgs]);

// Keep carousel ci in sync with the carousel message
const updateCarouselCi = (newCi) => {
setCi(newCi);
setMsgs(p => p.map(m => m.type===“carousel” ? {…m, ci:newCi, setCi:updateCarouselCi} : m));
};
// Inject setCi into carousel messages on mount
useEffect(()=>{
setMsgs(p => p.map(m => m.type===“carousel” ? {…m, setCi:updateCarouselCi} : m));
// eslint-disable-next-line
},[]);

const showToast = m => { setToast({show:true,msg:m}); setTimeout(()=>setToast({show:false,msg:””}),3000); };

const runThink = async (steps,cb) => {
const tid = Date.now();
setMsgs(p=>[…p,{id:tid,role:“ai”,type:“thinking”,steps,cur:0,time:nowT()}]);
setBusy(true);
for(let i=1;i<steps.length;i++){
await new Promise(r=>setTimeout(r,900));
setMsgs(p=>p.map(m=>m.id===tid?{…m,cur:i}:m));
}
await new Promise(r=>setTimeout(r,700));
setMsgs(p=>p.filter(m=>m.id!==tid));
setBusy(false);
cb();
};

const send = () => {
const t=input.trim(); if(!t||busy) return;
setInput(””);
setMsgs(p=>[…p,{id:Date.now(),role:“user”,type:“text”,content:t,time:nowT()}]);
const lo=t.toLowerCase();
if(lo.includes(“mundial”)||lo.includes(“cdmx”)||lo.includes(“azteca”)){
runThink(TH_M,()=>setMsgs(p=>[…p,
{id:Date.now(),role:“ai”,type:“text”,content:”¡Encontré algo perfecto para ti! 🏆 Aquí está tu plan de acceso al Mundial:”,time:nowT()},
{id:Date.now()+1,role:“ai”,type:“plan”,content:””,plan:{id:“mundial-cdmx”,match:“México vs Argentina”,city:“Ciudad de México”,date:“15 Jun 2026”,total:”$10,400”,anticipo:”$1,560”,quincenas:5,cuota:”$1,901”,cat:“Cat 2”},time:nowT()}
]));
} else if(lo.includes(“vip”)||lo.includes(“final”)){
runThink(TH_V,()=>setMsgs(p=>[…p,
{id:Date.now(),role:“ai”,type:“soft_no”,
content:“Financiar el VIP comprometería peligrosamente tus finanzas este mes. 💡 Mi contraoferta saludable: Te apruebo 2 boletos Cat. 3 en MTY. Esto sí entra en tu realidad.”,
warning:“El VIP representa un sobreendeudamiento del 340% vs tu capacidad de pago actual.”,
plan:{id:“cat3-mty”,match:“Argentina vs Uruguay”,city:“Monterrey”,date:“21 Jun 2026”,total:”$9,600”,anticipo:”$1,440”,quincenas:4,cuota:”$2,040”,cat:“Cat 3”,qty:“2 boletos”,type:“soft_no”},
time:nowT()}
]));
} else {
setTimeout(()=>setMsgs(p=>[…p,{id:Date.now(),role:“ai”,type:“text”,content:‘Prueba: “Quiero ir al mundial en CDMX” o “Quiero boletos VIP para la final” 😊’,time:nowT()}]),600);
}
};

const handlePay = plan => { onPay(plan); showToast(”¡Enganche pagado! Boleto en tu Bóveda 🎉”); };

return (
<div style={{flex:1,display:“flex”,flexDirection:“column”,overflow:“hidden”}}>
<Toast msg={toast.msg} show={toast.show}/>

```
  {/* Full-screen chat — no header above it */}
  <div style={{flex:1,overflowY:"auto",padding:"14px 16px 8px",background:"#F8FAFC"}}>
    {msgs.map(m=>(
      <Bubble key={m.id} msg={m} onPay={handlePay} paid={paidTickets.some(t=>t.id===m.plan?.id)}/>
    ))}
    <div ref={bottomRef}/>
  </div>

  {/* Input */}
  <div style={{background:"#fff",padding:"10px 16px 12px",borderTop:"1px solid #F1F5F9",flexShrink:0}}>
    <div style={{display:"flex",alignItems:"center",gap:8,background:"#F8FAFC",border:"1px solid #E2E8F0",borderRadius:20,padding:"7px 7px 7px 14px"}}>
      <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()}
        placeholder="Escribe tu destino soñado..."
        style={{flex:1,background:"none",border:"none",outline:"none",fontSize:13,color:"#334155"}}/>
      <button onClick={send} disabled={busy||!input.trim()} style={{width:34,height:34,borderRadius:14,background:B,border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",opacity:busy||!input.trim()?0.4:1,flexShrink:0}}>
        <ISend size={14}/>
      </button>
    </div>
    <p style={{textAlign:"center",fontSize:11,color:"#94A3B8",margin:"7px 0 0"}}>
      Prueba:{" "}
      <button onClick={()=>setInput("Quiero ir al mundial en CDMX")} style={{color:B,background:"none",border:"none",cursor:"pointer",fontSize:11,textDecoration:"underline",padding:0}}>Mundial CDMX</button>
      {" · "}
      <button onClick={()=>setInput("Quiero boletos VIP para la final")} style={{color:B,background:"none",border:"none",cursor:"pointer",fontSize:11,textDecoration:"underline",padding:0}}>Boletos VIP</button>
    </p>
  </div>
</div>
```

);
}

// ══════════════════════════════════════════════════════════════════
// MARKETPLACE
// ══════════════════════════════════════════════════════════════════
function Marketplace() {
const [filter,setFilter] = useState(“Todos”);
const filters = [“Todos”,“CDMX”,“MTY”,“USA”];
const shown = filter===“Todos” ? MKT :
filter===“MTY”  ? MKT.filter(t=>t.city===“Monterrey”) :
filter===“CDMX” ? MKT.filter(t=>t.city===“CDMX”) :
MKT.filter(t=>[“Dallas”,“Los Ángeles”].includes(t.city));

return (
<div style={{flex:1,overflowY:“auto”,display:“flex”,flexDirection:“column”}}>
<div style={{padding:“16px 20px 12px”,background:”#fff”,flexShrink:0}}>
<p style={{fontSize:11,fontWeight:700,color:B,letterSpacing:“0.08em”,textTransform:“uppercase”,margin:0}}>Compra ahora</p>
<h1 style={{fontSize:26,fontWeight:800,color:”#0F172A”,margin:“2px 0 4px”}}>Marketplace 🏟️</h1>
<p style={{fontSize:12,color:”#94A3B8”,margin:“0 0 10px”}}>Boletos verificados en reventa</p>
<div style={{display:“flex”,gap:6,overflowX:“auto”,paddingBottom:2}}>
{filters.map(f=>(
<button key={f} onClick={()=>setFilter(f)} style={{padding:“6px 14px”,borderRadius:20,border:“none”,fontSize:12,fontWeight:600,cursor:“pointer”,whiteSpace:“nowrap”,background:filter===f?B:”#F1F5F9”,color:filter===f?”#fff”:”#64748B”,flexShrink:0,transition:“all 0.2s”}}>
{f}
</button>
))}
</div>
</div>
<div style={{padding:“10px 20px 24px”,background:”#F8FAFC”,flex:1}}>
{shown.map(t=>(
<div key={t.id} style={{background:”#fff”,borderRadius:18,border:“1px solid #F1F5F9”,boxShadow:“0 1px 4px rgba(0,0,0,0.05)”,marginBottom:12,padding:“14px”}}>
<div style={{display:“flex”,justifyContent:“space-between”,alignItems:“flex-start”,marginBottom:10}}>
<div style={{flex:1}}>
<div style={{display:“flex”,gap:6,marginBottom:5,flexWrap:“wrap”}}>
{t.hot && <span style={{fontSize:10,background:”#FEF3C7”,color:”#D97706”,padding:“2px 8px”,borderRadius:20,fontWeight:600}}>🔥 Alta demanda</span>}
<span style={{fontSize:10,background:BL,color:B,padding:“2px 8px”,borderRadius:20,fontWeight:600}}>{t.cat}</span>
</div>
<p style={{fontSize:14,fontWeight:700,color:”#0F172A”,margin:0}}>{t.match}</p>
<p style={{fontSize:11,color:”#64748B”,margin:“3px 0 0”,display:“flex”,alignItems:“center”,gap:4}}><IPin size={10}/>{t.city} · {t.date}</p>
</div>
<div style={{textAlign:“right”,marginLeft:12,flexShrink:0}}>
<p style={{fontSize:18,fontWeight:800,color:B,margin:0}}>{t.price}</p>
<p style={{fontSize:11,color:”#94A3B8”,textDecoration:“line-through”,margin:0}}>{t.orig}</p>
<p style={{fontSize:11,color:”#16a34a”,fontWeight:600,margin:“1px 0 0”,display:“flex”,alignItems:“center”,justifyContent:“flex-end”,gap:3}}><IUp size={11}/>Ahorra {disc(t.price,t.orig)}%</p>
</div>
</div>
<div style={{borderTop:“1px solid #F8FAFC”,paddingTop:10,display:“flex”,alignItems:“center”,justifyContent:“space-between”}}>
<div style={{display:“flex”,alignItems:“center”,gap:8}}>
<div style={{width:28,height:28,borderRadius:“50%”,background:B,color:”#fff”,fontSize:12,fontWeight:700,display:“flex”,alignItems:“center”,justifyContent:“center”,flexShrink:0}}>{t.seller[0]}</div>
<div>
<p style={{fontSize:12,fontWeight:600,color:”#334155”,margin:0}}>{t.seller}</p>
<p style={{fontSize:11,color:”#94A3B8”,margin:0,display:“flex”,alignItems:“center”,gap:3}}><IStar size={11}/>{t.rating}</p>
</div>
</div>
<button style={{padding:“8px 16px”,borderRadius:12,background:B,color:”#fff”,border:“none”,fontSize:12,fontWeight:600,cursor:“pointer”,flexShrink:0}}>
Comprar con Plan
</button>
</div>
</div>
))}
</div>
</div>
);
}

// ══════════════════════════════════════════════════════════════════
// ROOT APP
// ══════════════════════════════════════════════════════════════════
export default function App() {
const [tab,setTab]     = useState(1);
const [vault,setVault] = useState([]);
const touchStart = useRef(null);   // {x, y} at touch start
const addTicket  = plan => setVault(v => v.some(x=>x.id===plan.id) ? v : […v,plan]);

// Swipe: only trigger if horizontal movement dominates (ratio > 1.5x vertical)
// and minimum distance of 80px to avoid accidental swipes while scrolling
const onTS = e => { touchStart.current = {x:e.touches[0].clientX, y:e.touches[0].clientY}; };
const onTE = e => {
if(!touchStart.current) return;
const dx = e.changedTouches[0].clientX - touchStart.current.x;
const dy = e.changedTouches[0].clientY - touchStart.current.y;
touchStart.current = null;
if(Math.abs(dx) < 80) return;                  // min horizontal distance
if(Math.abs(dy) > Math.abs(dx) * 0.6) return;  // reject if vertical dominates
setTab(t => dx < 0 ? Math.min(t+1,2) : Math.max(t-1,0));
};

const tabs = [
{label:“Bóveda”,      Icon:IShield, badge:vault.length},
{label:“Descubrir”,   Icon:IHome},
{label:“Marketplace”, Icon:IStore},
];

return (
<div style={{minHeight:“100vh”,background:”#CBD5E1”,display:“flex”,alignItems:“center”,justifyContent:“center”,fontFamily:”-apple-system,BlinkMacSystemFont,‘SF Pro Display’,Helvetica,sans-serif”}}>
<div onTouchStart={onTS} onTouchEnd={onTE}
style={{width:390,height:844,background:”#F8FAFC”,borderRadius:44,overflow:“hidden”,boxShadow:“0 30px 80px rgba(0,0,0,0.28)”,display:“flex”,flexDirection:“column”,position:“relative”}}>

```
    {/* Status bar */}
    <div style={{height:44,background:"#fff",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 24px",flexShrink:0}}>
      <span style={{fontSize:14,fontWeight:700,color:"#0F172A"}}>9:41</span>
      <span style={{fontSize:12,color:"#64748B",letterSpacing:2}}>●●●●</span>
    </div>

    {/* TOP PILL TAB BAR */}
    <div style={{background:"#fff",padding:"8px 16px 10px",borderBottom:"1px solid #F1F5F9",flexShrink:0}}>
      <div style={{display:"flex",background:"#F1F5F9",borderRadius:16,padding:3,gap:2}}>
        {tabs.map(({label,Icon,badge},i)=>(
          <button key={i} onClick={()=>setTab(i)} style={{
            flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:5,
            padding:"7px 4px",borderRadius:13,border:"none",cursor:"pointer",
            fontSize:11,fontWeight:600,transition:"all 0.2s",position:"relative",
            background:tab===i?"#fff":"transparent",
            color:tab===i?B:"#94A3B8",
            boxShadow:tab===i?"0 1px 8px rgba(0,0,0,0.10)":"none",
          }}>
            <Icon size={16} color={tab===i?B:"#94A3B8"}/>
            {label}
            {badge>0 && (
              <span style={{position:"absolute",top:2,right:3,width:16,height:16,borderRadius:"50%",background:"#E11D48",color:"#fff",fontSize:9,fontWeight:800,display:"flex",alignItems:"center",justifyContent:"center"}}>
                {badge}
              </span>
            )}
          </button>
        ))}
      </div>
      {/* Swipe hint dots */}
      <div style={{display:"flex",justifyContent:"center",gap:5,marginTop:7}}>
        {[0,1,2].map(i=>(
          <div key={i} style={{width:i===tab?20:5,height:5,borderRadius:3,background:i===tab?B:"#E2E8F0",transition:"all 0.3s"}}/>
        ))}
      </div>
    </div>

    {/* SCREENS */}
    <div style={{flex:1,overflow:"hidden",display:"flex",flexDirection:"column"}}>
      <div style={{display:tab===0?"flex":"none",flex:1,overflow:"hidden",flexDirection:"column"}}>
        <Boveda tickets={vault}/>
      </div>
      <div style={{display:tab===1?"flex":"none",flex:1,overflow:"hidden",flexDirection:"column"}}>
        <Discovery paidTickets={vault} onPay={addTicket}/>
      </div>
      <div style={{display:tab===2?"flex":"none",flex:1,overflow:"hidden",flexDirection:"column"}}>
        <Marketplace/>
      </div>
    </div>
  </div>
</div>
```

);
}
