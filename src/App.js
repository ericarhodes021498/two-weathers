import { useState, useEffect, useRef } from "react";
import { Analytics } from '@vercel/analytics/react';

const C = {
  bg:"#fafaf8",card:"#fff",border:"#e8e5df",text:"#2a2520",mid:"#5c564e",light:"#8a847a",
  accent:"#c25e30",aL:"#c25e3018",teal:"#2d6a4f",tL:"#2d6a4f12",
  blue:"#3563b0",bL:"#3563b010",warm:"#b8510d",red:"#c23030",purple:"#7c3aed",
  sh:"0 1px 3px rgba(0,0,0,0.04),0 4px 12px rgba(0,0,0,0.03)",
  shH:"0 2px 8px rgba(0,0,0,0.06),0 8px 24px rgba(0,0,0,0.05)",
};
const F={d:"'Playfair Display',Georgia,serif",b:"'Source Sans 3','Segoe UI',sans-serif"};

// ── NAV ──
function Nav({active,go}){
  const[open,setOpen]=useState(false);
  const tabs=[{id:"home",l:"Home"},{id:"screen",l:"Screenings"},{id:"meds",l:"Medications"},{id:"therapy",l:"Therapy"},{id:"body",l:"Body"},{id:"help",l:"Find Help"},{id:"about",l:"About"}];
  const p=id=>{go(id);setOpen(false);};
  return(
    <nav style={{position:"sticky",top:0,zIndex:100,background:"rgba(250,250,248,0.95)",backdropFilter:"blur(12px)",borderBottom:`1px solid ${C.border}`}}>
      <div style={{maxWidth:900,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",height:56,padding:"0 20px"}}>
        <div style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer"}} onClick={()=>p("home")}>
          <span style={{fontSize:22}}>⛅</span>
          <span style={{fontFamily:F.d,fontSize:18,fontWeight:700,color:C.text}}>Brain Weather</span>
        </div>
        <div className="dn" style={{display:"flex",gap:4}}>
          {tabs.map(t=><button key={t.id} onClick={()=>p(t.id)} style={{padding:"8px 14px",borderRadius:8,border:"none",cursor:"pointer",background:active===t.id?C.aL:"transparent",color:active===t.id?C.accent:C.mid,fontSize:13,fontWeight:active===t.id?700:500,fontFamily:F.b}}>{t.l}</button>)}
        </div>
        <button className="mb" onClick={()=>setOpen(!open)} style={{display:"none",background:"none",border:"none",cursor:"pointer",fontSize:24,color:C.text}}>{open?"✕":"☰"}</button>
      </div>
      {open&&<div className="md" style={{position:"absolute",top:56,left:0,right:0,background:"rgba(250,250,248,0.98)",borderBottom:`1px solid ${C.border}`,padding:"8px 20px 16px",boxShadow:C.sh}}>
        {tabs.map(t=><button key={t.id} onClick={()=>p(t.id)} style={{display:"block",width:"100%",textAlign:"left",padding:"12px 14px",borderRadius:8,border:"none",cursor:"pointer",marginBottom:2,background:active===t.id?C.aL:"transparent",color:active===t.id?C.accent:C.text,fontSize:15,fontWeight:active===t.id?700:500,fontFamily:F.b}}>{t.l}</button>)}
      </div>}
    </nav>
  );
}

// ── SHARED ──
function S({children,style}){return<div style={{maxWidth:900,margin:"0 auto",padding:"0 20px",...style}}>{children}</div>;}
function Cd({children,style}){return<div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:14,padding:24,boxShadow:C.sh,...style}}>{children}</div>;}
function B({children,color=C.accent}){return<span style={{display:"inline-block",padding:"3px 10px",borderRadius:20,fontSize:11,fontWeight:700,letterSpacing:"0.06em",textTransform:"uppercase",color,background:`${color}14`,fontFamily:F.b}}>{children}</span>;}

// ── PHQ-9 DATA ──
const PHQ9_QS=["Little interest or pleasure in doing things","Feeling down, depressed, or hopeless","Trouble falling or staying asleep, or sleeping too much","Feeling tired or having little energy","Poor appetite or overeating","Feeling bad about yourself — or that you are a failure or have let yourself or your family down","Trouble concentrating on things, such as reading or watching television","Moving or speaking so slowly that others noticed — or the opposite, being fidgety or restless","Thoughts that you would be better off dead, or of hurting yourself"];
const PHQ9_OPTS=["Not at all","Several days","More than half the days","Nearly every day"];
function phq9Score(a){let s=0;Object.values(a).forEach(v=>s+=v);return s;}
function phq9Result(s){if(s<=4)return{label:"Minimal depression",color:C.teal,desc:"Your responses suggest minimal or no depressive symptoms. Continue monitoring your mental health.",action:"No treatment typically needed. Reassess if symptoms develop."};if(s<=9)return{label:"Mild depression",color:C.blue,desc:"Mild depressive symptoms detected. These may be situational or early signs of a depressive episode.",action:"Consider lifestyle changes, self-care strategies, or brief counseling. Reassess in 2 weeks."};if(s<=14)return{label:"Moderate depression",color:C.warm,desc:"Moderate symptoms that are likely interfering with daily life. A professional evaluation is recommended.",action:"Consult a healthcare provider. Treatment options include therapy, medication, or both."};if(s<=19)return{label:"Moderately severe depression",color:C.accent,desc:"Significant symptoms requiring active treatment. These are substantially impacting your functioning.",action:"Active treatment recommended: antidepressants, psychotherapy, or combination."};return{label:"Severe depression",color:C.red,desc:"Severe depressive symptoms requiring immediate professional attention.",action:"Immediate treatment with antidepressants and psychotherapy. If in crisis, call 988."};}

// ── GAD-7 DATA ──
const GAD7_QS=["Feeling nervous, anxious, or on edge","Not being able to stop or control worrying","Worrying too much about different things","Trouble relaxing","Being so restless that it's hard to sit still","Becoming easily annoyed or irritable","Feeling afraid, as if something awful might happen"];
const GAD7_OPTS=["Not at all","Several days","More than half the days","Nearly every day"];
function gad7Score(a){let s=0;Object.values(a).forEach(v=>s+=v);return s;}
function gad7Result(s){if(s<=4)return{label:"Minimal anxiety",color:C.teal,desc:"Your responses suggest minimal anxiety symptoms.",action:"No treatment typically needed. Monitor and reassess if symptoms develop."};if(s<=9)return{label:"Mild anxiety",color:C.blue,desc:"Mild anxiety symptoms. May benefit from self-care strategies and monitoring.",action:"Consider relaxation techniques, exercise, and reassess in 2 weeks."};if(s<=14)return{label:"Moderate anxiety",color:C.warm,desc:"Moderate anxiety likely interfering with daily functioning.",action:"Consult a healthcare provider. CBT, medication, or both may be appropriate."};return{label:"Severe anxiety",color:C.red,desc:"Severe anxiety requiring professional evaluation and active treatment.",action:"Treatment with CBT, SSRIs/SNRIs, or combination. If debilitating, seek help promptly."};}

// ── MDQ DATA ──
const MDQ_QS=["You felt so good or hyper that other people thought you were not your normal self, or you got into trouble","You were so irritable that you shouted at people or started fights or arguments","You felt much more self-confident than usual","You got much less sleep than usual and found you didn't really miss it","You were much more talkative or spoke much faster than usual","Thoughts raced through your head or you couldn't slow your mind down","You were so easily distracted that you had trouble concentrating","You had much more energy than usual","You were much more active or did many more things than usual","You were much more social or outgoing than usual","You were much more interested in sex than usual","You did things that were unusual for you or that others thought were excessive, foolish, or risky","Spending money got you or your family into trouble"];

// ── GENERIC SCREENER COMPONENT ──
function Screener({title,badge,color,questions,options,scoreFn,resultFn,intro,source}){
  const[answers,setAnswers]=useState({});
  const[done,setDone]=useState(false);
  const allDone=Object.keys(answers).length===questions.length;
  const score=allDone?scoreFn(answers):0;
  const result=done?resultFn(score):null;

  return(<S style={{paddingTop:40,paddingBottom:60}}>
    <B color={color}>{badge}</B>
    <h2 style={{fontFamily:F.d,fontSize:28,fontWeight:700,color:C.text,margin:"12px 0 8px"}}>{title}</h2>
    <p style={{fontSize:14,color:C.mid,margin:"0 0 8px",maxWidth:600,lineHeight:1.6,fontFamily:F.b}}>{intro}</p>
    <Cd style={{background:"#fdf2f2",borderColor:"#e8c4c4",marginBottom:24,padding:"14px 20px"}}>
      <p style={{fontSize:12,color:"#7a3030",lineHeight:1.6,margin:0,fontFamily:F.b}}><strong>This is an educational screening tool, not a diagnosis.</strong> Only a licensed mental health professional can diagnose psychiatric conditions. A positive or negative result should be discussed with a qualified provider.</p>
    </Cd>

    {!done&&<div>
      {questions.map((q,i)=>(
        <div key={i} style={{background:answers[i]!==undefined?`${color}06`:C.card,border:`1.5px solid ${answers[i]!==undefined?color+"30":C.border}`,borderRadius:12,padding:"14px 18px",marginBottom:8}}>
          <p style={{fontSize:14,lineHeight:1.55,color:C.text,margin:"0 0 10px",fontFamily:F.b}}>{i+1}. {q}</p>
          <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
            {options.map((o,j)=>(
              <button key={j} onClick={()=>setAnswers(a=>({...a,[i]:j}))} style={{
                padding:"6px 14px",borderRadius:7,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:F.b,
                border:answers[i]===j?`1.5px solid ${color}`:`1.5px solid ${C.border}`,
                background:answers[i]===j?color:"transparent",
                color:answers[i]===j?"#fff":C.mid,
              }}>{o}</button>
            ))}
          </div>
        </div>
      ))}
      <div style={{textAlign:"center",marginTop:20}}>
        <button onClick={()=>setDone(true)} disabled={!allDone} style={{
          padding:"12px 32px",borderRadius:10,border:"none",fontSize:15,fontWeight:700,cursor:allDone?"pointer":"default",fontFamily:F.b,
          background:allDone?color:"#d5d9e2",color:allDone?"#fff":"#94a3b8",
        }}>View Results</button>
      </div>
    </div>}

    {done&&result&&<div>
      <Cd style={{borderTop:`3px solid ${result.color}`,marginBottom:20}}>
        <B color={result.color}>Screening Indication — Not a Diagnosis</B>
        <h3 style={{fontFamily:F.d,fontSize:22,fontWeight:700,color:result.color,margin:"10px 0 6px"}}>{result.label}</h3>
        <div style={{fontFamily:F.d,fontSize:36,fontWeight:800,color:result.color,margin:"0 0 8px"}}>{score}<span style={{fontSize:16,color:C.light}}>/{questions.length*(options.length-1)}</span></div>
        <p style={{fontSize:14,color:C.mid,lineHeight:1.6,margin:"0 0 10px",fontFamily:F.b}}>{result.desc}</p>
        <div style={{padding:"10px 14px",background:`${result.color}08`,borderRadius:8}}>
          <div style={{fontSize:11,fontWeight:700,textTransform:"uppercase",color:result.color,marginBottom:3,fontFamily:F.b}}>Suggested Next Step</div>
          <p style={{fontSize:13,color:C.mid,lineHeight:1.5,margin:0,fontFamily:F.b}}>{result.action}</p>
        </div>
      </Cd>
      <Cd style={{background:"#fdf2f2",borderColor:"#e8c4c4",marginBottom:16,padding:"14px 20px"}}>
        <p style={{fontSize:12,color:"#7a3030",lineHeight:1.6,margin:0,fontFamily:F.b}}><strong>This does not constitute a medical diagnosis.</strong> The {source} is a validated screening instrument. Results should be discussed with a licensed mental health professional who can conduct a comprehensive evaluation. If you are in crisis, call or text <strong>988</strong>.</p>
      </Cd>
      <div style={{textAlign:"center"}}>
        <button onClick={()=>{setAnswers({});setDone(false);}} style={{padding:"10px 24px",borderRadius:10,border:`1.5px solid ${C.border}`,background:"transparent",color:C.mid,fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:F.b}}>Retake</button>
      </div>
    </div>}
  </S>);
}

// ── MDQ SCREENER (custom — needs yes/no + clustering + impact) ──
function MDQScreen(){
  const[ma,setMa]=useState({});
  const[cl,setCl]=useState(null);
  const[imp,setImp]=useState(null);
  const[done,setDone]=useState(false);
  const maCount=Object.values(ma).filter(Boolean).length;
  const allMa=Object.keys(ma).length===13;
  const ready=allMa&&cl!==null&&imp!==null;
  const impSig=imp==="moderate"||imp==="serious";
  const positive=maCount>=7&&cl===true&&impSig;

  const getResult=()=>{
    if(positive)return{label:"Positive Screen for Bipolar Spectrum",color:C.accent,desc:`You endorsed ${maCount} of 13 manic/hypomanic symptoms, reported symptom clustering, and significant functional impact. This pattern is consistent with possible bipolar spectrum disorder and warrants professional evaluation.`,action:"Discuss these results with a psychiatrist. Bipolar disorder requires different treatment than unipolar depression — particularly regarding antidepressant use."};
    if(maCount>=7)return{label:"Elevated Symptoms — Inconclusive",color:C.warm,desc:`You endorsed ${maCount} of 13 symptoms but did not meet all three MDQ criteria (symptoms ≥7, clustering, and significant impact). Some features of bipolar spectrum may be present.`,action:"Consider discussing with a mental health provider, especially if you have a family history of bipolar disorder or have not responded to antidepressants."};
    return{label:"Negative Screen",color:C.teal,desc:`You endorsed ${maCount} of 13 manic/hypomanic symptoms. This does not strongly suggest bipolar disorder based on the MDQ criteria.`,action:"A negative screen does not rule out bipolar disorder. If mood instability persists, discuss with a provider."};
  };
  const r=done?getResult():null;

  return(<S style={{paddingTop:40,paddingBottom:60}}>
    <B color={C.accent}>Bipolar Screening</B>
    <h2 style={{fontFamily:F.d,fontSize:28,fontWeight:700,color:C.text,margin:"12px 0 8px"}}>Mood Disorder Questionnaire (MDQ)</h2>
    <p style={{fontSize:14,color:C.mid,margin:"0 0 8px",maxWidth:600,lineHeight:1.6,fontFamily:F.b}}>The MDQ screens for bipolar spectrum disorders. 13 symptom questions plus clustering and impact assessment. Based on lifetime experiences, not just today.</p>
    <Cd style={{background:"#fdf2f2",borderColor:"#e8c4c4",marginBottom:24,padding:"14px 20px"}}>
      <p style={{fontSize:12,color:"#7a3030",lineHeight:1.6,margin:0,fontFamily:F.b}}><strong>Educational screening tool, not a diagnosis.</strong> Only a psychiatrist or psychologist can diagnose bipolar disorder. The MDQ is validated (Hirschfeld et al., Am J Psychiatry, 2000) with 73% sensitivity and 90% specificity.</p>
    </Cd>

    {!done&&<div>
      <h3 style={{fontFamily:F.d,fontSize:18,fontWeight:700,color:C.text,margin:"0 0 6px"}}>Has there ever been a period when you were not your usual self and...</h3>
      <p style={{fontSize:13,color:C.light,margin:"0 0 14px",fontFamily:F.b}}>Answer Yes or No for each.</p>
      {MDQ_QS.map((q,i)=>(
        <div key={i} style={{background:ma[i]===true?`${C.accent}06`:ma[i]===false?"#fafaf8":C.card,border:`1.5px solid ${ma[i]===true?C.accent+"30":C.border}`,borderRadius:12,padding:"12px 16px",marginBottom:6}}>
          <p style={{fontSize:13.5,lineHeight:1.5,color:C.text,margin:"0 0 8px",fontFamily:F.b}}>{i+1}. {q}</p>
          <div style={{display:"flex",gap:6}}>
            {[true,false].map(v=><button key={String(v)} onClick={()=>setMa(a=>({...a,[i]:v}))} style={{
              padding:"5px 16px",borderRadius:7,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:F.b,
              border:ma[i]===v?`1.5px solid ${v?C.accent:"#8a919e"}`:`1.5px solid ${C.border}`,
              background:ma[i]===v?(v?C.accent:"#6b7280"):"transparent",
              color:ma[i]===v?"#fff":C.mid,
            }}>{v?"Yes":"No"}</button>)}
          </div>
        </div>
      ))}

      {allMa&&<div style={{marginTop:20}}>
        <Cd style={{marginBottom:12}}>
          <p style={{fontSize:14,fontWeight:600,color:C.text,margin:"0 0 12px",fontFamily:F.b}}>If you answered YES to more than one above, have several of these ever happened during the same period of time?</p>
          <div style={{display:"flex",gap:8}}>
            {[true,false].map(v=><button key={String(v)} onClick={()=>setCl(v)} style={{flex:1,padding:"12px",borderRadius:10,fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:F.b,border:cl===v?`2px solid ${v?C.accent:"#6b7280"}`:`1.5px solid ${C.border}`,background:cl===v?(v?C.accent:"#6b7280"):C.card,color:cl===v?"#fff":C.mid}}>{v?"Yes":"No"}</button>)}
          </div>
        </Cd>
        <Cd>
          <p style={{fontSize:14,fontWeight:600,color:C.text,margin:"0 0 12px",fontFamily:F.b}}>How much of a problem did any of these cause — like being unable to work, family/money/legal troubles, or getting into arguments?</p>
          {["none","minor","moderate","serious"].map(v=><button key={v} onClick={()=>setImp(v)} style={{display:"block",width:"100%",textAlign:"left",padding:"11px 16px",borderRadius:10,marginBottom:6,cursor:"pointer",fontFamily:F.b,fontSize:14,fontWeight:imp===v?700:500,border:imp===v?`2px solid ${C.accent}`:`1.5px solid ${C.border}`,background:imp===v?C.aL:C.card,color:imp===v?C.accent:C.mid}}>{v==="none"?"No problems":v==="minor"?"Minor problems":v==="moderate"?"Moderate problems":"Serious problems"}</button>)}
        </Cd>
      </div>}

      <div style={{textAlign:"center",marginTop:20}}>
        <button onClick={()=>setDone(true)} disabled={!ready} style={{padding:"12px 32px",borderRadius:10,border:"none",fontSize:15,fontWeight:700,cursor:ready?"pointer":"default",fontFamily:F.b,background:ready?C.accent:"#d5d9e2",color:ready?"#fff":"#94a3b8"}}>View Results</button>
      </div>
    </div>}

    {done&&r&&<div>
      <Cd style={{borderTop:`3px solid ${r.color}`,marginBottom:20}}>
        <B color={r.color}>Screening Indication — Not a Diagnosis</B>
        <h3 style={{fontFamily:F.d,fontSize:22,fontWeight:700,color:r.color,margin:"10px 0 6px"}}>{r.label}</h3>
        <div style={{fontFamily:F.d,fontSize:36,fontWeight:800,color:r.color,margin:"0 0 8px"}}>{maCount}<span style={{fontSize:16,color:C.light}}>/13 symptoms</span></div>
        <p style={{fontSize:14,color:C.mid,lineHeight:1.6,margin:"0 0 10px",fontFamily:F.b}}>{r.desc}</p>
        <div style={{padding:"10px 14px",background:`${r.color}08`,borderRadius:8}}>
          <div style={{fontSize:11,fontWeight:700,textTransform:"uppercase",color:r.color,marginBottom:3,fontFamily:F.b}}>Suggested Next Step</div>
          <p style={{fontSize:13,color:C.mid,lineHeight:1.5,margin:0,fontFamily:F.b}}>{r.action}</p>
        </div>
      </Cd>
      <Cd style={{background:"#fdf2f2",borderColor:"#e8c4c4",padding:"14px 20px"}}>
        <p style={{fontSize:12,color:"#7a3030",lineHeight:1.6,margin:0,fontFamily:F.b}}><strong>Not a diagnosis.</strong> MDQ validated by Hirschfeld et al. (Am J Psychiatry, 2000). Discuss with a psychiatrist. If in crisis, call/text <strong>988</strong>.</p>
      </Cd>
      <div style={{textAlign:"center",marginTop:16}}>
        <button onClick={()=>{setMa({});setCl(null);setImp(null);setDone(false);}} style={{padding:"10px 24px",borderRadius:10,border:`1.5px solid ${C.border}`,background:"transparent",color:C.mid,fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:F.b}}>Retake</button>
      </div>
    </div>}
  </S>);
}

// ── SCREENING HUB ──
function ScreenHub({go}){
  const[active,setActive]=useState(null);
  if(active==="phq9")return <Screener title="Depression Screening (PHQ-9)" badge="Depression" color={C.blue} questions={PHQ9_QS} options={PHQ9_OPTS} scoreFn={phq9Score} resultFn={phq9Result} intro="The PHQ-9 is the most widely used depression screening tool in the world. 9 questions based on DSM-5 criteria. Takes under 3 minutes. Answer based on the last 2 weeks." source="PHQ-9 (Kroenke et al., J Gen Intern Med, 2001)"/>;
  if(active==="gad7")return <Screener title="Anxiety Screening (GAD-7)" badge="Anxiety" color={C.teal} questions={GAD7_QS} options={GAD7_OPTS} scoreFn={gad7Score} resultFn={gad7Result} intro="The GAD-7 is the most widely used anxiety screening tool. 7 questions, under 2 minutes. Answer based on the last 2 weeks." source="GAD-7 (Spitzer et al., Arch Intern Med, 2006)"/>;
  if(active==="mdq")return <MDQScreen/>;

  return(<S style={{paddingTop:40,paddingBottom:60}}>
    <B>Mental Health Screenings</B>
    <h2 style={{fontFamily:F.d,fontSize:28,fontWeight:700,color:C.text,margin:"12px 0 8px"}}>Check Your Forecast</h2>
    <p style={{fontSize:15,color:C.mid,margin:"0 0 8px",maxWidth:600,lineHeight:1.65,fontFamily:F.b}}>Three validated screening tools covering the most common mental health conditions. Each takes 2-5 minutes. Not sure where to start? Take all three — many people have more than one condition, and knowing that changes treatment.</p>
    <Cd style={{background:"#fdf2f2",borderColor:"#e8c4c4",marginBottom:24,padding:"14px 20px"}}>
      <p style={{fontSize:12,color:"#7a3030",lineHeight:1.6,margin:0,fontFamily:F.b}}><strong>These are educational screening tools, not diagnoses.</strong> Results should be discussed with a licensed mental health professional.</p>
    </Cd>

    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(260px, 1fr))",gap:16}}>
      {[
        {id:"phq9",title:"Depression",sub:"PHQ-9",color:C.blue,qs:"9 questions · 2 min",desc:"The gold standard depression screening. Used in virtually every primary care office. 88% sensitivity and specificity at score ≥10.",src:"Kroenke et al., 2001"},
        {id:"gad7",title:"Anxiety",sub:"GAD-7",color:C.teal,qs:"7 questions · 2 min",desc:"The most widely used anxiety screening. Covers generalized anxiety, but elevated scores also flag panic, social anxiety, and PTSD.",src:"Spitzer et al., 2006"},
        {id:"mdq",title:"Bipolar",sub:"MDQ",color:C.accent,qs:"13 questions + follow-up · 5 min",desc:"Screens for bipolar spectrum disorders. Critical if antidepressants haven't worked or made you worse — that's often a sign of undiagnosed bipolar.",src:"Hirschfeld et al., 2000"},
      ].map(s=>(
        <Cd key={s.id} style={{borderTop:`3px solid ${s.color}`,cursor:"pointer",transition:"box-shadow 0.3s"}} onClick={()=>setActive(s.id)}>
          <B color={s.color}>{s.qs}</B>
          <h3 style={{fontFamily:F.d,fontSize:20,fontWeight:700,color:s.color,margin:"8px 0 6px"}}>{s.title}</h3>
          <p style={{fontSize:12,color:C.light,margin:"0 0 8px",fontFamily:F.b}}>{s.sub} — {s.src}</p>
          <p style={{fontSize:13.5,color:C.mid,lineHeight:1.55,margin:"0 0 12px",fontFamily:F.b}}>{s.desc}</p>
          <span style={{fontSize:13,color:s.color,fontWeight:600,fontFamily:F.b}}>Take Screening →</span>
        </Cd>
      ))}
    </div>

    <Cd style={{marginTop:24,background:"#faf5f0",borderColor:"#e8ddd2"}}>
      <h3 style={{fontFamily:F.d,fontSize:18,fontWeight:700,color:C.text,margin:"0 0 8px"}}>Why Take More Than One?</h3>
      <p style={{fontSize:14,color:C.mid,lineHeight:1.65,margin:0,fontFamily:F.b}}>Over 60% of people with depression also have anxiety. Bipolar disorder is misdiagnosed as depression 69% of the time. Taking all three screenings gives you — and your provider — a fuller picture. It takes about 10 minutes total and could save years of wrong treatment.</p>
    </Cd>
  </S>);
}

// ── OVERLAP VISUAL ──
function OverlapCircle(){
  return(
    <svg viewBox="0 0 400 300" style={{width:"100%",maxWidth:400,margin:"0 auto",display:"block"}}>
      <circle cx="160" cy="140" r="100" fill="#3563b020" stroke="#3563b0" strokeWidth="2"/>
      <circle cx="240" cy="140" r="100" fill="#2d6a4f20" stroke="#2d6a4f" strokeWidth="2"/>
      <circle cx="200" cy="210" r="100" fill="#c25e3020" stroke="#c25e30" strokeWidth="2"/>
      <text x="120" y="110" textAnchor="middle" fill="#3563b0" fontSize="13" fontWeight="700" fontFamily="Source Sans 3,sans-serif">Depression</text>
      <text x="280" y="110" textAnchor="middle" fill="#2d6a4f" fontSize="13" fontWeight="700" fontFamily="Source Sans 3,sans-serif">Anxiety</text>
      <text x="200" y="270" textAnchor="middle" fill="#c25e30" fontSize="13" fontWeight="700" fontFamily="Source Sans 3,sans-serif">Bipolar</text>
      <text x="200" y="130" textAnchor="middle" fill="#2a2520" fontSize="11" fontWeight="600" fontFamily="Source Sans 3,sans-serif">SSRIs</text>
      <text x="200" y="145" textAnchor="middle" fill="#2a2520" fontSize="11" fontWeight="600" fontFamily="Source Sans 3,sans-serif">CBT</text>
      <text x="200" y="160" textAnchor="middle" fill="#2a2520" fontSize="11" fontWeight="600" fontFamily="Source Sans 3,sans-serif">Exercise</text>
      <text x="155" y="195" textAnchor="middle" fill="#5c564e" fontSize="10" fontFamily="Source Sans 3,sans-serif">Lamotrigine</text>
      <text x="245" y="195" textAnchor="middle" fill="#5c564e" fontSize="10" fontFamily="Source Sans 3,sans-serif">Benzos</text>
      <text x="245" y="208" textAnchor="middle" fill="#5c564e" fontSize="10" fontFamily="Source Sans 3,sans-serif">(short-term)</text>
      <text x="120" y="165" textAnchor="middle" fill="#5c564e" fontSize="10" fontFamily="Source Sans 3,sans-serif">SNRIs</text>
      <text x="280" y="165" textAnchor="middle" fill="#5c564e" fontSize="10" fontFamily="Source Sans 3,sans-serif">DBT</text>
      <text x="200" y="235" textAnchor="middle" fill="#5c564e" fontSize="10" fontFamily="Source Sans 3,sans-serif">Lithium</text>
      <text x="200" y="248" textAnchor="middle" fill="#5c564e" fontSize="10" fontFamily="Source Sans 3,sans-serif">Antipsychotics</text>
    </svg>
  );
}

// ── MEDS PAGE ──
function MedsPage(){
  const[exp,setExp]=useState(null);
  const meds=[
    {name:"SSRIs",ex:"Sertraline (Zoloft), Escitalopram (Lexapro), Fluoxetine (Prozac)",color:C.blue,
      for:["Depression","Anxiety","PTSD","OCD"],
      dose:"Start low, increase gradually. Sertraline 50-200mg/day. Escitalopram 10-20mg/day.",
      onset:"2-4 weeks for initial effect. 6-8 weeks for full benefit.",
      sides:"Nausea, headache, sexual dysfunction, insomnia or drowsiness. Usually mild and temporary.",
      note:"First-line for both depression AND anxiety. 60-70% respond to first SSRI tried. If one doesn't work, another might. ⚠️ In bipolar: can trigger mania if used without a mood stabilizer."},
    {name:"SNRIs",ex:"Venlafaxine (Effexor), Duloxetine (Cymbalta)",color:C.teal,
      for:["Depression","Anxiety","Chronic pain"],
      dose:"Venlafaxine 75-225mg/day XR. Duloxetine 60-120mg/day. Must taper slowly.",
      onset:"2-4 weeks. Some feel anxiety improvement sooner.",
      sides:"Nausea, dizziness, sweating, insomnia, elevated BP at higher doses. Discontinuation syndrome if stopped abruptly.",
      note:"Dual-action (serotonin + norepinephrine). Often tried when SSRIs alone aren't enough. Also treats nerve pain."},
    {name:"Lithium",ex:"Lithobid, Eskalith",color:C.accent,
      for:["Bipolar I/II","Suicide prevention"],
      dose:"600-1800mg/day. Blood level 0.6-1.2 mEq/L. Requires regular blood monitoring.",
      onset:"Antimanic: 1-3 weeks. Full stabilization: 4-12 weeks.",
      sides:"Thirst, urination, tremor (27%), nausea, weight gain. Long-term: thyroid/kidney monitoring needed.",
      note:"Gold standard for bipolar. Only psychiatric medication proven to reduce suicide risk. 7.3/10 patient rating (n=361)."},
    {name:"Lamotrigine",ex:"Lamictal",color:C.blue,
      for:["Bipolar maintenance","Bipolar depression prevention"],
      dose:"Slow titration required: 25mg→50mg→100mg→200mg over 5-6 weeks. Critical to avoid SJS.",
      onset:"5-6 weeks due to required slow start.",
      sides:"Headache, dizziness. RARE: Stevens-Johnson Syndrome (rash) — stop immediately if rash develops.",
      note:"Best-tolerated mood stabilizer. 7.5/10 rating. Particularly effective for preventing bipolar depressive episodes."},
    {name:"Quetiapine",ex:"Seroquel",color:C.warm,
      for:["Bipolar mania/depression","Adjunct for depression","Insomnia (off-label)"],
      dose:"Depression: 300mg/day. Mania: 400-800mg/day. Insomnia: 25-100mg.",
      onset:"Sedation: immediate. Mood: 1-2 weeks. Full: 4-6 weeks.",
      sides:"Heavy sedation, weight gain, metabolic effects, dry mouth. Lowest movement disorder risk.",
      note:"Most prescribed antipsychotic. Different drug at different doses. ~60% discontinue within weeks (Cochrane)."},
    {name:"Benzodiazepines",ex:"Lorazepam (Ativan), Clonazepam (Klonopin)",color:C.purple,
      for:["Acute anxiety/panic","Manic agitation (bridge)","Insomnia (short-term)"],
      dose:"Lorazepam 0.5-2mg as needed. Short-term only (2-4 weeks). As prescribed by physician.",
      onset:"15-30 minutes. Fastest-acting psychiatric medications.",
      sides:"Sedation, cognitive impairment, dizziness. HIGH dependence risk in 2-4 weeks.",
      note:"Rescue medication, not a treatment. Bridge while SSRIs/mood stabilizers take effect. 79% of mania trial patients received lorazepam."},
  ];

  return(<S style={{paddingTop:40,paddingBottom:60}}>
    <B color={C.teal}>Evidence-Based</B>
    <h2 style={{fontFamily:F.d,fontSize:28,fontWeight:700,color:C.text,margin:"12px 0 8px"}}>Medication Guide</h2>
    <p style={{fontSize:14,color:C.mid,margin:"0 0 12px",maxWidth:600,lineHeight:1.6,fontFamily:F.b}}>Medications for depression, anxiety, and bipolar disorder — what they do, how long to work, and what to watch for. Dosages are typical ranges from FDA labeling, not recommendations.</p>
    <Cd style={{background:"#fdf2f2",borderColor:"#e8c4c4",marginBottom:20,padding:"14px 20px"}}>
      <p style={{fontSize:12,color:"#7a3030",lineHeight:1.6,margin:0,fontFamily:F.b}}><strong>Medical Disclaimer:</strong> For education only. Never start, stop, or adjust medication without your prescribing physician. Individual responses vary significantly.</p>
    </Cd>

    <h3 style={{fontFamily:F.d,fontSize:20,fontWeight:700,color:C.text,margin:"0 0 14px"}}>Treatment Overlap</h3>
    <Cd style={{marginBottom:24,textAlign:"center"}}>
      <p style={{fontSize:13,color:C.mid,lineHeight:1.6,margin:"0 0 16px",fontFamily:F.b}}>Many treatments work across multiple conditions. The center shows what's effective for all three.</p>
      <OverlapCircle/>
    </Cd>

    <h3 style={{fontFamily:F.d,fontSize:20,fontWeight:700,color:C.text,margin:"0 0 14px"}}>Medication Details</h3>
    {meds.map((m,i)=>(
      <Cd key={i} style={{marginBottom:12,cursor:"pointer",borderLeft:`3px solid ${m.color}`}} onClick={()=>setExp(exp===i?null:i)}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
          <div>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4,flexWrap:"wrap"}}>
              <h3 style={{fontFamily:F.d,fontSize:18,fontWeight:700,color:C.text,margin:0}}>{m.name}</h3>
              <span style={{fontSize:12,color:C.light,fontFamily:F.b}}>{m.ex}</span>
            </div>
            <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
              {m.for.map(f=><B key={f} color={f==="Depression"?C.blue:f==="Anxiety"||f==="PTSD"||f==="OCD"||f==="Chronic pain"?C.teal:f.includes("Bipolar")||f.includes("Suicide")?C.accent:C.purple}>{f}</B>)}
            </div>
          </div>
          <span style={{fontSize:18,color:C.light,transform:exp===i?"rotate(180deg)":"none",transition:"transform 0.3s",flexShrink:0}}>▾</span>
        </div>
        {exp===i&&<div style={{marginTop:16,borderTop:`1px solid ${C.border}`,paddingTop:16}}>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(250px, 1fr))",gap:14}}>
            {[{l:"Dosing",c:m.dose},{l:"Time to Work",c:m.onset},{l:"Side Effects",c:m.sides}].map((s,j)=>
              <div key={j} style={{padding:"12px 14px",background:"#fafaf8",borderRadius:10}}>
                <div style={{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",color:m.color,marginBottom:4,fontFamily:F.b}}>{s.l}</div>
                <p style={{fontSize:12.5,color:C.mid,lineHeight:1.6,margin:0,fontFamily:F.b}}>{s.c}</p>
              </div>)}
          </div>
          <div style={{marginTop:12,padding:"12px 14px",background:`${m.color}06`,borderRadius:10,borderLeft:`3px solid ${m.color}`}}>
            <p style={{fontSize:12.5,color:C.mid,lineHeight:1.6,margin:0,fontFamily:F.b}}>{m.note}</p>
          </div>
        </div>}
      </Cd>
    ))}
  </S>);
}

// ── HOME ──
function Home({go}){return(<div>
  <div style={{padding:"80px 20px 60px",textAlign:"center",position:"relative",overflow:"hidden"}}>
    <div style={{position:"absolute",top:-80,left:"50%",transform:"translateX(-50%)",width:600,height:600,borderRadius:"50%",background:"radial-gradient(circle,#c25e3008 0%,transparent 70%)",pointerEvents:"none"}}/>
    <S><div style={{animation:"fadeUp 0.8s ease both"}}>
      <B>Mental Health, Simplified</B>
      <h1 style={{fontFamily:F.d,fontSize:"clamp(30px,5vw,48px)",fontWeight:700,color:C.text,margin:"20px 0 16px",lineHeight:1.15}}>Check your forecast.<br/><span style={{color:C.accent}}>Understand your brain weather.</span></h1>
      <p style={{fontFamily:F.b,fontSize:16,color:C.mid,maxWidth:560,margin:"0 auto 16px",lineHeight:1.7}}>Depression, anxiety, and bipolar disorder affect over <strong>1 billion people</strong>. Most wait years for the right diagnosis. This site brings together validated screenings, medication guides, and real resources — plain language, real research, no judgment.</p>
      <p style={{fontFamily:F.b,fontSize:14,color:C.light,maxWidth:480,margin:"0 auto 32px",lineHeight:1.6}}>Your brain has weather. <strong>Two weathers — normal and out of sorts — are both part of being human.</strong> The question is whether what you're experiencing is a rough patch or something that needs professional attention.</p>
      <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
        <button onClick={()=>go("screen")} style={{padding:"14px 32px",borderRadius:10,border:"none",background:C.accent,color:"#fff",fontSize:16,fontWeight:700,cursor:"pointer",fontFamily:F.b}}>Take a Screening →</button>
        <button onClick={()=>go("meds")} style={{padding:"14px 24px",borderRadius:10,border:`1.5px solid ${C.border}`,background:"transparent",color:C.mid,fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:F.b}}>Medication Guide</button>
      </div>
    </div></S>
  </div>

  <S style={{paddingBottom:48}}>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))",gap:16}}>
      {[{n:"1 in 5",l:"U.S. adults experience mental illness each year",s:"NIMH"},{n:"280M+",l:"People worldwide live with depression",s:"WHO"},{n:"301M+",l:"People have an anxiety disorder",s:"WHO"},{n:"~60%",l:"Never receive treatment",s:"NIMH"}].map((x,i)=>
        <Cd key={i} style={{textAlign:"center",padding:"20px 16px",animation:`fadeUp 0.6s ease ${0.1+i*0.08}s both`}}>
          <div style={{fontFamily:F.d,fontSize:28,fontWeight:700,color:C.accent}}>{x.n}</div>
          <div style={{fontSize:13,color:C.mid,lineHeight:1.5,marginTop:6,fontFamily:F.b}}>{x.l}</div>
          <div style={{fontSize:10,color:C.light,marginTop:4,fontFamily:F.b}}>{x.s}</div>
        </Cd>)}
    </div>
  </S>

  <S style={{paddingBottom:48}}>
    <h2 style={{fontFamily:F.d,fontSize:26,fontWeight:700,color:C.text,marginBottom:8}}>Three Screenings. Ten Minutes. Answers.</h2>
    <p style={{fontFamily:F.b,fontSize:15,color:C.mid,marginBottom:24,maxWidth:600}}>Each screening is a validated clinical tool used by professionals worldwide. Take one or take all three.</p>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(260px, 1fr))",gap:16}}>
      {[{t:"Depression",c:C.blue,sub:"PHQ-9 · 9 questions · 2 min",d:"88% sensitivity and specificity. The screening most doctors use."},
        {t:"Anxiety",c:C.teal,sub:"GAD-7 · 7 questions · 2 min",d:"Covers generalized anxiety. Elevated scores also flag panic and social anxiety."},
        {t:"Bipolar",c:C.accent,sub:"MDQ · 13 questions · 5 min",d:"Critical if antidepressants haven't worked. 69% of bipolar is initially misdiagnosed as depression."}
      ].map(x=><Cd key={x.t} style={{borderTop:`3px solid ${x.c}`,cursor:"pointer"}} onClick={()=>go("screen")}>
        <h3 style={{fontFamily:F.d,fontSize:20,fontWeight:700,color:x.c,margin:"0 0 4px"}}>{x.t}</h3>
        <p style={{fontSize:12,color:C.light,margin:"0 0 8px",fontFamily:F.b}}>{x.sub}</p>
        <p style={{fontSize:13.5,color:C.mid,lineHeight:1.55,margin:"0 0 10px",fontFamily:F.b}}>{x.d}</p>
        <span style={{fontSize:13,color:x.c,fontWeight:600,fontFamily:F.b}}>Take Screening →</span>
      </Cd>)}
    </div>
  </S>

  <S style={{paddingBottom:60}}>
    <Cd style={{background:"#fef9f0",borderColor:"#f0d8a8",textAlign:"center",padding:28}}>
      <div style={{fontSize:13,fontWeight:700,color:C.warm,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:6,fontFamily:F.b}}>If you're in crisis right now</div>
      <div style={{fontFamily:F.d,fontSize:28,fontWeight:700,color:C.text}}>988 Suicide & Crisis Lifeline</div>
      <p style={{fontFamily:F.b,fontSize:15,color:C.mid,margin:"8px 0 0"}}>Call or text <strong>988</strong> — free, confidential, 24/7</p>
    </Cd>
  </S>
</div>);}

// ── FIND HELP ──
function HelpPage(){return(<S style={{paddingTop:40,paddingBottom:60}}>
  <B color={C.accent}>Take the Next Step</B>
  <h2 style={{fontFamily:F.d,fontSize:28,fontWeight:700,color:C.text,margin:"12px 0 8px"}}>Find a Psychiatrist or Therapist</h2>
  <p style={{fontSize:15,color:C.mid,margin:"0 0 24px",maxWidth:600,lineHeight:1.65,fontFamily:F.b}}>Whether it's depression, anxiety, or bipolar — professional help changes outcomes. A psychiatrist prescribes medication; a therapist provides talk therapy. Most people benefit from both.</p>
  <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(280px, 1fr))",gap:14,marginBottom:24}}>
    {[{n:"Psychology Today",u:"psychologytoday.com",d:"Largest directory. Filter by insurance, specialty, telehealth."},
      {n:"SAMHSA Locator",u:"findtreatment.gov",d:"Free government tool. Finds providers near you."},
      {n:"NAMI Helpline",u:"nami.org/help",d:"1-800-950-NAMI. Free referrals and support groups."},
      {n:"Open Path Collective",u:"openpathcollective.org",d:"Therapy $30-80/session. No insurance needed."},
      {n:"DBSA",u:"dbsalliance.org",d:"Peer-led support groups for mood disorders."},
      {n:"Zocdoc",u:"zocdoc.com",d:"Book appointments online. Reviews and availability."}
    ].map(x=><Cd key={x.n}><h4 style={{fontFamily:F.d,fontSize:16,fontWeight:700,color:C.text,margin:"0 0 4px"}}>{x.n}</h4><p style={{fontSize:13,color:C.mid,lineHeight:1.55,margin:"0 0 8px",fontFamily:F.b}}>{x.d}</p><span style={{fontSize:13,color:C.accent,fontWeight:600,fontFamily:F.b}}>{x.u} →</span></Cd>)}
  </div>
  <h3 style={{fontFamily:F.d,fontSize:20,fontWeight:700,color:C.text,margin:"0 0 14px"}}>What to Say</h3>
  <Cd style={{marginBottom:20}}>
    {["\"I've been experiencing symptoms that are affecting my daily life and I'd like a professional evaluation.\"","\"I took some validated screening tools online and they flagged concerns I'd like to discuss.\"","\"I've tried antidepressants and they either don't work or make me feel worse — I want to explore why.\"","\"I want to understand what I'm dealing with and what my options are.\""].map((q,i)=>
      <div key={i} style={{padding:"10px 14px",background:"#faf8f5",borderRadius:8,marginBottom:8,borderLeft:`3px solid ${C.accent}`,fontSize:13.5,color:C.text,lineHeight:1.55,fontFamily:F.b,fontStyle:"italic"}}>{q}</div>)}
  </Cd>
  <Cd style={{background:"#fef9f0",borderColor:"#f0d8a8",textAlign:"center"}}>
    <div style={{fontFamily:F.d,fontSize:22,fontWeight:700,color:C.text}}>988 Suicide & Crisis Lifeline</div>
    <p style={{fontFamily:F.b,fontSize:14,color:C.mid,margin:"6px 0 0"}}>Call or text <strong>988</strong> · Crisis Text: text <strong>HOME</strong> to <strong>741741</strong></p>
  </Cd>
</S>);}

// ── ABOUT ──
function AboutPage(){return(<S style={{paddingTop:60,paddingBottom:60}}>
  <div style={{maxWidth:600,margin:"0 auto"}}>
    <div style={{padding:"14px 20px",background:"#fef3c7",border:"1.5px solid #f59e0b40",borderRadius:12,marginBottom:28,display:"flex",alignItems:"center",gap:10}}>
      <span style={{fontSize:20}}>🔨</span>
      <p style={{fontSize:13.5,color:"#92400e",lineHeight:1.55,margin:0,fontFamily:F.b}}><strong>Under active development.</strong> Additional conditions, features, and content being added regularly.</p>
    </div>
    <B color={C.accent}>Why This Exists</B>
    <h2 style={{fontFamily:F.d,fontSize:30,fontWeight:700,color:C.text,margin:"14px 0 24px"}}>About Brain Weather</h2>
    <div style={{fontSize:15,color:C.mid,lineHeight:1.75,fontFamily:F.b}}>
      <p style={{marginBottom:18}}>Brain Weather was developed in collaboration with Maxine, a licensed therapist, over several years of research and conversation about what people dealing with mental health conditions actually need — and what most resources fail to provide.</p>
      <p style={{marginBottom:18}}>As someone with a family history of bipolar disorder, I've seen how a delayed or missed diagnosis changes a person's trajectory. That experience expanded into a broader realization: whether it's depression, anxiety, or bipolar, earlier understanding means better outcomes. The research is clear on this. The problem is the research isn't accessible to the people who need it.</p>
      <p style={{marginBottom:18}}>Your brain has weather. Some days are clear, some days storm. <strong>Two weathers — normal and out of sorts — are both part of being human.</strong> This site helps you figure out whether what you're experiencing is a rough patch or a condition that deserves professional attention. There's no shame in either answer.</p>
      <p style={{marginBottom:0,color:C.text,fontWeight:500}}>None of this replaces professional care. But it can be the bridge that gets someone there.</p>
    </div>
    <div style={{marginTop:20,padding:"20px 24px",background:"#fdf2f2",borderRadius:14,border:"1.5px solid #e8c4c4"}}>
      <h3 style={{fontFamily:F.d,fontSize:16,fontWeight:700,color:C.red,margin:"0 0 8px"}}>Medical Disclaimer</h3>
      <p style={{fontSize:12.5,color:"#7a3030",lineHeight:1.65,margin:"0 0 8px",fontFamily:F.b}}>This website is for educational purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment. Screening tools are validated instruments used for educational self-assessment only — they do not constitute diagnoses.</p>
      <p style={{fontSize:12.5,color:"#7a3030",lineHeight:1.65,margin:"0 0 8px",fontFamily:F.b}}>Medication information is sourced from FDA labels and peer-reviewed literature. Never start, stop, or adjust medication without your prescribing physician.</p>
      <p style={{fontSize:12.5,color:"#7a3030",lineHeight:1.65,margin:0,fontFamily:F.b}}>If you are in crisis, contact the <strong>988 Suicide & Crisis Lifeline</strong> by calling or texting <strong>988</strong>.</p>
    </div>
    <div style={{marginTop:20,padding:"20px 24px",background:C.card,borderRadius:14,border:`1px solid ${C.border}`}}>
      <h3 style={{fontFamily:F.d,fontSize:16,fontWeight:700,color:C.text,margin:"0 0 8px"}}>Sources</h3>
      {["PHQ-9: Kroenke et al., J Gen Intern Med, 2001","GAD-7: Spitzer et al., Arch Intern Med, 2006","MDQ: Hirschfeld et al., Am J Psychiatry, 2000","CANMAT/ISBD 2018 & VA/DoD 2023 Treatment Guidelines","FDA prescribing information for all medications","NIMH, NAMI, WHO, SAMHSA clinical resources","Drugs.com & WebMD patient review databases"].map((s,i)=>
        <div key={i} style={{display:"flex",gap:8,marginBottom:4,fontSize:12,fontFamily:F.b}}><span style={{color:C.teal,fontWeight:700}}>◈</span><span style={{color:C.mid}}>{s}</span></div>)}
    </div>
  </div>
</S>);}

// ── THERAPY (CBT + DBT) ──
function TherapyPage(){return(<S style={{paddingTop:40,paddingBottom:60}}>
  <B color={C.teal}>Evidence-Based Therapy</B>
  <h2 style={{fontFamily:F.d,fontSize:28,fontWeight:700,color:C.text,margin:"12px 0 8px"}}>CBT & DBT</h2>
  <p style={{fontSize:15,color:C.mid,margin:"0 0 28px",maxWidth:620,lineHeight:1.65,fontFamily:F.b}}>The two most evidence-based psychotherapies for depression, anxiety, and bipolar disorder. Both work alongside medication — not as replacements.</p>

  <Cd style={{marginBottom:20,borderLeft:`3px solid ${C.teal}`}}>
    <h3 style={{fontFamily:F.d,fontSize:22,fontWeight:700,color:C.teal,margin:"0 0 10px"}}>Cognitive Behavioral Therapy (CBT)</h3>
    <p style={{fontSize:14,color:C.mid,lineHeight:1.65,margin:"0 0 14px",fontFamily:F.b}}>Based on the premise that thoughts, feelings, and behaviors are interconnected. CBT teaches you to recognize distorted thinking patterns and change them before they spiral. Backed by 13 RCTs for bipolar, extensive evidence for depression and anxiety. Average course: 12-20 sessions.</p>
    <h4 style={{fontSize:14,fontWeight:700,color:C.text,margin:"0 0 8px",fontFamily:F.b}}>What CBT Treats</h4>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))",gap:12,marginBottom:14}}>
      {[{c:"Depression",d:"Challenges hopeless thinking, behavioral activation (doing things even when motivation is zero), activity scheduling."},
        {c:"Anxiety",d:"Identifies distorted threat assessments, exposure therapy for phobias and panic, cognitive restructuring of catastrophic thinking."},
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
        {["Want tools for distorted thinking","Are stable or mildly symptomatic","Need relapse prevention strategies","Struggle with medication adherence"].map((t,i)=><div key={i} style={{fontSize:12.5,color:C.mid,marginBottom:3,fontFamily:F.b}}>• {t}</div>)}</div>
      <div><div style={{fontSize:12,fontWeight:700,color:C.purple,marginBottom:6,fontFamily:F.b}}>DBT if you...</div>
        {["Have intense uncontrollable emotions","Struggle with suicidal thoughts","Have relationship chaos during episodes","Need crisis survival skills NOW"].map((t,i)=><div key={i} style={{fontSize:12.5,color:C.mid,marginBottom:3,fontFamily:F.b}}>• {t}</div>)}</div>
    </div>
  </Cd>
</S>);}

// ── BODY (vagus nerve / physical anxiety relief) ──
function BodyPage(){
  const ex=[
    {r:"1",n:"Extended Exhale Breathing",t:"2 min",e:"Strongest",c:C.teal,how:"Inhale 4 seconds through nose. Exhale 8 seconds through mouth. Repeat 6-8 times.",why:"Exhaling longer than inhaling directly slows heart rate via vagus nerve. Most studied technique. Reduces cortisol within minutes.",note:"Works during any mood state. Can be done anywhere, anytime."},
    {r:"2",n:"Cold Water Face Dive",t:"30 sec",e:"Strong",c:C.blue,how:"Ice water on face for 15-30 seconds, or cold pack on forehead and cheeks while holding breath.",why:"Triggers mammalian dive reflex — involuntary parasympathetic response slowing heart rate up to 25%.",note:"The 'T' in DBT's TIPP skill. Fastest way to interrupt a panic attack."},
    {r:"3",n:"Progressive Muscle Relaxation",t:"10-15 min",e:"Strong",c:C.purple,how:"Starting from feet, tense each muscle group 5 seconds, release 30 seconds. Move up: calves, thighs, abs, chest, hands, arms, shoulders, neck, face.",why:"Trains nervous system to recognize and release chronic tension. Reduces cortisol, improves sleep, lowers blood pressure.",note:"Best for insomnia. Do in bed before sleep."},
    {r:"4",n:"Vigorous Exercise (20 min)",t:"20 min",e:"Very Strong",c:C.warm,how:"Any movement elevating heart rate: walking, jogging, cycling, swimming, dancing. 20+ minutes moderate-to-vigorous.",why:"Releases endorphins, serotonin, dopamine. Endurance training specifically improves vagal tone. Evidence shows exercise outperforms medication for some depression and anxiety.",note:"Challenge during depression = motivation. Even 10 minutes helps. Consistency matters more than intensity."},
    {r:"5",n:"Humming / Chanting / Om",t:"3-5 min",e:"Moderate",c:"#059669",how:"Hum a low steady tone, chant 'Om' with sustained vibration, or gargle water vigorously for 60 seconds.",why:"Vagus nerve passes through vocal cords. Sustained vocalization creates vibrations that mechanically stimulate vagal fibers.",note:"Low-barrier. Shower, car, anywhere private."},
    {r:"6",n:"5-4-3-2-1 Grounding",t:"3-5 min",e:"Moderate",c:C.accent,how:"Name 5 things you see. 4 you can touch. 3 you hear. 2 you smell. 1 you taste. Say each aloud if possible.",why:"Redirects brain from internal threat processing (amygdala) to external sensory processing (cortex). Interrupts the anxiety loop.",note:"Essential for dissociation and overwhelming moments. No equipment needed."},
    {r:"7",n:"Gentle Yoga / Mindful Movement",t:"10-20 min",e:"Moderate",c:C.blue,how:"Slow flowing movements synchronized with breath. Forward folds and yin yoga especially effective.",why:"Combines deep breathing, muscle engagement/release, and mindfulness — all independently stimulate vagus nerve.",note:"Accessible during depression when vigorous exercise feels impossible."},
    {r:"8",n:"Ear Massage",t:"2 min",e:"Emerging",c:C.light,how:"Gently massage outer ear folds with thumb and index finger. Focus on cymba concha (hollow cup-shaped upper ear).",why:"Auricular branch of vagus nerve runs through the ear. Gentle massage triggers calming parasympathetic response.",note:"Discreet. Meetings, phone calls, public. Good for low-grade persistent anxiety."},
  ];
  return(<S style={{paddingTop:40,paddingBottom:60}}>
    <B color={C.accent}>Mind-Body Connection</B>
    <h2 style={{fontFamily:F.d,fontSize:28,fontWeight:700,color:C.text,margin:"12px 0 8px"}}>Physical Anxiety & Stress Relief</h2>
    <p style={{fontSize:15,color:C.mid,margin:"0 0 12px",maxWidth:620,lineHeight:1.65,fontFamily:F.b}}>When anxiety or stress lives in your body — racing heart, tight chest, shaking hands — you need to talk to your <strong>nervous system</strong> directly through the <strong>vagus nerve</strong>. These techniques work for anxiety from any condition.</p>
    <p style={{fontSize:14,color:C.light,margin:"0 0 28px",maxWidth:600,lineHeight:1.6,fontFamily:F.b}}>Ranked by evidence strength. All sourced from Cleveland Clinic, Cedars-Sinai, Feinstein Institute, and peer-reviewed research.</p>

    {ex.map((x,i)=><Cd key={i} style={{marginBottom:12,borderLeft:`3px solid ${x.c}`}}>
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

// ── APP ──
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
      {a==="screen"&&<ScreenHub go={setA}/>}
      {a==="meds"&&<MedsPage/>}
      {a==="therapy"&&<TherapyPage/>}
      {a==="body"&&<BodyPage/>}
      {a==="help"&&<HelpPage/>}
      {a==="about"&&<AboutPage/>}
      <footer style={{borderTop:`1px solid ${C.border}`,padding:"24px 20px",textAlign:"center",marginTop:40}}>
        <p style={{fontSize:12,color:C.light,lineHeight:1.6,maxWidth:600,margin:"0 auto",fontFamily:F.b}}>For educational purposes only. Not medical advice, diagnosis, or treatment. Screenings use validated instruments (PHQ-9, GAD-7, MDQ) for educational self-assessment. Consult a qualified healthcare provider. Under active development.</p>
        <p style={{fontSize:11,color:C.light,marginTop:8,fontFamily:F.b}}>© {new Date().getFullYear()} Brain Weather</p>
      </footer>
      <Analytics />
    </div>
  );
}
