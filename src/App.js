import { useState, useEffect, useRef } from "react";

const C = {
  bg: "#fafaf8", card: "#fff", border: "#e8e5df", text: "#2a2520", mid: "#5c564e", light: "#8a847a",
  accent: "#c25e30", aL: "#c25e3018", teal: "#2d6a4f", tL: "#2d6a4f12",
  blue: "#3563b0", bL: "#3563b010", warm: "#b8510d", wL: "#b8510d0e",
  red: "#c23030", rL: "#c2303010", purple: "#7c3aed",
  sh: "0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.03)",
  shH: "0 2px 8px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.05)",
};
const F = { d: "'Playfair Display', Georgia, serif", b: "'Source Sans 3', 'Segoe UI', sans-serif" };

function Nav({ active, go }) {
  const [open, setOpen] = useState(false);
  const tabs = [{ id:"home",l:"Home"},{id:"depression",l:"Depression"},{id:"anxiety",l:"Anxiety"},{id:"bipolar",l:"Bipolar"},{id:"meds",l:"Meds"},{id:"therapy",l:"Therapy"},{id:"body",l:"Body"},{id:"substance",l:"Substance Use"},{id:"help",l:"Find Help"},{id:"about",l:"About"}];
  const p = id => { go(id); setOpen(false); };
  return (
    <nav style={{position:"sticky",top:0,zIndex:100,background:"rgba(250,250,248,0.95)",backdropFilter:"blur(12px)",borderBottom:`1px solid ${C.border}`}}>
      <div style={{maxWidth:960,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",height:56,padding:"0 20px"}}>
        <div style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer"}} onClick={()=>p("home")}>
          <span style={{fontSize:20}}>⛅</span>
          <span style={{fontFamily:F.d,fontSize:17,fontWeight:700,color:C.text}}>Brain Weather</span>
        </div>
        <div className="dn" style={{display:"flex",gap:1}}>{tabs.map(t=><button key={t.id} onClick={()=>p(t.id)} style={{padding:"7px 9px",borderRadius:8,border:"none",cursor:"pointer",background:active===t.id?C.aL:"transparent",color:active===t.id?C.accent:C.mid,fontSize:12,fontWeight:active===t.id?700:500,fontFamily:F.b,whiteSpace:"nowrap"}}>{t.l}</button>)}</div>
        <button className="mb" onClick={()=>setOpen(!open)} style={{display:"none",background:"none",border:"none",cursor:"pointer",fontSize:24,color:C.text}}>{open?"✕":"☰"}</button>
      </div>
      {open&&<div className="md" style={{position:"absolute",top:56,left:0,right:0,background:"rgba(250,250,248,0.98)",borderBottom:`1px solid ${C.border}`,padding:"8px 20px 16px",boxShadow:C.sh}}>
        {tabs.map(t=><button key={t.id} onClick={()=>p(t.id)} style={{display:"block",width:"100%",textAlign:"left",padding:"12px 14px",borderRadius:8,border:"none",cursor:"pointer",background:active===t.id?C.aL:"transparent",color:active===t.id?C.accent:C.text,fontSize:15,fontWeight:active===t.id?700:500,fontFamily:F.b,marginBottom:2}}>{t.l}</button>)}
      </div>}
    </nav>
  );
}

function S({children,style}){return<div style={{maxWidth:960,margin:"0 auto",padding:"0 20px",...style}}>{children}</div>;}
function Cd({children,style,hover}){const[h,setH]=useState(false);return<div onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:14,padding:24,boxShadow:h&&hover?C.shH:C.sh,transition:"all 0.3s",...style}}>{children}</div>;}
function B({children,color=C.accent}){return<span style={{display:"inline-block",padding:"3px 10px",borderRadius:20,fontSize:11,fontWeight:700,letterSpacing:"0.06em",textTransform:"uppercase",color,background:`${color}14`,fontFamily:F.b}}>{children}</span>;}
function Btn({children,onClick,v="primary",style:s}){const st={primary:{background:C.teal,color:"#fff",border:"none"},accent:{background:C.accent,color:"#fff",border:"none"},outline:{background:"transparent",color:C.mid,border:`1.5px solid ${C.border}`}};return<button onClick={onClick} style={{padding:"10px 22px",borderRadius:10,fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:F.b,transition:"all 0.2s",...st[v],...s}}>{children}</button>;}

// ═══════════════════════════════════════════════════════════════
// HOME
// ═══════════════════════════════════════════════════════════════
function Home({go}){return(<div>
  <div style={{padding:"80px 20px 60px",textAlign:"center",position:"relative",overflow:"hidden"}}>
    <div style={{position:"absolute",top:-80,left:"50%",transform:"translateX(-50%)",width:600,height:600,borderRadius:"50%",background:"radial-gradient(circle, #c25e3008 0%, transparent 70%)",pointerEvents:"none"}}/>
    <S><div style={{animation:"fadeUp 0.8s ease both"}}>
      <B>Mental Health, Simplified</B>
      <h1 style={{fontFamily:F.d,fontSize:"clamp(32px,5vw,52px)",fontWeight:700,color:C.text,margin:"20px 0 16px",lineHeight:1.15,letterSpacing:"-0.025em"}}>Check your forecast.<br/><span style={{color:C.accent}}>Understand your brain weather.</span></h1>
      <p style={{fontFamily:F.b,fontSize:17,color:C.mid,maxWidth:580,margin:"0 auto 16px",lineHeight:1.7}}>Depression, anxiety, and bipolar disorder affect over <strong>1 billion people worldwide</strong>. Most wait years for the right diagnosis. This site exists to close that gap.</p>
      <p style={{fontFamily:F.b,fontSize:15,color:C.light,maxWidth:500,margin:"0 auto 32px",lineHeight:1.6}}>Your brain has weather. Some days are clear. Some days storm. <strong>Two weathers — normal and out of sorts — are both part of being human.</strong> Understanding the difference between a rough day and a condition that needs treatment is what this site is for.</p>
      <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
        <Btn v="accent" onClick={()=>go("meds")} style={{fontSize:16,padding:"14px 32px"}}>Medication Guide</Btn>
        <Btn v="outline" onClick={()=>go("help")}>Find Help</Btn>
      </div>
    </div></S>
  </div>

  <S style={{paddingBottom:48}}>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))",gap:16}}>
      {[{n:"1 in 5",l:"U.S. adults experience mental illness each year",s:"NIMH, 2023"},{n:"280M+",l:"People worldwide live with depression",s:"WHO, 2023"},{n:"301M+",l:"People worldwide have an anxiety disorder",s:"WHO, 2023"},{n:"~60%",l:"Of people with mental illness get no treatment",s:"NIMH"}].map((x,i)=>
        <Cd key={i} style={{textAlign:"center",padding:"20px 16px",animation:`fadeUp 0.6s ease ${0.1+i*0.08}s both`}}>
          <div style={{fontFamily:F.d,fontSize:28,fontWeight:700,color:C.accent}}>{x.n}</div>
          <div style={{fontSize:13,color:C.mid,lineHeight:1.5,marginTop:6,fontFamily:F.b}}>{x.l}</div>
          <div style={{fontSize:10,color:C.light,marginTop:4,fontFamily:F.b}}>{x.s}</div>
        </Cd>
      )}
    </div>
  </S>

  <S style={{paddingBottom:48}}>
    <h2 style={{fontFamily:F.d,fontSize:28,fontWeight:700,color:C.text,marginBottom:8}}>The Big Three</h2>
    <p style={{fontFamily:F.b,fontSize:15,color:C.mid,marginBottom:24,maxWidth:600}}>These conditions account for the majority of mental health diagnoses. They frequently overlap, they're commonly misdiagnosed as each other, and understanding the differences changes everything about treatment.</p>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(280px, 1fr))",gap:16}}>
      {[{t:"Depression",c:C.blue,id:"depression",st:"280M+ affected",d:"More than sadness. A neurobiological condition that hijacks your ability to feel pleasure, find motivation, or imagine a future. The leading cause of disability worldwide."},
        {t:"Anxiety",c:C.teal,id:"anxiety",st:"301M+ affected",d:"Your brain's threat detection system stuck on. The most common mental health condition on earth. Lives in your body as much as your mind — racing heart, tight chest, shaking hands."},
        {t:"Bipolar Disorder",c:C.accent,id:"bipolar",st:"46M+ affected",d:"Not mood swings. A spectrum of mania and depression episodes. Highest substance use comorbidity of any psychiatric diagnosis. Takes 7-10 years to diagnose correctly."}
      ].map((x,i)=>
        <Cd key={i} hover style={{borderTop:`3px solid ${x.c}`,cursor:"pointer",animation:`fadeUp 0.6s ease ${0.15+i*0.1}s both`}} onClick={()=>go(x.id)}>
          <B color={x.c}>{x.st}</B>
          <h3 style={{fontFamily:F.d,fontSize:20,fontWeight:700,color:x.c,margin:"8px 0 8px"}}>{x.t}</h3>
          <p style={{fontSize:14,color:C.mid,lineHeight:1.6,margin:"0 0 10px",fontFamily:F.b}}>{x.d}</p>
          <span style={{fontSize:13,color:x.c,fontWeight:600,fontFamily:F.b}}>Learn More →</span>
        </Cd>
      )}
    </div>
  </S>

  <S style={{paddingBottom:48}}>
    <Cd style={{background:"#faf5f0",borderColor:"#e8ddd2"}}>
      <h2 style={{fontFamily:F.d,fontSize:22,fontWeight:700,color:C.text,margin:"0 0 12px"}}>Also on This Site</h2>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))",gap:20}}>
        {[{t:"Medication Guide",d:"What each med does, how long to work, side effects, real patient reviews.",p:"meds"},
          {t:"CBT & DBT Therapy",d:"The two most evidence-based therapies explained in plain language.",p:"therapy"},
          {t:"Physical Anxiety Exercises",d:"10 vagus nerve exercises ranked by evidence. For when anxiety is in your body.",p:"body"},
          {t:"Substance Use",d:"Why self-medication is so common and why it makes everything worse.",p:"substance"},
          {t:"Find Help",d:"Provider directories, what to say at your first appointment, uninsured resources.",p:"help"}
        ].map((x,i)=><div key={i} style={{cursor:"pointer"}} onClick={()=>go(x.p)}>
          <h3 style={{fontFamily:F.d,fontSize:15,fontWeight:700,color:C.text,margin:"0 0 4px"}}>{x.t}</h3>
          <p style={{fontSize:13,color:C.mid,lineHeight:1.55,margin:"0 0 6px",fontFamily:F.b}}>{x.d}</p>
          <span style={{fontSize:12,color:C.accent,fontWeight:600,fontFamily:F.b}}>View →</span>
        </div>)}
      </div>
    </Cd>
  </S>

  <S style={{paddingBottom:60}}>
    <Cd style={{background:"#fef9f0",borderColor:"#f0d8a8",textAlign:"center",padding:28}}>
      <div style={{fontSize:13,fontWeight:700,color:C.warm,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:6,fontFamily:F.b}}>If you're in crisis right now</div>
      <div style={{fontFamily:F.d,fontSize:28,fontWeight:700,color:C.text}}>988 Suicide & Crisis Lifeline</div>
      <p style={{fontFamily:F.b,fontSize:15,color:C.mid,margin:"8px 0 0"}}>Call or text <strong>988</strong> — free, confidential, 24/7</p>
    </Cd>
  </S>
</div>);}

// ═══════════════════════════════════════════════════════════════
// DEPRESSION
// ═══════════════════════════════════════════════════════════════
function Depression(){return(<S style={{paddingTop:40,paddingBottom:60}}>
  <B color={C.blue}>Understanding Depression</B>
  <h2 style={{fontFamily:F.d,fontSize:30,fontWeight:700,color:C.text,margin:"12px 0 8px"}}>Depression (Major Depressive Disorder)</h2>
  <p style={{fontSize:15,color:C.mid,margin:"0 0 24px",maxWidth:640,lineHeight:1.65,fontFamily:F.b}}>Depression is not sadness. Sadness is a normal human emotion with a cause. Depression is a neurobiological condition that hijacks your brain's ability to feel pleasure, find motivation, think clearly, or imagine a future. It is the leading cause of disability worldwide.</p>

  <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(180px, 1fr))",gap:12,marginBottom:28}}>
    {[{n:"280M+",l:"People affected globally",s:"WHO, 2023"},{n:"~60%",l:"Never receive treatment",s:"NIMH"},{n:"2×",l:"More common in women",s:"Epidemiological data"},{n:"88%",l:"PHQ-9 sensitivity at ≥10",s:"Kroenke et al., 2001"}].map((x,i)=>
      <Cd key={i} style={{textAlign:"center",padding:"16px 14px"}}><div style={{fontFamily:F.d,fontSize:24,fontWeight:700,color:C.blue}}>{x.n}</div><div style={{fontSize:12,color:C.mid,lineHeight:1.5,marginTop:4,fontFamily:F.b}}>{x.l}</div><div style={{fontSize:10,color:C.light,marginTop:3,fontFamily:F.b}}>{x.s}</div></Cd>)}
  </div>

  <h3 style={{fontFamily:F.d,fontSize:20,fontWeight:700,color:C.text,margin:"0 0 14px"}}>The Nine Symptoms (DSM-5)</h3>
  <Cd style={{marginBottom:20}}>
    <p style={{fontSize:13,color:C.mid,lineHeight:1.6,margin:"0 0 12px",fontFamily:F.b}}>Five or more for at least two weeks, with at least one being depressed mood or loss of interest:</p>
    {["Depressed mood most of the day, nearly every day","Markedly diminished interest or pleasure in almost all activities","Significant weight loss or gain, or change in appetite","Insomnia or hypersomnia nearly every day","Psychomotor agitation or retardation observable by others","Fatigue or loss of energy nearly every day","Feelings of worthlessness or excessive guilt","Diminished ability to think, concentrate, or decide","Recurrent thoughts of death or suicidal ideation"].map((s,i)=>
      <div key={i} style={{display:"flex",gap:10,marginBottom:6,fontSize:13.5,fontFamily:F.b}}><span style={{color:C.blue,fontWeight:700,flexShrink:0}}>{i+1}.</span><span style={{color:C.mid,lineHeight:1.55}}>{s}</span></div>)}
  </Cd>

  <h3 style={{fontFamily:F.d,fontSize:20,fontWeight:700,color:C.text,margin:"0 0 14px"}}>What Most People Get Wrong</h3>
  <Cd style={{marginBottom:20}}>
    {[{m:"\"Everyone gets sad sometimes.\"",r:"Depression isn't proportional sadness. The hallmark is anhedonia — inability to feel pleasure — fundamentally different from sadness. Can occur without any identifiable cause."},
      {m:"\"Just exercise / think positive / try harder.\"",r:"Depression involves measurable changes in brain chemistry, neural connectivity, and inflammatory markers. You cannot willpower your way out of a neurobiological condition."},
      {m:"\"Antidepressants change who you are.\"",r:"When properly prescribed, antidepressants restore baseline function. Most patients describe feeling like themselves again, not like someone different."},
      {m:"\"If you can still function, it's not real.\"",r:"High-functioning depression is extremely common and often more dangerous because it delays treatment. Someone can hold a job while being profoundly depressed."}
    ].map((x,i)=><div key={i} style={{padding:"12px 0",borderBottom:i<3?`1px solid ${C.border}`:"none"}}><p style={{fontSize:14,fontWeight:700,color:C.text,margin:"0 0 4px",fontFamily:F.b,fontStyle:"italic"}}>{x.m}</p><p style={{fontSize:13,color:C.mid,lineHeight:1.6,margin:0,fontFamily:F.b}}>{x.r}</p></div>)}
  </Cd>

  <h3 style={{fontFamily:F.d,fontSize:20,fontWeight:700,color:C.text,margin:"0 0 14px"}}>Treatment That Works</h3>
  <Cd style={{marginBottom:20}}>
    {[{n:"SSRIs / SNRIs",d:"First-line medications. Sertraline (Zoloft), escitalopram (Lexapro), duloxetine (Cymbalta). 2-6 weeks for full effect. 60-70% respond to the first medication."},
      {n:"CBT",d:"As effective as medication for mild-to-moderate depression. Combines thought restructuring with behavioral activation. 12-20 sessions typical."},
      {n:"Combination therapy",d:"Medication + therapy together outperforms either alone, especially for moderate-to-severe depression."},
      {n:"Exercise",d:"30 minutes of moderate exercise 3-5 times/week has antidepressant effects comparable to medication for mild-to-moderate cases."}
    ].map((x,i)=><div key={i} style={{padding:"12px 0",borderBottom:i<3?`1px solid ${C.border}`:"none"}}><h4 style={{fontSize:14,fontWeight:700,color:C.blue,margin:"0 0 4px",fontFamily:F.b}}>{x.n}</h4><p style={{fontSize:13,color:C.mid,lineHeight:1.6,margin:0,fontFamily:F.b}}>{x.d}</p></div>)}
  </Cd>

  <Cd style={{background:"#fef3c7",borderColor:"#f59e0b40"}}>
    <p style={{fontSize:13,color:"#92400e",lineHeight:1.6,margin:0,fontFamily:F.b}}><strong>Important:</strong> If antidepressants make you agitated, wired, or trigger unusual energy — this may indicate bipolar disorder, not unipolar depression. Tell your prescriber immediately. The treatment is fundamentally different.</p>
  </Cd>
</S>);}

// ═══════════════════════════════════════════════════════════════
// ANXIETY
// ═══════════════════════════════════════════════════════════════
function Anxiety(){return(<S style={{paddingTop:40,paddingBottom:60}}>
  <B color={C.teal}>Understanding Anxiety</B>
  <h2 style={{fontFamily:F.d,fontSize:30,fontWeight:700,color:C.text,margin:"12px 0 8px"}}>Anxiety Disorders</h2>
  <p style={{fontSize:15,color:C.mid,margin:"0 0 24px",maxWidth:640,lineHeight:1.65,fontFamily:F.b}}>Your brain's threat detection system stuck on. Everyone feels anxious sometimes — that's healthy. Anxiety disorders are when the alarm keeps ringing after the danger has passed. The most common mental health condition in the world.</p>

  <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(180px, 1fr))",gap:12,marginBottom:28}}>
    {[{n:"301M+",l:"People affected globally",s:"WHO, 2023"},{n:"31%",l:"U.S. adults — lifetime prevalence",s:"NIMH"},{n:"60%+",l:"Also have comorbid depression",s:"Comorbidity research"},{n:"<2 min",l:"GAD-7 screening takes",s:"Spitzer et al., 2006"}].map((x,i)=>
      <Cd key={i} style={{textAlign:"center",padding:"16px 14px"}}><div style={{fontFamily:F.d,fontSize:24,fontWeight:700,color:C.teal}}>{x.n}</div><div style={{fontSize:12,color:C.mid,lineHeight:1.5,marginTop:4,fontFamily:F.b}}>{x.l}</div><div style={{fontSize:10,color:C.light,marginTop:3,fontFamily:F.b}}>{x.s}</div></Cd>)}
  </div>

  <h3 style={{fontFamily:F.d,fontSize:20,fontWeight:700,color:C.text,margin:"0 0 14px"}}>Types of Anxiety Disorders</h3>
  <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(280px, 1fr))",gap:14,marginBottom:24}}>
    {[{n:"Generalized Anxiety (GAD)",d:"Persistent excessive worry about multiple areas of life. Present more days than not for 6+ months.",sy:"Restlessness, fatigue, difficulty concentrating, irritability, muscle tension, sleep disturbance"},
      {n:"Panic Disorder",d:"Recurrent unexpected panic attacks — sudden surges of intense fear peaking within minutes.",sy:"Racing heart, chest pain, shortness of breath, dizziness, tingling, derealization, fear of dying"},
      {n:"Social Anxiety",d:"Intense fear of social situations where you might be scrutinized. Far beyond shyness.",sy:"Avoidance, physical symptoms before/during social events, fear of embarrassment"},
      {n:"Specific Phobias",d:"Intense, irrational fear of a specific object or situation disproportionate to actual danger.",sy:"Immediate anxiety response, avoidance, recognition fear is excessive but can't control it"}
    ].map((x,i)=><Cd key={i} hover style={{borderLeft:`3px solid ${C.teal}`}}>
      <h4 style={{fontFamily:F.d,fontSize:16,fontWeight:700,color:C.teal,margin:"0 0 6px"}}>{x.n}</h4>
      <p style={{fontSize:13,color:C.mid,lineHeight:1.6,margin:"0 0 10px",fontFamily:F.b}}>{x.d}</p>
      <div style={{padding:"8px 10px",background:C.tL,borderRadius:8}}><div style={{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",color:C.teal,marginBottom:2,fontFamily:F.b}}>Symptoms</div><p style={{fontSize:12,color:C.mid,lineHeight:1.5,margin:0,fontFamily:F.b}}>{x.sy}</p></div>
    </Cd>)}
  </div>

  <h3 style={{fontFamily:F.d,fontSize:20,fontWeight:700,color:C.text,margin:"0 0 14px"}}>Anxiety Lives in Your Body</h3>
  <Cd style={{marginBottom:20}}>
    <p style={{fontSize:14,color:C.mid,lineHeight:1.65,margin:"0 0 12px",fontFamily:F.b}}>Physical symptoms often bring people to the ER thinking it's a heart attack:</p>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))",gap:12}}>
      {[{a:"Heart",sy:"Racing, pounding, skipping, chest tightness"},{a:"Lungs",sy:"Shortness of breath, hyperventilation"},{a:"Stomach",sy:"Nausea, diarrhea, loss of appetite"},{a:"Muscles",sy:"Tension, trembling, jaw clenching, headaches"},{a:"Nervous System",sy:"Dizziness, tingling, hot flashes, sweating"},{a:"Brain",sy:"Racing thoughts, can't concentrate, derealization, insomnia"}].map((x,i)=>
        <div key={i} style={{padding:"10px 12px",background:"#fafaf8",borderRadius:8}}><div style={{fontSize:12,fontWeight:700,color:C.teal,fontFamily:F.b}}>{x.a}</div><p style={{fontSize:12,color:C.mid,lineHeight:1.5,margin:"2px 0 0",fontFamily:F.b}}>{x.sy}</p></div>)}
    </div>
  </Cd>

  <h3 style={{fontFamily:F.d,fontSize:20,fontWeight:700,color:C.text,margin:"0 0 14px"}}>Treatment That Works</h3>
  <Cd>
    {[{n:"CBT",d:"Gold standard. Identifies distorted threat assessments, gradually faces feared situations. Exposure therapy key for phobias and panic."},
      {n:"SSRIs / SNRIs",d:"First-line meds: sertraline, escitalopram, venlafaxine, duloxetine. 2-4 weeks to work. Effective for GAD, panic, social anxiety, PTSD."},
      {n:"Benzodiazepines (short-term)",d:"Lorazepam, clonazepam. Fast-acting but dependence risk. Bridge while SSRIs take effect — not long-term treatment."},
      {n:"Vagus nerve exercises",d:"Extended exhale breathing, cold water, PMR. Directly activate parasympathetic nervous system. See the Body page on this site."}
    ].map((x,i)=><div key={i} style={{padding:"12px 0",borderBottom:i<3?`1px solid ${C.border}`:"none"}}><h4 style={{fontSize:14,fontWeight:700,color:C.teal,margin:"0 0 4px",fontFamily:F.b}}>{x.n}</h4><p style={{fontSize:13,color:C.mid,lineHeight:1.6,margin:0,fontFamily:F.b}}>{x.d}</p></div>)}
  </Cd>
</S>);}

// ═══════════════════════════════════════════════════════════════
// BIPOLAR
// ═══════════════════════════════════════════════════════════════
function Bipolar(){return(<S style={{paddingTop:40,paddingBottom:60}}>
  <B color={C.accent}>Understanding Bipolar Disorder</B>
  <h2 style={{fontFamily:F.d,fontSize:30,fontWeight:700,color:C.text,margin:"12px 0 8px"}}>Bipolar Disorder</h2>
  <p style={{fontSize:15,color:C.mid,margin:"0 0 24px",maxWidth:640,lineHeight:1.65,fontFamily:F.b}}>Not mood swings. A spectrum of conditions involving distinct episodes of mania or hypomania and depression. Highest rate of comorbid substance use of any psychiatric diagnosis. Takes an average of 7-10 years to diagnose because most people seek help during depression, not mania.</p>

  <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(180px, 1fr))",gap:12,marginBottom:28}}>
    {[{n:"46M+",l:"People worldwide",s:"WHO, 2023"},{n:"25-50%",l:"Will attempt suicide",s:"APA"},{n:"69%",l:"Initially misdiagnosed",s:"Hirschfeld, 2003"},{n:"~60%",l:"Lifetime substance use disorder",s:"ECA Study"}].map((x,i)=>
      <Cd key={i} style={{textAlign:"center",padding:"16px 14px"}}><div style={{fontFamily:F.d,fontSize:24,fontWeight:700,color:C.accent}}>{x.n}</div><div style={{fontSize:12,color:C.mid,lineHeight:1.5,marginTop:4,fontFamily:F.b}}>{x.l}</div><div style={{fontSize:10,color:C.light,marginTop:3,fontFamily:F.b}}>{x.s}</div></Cd>)}
  </div>

  <h3 style={{fontFamily:F.d,fontSize:20,fontWeight:700,color:C.text,margin:"0 0 14px"}}>The Spectrum</h3>
  <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(280px, 1fr))",gap:14,marginBottom:24}}>
    {[{t:"Bipolar I",c:C.red,d:"Full manic episodes (7+ days or any duration if hospitalized). May include psychotic features — hallucinations, delusions, grandiosity so extreme it disconnects from reality. Depressive episodes common but not required.",tx:"Lithium (gold standard), antipsychotics, mood stabilizers. Long-term maintenance essential."},
      {t:"Bipolar II",c:C.warm,d:"Hypomanic episodes (4+ days, less severe, no psychosis) alternating with major depressive episodes. Often misdiagnosed as depression because hypomania feels productive and good. Depression is the dominant burden.",tx:"Lithium, lamotrigine (especially for depression), quetiapine. Antidepressants alone can trigger hypomania."},
      {t:"Cyclothymia",c:C.blue,d:"Chronic (2+ years) mild mood fluctuations that never meet full criteria for either pole. Often dismissed as personality. Can progress to Bipolar I or II.",tx:"Mood stabilizers, CBT, lifestyle management. Early treatment may prevent progression."}
    ].map((x,i)=><Cd key={i} hover style={{borderTop:`3px solid ${x.c}`}}>
      <h3 style={{fontFamily:F.d,fontSize:18,fontWeight:700,color:x.c,margin:"0 0 8px"}}>{x.t}</h3>
      <p style={{fontSize:13,color:C.mid,lineHeight:1.6,margin:"0 0 12px",fontFamily:F.b}}>{x.d}</p>
      <div style={{padding:"10px 12px",background:`${x.c}08`,borderRadius:8}}><div style={{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",color:x.c,marginBottom:3,fontFamily:F.b}}>Treatment</div><p style={{fontSize:12,color:C.mid,lineHeight:1.55,margin:0,fontFamily:F.b}}>{x.tx}</p></div>
    </Cd>)}
  </div>

  <h3 style={{fontFamily:F.d,fontSize:20,fontWeight:700,color:C.text,margin:"0 0 14px"}}>How It Differs from Depression</h3>
  <Cd style={{marginBottom:20}}>
    {[{q:"Why does the distinction matter?",a:"Treatment is fundamentally different. Antidepressants alone can trigger mania or rapid cycling. Mood stabilizers like lithium are the foundation of bipolar treatment but aren't used for unipolar depression."},
      {q:"Why is it missed so often?",a:"People seek help during depression, not mania. Hypomania goes unreported because it feels productive. Clinicians who don't ask about past highs will diagnose depression."},
      {q:"Red flags",a:"Antidepressants making you agitated or wired. Periods of elevated mood, decreased sleep need, racing thoughts, impulsive behavior. Family history of bipolar. These change the entire diagnostic picture."}
    ].map((x,i)=><div key={i} style={{padding:"12px 0",borderBottom:i<2?`1px solid ${C.border}`:"none"}}><h4 style={{fontSize:14,fontWeight:700,color:C.accent,margin:"0 0 4px",fontFamily:F.b}}>{x.q}</h4><p style={{fontSize:13,color:C.mid,lineHeight:1.6,margin:0,fontFamily:F.b}}>{x.a}</p></div>)}
  </Cd>
</S>);}

// ═══════════════════════════════════════════════════════════════
// MEDS — covers all three conditions
// ═══════════════════════════════════════════════════════════════
function Meds(){
  const [exp,setExp]=useState(null);
  const meds=[
    {name:"Lithium",brand:"Lithobid",cls:"Mood Stabilizer",color:C.teal,for:"Bipolar I/II",dose:"600-1800mg/day. Blood level 0.6-1.2 mEq/L. Narrow window — requires monitoring.",onset:"Antimanic: 1-3 weeks. Full stabilization: 4-12 weeks.",sides:"Thirst, urination, tremor (27%), nausea early, weight gain. Long-term: thyroid, kidney monitoring needed.",note:"Gold standard for bipolar. Only psych med proven to reduce suicide risk. 7.3/10 patient rating."},
    {name:"Sertraline",brand:"Zoloft",cls:"SSRI Antidepressant",color:C.blue,for:"Depression, Anxiety, PTSD",dose:"50-200mg/day. Start low, increase gradually.",onset:"2-4 weeks for initial effect. 6-8 weeks for full benefit.",sides:"Nausea, headache, insomnia or drowsiness, sexual dysfunction. Usually mild and temporary.",note:"Most prescribed antidepressant. First-line for depression AND anxiety. Well-studied, generally well-tolerated."},
    {name:"Escitalopram",brand:"Lexapro",cls:"SSRI Antidepressant",color:C.blue,for:"Depression, GAD",dose:"10-20mg/day. Often started at 10mg.",onset:"1-2 weeks for anxiety. 2-6 weeks for depression.",sides:"Similar to sertraline. Often considered slightly better tolerated. Sexual dysfunction common.",note:"Cleanest SSRI — fewest drug interactions. Good first choice for anxiety + depression combo."},
    {name:"Lamotrigine",brand:"Lamictal",cls:"Mood Stabilizer",color:C.blue,for:"Bipolar maintenance, depression prevention",dose:"Slow titration required: 25mg→50mg→100mg→200mg over 5-6 weeks.",onset:"5-6 weeks due to required slow titration.",sides:"Headache, dizziness. RARE but serious: Stevens-Johnson Syndrome (rash) — stop immediately if rash develops.",note:"Best-tolerated mood stabilizer. 7.5/10 rating. Particularly effective for bipolar depression prevention."},
    {name:"Quetiapine",brand:"Seroquel",cls:"Atypical Antipsychotic",color:C.warm,for:"Bipolar mania/depression, adjunct for depression/anxiety",dose:"Depression: 300mg. Mania: 400-800mg. Insomnia (off-label): 25-100mg.",onset:"Sedation: immediate. Mood effects: 1-2 weeks. Full: 4-6 weeks.",sides:"Heavy sedation, weight gain, metabolic effects, dry mouth. Lowest movement disorder risk of all antipsychotics.",note:"Most prescribed antipsychotic. Polarizing — loved for sleep/mood, hated for sedation. ~60% discontinue within weeks."},
    {name:"Venlafaxine",brand:"Effexor",cls:"SNRI Antidepressant",color:C.teal,for:"Depression, GAD, Panic, Social Anxiety",dose:"75-225mg/day extended release. Must taper slowly when stopping.",onset:"2-4 weeks. Some feel anxiety improvement sooner.",sides:"Nausea, dizziness, sweating, insomnia, elevated blood pressure at higher doses. Discontinuation syndrome if stopped abruptly.",note:"Dual-action (serotonin + norepinephrine). Often tried when SSRIs alone aren't enough. Effective for anxiety."},
    {name:"Lorazepam",brand:"Ativan",cls:"Benzodiazepine",color:C.purple,for:"Acute anxiety, panic, manic agitation (bridge only)",dose:"0.5-2mg as needed. Short-term use only (2-4 weeks). As prescribed by physician.",onset:"15-30 minutes. One of the fastest-acting psych meds.",sides:"Sedation, cognitive impairment, dizziness. HIGH dependence risk — physical dependence in 2-4 weeks.",note:"Rescue medication, not a treatment. 79% of bipolar mania trial patients received it. Bridge while other meds kick in."},
  ];
  return(<S style={{paddingTop:40,paddingBottom:60}}>
    <B color={C.teal}>Evidence-Based</B>
    <h2 style={{fontFamily:F.d,fontSize:30,fontWeight:700,color:C.text,margin:"12px 0 8px"}}>Medication Guide</h2>
    <p style={{fontSize:15,color:C.mid,margin:"0 0 12px",maxWidth:600,lineHeight:1.65,fontFamily:F.b}}>Medications for depression, anxiety, and bipolar disorder. Dosages are typical ranges from FDA labeling — not recommendations. All decisions with your prescribing physician.</p>
    <Cd style={{background:"#fdf2f2",borderColor:"#e8c4c4",marginBottom:20,padding:"14px 20px"}}>
      <p style={{fontSize:12.5,color:"#7a3030",lineHeight:1.6,margin:0,fontFamily:F.b}}><strong>Medical Disclaimer:</strong> For educational purposes only. Never start, stop, or adjust medication without your doctor. Individual responses vary significantly.</p>
    </Cd>
    {meds.map((m,i)=><Cd key={i} hover style={{marginBottom:12,cursor:"pointer",borderLeft:`3px solid ${m.color}`}} onClick={()=>setExp(exp===i?null:i)}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
        <div><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4,flexWrap:"wrap"}}>
          <h3 style={{fontFamily:F.d,fontSize:19,fontWeight:700,color:C.text,margin:0}}>{m.name}</h3>
          <span style={{fontSize:12,color:C.light,fontFamily:F.b}}>({m.brand})</span>
          <B color={m.color}>{m.cls}</B>
          <B color={C.mid}>{m.for}</B>
        </div></div>
        <span style={{fontSize:18,color:C.light,transform:exp===i?"rotate(180deg)":"none",transition:"transform 0.3s",flexShrink:0}}>▾</span>
      </div>
      {exp===i&&<div style={{marginTop:16,borderTop:`1px solid ${C.border}`,paddingTop:16}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(280px, 1fr))",gap:16}}>
          {[{l:"Dosing",c:m.dose},{l:"Time to Work",c:m.onset},{l:"Side Effects",c:m.sides}].map((s,j)=>
            <div key={j} style={{padding:"12px 14px",background:"#fafaf8",borderRadius:10}}>
              <div style={{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",color:m.color,marginBottom:4,fontFamily:F.b}}>{s.l}</div>
              <p style={{fontSize:12.5,color:C.mid,lineHeight:1.6,margin:0,fontFamily:F.b}}>{s.c}</p>
            </div>)}
        </div>
        <div style={{marginTop:14,padding:"12px 14px",background:`${m.color}06`,borderRadius:10,borderLeft:`3px solid ${m.color}`}}>
          <p style={{fontSize:12.5,color:C.mid,lineHeight:1.6,margin:0,fontFamily:F.b}}>{m.note}</p>
        </div>
      </div>}
    </Cd>)}
  </S>);}

// ═══════════════════════════════════════════════════════════════
// THERAPY (CBT + DBT combined)
// ═══════════════════════════════════════════════════════════════
function Therapy(){return(<S style={{paddingTop:40,paddingBottom:60}}>
  <B color={C.teal}>Evidence-Based Therapy</B>
  <h2 style={{fontFamily:F.d,fontSize:30,fontWeight:700,color:C.text,margin:"12px 0 8px"}}>CBT & DBT</h2>
  <p style={{fontSize:15,color:C.mid,margin:"0 0 28px",maxWidth:640,lineHeight:1.65,fontFamily:F.b}}>The two most evidence-based psychotherapies for depression, anxiety, and bipolar disorder. Both work alongside medication — not as replacements.</p>

  <Cd style={{marginBottom:20,borderLeft:`3px solid ${C.teal}`}}>
    <h3 style={{fontFamily:F.d,fontSize:22,fontWeight:700,color:C.teal,margin:"0 0 10px"}}>Cognitive Behavioral Therapy (CBT)</h3>
    <p style={{fontSize:14,color:C.mid,lineHeight:1.65,margin:"0 0 14px",fontFamily:F.b}}>Based on the premise that thoughts, feelings, and behaviors are interconnected. CBT teaches you to recognize distorted thinking patterns and change them before they spiral. Backed by 13 RCTs for bipolar, extensive evidence for depression and anxiety. Average: 12-20 sessions.</p>
    <h4 style={{fontSize:14,fontWeight:700,color:C.text,margin:"0 0 8px",fontFamily:F.b}}>What CBT Treats</h4>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))",gap:12,marginBottom:14}}>
      {[{c:"Depression",d:"Challenges hopeless thinking, behavioral activation (doing things even when motivation is zero), activity scheduling."},
        {c:"Anxiety",d:"Identifies distorted threat assessments, exposure therapy for phobias/panic, cognitive restructuring of catastrophic thinking."},
        {c:"Bipolar",d:"Mood monitoring, relapse prevention (personal early warning signs), medication adherence, sleep hygiene protocols."}
      ].map((x,i)=><div key={i} style={{padding:"10px 12px",background:C.tL,borderRadius:8}}>
        <div style={{fontSize:12,fontWeight:700,color:C.teal,fontFamily:F.b}}>{x.c}</div>
        <p style={{fontSize:12,color:C.mid,lineHeight:1.5,margin:"4px 0 0",fontFamily:F.b}}>{x.d}</p>
      </div>)}
    </div>
    <h4 style={{fontSize:14,fontWeight:700,color:C.text,margin:"0 0 8px",fontFamily:F.b}}>Core Techniques</h4>
    {["Thought Records — catch, examine, and reframe distorted thoughts","Behavioral Activation — schedule pleasurable activities even when you don't want to","Mood Monitoring — daily tracking of mood, sleep, medication, triggers","Cognitive Restructuring — challenge all-or-nothing thinking, catastrophizing, mind-reading","Relapse Signature — your personal early warning signs with a pre-planned action plan","Exposure Therapy — gradual, controlled facing of feared situations (anxiety/phobias)"].map((t,i)=>
      <div key={i} style={{display:"flex",gap:8,marginBottom:5,fontSize:13,fontFamily:F.b}}><span style={{color:C.teal,fontWeight:700,flexShrink:0}}>◈</span><span style={{color:C.mid,lineHeight:1.55}}>{t}</span></div>)}
  </Cd>

  <Cd style={{marginBottom:20,borderLeft:`3px solid ${C.purple}`}}>
    <h3 style={{fontFamily:F.d,fontSize:22,fontWeight:700,color:C.purple,margin:"0 0 10px"}}>Dialectical Behavior Therapy (DBT)</h3>
    <p style={{fontSize:14,color:C.mid,lineHeight:1.65,margin:"0 0 14px",fontFamily:F.b}}>Originally for borderline personality disorder, DBT directly targets emotional dysregulation — the core feature shared by bipolar, BPD, and severe anxiety. Where CBT changes thoughts, DBT teaches you to survive intense emotions without making things worse. A 2023 JAMA Psychiatry trial showed DBT significantly reduced suicide attempts in bipolar adolescents.</p>
    <h4 style={{fontSize:14,fontWeight:700,color:C.text,margin:"0 0 8px",fontFamily:F.b}}>The Four Skill Modules</h4>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(220px, 1fr))",gap:12,marginBottom:14}}>
      {[{n:"Mindfulness",c:"#2563eb",d:"Observe emotions without reacting. 'Wise Mind' — overlap of emotional and rational mind.",sk:"Observe, Describe, Participate, Non-judgmental stance"},
        {n:"Distress Tolerance",c:C.red,d:"Survive crisis without making it worse. For unbearable pain when the urge to act destructively is overwhelming.",sk:"TIPP (Temperature, Intense exercise, Paced breathing, Progressive relaxation), ACCEPTS"},
        {n:"Emotion Regulation",c:C.purple,d:"Understand and manage emotions rather than being controlled by them.",sk:"ABC PLEASE, Opposite Action, Check the Facts"},
        {n:"Interpersonal Effectiveness",c:"#059669",d:"Get what you need from relationships while maintaining self-respect.",sk:"DEAR MAN, GIVE, FAST"}
      ].map((x,i)=><div key={i} style={{padding:"12px",background:`${x.c}08`,borderRadius:10,borderTop:`3px solid ${x.c}`}}>
        <h4 style={{fontSize:14,fontWeight:700,color:x.c,margin:"0 0 4px",fontFamily:F.b}}>{x.n}</h4>
        <p style={{fontSize:12,color:C.mid,lineHeight:1.5,margin:"0 0 6px",fontFamily:F.b}}>{x.d}</p>
        <p style={{fontSize:11,color:C.light,margin:0,fontFamily:F.b}}><strong>Skills:</strong> {x.sk}</p>
      </div>)}
    </div>
  </Cd>

  <Cd style={{background:"#fef9f0",borderColor:"#f0d8a8"}}>
    <h4 style={{fontSize:14,fontWeight:700,color:C.warm,margin:"0 0 6px",fontFamily:F.b}}>CBT vs. DBT: Which Do You Need?</h4>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginTop:10}}>
      <div><div style={{fontSize:12,fontWeight:700,color:C.teal,marginBottom:6,fontFamily:F.b}}>CBT if you...</div>
        {["Want tools for distorted thinking","Are stable or mildly depressed","Need relapse prevention","Struggle with medication adherence"].map((t,i)=><div key={i} style={{fontSize:12.5,color:C.mid,marginBottom:3,fontFamily:F.b}}>• {t}</div>)}</div>
      <div><div style={{fontSize:12,fontWeight:700,color:C.purple,marginBottom:6,fontFamily:F.b}}>DBT if you...</div>
        {["Have intense uncontrollable emotions","Struggle with suicidal thoughts","Have relationship chaos during episodes","Need crisis survival skills NOW"].map((t,i)=><div key={i} style={{fontSize:12.5,color:C.mid,marginBottom:3,fontFamily:F.b}}>• {t}</div>)}</div>
    </div>
  </Cd>
</S>);}

// ═══════════════════════════════════════════════════════════════
// BODY — physical anxiety exercises
// ═══════════════════════════════════════════════════════════════
function Body(){
  const ex=[
    {r:"1",n:"Extended Exhale Breathing",t:"2 min",e:"Strongest",c:C.teal,how:"Inhale 4 seconds through nose. Exhale 8 seconds through mouth. Repeat 6-8 times.",why:"Exhaling longer than inhaling directly slows heart rate via vagus nerve. Most studied exercise. Reduces cortisol within minutes.",note:"Works during any mood state. Can be done anywhere."},
    {r:"2",n:"Cold Water Face Dive",t:"30 sec",e:"Strong",c:C.blue,how:"Ice water on face for 15-30 seconds, or cold pack on forehead and cheeks while holding breath.",why:"Triggers mammalian dive reflex — involuntary parasympathetic response slowing heart rate up to 25%.",note:"The 'T' in DBT's TIPP skill. Fastest way to interrupt a panic attack."},
    {r:"3",n:"Progressive Muscle Relaxation",t:"10-15 min",e:"Strong",c:C.purple,how:"Starting from feet, tense each muscle group 5 seconds, release 30 seconds. Move up: calves, thighs, abs, chest, hands, arms, shoulders, neck, face.",why:"Trains nervous system to recognize and release chronic tension. Reduces cortisol, improves sleep, lowers blood pressure.",note:"Best for insomnia that precedes both mania and depression. Do in bed before sleep."},
    {r:"4",n:"Vigorous Exercise (20 min)",t:"20 min",e:"Very Strong",c:C.warm,how:"Any movement elevating heart rate: walking, jogging, cycling, swimming, dancing. 20+ minutes moderate-to-vigorous.",why:"Releases endorphins/serotonin/dopamine. Endurance training specifically improves vagal tone. Evidence shows exercise outperforms medication for some depression/anxiety.",note:"Challenge during depression = motivation. Even 10 minutes helps. Consistency matters more than intensity."},
    {r:"5",n:"Humming / Chanting / Om",t:"3-5 min",e:"Moderate",c:"#059669",how:"Hum a low steady tone, chant 'Om' with sustained vibration, or gargle water vigorously for 60 seconds.",why:"Vagus nerve passes through vocal cords. Sustained vocalization creates vibrations that mechanically stimulate vagal fibers.",note:"Low-barrier. Shower, car, anywhere private. Gargling recommended by some DBT therapists."},
    {r:"6",n:"5-4-3-2-1 Grounding",t:"3-5 min",e:"Moderate",c:C.accent,how:"Name 5 things you see. 4 you can touch. 3 you hear. 2 you smell. 1 you taste. Say each aloud if possible.",why:"Redirects brain from internal threat processing (amygdala) to external sensory processing (cortex). Interrupts anxiety loop.",note:"Essential for dissociation and overwhelming sensory experiences. No equipment needed."},
    {r:"7",n:"Gentle Yoga / Mindful Movement",t:"10-20 min",e:"Moderate",c:C.blue,how:"Slow flowing movements synchronized with breath. Forward folds and yin yoga especially effective.",why:"Combines deep breathing, muscle engagement/release, and mindfulness — all independently stimulate vagus nerve.",note:"Accessible during depression when vigorous exercise feels impossible. Slowness counterweights manic urges."},
    {r:"8",n:"Ear Massage",t:"2 min",e:"Emerging",c:C.light,how:"Gently massage outer ear folds with thumb and index finger. Focus on cymba concha (hollow cup-shaped upper ear).",why:"Auricular branch of vagus nerve in the ear. Gentle massage triggers calming parasympathetic response.",note:"Discreet. Meetings, phone calls, public. Good for low-grade persistent anxiety."},
  ];
  return(<S style={{paddingTop:40,paddingBottom:60}}>
    <B color={C.accent}>Mind-Body Connection</B>
    <h2 style={{fontFamily:F.d,fontSize:30,fontWeight:700,color:C.text,margin:"12px 0 8px"}}>Exercises for Physical Anxiety</h2>
    <p style={{fontSize:15,color:C.mid,margin:"0 0 12px",maxWidth:640,lineHeight:1.65,fontFamily:F.b}}>When anxiety lives in your body — racing heart, tight chest, shaking hands — you need to talk to your <strong>nervous system</strong> directly through the <strong>vagus nerve</strong>.</p>
    <p style={{fontSize:14,color:C.light,margin:"0 0 28px",maxWidth:600,lineHeight:1.6,fontFamily:F.b}}>These exercises work for anxiety from any condition: generalized anxiety, panic, bipolar agitation, PTSD, or stress.</p>

    {ex.map((x,i)=><Cd key={i} hover style={{marginBottom:12,borderLeft:`3px solid ${x.c}`}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <span style={{fontFamily:F.d,fontSize:24,fontWeight:800,color:x.c,opacity:0.4}}>#{x.r}</span>
          <h4 style={{fontFamily:F.d,fontSize:17,fontWeight:700,color:C.text,margin:0}}>{x.n}</h4>
        </div>
        <div style={{display:"flex",gap:6,flexShrink:0}}><B color={x.c}>{x.t}</B><B color={C.light}>{x.e}</B></div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(260px, 1fr))",gap:12}}>
        <div style={{padding:"10px 12px",background:"#fafaf8",borderRadius:8}}><div style={{fontSize:11,fontWeight:700,textTransform:"uppercase",color:C.teal,marginBottom:3,fontFamily:F.b}}>How</div><p style={{fontSize:12.5,color:C.mid,lineHeight:1.55,margin:0,fontFamily:F.b}}>{x.how}</p></div>
        <div style={{padding:"10px 12px",background:"#fafaf8",borderRadius:8}}><div style={{fontSize:11,fontWeight:700,textTransform:"uppercase",color:C.blue,marginBottom:3,fontFamily:F.b}}>Why It Works</div><p style={{fontSize:12.5,color:C.mid,lineHeight:1.55,margin:0,fontFamily:F.b}}>{x.why}</p></div>
      </div>
      <div style={{marginTop:8,padding:"8px 12px",background:`${C.accent}06`,borderRadius:8}}><p style={{fontSize:12,color:C.mid,lineHeight:1.5,margin:0,fontFamily:F.b,fontStyle:"italic"}}>{x.note}</p></div>
    </Cd>)}

    <Cd style={{background:"#f0f5f3",borderColor:"#d0ddd5",marginTop:16}}>
      <h4 style={{fontSize:15,fontWeight:700,color:C.teal,margin:"0 0 8px",fontFamily:F.d}}>2-Minute Emergency Protocol</h4>
      <p style={{fontSize:13.5,color:C.mid,lineHeight:1.65,margin:"0 0 10px",fontFamily:F.b}}>When physical anxiety hits and you need to come down <em>now</em>:</p>
      <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
        {[{n:"1",t:"Cold on face (30s)"},{n:"2",t:"Extended exhale (60s)"},{n:"3",t:"5-4-3-2-1 grounding (30s)"}].map((s,i)=>
          <div key={i} style={{flex:"1 1 160px",padding:12,background:C.card,borderRadius:10,border:`1px solid ${C.border}`,textAlign:"center"}}>
            <div style={{fontFamily:F.d,fontSize:24,fontWeight:800,color:C.teal}}>{s.n}</div>
            <div style={{fontSize:13,fontWeight:700,color:C.text,fontFamily:F.b}}>{s.t}</div>
          </div>)}
      </div>
    </Cd>
  </S>);}

// ═══════════════════════════════════════════════════════════════
// SUBSTANCE USE — covers all three
// ═══════════════════════════════════════════════════════════════
function Substance(){return(<S style={{paddingTop:40,paddingBottom:60}}>
  <B color={C.warm}>No Shame. Real Talk.</B>
  <h2 style={{fontFamily:F.d,fontSize:30,fontWeight:700,color:C.text,margin:"12px 0 8px"}}>Substance Use & Mental Health</h2>
  <p style={{fontSize:15,color:C.mid,margin:"0 0 10px",maxWidth:640,lineHeight:1.65,fontFamily:F.b}}>If you have a mental health condition and you use substances to cope, you are not weak. You are in the <strong>majority</strong>. Self-medication is one of the most common responses to untreated mental illness — and one of the most dangerous.</p>
  <p style={{fontSize:15,color:C.mid,margin:"0 0 28px",maxWidth:640,lineHeight:1.65,fontFamily:F.b}}>Bipolar has the highest comorbidity rate (~60%), but depression and anxiety drive substance use at massive scale too. Understanding why it happens — and why it makes everything worse — is critical.</p>

  <h3 style={{fontFamily:F.d,fontSize:20,fontWeight:700,color:C.text,margin:"0 0 14px"}}>Why It's So Common</h3>
  <Cd style={{marginBottom:20,borderLeft:`3px solid ${C.warm}`}}>
    {[{r:"Self-medication",d:"Alcohol to quiet racing thoughts or numb depression. Cannabis to sleep. Stimulants to fight fatigue. These aren't random choices — they're attempts to fix real neurobiological problems with the wrong tools."},
      {r:"To feel normal",d:"When your brain swings between extremes or sits in a pit, substances feel like the only thing that puts you in the middle. The tragedy: it's temporary and the rebound makes everything worse."},
      {r:"Shared neurobiology",d:"The same reward pathways, dopamine systems, and impulsivity circuits dysregulated in depression, anxiety, and bipolar also drive vulnerability to substance use. Your brain is literally wired for higher risk."},
      {r:"Coping with the disorder",d:"The grief of diagnosis, medication side effects, damage from past episodes, strain on relationships. Substances become a coping mechanism for the emotional weight of chronic illness."}
    ].map((x,i)=><div key={i} style={{padding:"12px 0",borderBottom:i<3?`1px solid ${C.border}`:"none"}}><h4 style={{fontSize:14,fontWeight:700,color:C.warm,margin:"0 0 4px",fontFamily:F.b}}>{x.r}</h4><p style={{fontSize:13,color:C.mid,lineHeight:1.6,margin:0,fontFamily:F.b}}>{x.d}</p></div>)}
  </Cd>

  <h3 style={{fontFamily:F.d,fontSize:20,fontWeight:700,color:C.text,margin:"0 0 14px"}}>Why It Makes Everything Worse</h3>
  <Cd style={{marginBottom:20,borderLeft:`3px solid ${C.red}`}}>
    {[{h:"More frequent and severe episodes",d:"Destabilizes mood, increases hospitalizations. Cocaine worsens bipolar progression. Cannabis increases mania and suicide risk. Alcohol deepens depression on rebound."},
      {h:"Higher suicide risk",d:"Substances + mental illness significantly increases suicide attempts. Alcohol is particularly dangerous — removes inhibitions while deepening depressive cognition."},
      {h:"Treatment resistance",d:"Substances interfere with medication by reducing efficacy or requiring higher doses. Also reduces treatment compliance — creating a vicious cycle."},
      {h:"Delayed diagnosis",d:"Substance use masks and mimics psychiatric symptoms. Stimulant euphoria looks like mania. Alcohol withdrawal looks like depression. Years of wrong treatment."}
    ].map((x,i)=><div key={i} style={{padding:"12px 0",borderBottom:i<3?`1px solid ${C.border}`:"none"}}><h4 style={{fontSize:14,fontWeight:700,color:C.red,margin:"0 0 4px",fontFamily:F.b}}>{x.h}</h4><p style={{fontSize:13,color:C.mid,lineHeight:1.6,margin:0,fontFamily:F.b}}>{x.d}</p></div>)}
  </Cd>

  <h3 style={{fontFamily:F.d,fontSize:20,fontWeight:700,color:C.teal,margin:"0 0 14px"}}>What Actually Helps</h3>
  <Cd style={{marginBottom:20,borderLeft:`3px solid ${C.teal}`}}>
    {[{t:"Integrated treatment",d:"Treat both disorders simultaneously. The old 'get sober first' approach is wrong. Integrated therapies addressing both are significantly more effective."},
      {t:"Honest disclosure",d:"Your psychiatrist can't help if they don't know what you're using. Substances change which medications work and which are dangerous."},
      {t:"Mood stabilization first",d:"Stabilizing the underlying condition often reduces the drive to self-medicate. When your mood is managed, the pull toward substances weakens."},
      {t:"Harm reduction",d:"Complete abstinence may not be immediately realistic. Reducing use, avoiding the most dangerous combinations, never mixing with medication — progress, not perfection."}
    ].map((x,i)=><div key={i} style={{padding:"12px 0",borderBottom:i<3?`1px solid ${C.border}`:"none"}}><h4 style={{fontSize:14,fontWeight:700,color:C.teal,margin:"0 0 4px",fontFamily:F.b}}>{x.t}</h4><p style={{fontSize:13,color:C.mid,lineHeight:1.6,margin:0,fontFamily:F.b}}>{x.d}</p></div>)}
  </Cd>

  <Cd style={{background:"#faf5f0",borderColor:"#e8ddd2"}}>
    <p style={{fontSize:14.5,color:C.mid,lineHeight:1.7,margin:"0 0 10px",fontFamily:F.b}}>You were doing the best you could with what you had. The self-medication hypothesis isn't an excuse — it's an explanation.</p>
    <p style={{fontSize:14.5,color:C.text,lineHeight:1.7,margin:0,fontFamily:F.b,fontWeight:600}}>Your brain deserves better than a temporary fix that steals from tomorrow.</p>
  </Cd>
</S>);}

// ═══════════════════════════════════════════════════════════════
// FIND HELP — universal
// ═══════════════════════════════════════════════════════════════
function Help(){return(<S style={{paddingTop:40,paddingBottom:60}}>
  <B color={C.accent}>Take the Next Step</B>
  <h2 style={{fontFamily:F.d,fontSize:30,fontWeight:700,color:C.text,margin:"12px 0 8px"}}>Find a Psychiatrist or Therapist</h2>
  <p style={{fontSize:15,color:C.mid,margin:"0 0 28px",maxWidth:620,lineHeight:1.65,fontFamily:F.b}}>Whether it's depression, anxiety, or bipolar disorder — professional help changes outcomes dramatically. A psychiatrist prescribes medication; a therapist provides talk therapy. Most people benefit from both.</p>

  <h3 style={{fontFamily:F.d,fontSize:20,fontWeight:700,color:C.text,margin:"0 0 14px"}}>Provider Directories</h3>
  <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(280px, 1fr))",gap:14,marginBottom:32}}>
    {[{n:"Psychology Today",u:"psychologytoday.com/us/psychiatrists",d:"Largest directory. Filter by insurance, specialty, location, telehealth.",tags:["Psychiatrists","Therapists","Insurance Filter"]},
      {n:"SAMHSA Locator",u:"findtreatment.gov",d:"Free government tool. Finds mental health facilities and providers near you.",tags:["Free","Government","All Providers"]},
      {n:"NAMI Helpline",u:"nami.org/help",d:"1-800-950-NAMI. Free referrals, support groups, education.",tags:["Phone Support","Free","Referrals"]},
      {n:"Open Path Collective",u:"openpathcollective.org",d:"Affordable therapy $30-80/session for people without insurance.",tags:["Affordable","No Insurance","Therapists"]},
      {n:"DBSA Support Groups",u:"dbsalliance.org",d:"Peer-led support groups specifically for mood disorders.",tags:["Peer Support","Free","Mood Disorders"]},
      {n:"Zocdoc",u:"zocdoc.com",d:"Book appointments online. Real-time availability, reviews.",tags:["Online Booking","Reviews","Insurance"]}
    ].map((x,i)=><Cd key={i} hover>
      <h4 style={{fontFamily:F.d,fontSize:16,fontWeight:700,color:C.text,margin:"0 0 6px"}}>{x.n}</h4>
      <p style={{fontSize:13,color:C.mid,lineHeight:1.55,margin:"0 0 10px",fontFamily:F.b}}>{x.d}</p>
      <div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:8}}>{x.tags.map(t=><span key={t} style={{padding:"2px 8px",borderRadius:12,fontSize:10.5,fontWeight:600,color:C.teal,background:C.tL,fontFamily:F.b}}>{t}</span>)}</div>
      <span style={{fontSize:13,color:C.accent,fontWeight:600,fontFamily:F.b}}>{x.u} →</span>
    </Cd>)}
  </div>

  <h3 style={{fontFamily:F.d,fontSize:20,fontWeight:700,color:C.text,margin:"0 0 14px"}}>What to Say at Your First Appointment</h3>
  <Cd style={{marginBottom:20}}>
    {["\"I've been having periods where my mood / anxiety is significantly affecting my life and I'd like a professional evaluation.\"",
      "\"I took some online screenings that flagged concerns. I'd like to discuss what I'm experiencing with a professional.\"",
      "\"I've been treated for depression, but the medication doesn't seem to work — or makes me feel worse.\"",
      "\"I have a family history of mental illness and I'm noticing patterns in myself that concern me.\"",
      "\"I want to understand what I'm experiencing and what my treatment options are.\"",
    ].map((q,i)=><div key={i} style={{padding:"10px 14px",background:"#faf8f5",borderRadius:8,marginBottom:8,borderLeft:`3px solid ${C.accent}`,fontSize:13.5,color:C.text,lineHeight:1.55,fontFamily:F.b,fontStyle:"italic"}}>{q}</div>)}
  </Cd>

  <h3 style={{fontFamily:F.d,fontSize:20,fontWeight:700,color:C.text,margin:"0 0 14px"}}>If You Don't Have Insurance</h3>
  <Cd style={{marginBottom:20}}>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(250px, 1fr))",gap:16}}>
      {[{t:"Community Mental Health Centers",d:"Every U.S. county has one. Sliding-scale fees. Find yours at findtreatment.gov."},
        {t:"University Training Clinics",d:"Psychiatry residency programs offer supervised care at reduced rates. Quality often excellent."},
        {t:"Patient Assistance Programs",d:"Most manufacturers offer free/discounted meds. NeedyMeds.org and RxAssist.org."},
        {t:"Telehealth",d:"Cerebral, Brightside, Done — psychiatric care at lower cost with quick access."}
      ].map((x,i)=><div key={i}><h4 style={{fontSize:14,fontWeight:700,color:C.text,margin:"0 0 4px",fontFamily:F.b}}>{x.t}</h4><p style={{fontSize:12.5,color:C.mid,lineHeight:1.55,margin:0,fontFamily:F.b}}>{x.d}</p></div>)}
    </div>
  </Cd>

  <Cd style={{background:"#fef9f0",borderColor:"#f0d8a8",textAlign:"center"}}>
    <div style={{fontSize:13,fontWeight:700,color:C.warm,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:6,fontFamily:F.b}}>Crisis Resources — 24/7</div>
    <div style={{fontFamily:F.d,fontSize:24,fontWeight:700,color:C.text}}>988 Suicide & Crisis Lifeline</div>
    <p style={{fontFamily:F.b,fontSize:14,color:C.mid,margin:"6px 0 0"}}>Call or text <strong>988</strong> · Crisis Text Line: text <strong>HOME</strong> to <strong>741741</strong></p>
  </Cd>
</S>);}

// ═══════════════════════════════════════════════════════════════
// ABOUT
// ═══════════════════════════════════════════════════════════════
function About(){return(<S style={{paddingTop:60,paddingBottom:60}}>
  <div style={{maxWidth:600,margin:"0 auto"}}>
    <div style={{padding:"14px 20px",background:"#fef3c7",border:"1.5px solid #f59e0b40",borderRadius:12,marginBottom:28,display:"flex",alignItems:"center",gap:10}}>
      <span style={{fontSize:20}}>🔨</span>
      <p style={{fontSize:13.5,color:"#92400e",lineHeight:1.55,margin:0,fontFamily:F.b}}><strong>This site is under active development.</strong> Screening tools, additional conditions, and features are being added. If you notice anything that needs correcting, please reach out.</p>
    </div>

    <B color={C.accent}>Why This Exists</B>
    <h2 style={{fontFamily:F.d,fontSize:32,fontWeight:700,color:C.text,margin:"14px 0 24px",lineHeight:1.2}}>About Brain Weather</h2>

    <div style={{fontSize:15.5,color:C.mid,lineHeight:1.75,fontFamily:F.b}}>
      <p style={{marginBottom:18}}>Brain Weather was developed in collaboration with Maxine, a licensed therapist, over several years of research and conversation about what people affected by mental illness actually need — and what most available resources fail to provide.</p>
      <p style={{marginBottom:18}}>As someone with a family history of bipolar disorder, I have seen firsthand how a delayed or missed diagnosis changes the trajectory of a person's life. That experience extended into a broader realization: whether it's depression, anxiety, or bipolar disorder, the earlier someone understands what they are experiencing, the better the outcomes.</p>
      <p style={{marginBottom:18}}>Your brain has weather. Some days are clear. Some days storm. Some days the forecast changes by the hour. <strong>Two weathers — normal and out of sorts — are both part of being human.</strong> The question this site helps you answer is whether what you're experiencing is a rough patch or a condition that needs professional attention. There's no shame in either answer.</p>
      <p style={{marginBottom:0,color:C.text,fontWeight:500}}>None of this replaces professional evaluation or treatment. But it can be the bridge that helps someone get there.</p>
    </div>

    <div style={{marginTop:20,padding:"20px 24px",background:"#fdf2f2",borderRadius:14,border:"1.5px solid #e8c4c4"}}>
      <h3 style={{fontFamily:F.d,fontSize:16,fontWeight:700,color:C.red,margin:"0 0 8px"}}>Medical Disclaimer</h3>
      <p style={{fontSize:12.5,color:"#7a3030",lineHeight:1.65,margin:"0 0 8px",fontFamily:F.b}}>The information on this website is for educational and informational purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of a qualified healthcare provider.</p>
      <p style={{fontSize:12.5,color:"#7a3030",lineHeight:1.65,margin:"0 0 8px",fontFamily:F.b}}>Medication information is a general reference sourced from FDA labels and peer-reviewed literature. Individual responses vary. Never start, stop, or adjust medication without your prescribing physician.</p>
      <p style={{fontSize:12.5,color:"#7a3030",lineHeight:1.65,margin:0,fontFamily:F.b}}>If you are experiencing a mental health crisis, contact the <strong>988 Suicide & Crisis Lifeline</strong> by calling or texting <strong>988</strong>.</p>
    </div>

    <div style={{marginTop:24,textAlign:"center"}}>
      <p style={{fontSize:13,color:C.light,fontFamily:F.b}}>If this site helped you, share it with someone who might need it.</p>
    </div>
  </div>
</S>);}

// ═══════════════════════════════════════════════════════════════
// APP
// ═══════════════════════════════════════════════════════════════
export default function App(){
  const[a,setA]=useState("home");
  const ref=useRef(null);
  useEffect(()=>{ref.current?.scrollIntoView({behavior:"smooth",block:"start"});},[a]);
  return(
    <div ref={ref} style={{minHeight:"100vh",background:C.bg,fontFamily:F.b}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;700;800&family=Source+Sans+3:wght@300;400;500;600;700;800&display=swap');
        @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        *{box-sizing:border-box;margin:0}a{color:${C.accent}}::selection{background:${C.accent}30}
        @media(max-width:768px){.dn{display:none!important}.mb{display:block!important}}
        @media(min-width:769px){.mb{display:none!important}.md{display:none!important}}
      `}</style>
      <Nav active={a} go={setA}/>
      {a==="home"&&<Home go={setA}/>}
      {a==="depression"&&<Depression/>}
      {a==="anxiety"&&<Anxiety/>}
      {a==="bipolar"&&<Bipolar/>}
      {a==="meds"&&<Meds/>}
      {a==="therapy"&&<Therapy/>}
      {a==="body"&&<Body/>}
      {a==="substance"&&<Substance/>}
      {a==="help"&&<Help/>}
      {a==="about"&&<About/>}
      <footer style={{borderTop:`1px solid ${C.border}`,padding:"24px 20px",textAlign:"center",marginTop:40}}>
        <p style={{fontSize:12,color:C.light,lineHeight:1.6,maxWidth:600,margin:"0 auto",fontFamily:F.b}}>This site is for educational purposes only and does not provide medical advice, diagnosis, or treatment. Always seek the advice of a qualified healthcare provider. This site is under active development.</p>
        <p style={{fontSize:11,color:C.light,marginTop:8,fontFamily:F.b}}>© {new Date().getFullYear()} Brain Weather</p>
      </footer>
    </div>
  );
}
