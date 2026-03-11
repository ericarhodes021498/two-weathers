import { useState, useEffect, useRef, useCallback } from "react";

// ═══════════════════════════════════════════════════════════════
// DESIGN SYSTEM
// ═══════════════════════════════════════════════════════════════
const C = {
  bg: "#fafaf8", card: "#ffffff", border: "#e8e5df",
  text: "#2a2520", textMid: "#5c564e", textLight: "#8a847a",
  accent: "#c25e30", accentLight: "#c25e3018", accentHover: "#a84f28",
  teal: "#2d6a4f", tealLight: "#2d6a4f12", tealHover: "#245a42",
  blue: "#3563b0", blueLight: "#3563b010",
  warm: "#b8510d", warmLight: "#b8510d0e",
  red: "#c23030", redLight: "#c2303010",
  gold: "#a08030", goldLight: "#a0803010",
  shadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.03)",
  shadowHover: "0 2px 8px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.05)",
};

const fonts = {
  display: "'Playfair Display', Georgia, serif",
  body: "'Source Sans 3', 'Segoe UI', sans-serif",
  mono: "'JetBrains Mono', monospace",
};

// ═══════════════════════════════════════════════════════════════
// SHARED COMPONENTS
// ═══════════════════════════════════════════════════════════════
function Nav({ active, setActive }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const tabs = [
    { id: "home", label: "Home", icon: "◉" },
    { id: "screening", label: "Screening", icon: "◎" },
    { id: "medications", label: "Meds", icon: "◈" },
    { id: "cbt", label: "CBT", icon: "△" },
    { id: "dbt", label: "DBT", icon: "▽" },
    { id: "body", label: "Body", icon: "◯" },
    { id: "substance", label: "Substance Use", icon: "◆" },
    { id: "find-help", label: "Find Help", icon: "◇" },
    { id: "about", label: "About", icon: "♡" },
  ];
  const pick = (id) => { setActive(id); setMenuOpen(false); };
  return (
    <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(250,250,248,0.95)", backdropFilter: "blur(12px)", borderBottom: `1px solid ${C.border}` }}>
      <div style={{ maxWidth: 960, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 56, padding: "0 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }} onClick={() => pick("home")}>
          <span style={{ fontSize: 20, color: C.accent }}>⬡</span>
          <span style={{ fontFamily: fonts.display, fontSize: 17, fontWeight: 700, color: C.text, letterSpacing: "-0.02em" }}>Two Weathers</span>
        </div>
        {/* Desktop nav */}
        <div style={{ display: "flex", gap: 1, flexWrap: "wrap" }} className="desktop-nav">
          {tabs.map(t => (
            <button key={t.id} onClick={() => pick(t.id)} style={{
              padding: "7px 10px", borderRadius: 8, border: "none", cursor: "pointer",
              background: active === t.id ? C.accentLight : "transparent",
              color: active === t.id ? C.accent : C.textMid,
              fontSize: 12.5, fontWeight: active === t.id ? 700 : 500,
              fontFamily: fonts.body, transition: "all 0.2s",
              display: "flex", alignItems: "center", gap: 4, whiteSpace: "nowrap",
            }}>
              <span style={{ fontSize: 9 }}>{t.icon}</span> {t.label}
            </button>
          ))}
        </div>
        {/* Mobile hamburger */}
        <button className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)} style={{
          display: "none", background: "none", border: "none", cursor: "pointer",
          fontSize: 24, color: C.text, padding: "4px 8px",
        }}>
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>
      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="mobile-dropdown" style={{
          position: "absolute", top: 56, left: 0, right: 0, background: "rgba(250,250,248,0.98)",
          backdropFilter: "blur(12px)", borderBottom: `1px solid ${C.border}`,
          padding: "8px 20px 16px", boxShadow: C.shadow,
        }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => pick(t.id)} style={{
              display: "block", width: "100%", textAlign: "left", padding: "12px 14px",
              borderRadius: 8, border: "none", cursor: "pointer", marginBottom: 2,
              background: active === t.id ? C.accentLight : "transparent",
              color: active === t.id ? C.accent : C.text,
              fontSize: 15, fontWeight: active === t.id ? 700 : 500,
              fontFamily: fonts.body, transition: "all 0.15s",
            }}>
              <span style={{ marginRight: 8, fontSize: 12 }}>{t.icon}</span>{t.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

function Section({ children, style }) {
  return <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 20px", ...style }}>{children}</div>;
}

function Card({ children, style, hover }) {
  const [h, setH] = useState(false);
  return (
    <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{
      background: C.card, border: `1px solid ${C.border}`, borderRadius: 14,
      padding: "24px", boxShadow: h && hover ? C.shadowHover : C.shadow,
      transition: "all 0.3s ease", ...style,
    }}>{children}</div>
  );
}

function Badge({ children, color = C.accent }) {
  return <span style={{ display: "inline-block", padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color, background: `${color}14`, fontFamily: fonts.body }}>{children}</span>;
}

function Btn({ children, onClick, variant = "primary", disabled, style: s }) {
  const styles = {
    primary: { background: C.teal, color: "#fff", border: "none" },
    accent: { background: C.accent, color: "#fff", border: "none" },
    outline: { background: "transparent", color: C.textMid, border: `1.5px solid ${C.border}` },
    ghost: { background: "transparent", color: C.accent, border: "none" },
  };
  return (
    <button onClick={onClick} disabled={disabled} style={{
      padding: "10px 22px", borderRadius: 10, fontSize: 14, fontWeight: 600,
      cursor: disabled ? "default" : "pointer", fontFamily: fonts.body,
      opacity: disabled ? 0.4 : 1, transition: "all 0.2s", ...styles[variant], ...s,
    }}>{children}</button>
  );
}

// ═══════════════════════════════════════════════════════════════
// HOME PAGE
// ═══════════════════════════════════════════════════════════════
function HomePage({ setActive }) {
  return (
    <div>
      {/* Hero */}
      <div style={{ padding: "80px 20px 60px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -80, left: "50%", transform: "translateX(-50%)", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, #c25e3008 0%, transparent 70%)", pointerEvents: "none" }} />
        <Section>
          <div style={{ animation: "fadeUp 0.8s ease both" }}>
            <Badge>Understanding Bipolar Disorder</Badge>
            <h1 style={{ fontFamily: fonts.display, fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 700, color: C.text, margin: "20px 0 16px", lineHeight: 1.15, letterSpacing: "-0.025em" }}>
              You are not your diagnosis.<br />
              <span style={{ color: C.accent }}>You are a whole person.</span>
            </h1>
            <p style={{ fontFamily: fonts.body, fontSize: 17, color: C.textMid, maxWidth: 560, margin: "0 auto 32px", lineHeight: 1.7 }}>
              Bipolar disorder affects 2.8% of adults in the U.S. — yet it takes an average of <strong>7 to 10 years</strong> to receive a correct diagnosis. This site exists to close that gap. Simple tools. Real research. No judgment.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <Btn variant="accent" onClick={() => setActive("screening")} style={{ fontSize: 16, padding: "14px 32px" }}>Take the Screening →</Btn>
              <Btn variant="outline" onClick={() => setActive("medications")}>Medication Guide</Btn>
            </div>
          </div>
        </Section>
      </div>

      {/* Quick Stats */}
      <Section style={{ paddingBottom: 48 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
          {[
            { num: "46M+", label: "People worldwide live with bipolar disorder", src: "WHO, 2023" },
            { num: "25-50%", label: "Will attempt suicide at some point in their lifetime", src: "APA Clinical Guidelines" },
            { num: "69%", label: "Are initially misdiagnosed — most often as unipolar depression", src: "Hirschfeld et al., 2003" },
            { num: "4.4 yrs", label: "Average delay from first episode to first treatment", src: "NIMH epidemiological data" },
          ].map((s, i) => (
            <Card key={i} style={{ textAlign: "center", padding: "20px 16px", animation: `fadeUp 0.6s ease ${0.1 + i * 0.08}s both` }}>
              <div style={{ fontFamily: fonts.display, fontSize: 28, fontWeight: 700, color: C.accent }}>{s.num}</div>
              <div style={{ fontSize: 13, color: C.textMid, lineHeight: 1.5, marginTop: 6, fontFamily: fonts.body }}>{s.label}</div>
              <div style={{ fontSize: 10, color: C.textLight, marginTop: 4, fontFamily: fonts.body }}>{s.src}</div>
            </Card>
          ))}
        </div>
      </Section>

      {/* The Three Types */}
      <Section style={{ paddingBottom: 48 }}>
        <h2 style={{ fontFamily: fonts.display, fontSize: 28, fontWeight: 700, color: C.text, marginBottom: 8 }}>The Bipolar Spectrum</h2>
        <p style={{ fontFamily: fonts.body, fontSize: 15, color: C.textMid, marginBottom: 24, maxWidth: 600 }}>Bipolar disorder isn't one thing. It exists on a spectrum. Understanding which type you may have changes everything about treatment.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
          {[
            { type: "Bipolar I", color: "#c23030", desc: "Full manic episodes lasting 7+ days (or any duration if hospitalized). May include psychotic features. The 'classic' form. Depressive episodes are common but not required for diagnosis.", symptoms: "Extreme euphoria or irritability, little need for sleep, racing thoughts, grandiosity, reckless behavior, possible hallucinations or delusions", treatment: "Lithium (gold standard), antipsychotics, mood stabilizers. Long-term maintenance is essential." },
            { type: "Bipolar II", color: "#b8510d", desc: "Hypomanic episodes (4+ days, less severe) alternating with major depressive episodes. Often misdiagnosed as depression. The depressive burden is typically heavier than in Bipolar I.", symptoms: "Increased energy and productivity, decreased sleep need, elevated mood, increased talking — but able to maintain functioning. Severe depressive episodes are the hallmark.", treatment: "Lithium, lamotrigine (especially for depression), quetiapine, careful SSRI use. Antidepressants alone can trigger hypomania." },
            { type: "Cyclothymia", color: "#3563b0", desc: "Chronic (2+ years) fluctuating mood with hypomanic and depressive symptoms that never meet full criteria for either pole. Often dismissed as 'just moody.' Can progress to Bipolar I or II.", symptoms: "Mild highs and lows that cycle frequently, periods of normal mood lasting no more than 2 months, persistent instability that affects relationships and work.", treatment: "Mood stabilizers, psychotherapy (especially CBT), lifestyle management. Early treatment may prevent progression to more severe forms." },
          ].map((t, i) => (
            <Card key={i} hover style={{ borderTop: `3px solid ${t.color}`, animation: `fadeUp 0.6s ease ${0.15 + i * 0.1}s both` }}>
              <h3 style={{ fontFamily: fonts.display, fontSize: 20, fontWeight: 700, color: t.color, margin: "0 0 8px" }}>{t.type}</h3>
              <p style={{ fontSize: 13.5, color: C.textMid, lineHeight: 1.6, margin: "0 0 14px", fontFamily: fonts.body }}>{t.desc}</p>
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: C.textLight, marginBottom: 4, fontFamily: fonts.body }}>Key Symptoms</div>
                <p style={{ fontSize: 12.5, color: C.text, lineHeight: 1.55, margin: 0, fontFamily: fonts.body }}>{t.symptoms}</p>
              </div>
              <div style={{ padding: "10px 12px", background: `${t.color}08`, borderRadius: 8 }}>
                <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: t.color, marginBottom: 3, fontFamily: fonts.body }}>Treatment Approach</div>
                <p style={{ fontSize: 12, color: C.textMid, lineHeight: 1.55, margin: 0, fontFamily: fonts.body }}>{t.treatment}</p>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* What to do */}
      <Section style={{ paddingBottom: 48 }}>
        <Card style={{ background: "#faf5f0", borderColor: "#e8ddd2" }}>
          <h2 style={{ fontFamily: fonts.display, fontSize: 22, fontWeight: 700, color: C.text, margin: "0 0 12px" }}>Where to Start</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20 }}>
            {[
              { step: "1", title: "Screen Yourself", desc: "Take our 5-minute screening based on the validated MDQ. It won't diagnose you, but it tells you if you should see a professional.", action: "Take Screening", page: "screening" },
              { step: "2", title: "Understand the Meds", desc: "Learn what each medication does, how long it takes to work, what the side effects are, and what real patients say about them.", action: "Medication Guide", page: "medications" },
              { step: "3", title: "Find a Professional", desc: "Use our directory links to find a psychiatrist or therapist near you who specializes in bipolar disorder.", action: "Find Help", page: "find-help" },
            ].map((s, i) => (
              <div key={i} style={{ cursor: "pointer" }} onClick={() => setActive(s.page)}>
                <div style={{ fontFamily: fonts.display, fontSize: 32, fontWeight: 700, color: C.accent, opacity: 0.3 }}>{s.step}</div>
                <h3 style={{ fontFamily: fonts.display, fontSize: 16, fontWeight: 700, color: C.text, margin: "4px 0 6px" }}>{s.title}</h3>
                <p style={{ fontSize: 13, color: C.textMid, lineHeight: 1.55, margin: "0 0 8px", fontFamily: fonts.body }}>{s.desc}</p>
                <span style={{ fontSize: 13, color: C.accent, fontWeight: 600, fontFamily: fonts.body }}>{s.action} →</span>
              </div>
            ))}
          </div>
        </Card>
      </Section>

      {/* Crisis */}
      <Section style={{ paddingBottom: 60 }}>
        <Card style={{ background: "#fef9f0", borderColor: "#f0d8a8", textAlign: "center", padding: "28px" }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.warm, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6, fontFamily: fonts.body }}>If you're in crisis right now</div>
          <div style={{ fontFamily: fonts.display, fontSize: 28, fontWeight: 700, color: C.text }}>988 Suicide & Crisis Lifeline</div>
          <p style={{ fontFamily: fonts.body, fontSize: 15, color: C.textMid, margin: "8px 0 0" }}>Call or text <strong>988</strong> — free, confidential, 24/7. You can also chat at <strong>988lifeline.org</strong></p>
        </Card>
      </Section>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// SCREENING (embedded from previous artifact, condensed)
// ═══════════════════════════════════════════════════════════════
const MANIA_QS = [
  "You felt so good or hyper that other people thought you were not your normal self, or you were so hyper you got into trouble",
  "You were so irritable that you shouted at people or started fights or arguments",
  "You felt much more self-confident than usual",
  "You got much less sleep than usual and found you didn't really miss it",
  "You were much more talkative or spoke much faster than usual",
  "Thoughts raced through your head or you couldn't slow your mind down",
  "You were so easily distracted that you had trouble concentrating",
  "You had much more energy than usual",
  "You were much more active or did many more things than usual",
  "You were much more social or outgoing — e.g., telephoning friends in the middle of the night",
  "You were much more interested in sex than usual",
  "You did things that were unusual for you or that others might have thought were excessive, foolish, or risky",
  "Spending money got you or your family into trouble",
];

const DEP_QS = [
  "You felt sad, empty, or hopeless nearly every day for at least two weeks",
  "You lost interest or pleasure in activities you used to enjoy",
  "You experienced significant changes in appetite or weight",
  "You had trouble sleeping or slept much more than usual nearly every day",
  "You felt physically slowed down, or restless and unable to sit still",
  "You felt worthless or excessively guilty nearly every day",
  "You had difficulty thinking, concentrating, or making decisions",
  "You had recurrent thoughts of death or suicide",
  "You felt fatigue or loss of energy nearly every day",
];

const SEV_QS = [
  "During your most intense high period, did you experience hallucinations, believing you had special powers, or other experiences that seemed unreal to others?",
  "During your most intense high period, were you hospitalized?",
  "During your high periods, were you generally still able to function at work and maintain relationships?",
  "Did your high periods typically last 7 days or more (or require hospitalization regardless of duration)?",
  "Did your high periods typically last 4–6 consecutive days, without requiring hospitalization?",
  "Have you experienced these mood episodes repeatedly over 2+ years?",
  "Has a blood relative been diagnosed with bipolar disorder?",
  "Have you been treated for depression that didn't respond well to antidepressants alone?",
  "Have your mood swings been relatively mild but persistent for 2+ years (never reaching full mania or major depression)?",
];

function ScreeningPage() {
  const [step, setStep] = useState(0); // 0=intro,1=mania,2=dep,3=clustering,4=impact,5=severity,6=results
  const [ma, setMa] = useState({});
  const [dep, setDep] = useState({});
  const [sev, setSev] = useState({});
  const [clustering, setClustering] = useState(null);
  const [impact, setImpact] = useState(null);
  const ref = useRef(null);

  useEffect(() => { ref.current?.scrollIntoView({ behavior: "smooth", block: "start" }); }, [step]);

  const toggle = (setter, idx, val) => setter(p => ({ ...p, [idx]: val }));

  const maCount = Object.values(ma).filter(Boolean).length;
  const depCount = Object.values(dep).filter(Boolean).length;
  const allMa = Object.keys(ma).length === 13;
  const allDep = Object.keys(dep).length === 9;
  const allSev = Object.keys(sev).length === 9;

  const canNext = [true, allMa, allDep, clustering !== null, impact !== null, allSev, false][step];

  function getResults() {
    const cl = clustering === true;
    const impSig = impact === "moderate" || impact === "serious";
    const mdqPos = maCount >= 7 && cl && impSig;
    const psychotic = sev[0], hosp = sev[1], funcOk = sev[2], dur7 = sev[3], dur4 = sev[4];
    const chronic = sev[5], fam = sev[6], txRes = sev[7], cycPat = sev[8];

    let b1 = 0, b2 = 0, cy = 0;
    if (maCount >= 7) b1 += 3; if (psychotic) b1 += 4; if (hosp) b1 += 4; if (dur7) b1 += 3; if (!funcOk) b1 += 2; if (impSig) b1 += 2; if (cl) b1 += 1; if (fam) b1 += 1;
    if (maCount >= 5 && maCount < 10) b2 += 2; if (dur4) b2 += 3; if (funcOk) b2 += 2; if (depCount >= 5) b2 += 3; if (!psychotic && !hosp) b2 += 2; if (txRes) b2 += 2; if (cl) b2 += 1; if (fam) b2 += 1; if (impSig) b2 += 1;
    if (maCount >= 3 && maCount < 7) cy += 2; if (depCount >= 3 && depCount < 5) cy += 2; if (cycPat) cy += 4; if (chronic) cy += 2; if (funcOk) cy += 1; if (!psychotic && !hosp && !dur7) cy += 1;

    const mx = Math.max(b1, b2, cy);
    if (mx <= 3 && maCount < 5) return { type: "Low Screening Indication", color: C.teal, b1, b2, cy, maCount, depCount, mdqPos, desc: "Based on your responses, this screening does not strongly suggest a bipolar spectrum disorder. However, this does not rule it out. If you are experiencing mood difficulties, discussing them with a mental health professional is always recommended." };
    if (b1 >= b2 && b1 >= cy && b1 > 5) return { type: "Features Consistent with Bipolar I", color: C.red, b1, b2, cy, maCount, depCount, mdqPos, desc: "Your responses include features that are commonly associated with Bipolar I Disorder, such as intense manic episodes, significant functional impairment, and/or psychotic features. This is not a diagnosis. Please discuss these results with a psychiatrist for proper evaluation." };
    if (b2 > cy && b2 > 4) return { type: "Features Consistent with Bipolar II", color: C.warm, b1, b2, cy, maCount, depCount, mdqPos, desc: "Your responses include features commonly associated with Bipolar II Disorder, such as hypomanic episodes alternating with significant depression and generally maintained functioning during highs. This is not a diagnosis. Please discuss these results with a psychiatrist for proper evaluation." };
    if (cy > 4) return { type: "Features Consistent with Cyclothymia", color: C.blue, b1, b2, cy, maCount, depCount, mdqPos, desc: "Your responses include features commonly associated with Cyclothymic Disorder, such as chronic mild mood fluctuations persisting over two or more years without reaching full mania or major depression. This is not a diagnosis. Please discuss these results with a mental health professional." };
    return { type: "Mixed or Subthreshold Features", color: "#7c3aed", b1, b2, cy, maCount, depCount, mdqPos, desc: "Your responses show some features associated with bipolar spectrum conditions but do not clearly align with one specific type. This is common and does not mean you do or do not have a bipolar disorder. A comprehensive clinical evaluation would help clarify the picture." };
  }

  const r = step === 6 ? getResults() : null;
  const pct = step === 0 ? 0 : Math.round((step / 6) * 100);

  function QBlock({ questions, answers, setter, label, sublabel }) {
    return (
      <div>
        <h3 style={{ fontFamily: fonts.display, fontSize: 20, fontWeight: 700, color: C.text, margin: "0 0 4px" }}>{label}</h3>
        <p style={{ fontSize: 13, color: C.textMid, margin: "0 0 18px", fontFamily: fonts.body }}>{sublabel}</p>
        {questions.map((q, i) => (
          <div key={i} style={{ background: answers[i] === true ? `${C.teal}08` : answers[i] === false ? "#fafaf8" : C.card, border: `1.5px solid ${answers[i] === true ? C.teal + "40" : C.border}`, borderRadius: 12, padding: "14px 18px", marginBottom: 8, transition: "all 0.2s" }}>
            <p style={{ fontSize: 14, lineHeight: 1.55, color: C.text, margin: "0 0 10px", fontFamily: fonts.body }}>{q}</p>
            <div style={{ display: "flex", gap: 6 }}>
              {[true, false].map(v => (
                <button key={String(v)} onClick={() => toggle(setter, i, v)} style={{
                  padding: "6px 18px", borderRadius: 7, fontSize: 12.5, fontWeight: 600, cursor: "pointer", fontFamily: fonts.body, transition: "all 0.15s",
                  border: answers[i] === v ? `1.5px solid ${v ? C.teal : "#8a919e"}` : `1.5px solid ${C.border}`,
                  background: answers[i] === v ? (v ? C.teal : "#6b7280") : "transparent",
                  color: answers[i] === v ? "#fff" : C.textMid,
                }}>{v ? "Yes" : "No"}</button>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <Section style={{ paddingTop: 40, paddingBottom: 60 }}>
      <div ref={ref} />
      {step > 0 && step < 6 && (
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: C.textLight, fontFamily: fonts.body, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>
            <span>Step {step} of 6</span><span>{pct}%</span>
          </div>
          <div style={{ height: 4, background: C.border, borderRadius: 4, overflow: "hidden" }}>
            <div style={{ width: `${pct}%`, height: "100%", background: `linear-gradient(90deg, ${C.teal}, ${C.accent})`, borderRadius: 4, transition: "width 0.5s ease" }} />
          </div>
        </div>
      )}

      {step === 0 && (
        <div style={{ textAlign: "center", maxWidth: 540, margin: "0 auto" }}>
          <Badge color={C.teal}>Educational Screening Tool</Badge>
          <h2 style={{ fontFamily: fonts.display, fontSize: 30, fontWeight: 700, color: C.text, margin: "16px 0 12px" }}>Bipolar Disorder Screening</h2>
          <p style={{ fontSize: 15, color: C.textMid, lineHeight: 1.7, margin: "0 0 12px", fontFamily: fonts.body }}>This screening incorporates questions from the <strong>Mood Disorder Questionnaire (MDQ)</strong>, a validated tool developed by Dr. Robert Hirschfeld, along with additional questions informed by DSM-5 criteria.</p>
          <Card style={{ textAlign: "left", margin: "20px 0" }}>
            <p style={{ fontSize: 13.5, color: C.textMid, lineHeight: 1.6, margin: 0, fontFamily: fonts.body }}>This takes about <strong>5–8 minutes</strong>. Answer based on your <strong>lifetime experiences</strong>, not just how you feel today. There are no right or wrong answers.</p>
          </Card>
          <Card style={{ textAlign: "left", margin: "0 0 0 0", background: "#fdf2f2", borderColor: "#e8c4c4" }}>
            <p style={{ fontSize: 13, color: "#7a3030", lineHeight: 1.6, margin: "0 0 8px", fontFamily: fonts.body, fontWeight: 700 }}>Important — Please Read Before Proceeding</p>
            <p style={{ fontSize: 12.5, color: "#7a3030", lineHeight: 1.6, margin: "0 0 6px", fontFamily: fonts.body }}>This is an <strong>educational screening tool, not a diagnostic instrument</strong>. Only a licensed psychiatrist or psychologist can diagnose bipolar disorder through comprehensive clinical evaluation.</p>
            <p style={{ fontSize: 12.5, color: "#7a3030", lineHeight: 1.6, margin: "0 0 6px", fontFamily: fonts.body }}>The MDQ questions (Part 1) are clinically validated. The additional questions used to suggest which type of bipolar disorder your symptoms may align with are <strong>educational approximations informed by DSM-5 criteria</strong>, not a separately validated diagnostic tool.</p>
            <p style={{ fontSize: 12.5, color: "#7a3030", lineHeight: 1.6, margin: 0, fontFamily: fonts.body }}>A positive screen means you should <strong>discuss these results with a qualified mental health professional</strong>. A negative screen does not rule out bipolar disorder.</p>
          </Card>
        </div>
      )}

      {step === 1 && <QBlock questions={MANIA_QS} answers={ma} setter={setMa} label="Part 1: Manic / Hypomanic Symptoms" sublabel="Has there ever been a period of time when you were not your usual self and..." />}
      {step === 2 && <QBlock questions={DEP_QS} answers={dep} setter={setDep} label="Part 2: Depressive Symptoms" sublabel="Has there ever been a period when..." />}

      {step === 3 && (
        <div>
          <h3 style={{ fontFamily: fonts.display, fontSize: 20, fontWeight: 700, color: C.text, margin: "0 0 8px" }}>Part 3: Symptom Clustering</h3>
          <Card style={{ marginTop: 12 }}>
            <p style={{ fontSize: 15, lineHeight: 1.65, color: C.text, margin: "0 0 16px", fontFamily: fonts.body }}>If you answered YES to more than one manic/hypomanic symptom, have several of these <strong>ever happened during the same period of time</strong>?</p>
            <div style={{ display: "flex", gap: 10 }}>
              {[true, false].map(v => (
                <button key={String(v)} onClick={() => setClustering(v)} style={{
                  flex: 1, padding: "14px", borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: fonts.body, transition: "all 0.2s",
                  border: clustering === v ? `2px solid ${v ? C.teal : "#6b7280"}` : `1.5px solid ${C.border}`,
                  background: clustering === v ? (v ? C.teal : "#6b7280") : C.card, color: clustering === v ? "#fff" : C.textMid,
                }}>{v ? "Yes" : "No"}</button>
              ))}
            </div>
          </Card>
        </div>
      )}

      {step === 4 && (
        <div>
          <h3 style={{ fontFamily: fonts.display, fontSize: 20, fontWeight: 700, color: C.text, margin: "0 0 8px" }}>Part 4: Functional Impact</h3>
          <Card style={{ marginTop: 12 }}>
            <p style={{ fontSize: 15, lineHeight: 1.6, color: C.text, margin: "0 0 16px", fontFamily: fonts.body }}>How much of a problem did any of these cause — like being unable to work, family/money/legal troubles, or getting into arguments?</p>
            {["none", "minor", "moderate", "serious"].map(v => (
              <button key={v} onClick={() => setImpact(v)} style={{
                display: "block", width: "100%", textAlign: "left", padding: "13px 18px", borderRadius: 10, marginBottom: 8, cursor: "pointer", fontFamily: fonts.body, fontSize: 14.5, fontWeight: impact === v ? 700 : 500, transition: "all 0.2s",
                border: impact === v ? `2px solid ${v === "serious" ? C.red : v === "moderate" ? C.warm : v === "minor" ? C.blue : C.textLight}` : `1.5px solid ${C.border}`,
                background: impact === v ? (v === "serious" ? C.redLight : v === "moderate" ? C.warmLight : v === "minor" ? C.blueLight : "#f5f5f3") : C.card,
                color: impact === v ? (v === "serious" ? C.red : v === "moderate" ? C.warm : v === "minor" ? C.blue : C.textMid) : C.textMid,
              }}>{v === "none" ? "No problems" : v === "minor" ? "Minor problems" : v === "moderate" ? "Moderate problems" : "Serious problems"}</button>
            ))}
          </Card>
        </div>
      )}

      {step === 5 && <QBlock questions={SEV_QS} answers={sev} setter={setSev} label="Part 5: Severity, Duration & History" sublabel="These questions help differentiate between bipolar types." />}

      {step === 6 && r && (
        <div>
          <Card style={{ borderTop: `3px solid ${r.color}`, marginBottom: 20 }}>
            <Badge color={r.color}>Screening Indication — Not a Diagnosis</Badge>
            <h2 style={{ fontFamily: fonts.display, fontSize: 24, fontWeight: 700, color: r.color, margin: "10px 0 10px" }}>{r.type}</h2>
            <p style={{ fontSize: 14.5, color: C.textMid, lineHeight: 1.65, margin: 0, fontFamily: fonts.body }}>{r.desc}</p>
          </Card>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
            <Card style={{ textAlign: "center" }}>
              <div style={{ fontFamily: fonts.display, fontSize: 28, fontWeight: 700, color: r.maCount >= 7 ? C.red : C.teal }}>{r.maCount}/13</div>
              <div style={{ fontSize: 11, color: C.textLight, textTransform: "uppercase", letterSpacing: "0.06em", fontFamily: fonts.body }}>Mania Symptoms</div>
              <div style={{ fontSize: 11, color: r.maCount >= 7 ? C.red : C.teal, fontWeight: 600, fontFamily: fonts.body }}>{r.maCount >= 7 ? "Above MDQ threshold (≥7)" : "Below MDQ threshold"}</div>
            </Card>
            <Card style={{ textAlign: "center" }}>
              <div style={{ fontFamily: fonts.display, fontSize: 28, fontWeight: 700, color: r.depCount >= 5 ? C.warm : C.teal }}>{r.depCount}/9</div>
              <div style={{ fontSize: 11, color: C.textLight, textTransform: "uppercase", letterSpacing: "0.06em", fontFamily: fonts.body }}>Depression Symptoms</div>
              <div style={{ fontSize: 11, color: r.depCount >= 5 ? C.warm : C.teal, fontWeight: 600, fontFamily: fonts.body }}>{r.depCount >= 5 ? "Significant depression" : "Below threshold"}</div>
            </Card>
          </div>
          {[{ l: "Bipolar I", s: r.b1, mx: 20, c: C.red }, { l: "Bipolar II", s: r.b2, mx: 17, c: C.warm }, { l: "Cyclothymia", s: r.cy, mx: 13, c: C.blue }].map(x => (
            <div key={x.l} style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, fontFamily: fonts.body, marginBottom: 4 }}>
                <span style={{ fontWeight: 600, color: C.text }}>{x.l}</span><span style={{ fontWeight: 700, color: x.c }}>{x.s} pts</span>
              </div>
              <div style={{ height: 8, background: C.border, borderRadius: 6, overflow: "hidden" }}>
                <div style={{ width: `${Math.min((x.s / x.mx) * 100, 100)}%`, height: "100%", background: x.c, borderRadius: 6, transition: "width 0.8s ease" }} />
              </div>
            </div>
          ))}
          <Card style={{ background: "#fdf2f2", borderColor: "#e8c4c4", marginTop: 20 }}>
            <p style={{ fontSize: 12.5, color: "#7a3030", lineHeight: 1.6, margin: "0 0 8px", fontFamily: fonts.body }}><strong>This screening does not constitute a medical diagnosis.</strong> The MDQ component (Part 1) is clinically validated (Hirschfeld et al., Am J Psychiatry, 2000). The type-differentiation scoring is an educational tool informed by DSM-5 criteria and is not a separately validated diagnostic instrument.</p>
            <p style={{ fontSize: 12.5, color: "#7a3030", lineHeight: 1.6, margin: "0 0 8px", fontFamily: fonts.body }}>A positive or negative result should be discussed with a licensed psychiatrist or psychologist who can conduct a comprehensive evaluation. Many conditions share symptoms with bipolar disorder, including ADHD, borderline personality disorder, thyroid disorders, and substance-induced mood changes.</p>
            <p style={{ fontSize: 12.5, color: "#7a3030", lineHeight: 1.6, margin: 0, fontFamily: fonts.body }}>If you are in crisis, contact the <strong>988 Suicide & Crisis Lifeline</strong> by calling or texting <strong>988</strong>.</p>
          </Card>
        </div>
      )}

      {/* Nav buttons */}
      <div style={{ display: "flex", justifyContent: step === 0 ? "center" : "space-between", marginTop: 28, gap: 12 }}>
        {step > 0 && step < 6 && <Btn variant="outline" onClick={() => setStep(s => s - 1)}>← Back</Btn>}
        {step < 6 && <Btn variant={step === 0 ? "accent" : "primary"} disabled={!canNext} onClick={() => setStep(s => s + 1)} style={step === 0 ? { fontSize: 16, padding: "14px 36px" } : {}}>
          {step === 0 ? "Begin Screening →" : step === 5 ? "View Results →" : "Continue →"}
        </Btn>}
        {step === 6 && <Btn variant="outline" onClick={() => { setStep(0); setMa({}); setDep({}); setSev({}); setClustering(null); setImpact(null); }} style={{ margin: "0 auto" }}>Retake Screening</Btn>}
      </div>
    </Section>
  );
}

// ═══════════════════════════════════════════════════════════════
// MEDICATION GUIDE
// ═══════════════════════════════════════════════════════════════
const MEDS = [
  { name: "Lithium", brand: "Lithobid, Eskalith", cls: "Mood Stabilizer", color: C.teal, approved: true,
    uses: "Gold standard for bipolar I. Prevents manic and depressive recurrence. Only psychiatric medication proven to reduce suicide risk. Effective for maintenance, acute mania, and bipolar depression.",
    dose: "Typically 600–1800mg/day in divided doses. Therapeutic blood level: 0.6–1.2 mEq/L. Narrow therapeutic window requires regular monitoring.",
    onset: "Antimanic effects: 1–3 weeks. Full mood stabilization: 4–12 weeks. Neuroprotective effects build over months/years.",
    sides: "Thirst, frequent urination, hand tremor (27%), nausea (10–20% early), weight gain (modest), cognitive dulling. Long-term: thyroid changes, kidney function concerns (requires monitoring).",
    rating: "7.3/10", reviews: "361 reviews on Drugs.com", notes: "Patient accounts range from 'life-saving miracle' to concerns about creativity loss and emotional flattening. Most common positive: unmatched mood stability. Most common negative: thirst, tremor, cognitive effects." },
  { name: "Lamotrigine", brand: "Lamictal", cls: "Mood Stabilizer / Anticonvulsant", color: C.blue, approved: true,
    uses: "FDA-approved for bipolar I maintenance. Particularly effective for preventing depressive episodes (its primary strength). Less effective for acute mania. Often first-line for Bipolar II.",
    dose: "Requires slow titration: 25mg/day for 2 weeks → 50mg for 2 weeks → target 200mg/day. Slow start is critical to avoid rare but serious skin reaction (SJS).",
    onset: "Due to required slow titration, therapeutic dose not reached for 5–6 weeks. Full benefit may take 2–3 months.",
    sides: "Headache, dizziness, nausea, blurred vision. Rare but serious: Stevens-Johnson Syndrome (rash) — requires immediate medical attention if rash develops. Generally well-tolerated with less weight gain and cognitive effects than many alternatives.",
    rating: "7.5/10", reviews: "Highly rated for bipolar depression", notes: "Patients frequently report it's the best-tolerated mood stabilizer. Main complaint is the slow titration. Highly valued by Bipolar II patients for depression prevention." },
  { name: "Quetiapine", brand: "Seroquel", cls: "Atypical Antipsychotic", color: C.warm, approved: true,
    uses: "FDA-approved for bipolar mania (400–800mg), bipolar depression (300mg), and maintenance. One of only two antipsychotics effective for both poles. Very different drug at different doses.",
    dose: "Bipolar depression: 300mg/day. Mania: 400–800mg/day. Low dose (25–100mg) used off-label for insomnia. The most prescribed antipsychotic in the U.S.",
    onset: "Sedation: immediate. Antimanic: 1–2 weeks at adequate dose. Antidepressant: 1–2 weeks. Full effect: 4–6 weeks.",
    sides: "Heavy sedation (H1 histamine binding), weight gain, metabolic syndrome risk (glucose, cholesterol), dry mouth, constipation, orthostatic hypotension. Lowest EPS risk of all antipsychotics.",
    rating: "6.2/10", reviews: "3,008 reviews on WebMD", notes: "Polarizing: loved by some for sleep and mood coverage, hated by others for sedation and metabolic effects. ~60% discontinue within weeks per Cochrane review. Common complaint: 'Seroquel zombie.'" },
  { name: "Paliperidone", brand: "Invega", cls: "Atypical Antipsychotic", color: "#7c3aed", approved: false,
    uses: "FDA-approved for schizophrenia/schizoaffective disorder. Used OFF-LABEL for bipolar I mania. Listed as first-line for acute mania in 2018 CANMAT guidelines. Active metabolite of risperidone.",
    dose: "3–12mg/day extended-release. Efficacy for mania demonstrated at 9–12mg/day. Lower doses (≤6mg) showed no improvement over mood stabilizer alone in adjunctive trials.",
    onset: "Plasma peak: ~24 hours. Steady state: 4–5 days. Improvement in mania symptoms: 4 days to 2 weeks. Full benefit: 2–3 months.",
    sides: "Prolactin elevation (significant and dose-dependent), weight gain, EPS/movement disorders, tachycardia, akathisia, emotional blunting/anhedonia. Half-life ~23 hours.",
    rating: "4.8/10", reviews: "58 reviews for bipolar on Drugs.com", notes: "More negative reviews for bipolar than for schizophrenia. Most common complaints: anhedonia, emotional numbness, weight gain. Some report it as the only thing that stopped psychotic mania." },
  { name: "Valproate", brand: "Depakote, Depakene", cls: "Mood Stabilizer / Anticonvulsant", color: "#059669", approved: true,
    uses: "FDA-approved for acute mania. Often preferred over lithium for mixed episodes. Effective for rapid cycling. NOT recommended for women of childbearing age (teratogenic).",
    dose: "Typically 750–2000mg/day. Therapeutic blood level: 50–125 mcg/mL. Loading dose strategy (20mg/kg/day) can achieve faster response.",
    onset: "With loading dose: improvement in 3–5 days. Standard titration: 1–2 weeks for antimanic effect.",
    sides: "Weight gain (common and significant), hair loss, tremor, GI effects, sedation. Serious: liver toxicity (rare), pancreatitis, polycystic ovary syndrome, birth defects (contraindicated in pregnancy).",
    rating: "6.5/10", reviews: "Commonly used but mixed tolerability", notes: "Weight gain is the #1 complaint. Some patients find it more tolerable than lithium for acute mania. Critical warning: do NOT use during pregnancy." },
  { name: "Lorazepam", brand: "Ativan", cls: "Benzodiazepine (Adjunct)", color: "#6366f1", approved: false,
    uses: "OFF-LABEL adjunct for acute manic agitation, insomnia, and anxiety during bipolar episodes. Used as a bridge while mood stabilizers/antipsychotics reach therapeutic levels. 79% of bipolar mania trial participants received lorazepam.",
    dose: "Typical range: 1–2mg every 4–6 hours as needed, as prescribed by a physician. Short-term use only (generally limited to 2–4 weeks). Works by enhancing GABA-A receptor activity. All dosing must be determined by your prescribing doctor.",
    onset: "Oral: 15–30 minutes. One of the fastest-acting psychiatric medications.",
    sides: "Sedation, cognitive impairment, dizziness, dependence risk (HIGH — physical dependence develops in 2–4 weeks). Not a mood stabilizer. Does not prevent future episodes.",
    rating: "N/A for bipolar", reviews: "Valued as rescue medication", notes: "Patients describe it as providing immediate relief from the intensity of mania. Critical: this is a bridge, not a treatment. Must be used short-term alongside proper mood stabilizers." },
];

function MedicationsPage() {
  const [expanded, setExpanded] = useState(null);
  return (
    <Section style={{ paddingTop: 40, paddingBottom: 60 }}>
      <Badge color={C.teal}>Evidence-Based</Badge>
      <h2 style={{ fontFamily: fonts.display, fontSize: 30, fontWeight: 700, color: C.text, margin: "12px 0 8px" }}>Medication Guide</h2>
      <p style={{ fontSize: 15, color: C.textMid, margin: "0 0 12px", maxWidth: 600, lineHeight: 1.65, fontFamily: fonts.body }}>General information about medications commonly used in bipolar disorder. Dosages listed are typical ranges from FDA labeling and clinical guidelines — they are not recommendations. All medication decisions should be made with your prescribing physician.</p>
      <Card style={{ background: "#fdf2f2", borderColor: "#e8c4c4", marginBottom: 20, padding: "14px 20px" }}>
        <p style={{ fontSize: 12.5, color: "#7a3030", lineHeight: 1.6, margin: 0, fontFamily: fonts.body }}><strong>Medical Disclaimer:</strong> This information is for educational purposes only. Individual responses to medication vary significantly. Never start, stop, or adjust any medication without direct guidance from your prescribing physician. Dosing, side effects, and interactions depend on your specific health profile.</p>
      </Card>

      {MEDS.map((m, i) => (
        <Card key={i} hover style={{ marginBottom: 12, cursor: "pointer", borderLeft: `3px solid ${m.color}`, transition: "all 0.3s" }} onClick={() => setExpanded(expanded === i ? null : i)}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
                <h3 style={{ fontFamily: fonts.display, fontSize: 19, fontWeight: 700, color: C.text, margin: 0 }}>{m.name}</h3>
                <span style={{ fontSize: 12, color: C.textLight, fontFamily: fonts.body }}>({m.brand})</span>
                <Badge color={m.color}>{m.cls}</Badge>
                {!m.approved && <Badge color={C.red}>Off-Label for Bipolar</Badge>}
              </div>
              <p style={{ fontSize: 13.5, color: C.textMid, margin: "4px 0 0", lineHeight: 1.55, fontFamily: fonts.body }}>{m.uses}</p>
            </div>
            <span style={{ fontSize: 18, color: C.textLight, transform: expanded === i ? "rotate(180deg)" : "none", transition: "transform 0.3s", flexShrink: 0, marginLeft: 12 }}>▾</span>
          </div>

          {expanded === i && (
            <div style={{ marginTop: 16, borderTop: `1px solid ${C.border}`, paddingTop: 16, animation: "fadeUp 0.3s ease both" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
                {[
                  { label: "Dosing", icon: "◈", content: m.dose },
                  { label: "Time to Take Effect", icon: "◉", content: m.onset },
                  { label: "Side Effects", icon: "◎", content: m.sides },
                ].map((s, j) => (
                  <div key={j} style={{ padding: "12px 14px", background: "#fafaf8", borderRadius: 10 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: m.color, marginBottom: 4, fontFamily: fonts.body }}>{s.icon} {s.label}</div>
                    <p style={{ fontSize: 12.5, color: C.textMid, lineHeight: 1.6, margin: 0, fontFamily: fonts.body }}>{s.content}</p>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 14, padding: "12px 14px", background: `${m.color}06`, borderRadius: 10, borderLeft: `3px solid ${m.color}` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: m.color, fontFamily: fonts.body }}>Patient Perspective</div>
                  {m.rating !== "N/A for bipolar" && <span style={{ fontSize: 12, fontWeight: 700, color: C.text, fontFamily: fonts.body }}>{m.rating}</span>}
                  <span style={{ fontSize: 11, color: C.textLight, fontFamily: fonts.body }}>{m.reviews}</span>
                </div>
                <p style={{ fontSize: 12.5, color: C.textMid, lineHeight: 1.6, margin: 0, fontFamily: fonts.body }}>{m.notes}</p>
              </div>
            </div>
          )}
        </Card>
      ))}

      <Card style={{ background: "#fef9f0", borderColor: "#f0d8a8", marginTop: 20 }}>
        <p style={{ fontSize: 12.5, color: "#92400e", lineHeight: 1.6, margin: 0, fontFamily: fonts.body }}><strong>Never start, stop, or change medication without your doctor.</strong> This guide is for education only. Medication response is highly individual. What works brilliantly for one person may be intolerable for another. Pharmacogenomic testing (like GeneSight) can help predict your response.</p>
      </Card>
    </Section>
  );
}

// ═══════════════════════════════════════════════════════════════
// FIND HELP
// ═══════════════════════════════════════════════════════════════
function FindHelpPage() {
  return (
    <Section style={{ paddingTop: 40, paddingBottom: 60 }}>
      <Badge color={C.accent}>Take the Next Step</Badge>
      <h2 style={{ fontFamily: fonts.display, fontSize: 30, fontWeight: 700, color: C.text, margin: "12px 0 8px" }}>Find a Psychiatrist or Therapist</h2>
      <p style={{ fontSize: 15, color: C.textMid, margin: "0 0 28px", maxWidth: 620, lineHeight: 1.65, fontFamily: fonts.body }}>Bipolar disorder requires specialized care. A psychiatrist (MD) prescribes medication; a therapist provides talk therapy. Most people with bipolar benefit from both.</p>

      {/* Provider directories */}
      <h3 style={{ fontFamily: fonts.display, fontSize: 20, fontWeight: 700, color: C.text, margin: "0 0 14px" }}>Provider Search Directories</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 14, marginBottom: 32 }}>
        {[
          { name: "Psychology Today", url: "https://www.psychologytoday.com/us/psychiatrists", desc: "Largest therapist/psychiatrist directory. Filter by insurance, specialty (bipolar), location, and telehealth availability.", tags: ["Psychiatrists", "Therapists", "Insurance Filter"] },
          { name: "SAMHSA Treatment Locator", url: "https://findtreatment.gov", desc: "Free government tool from the Substance Abuse and Mental Health Services Administration. Finds mental health facilities and providers near you.", tags: ["Free", "Government", "All Providers"] },
          { name: "NAMI Helpline", url: "https://www.nami.org/help", desc: "Call 1-800-950-NAMI (6264) or text 'HELPLINE' to 62640. Free referrals, support groups, and education about bipolar disorder.", tags: ["Phone Support", "Referrals", "Free"] },
          { name: "Zocdoc", url: "https://www.zocdoc.com", desc: "Book psychiatrist appointments online. Shows real-time availability, insurance accepted, and patient reviews.", tags: ["Online Booking", "Reviews", "Insurance"] },
          { name: "DBSA Support Groups", url: "https://www.dbsalliance.org/support/chapters-and-support-groups/", desc: "Depression and Bipolar Support Alliance. Find peer-led support groups (in-person and online) specifically for bipolar disorder.", tags: ["Peer Support", "Free", "Bipolar-Specific"] },
          { name: "Open Path Collective", url: "https://openpathcollective.org", desc: "Affordable therapy ($30–$80/session) for people without insurance or with high deductibles. Lifetime membership fee of $65.", tags: ["Affordable", "No Insurance Needed", "Therapists"] },
        ].map((d, i) => (
          <Card key={i} hover style={{ animation: `fadeUp 0.5s ease ${i * 0.06}s both` }}>
            <h4 style={{ fontFamily: fonts.display, fontSize: 16, fontWeight: 700, color: C.text, margin: "0 0 6px" }}>{d.name}</h4>
            <p style={{ fontSize: 13, color: C.textMid, lineHeight: 1.55, margin: "0 0 10px", fontFamily: fonts.body }}>{d.desc}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 10 }}>
              {d.tags.map(t => <span key={t} style={{ padding: "2px 8px", borderRadius: 12, fontSize: 10.5, fontWeight: 600, color: C.teal, background: C.tealLight, fontFamily: fonts.body }}>{t}</span>)}
            </div>
            <a href={d.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: C.accent, fontWeight: 600, textDecoration: "none", fontFamily: fonts.body }}>{d.url.replace("https://", "").replace("www.", "").split("/")[0]} →</a>
          </Card>
        ))}
      </div>

      {/* What to look for */}
      <h3 style={{ fontFamily: fonts.display, fontSize: 20, fontWeight: 700, color: C.text, margin: "0 0 14px" }}>What to Look For in a Provider</h3>
      <Card style={{ marginBottom: 20 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
          <div>
            <h4 style={{ fontFamily: fonts.display, fontSize: 15, fontWeight: 700, color: C.accent, margin: "0 0 8px" }}>For a Psychiatrist (MD/DO)</h4>
            {["Board-certified in psychiatry", "Experience treating bipolar disorder specifically", "Comfortable with lithium (many newer psychiatrists aren't)", "Willing to explain medication choices and involve you in decisions", "Available for follow-up within 2–4 weeks of starting new medication", "Monitors labs (lithium levels, metabolic panels, thyroid)"].map((t, i) => (
              <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, fontSize: 13, color: C.textMid, fontFamily: fonts.body }}>
                <span style={{ color: C.teal, fontWeight: 700, flexShrink: 0 }}>✓</span> {t}
              </div>
            ))}
          </div>
          <div>
            <h4 style={{ fontFamily: fonts.display, fontSize: 15, fontWeight: 700, color: C.blue, margin: "0 0 8px" }}>For a Therapist</h4>
            {["Trained in CBT (Cognitive Behavioral Therapy) for bipolar", "Experience with IPSRT (Interpersonal and Social Rhythm Therapy)", "Understanding that therapy alone does not replace medication for bipolar", "Comfortable working alongside your psychiatrist", "Helps with mood charting, trigger identification, and relapse prevention", "Addresses both the disorder and the identity/relationship impacts"].map((t, i) => (
              <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, fontSize: 13, color: C.textMid, fontFamily: fonts.body }}>
                <span style={{ color: C.blue, fontWeight: 700, flexShrink: 0 }}>✓</span> {t}
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* What to say */}
      <h3 style={{ fontFamily: fonts.display, fontSize: 20, fontWeight: 700, color: C.text, margin: "0 0 14px" }}>What to Say at Your First Appointment</h3>
      <Card style={{ marginBottom: 20 }}>
        <p style={{ fontSize: 14, color: C.textMid, lineHeight: 1.65, margin: "0 0 14px", fontFamily: fonts.body }}>You don't need to have everything figured out. Here are phrases that help a provider understand what you're experiencing:</p>
        {[
          "\"I've been having periods where my mood is extremely high and extremely low, and it's affecting my life.\"",
          "\"I took a bipolar screening questionnaire and it flagged some concerns. I'd like a professional evaluation.\"",
          "\"I've been treated for depression, but the medication doesn't seem to work — or it makes me feel worse / more agitated.\"",
          "\"I have a family member with bipolar disorder and I'm noticing some similar patterns in myself.\"",
          "\"I want to understand whether what I'm experiencing is bipolar disorder, and if so, what type.\"",
        ].map((q, i) => (
          <div key={i} style={{ padding: "10px 14px", background: "#faf8f5", borderRadius: 8, marginBottom: 8, borderLeft: `3px solid ${C.accent}`, fontSize: 13.5, color: C.text, lineHeight: 1.55, fontFamily: fonts.body, fontStyle: "italic" }}>{q}</div>
        ))}
      </Card>

      {/* Insurance/cost */}
      <h3 style={{ fontFamily: fonts.display, fontSize: 20, fontWeight: 700, color: C.text, margin: "0 0 14px" }}>If You Don't Have Insurance</h3>
      <Card style={{ marginBottom: 20 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 16 }}>
          {[
            { title: "Community Mental Health Centers", desc: "Every U.S. county has one. They provide psychiatric care on a sliding-scale fee basis. Find yours at findtreatment.gov." },
            { title: "University Training Clinics", desc: "Psychiatry residency programs offer supervised care at reduced rates. Quality is often excellent — residents are closely supervised by attending psychiatrists." },
            { title: "Patient Assistance Programs", desc: "Most medication manufacturers offer free or discounted drugs. NeedyMeds.org and RxAssist.org help you find programs for specific medications." },
            { title: "Telehealth Options", desc: "Services like Cerebral, Brightside, and Done offer psychiatric care at lower cost than private practice, often with quick access to providers." },
          ].map((t, i) => (
            <div key={i}>
              <h4 style={{ fontSize: 14, fontWeight: 700, color: C.text, margin: "0 0 4px", fontFamily: fonts.body }}>{t.title}</h4>
              <p style={{ fontSize: 12.5, color: C.textMid, lineHeight: 1.55, margin: 0, fontFamily: fonts.body }}>{t.desc}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Crisis */}
      <Card style={{ background: "#fef9f0", borderColor: "#f0d8a8", textAlign: "center" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: C.warm, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6, fontFamily: fonts.body }}>Crisis Resources — Available 24/7</div>
        <div style={{ fontFamily: fonts.display, fontSize: 24, fontWeight: 700, color: C.text }}>988 Suicide & Crisis Lifeline</div>
        <p style={{ fontFamily: fonts.body, fontSize: 14, color: C.textMid, margin: "6px 0 0" }}>Call or text <strong>988</strong> · Chat: <strong>988lifeline.org</strong> · Crisis Text Line: text <strong>HOME</strong> to <strong>741741</strong></p>
      </Card>
    </Section>
  );
}

// ═══════════════════════════════════════════════════════════════
// CBT PAGE
// ═══════════════════════════════════════════════════════════════
function CBTPage() {
  return (
    <Section style={{ paddingTop: 40, paddingBottom: 60 }}>
      <Badge color={C.teal}>Evidence-Based Therapy</Badge>
      <h2 style={{ fontFamily: fonts.display, fontSize: 30, fontWeight: 700, color: C.text, margin: "12px 0 8px" }}>Cognitive Behavioral Therapy (CBT)</h2>
      <p style={{ fontSize: 15, color: C.textMid, margin: "0 0 28px", maxWidth: 640, lineHeight: 1.65, fontFamily: fonts.body }}>CBT is the most studied psychotherapy for bipolar disorder, with <strong>13 randomized controlled trials</strong> and a strong evidence base. It's recommended as an adjunctive treatment in all phases of bipolar disorder except acute mania.</p>

      <Card style={{ marginBottom: 20, borderLeft: `3px solid ${C.teal}` }}>
        <h3 style={{ fontFamily: fonts.display, fontSize: 18, fontWeight: 700, color: C.teal, margin: "0 0 10px" }}>What CBT Actually Is</h3>
        <p style={{ fontSize: 14, color: C.textMid, lineHeight: 1.65, margin: "0 0 12px", fontFamily: fonts.body }}>CBT is based on a straightforward premise: your <strong>thoughts, feelings, and behaviors</strong> are interconnected, and shifts in one affect the others. In bipolar disorder, mood episodes distort thinking patterns (e.g., grandiosity during mania, hopelessness during depression), which drive behaviors that worsen the episode. CBT interrupts this cycle by teaching you to recognize and modify distorted thoughts before they spiral.</p>
        <p style={{ fontSize: 14, color: C.textMid, lineHeight: 1.65, margin: 0, fontFamily: fonts.body }}>Typical CBT for bipolar involves <strong>8–30 sessions</strong>, each lasting 45–120 minutes, delivered individually or in group format. The average is about 20 sessions. It is always used <strong>alongside medication</strong> — not as a replacement.</p>
      </Card>

      <h3 style={{ fontFamily: fonts.display, fontSize: 20, fontWeight: 700, color: C.text, margin: "0 0 14px" }}>The Four Pillars of CBT for Bipolar</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 14, marginBottom: 24 }}>
        {[
          { n: "1", title: "Easing Episode Symptoms", desc: "Cognitive restructuring for depressive thinking (challenging 'nothing will ever get better'), behavioral activation during depression (scheduling pleasurable activities even when motivation is zero), and impulse control techniques during hypomania/mania (delay strategies, pro/con lists for risky decisions).", color: C.teal },
          { n: "2", title: "Medication Adherence", desc: "One of the biggest predictors of relapse is stopping medication. CBT directly addresses this by exploring beliefs about meds ('I don't need them when I feel fine'), weighing pros/cons collaboratively, and developing strategies to make adherence automatic.", color: C.blue },
          { n: "3", title: "Early Warning Signs & Relapse Prevention", desc: "You learn to identify YOUR personal early warning signs of mania (sleeping less, spending more, talking faster) and depression (withdrawing, oversleeping, negative self-talk). Then you build an action plan: what to do at the first sign, who to call, and how to intervene before a full episode develops.", color: C.accent },
          { n: "4", title: "Comorbid Conditions", desc: "Bipolar rarely travels alone. CBT addresses co-occurring anxiety (present in 50%+ of bipolar patients), substance use, insomnia, and PTSD using the same cognitive-behavioral framework, adapted for each condition.", color: C.warm },
        ].map((p, i) => (
          <Card key={i} hover style={{ borderTop: `3px solid ${p.color}`, animation: `fadeUp 0.5s ease ${i * 0.08}s both` }}>
            <div style={{ fontFamily: fonts.display, fontSize: 28, fontWeight: 700, color: p.color, opacity: 0.3 }}>{p.n}</div>
            <h4 style={{ fontFamily: fonts.display, fontSize: 16, fontWeight: 700, color: C.text, margin: "2px 0 8px" }}>{p.title}</h4>
            <p style={{ fontSize: 13, color: C.textMid, lineHeight: 1.6, margin: 0, fontFamily: fonts.body }}>{p.desc}</p>
          </Card>
        ))}
      </div>

      <h3 style={{ fontFamily: fonts.display, fontSize: 20, fontWeight: 700, color: C.text, margin: "0 0 14px" }}>Core CBT Techniques You'll Learn</h3>
      <Card style={{ marginBottom: 20 }}>
        {[
          { name: "Mood Monitoring", desc: "Daily tracking of mood (0–10), sleep hours, medication taken, and notable events. This is foundational to almost all bipolar CBT protocols — it makes patterns visible that are invisible day-to-day." },
          { name: "Thought Records", desc: "When you notice a strong emotion, you write down: the situation, the automatic thought, the emotion, the evidence for/against the thought, and a balanced alternative thought. Over time, you learn to catch distortions in real-time." },
          { name: "Behavioral Activation", desc: "During depression, you schedule activities that provide mastery (accomplishment) and pleasure — even in small doses. The principle: behavior change drives mood change, not the other way around." },
          { name: "Activity Scheduling", desc: "Structuring your day with consistent wake times, meal times, and activity blocks. Routine is a mood stabilizer in itself. This overlaps with Social Rhythm Therapy (IPSRT)." },
          { name: "Cognitive Restructuring", desc: "Identifying and challenging cognitive distortions: all-or-nothing thinking, catastrophizing, mind-reading, emotional reasoning. In mania: challenging grandiose thoughts. In depression: challenging hopeless thoughts." },
          { name: "Relapse Signature & Action Plan", desc: "A personalized document listing your specific early warning signs for mania and depression, with pre-planned actions for each stage: green (stable), yellow (warning), red (crisis)." },
          { name: "Sleep Hygiene Protocol", desc: "Sleep disruption is both a trigger and a symptom of bipolar episodes. CBT includes specific sleep protocols: consistent schedule, dark/cool room, no screens, stimulus control." },
        ].map((t, i) => (
          <div key={i} style={{ padding: "12px 0", borderBottom: i < 6 ? `1px solid ${C.border}` : "none" }}>
            <h4 style={{ fontSize: 14, fontWeight: 700, color: C.text, margin: "0 0 4px", fontFamily: fonts.body }}>{t.name}</h4>
            <p style={{ fontSize: 13, color: C.textMid, lineHeight: 1.6, margin: 0, fontFamily: fonts.body }}>{t.desc}</p>
          </div>
        ))}
      </Card>

      <h3 style={{ fontFamily: fonts.display, fontSize: 20, fontWeight: 700, color: C.text, margin: "0 0 14px" }}>What the Research Says</h3>
      <Card style={{ marginBottom: 20, background: "#f8faf9" }}>
        {[
          "A 2017 meta-analysis of 19 RCTs (1,384 patients) found CBT + medication produced significantly better outcomes for depression (Hedges' g = −0.494, moderate effect size) and psychosocial functioning compared to medication alone.",
          "The STEP-BD study (the largest bipolar therapy trial) found intensive therapy (CBT, IPSRT, or FFT — 30 sessions) produced 64% recovery rates vs. 52% for brief intervention alone.",
          "CBT has been shown to improve medication adherence, extend time between episodes, and reduce hospitalization rates.",
          "Neuroimaging research (2024) shows CBT modulates activity in the prefrontal cortex, amygdala, and posterior cingulate — regions involved in emotional processing — suggesting actual brain-level changes.",
          "CBT is NOT effective during acute mania. It works best during euthymic (stable) periods and during/after depressive episodes.",
        ].map((r, i) => (
          <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10, fontSize: 13, fontFamily: fonts.body }}>
            <span style={{ color: C.teal, fontWeight: 700, flexShrink: 0 }}>◈</span>
            <span style={{ color: C.textMid, lineHeight: 1.6 }}>{r}</span>
          </div>
        ))}
        <p style={{ fontSize: 11, color: C.textLight, marginTop: 8, fontFamily: fonts.body }}>Sources: Chiang et al., PLOS One (2017); Miklowitz et al., STEP-BD (2007); Özdel et al., PMC (2021); ScienceDirect neuroimaging review (2024)</p>
      </Card>

      <Card style={{ background: "#fef9f0", borderColor: "#f0d8a8" }}>
        <h4 style={{ fontSize: 14, fontWeight: 700, color: C.warm, margin: "0 0 6px", fontFamily: fonts.body }}>Is CBT Right for You?</h4>
        <p style={{ fontSize: 13, color: C.textMid, lineHeight: 1.6, margin: 0, fontFamily: fonts.body }}>CBT is best if you're currently stable or mildly depressed, willing to do homework between sessions, and want concrete, practical tools. If emotional intensity and interpersonal chaos are your primary struggles, DBT (next page) may be a better fit. Many therapists integrate both.</p>
      </Card>
    </Section>
  );
}

// ═══════════════════════════════════════════════════════════════
// DBT PAGE
// ═══════════════════════════════════════════════════════════════
function DBTPage() {
  return (
    <Section style={{ paddingTop: 40, paddingBottom: 60 }}>
      <Badge color="#7c3aed">Third-Wave Therapy</Badge>
      <h2 style={{ fontFamily: fonts.display, fontSize: 30, fontWeight: 700, color: C.text, margin: "12px 0 8px" }}>Dialectical Behavior Therapy (DBT)</h2>
      <p style={{ fontSize: 15, color: C.textMid, margin: "0 0 28px", maxWidth: 640, lineHeight: 1.65, fontFamily: fonts.body }}>Originally developed for borderline personality disorder, DBT directly targets <strong>emotional dysregulation</strong> — the core feature that bipolar disorder and BPD share. A growing body of evidence shows it reduces suicidality, improves mood symptoms, and builds skills that medication alone cannot provide.</p>

      <Card style={{ marginBottom: 20, borderLeft: "3px solid #7c3aed" }}>
        <h3 style={{ fontFamily: fonts.display, fontSize: 18, fontWeight: 700, color: "#7c3aed", margin: "0 0 10px" }}>Why DBT for Bipolar?</h3>
        <p style={{ fontSize: 14, color: C.textMid, lineHeight: 1.65, margin: "0 0 12px", fontFamily: fonts.body }}>Emotional dysregulation — high sensitivity to emotional stimuli, intense emotional responses, and a slow return to baseline — is increasingly recognized as the <strong>core clinical feature</strong> of bipolar disorder, not just an epiphenomenon. DBT was built specifically to treat this. Where CBT focuses on changing <em>thoughts</em>, DBT focuses on tolerating <em>emotions</em> and building the skills to survive intense feelings without making things worse.</p>
        <p style={{ fontSize: 14, color: C.textMid, lineHeight: 1.65, margin: 0, fontFamily: fonts.body }}>In a landmark 2023 JAMA Psychiatry trial, adolescents with bipolar disorder who received DBT had <strong>significantly fewer suicide attempts</strong> compared to standard therapy. The benefit was mediated by improvement in emotion regulation.</p>
      </Card>

      <h3 style={{ fontFamily: fonts.display, fontSize: 20, fontWeight: 700, color: C.text, margin: "0 0 14px" }}>The Four DBT Skill Modules</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 14, marginBottom: 24 }}>
        {[
          { title: "Mindfulness", color: "#2563eb", desc: "The foundation of all other skills. Learning to observe your thoughts and emotions without reacting to them. 'Wise Mind' — finding the overlap between emotional mind and rational mind. In bipolar: noticing mood shifts without being hijacked by them.", skills: "Observe, Describe, Participate, Non-judgmental stance, One-mindfully, Effectively" },
          { title: "Distress Tolerance", color: "#dc2626", desc: "Surviving crisis moments without making things worse. These are the skills for when you're in unbearable pain and the urge to act destructively is overwhelming. Not about fixing the problem — about getting through it.", skills: "TIPP (Temperature, Intense exercise, Paced breathing, Progressive relaxation), ACCEPTS (Activities, Contributing, Comparisons, Emotions, Pushing away, Thoughts, Sensations), Self-soothe with 5 senses, Radical Acceptance" },
          { title: "Emotion Regulation", color: "#7c3aed", desc: "Understanding and managing emotions rather than being controlled by them. Learning to identify what you're feeling, reduce vulnerability to negative emotions, and increase positive experiences.", skills: "ABC PLEASE (Accumulate positive experiences, Build mastery, Cope ahead, treat PhysicaL illness, balanced Eating, avoid mood-Altering substances, Sleep, Exercise), Opposite Action, Check the Facts" },
          { title: "Interpersonal Effectiveness", color: "#059669", desc: "Getting what you need from relationships while maintaining self-respect and the relationship itself. Critical for bipolar because episodes wreak havoc on relationships, and relationship stress triggers episodes.", skills: "DEAR MAN (Describe, Express, Assert, Reinforce, Mindful, Appear confident, Negotiate), GIVE (Gentle, Interested, Validate, Easy manner), FAST (Fair, no Apologies, Stick to values, Truthful)" },
        ].map((m, i) => (
          <Card key={i} hover style={{ borderTop: `3px solid ${m.color}`, animation: `fadeUp 0.5s ease ${i * 0.08}s both` }}>
            <h4 style={{ fontFamily: fonts.display, fontSize: 17, fontWeight: 700, color: m.color, margin: "0 0 8px" }}>{m.title}</h4>
            <p style={{ fontSize: 13, color: C.textMid, lineHeight: 1.6, margin: "0 0 12px", fontFamily: fonts.body }}>{m.desc}</p>
            <div style={{ padding: "10px 12px", background: `${m.color}08`, borderRadius: 8 }}>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: m.color, marginBottom: 3, fontFamily: fonts.body }}>Key Skills / Acronyms</div>
              <p style={{ fontSize: 12, color: C.textMid, lineHeight: 1.5, margin: 0, fontFamily: fonts.body }}>{m.skills}</p>
            </div>
          </Card>
        ))}
      </div>

      <h3 style={{ fontFamily: fonts.display, fontSize: 20, fontWeight: 700, color: C.text, margin: "0 0 14px" }}>DBT Structure: The Four Components</h3>
      <Card style={{ marginBottom: 20 }}>
        {[
          { name: "Individual Therapy (Weekly)", desc: "One-on-one sessions focused on applying skills to your specific life situations. Targets are hierarchized: life-threatening behaviors first, then therapy-interfering behaviors, then quality of life. Uses diary cards to track mood, urges, and skills used." },
          { name: "Group Skills Training (Weekly, 2–2.5 hrs)", desc: "Where you actually learn the four skill modules. Runs in cycles covering all four modules over about 6 months. The group format normalizes struggles and provides peer learning. This is the component most adapted for bipolar disorder." },
          { name: "Phone Coaching (As Needed)", desc: "Between sessions, you can contact your therapist for brief coaching on applying skills in real-time crisis moments. This bridges the gap between learning skills in session and using them when it matters." },
          { name: "Therapist Consultation Team", desc: "Your DBT therapist meets weekly with other DBT therapists to prevent burnout and ensure they're delivering effective treatment. This quality control mechanism is unique to DBT." },
        ].map((c, i) => (
          <div key={i} style={{ padding: "12px 0", borderBottom: i < 3 ? `1px solid ${C.border}` : "none" }}>
            <h4 style={{ fontSize: 14, fontWeight: 700, color: C.text, margin: "0 0 4px", fontFamily: fonts.body }}>{c.name}</h4>
            <p style={{ fontSize: 13, color: C.textMid, lineHeight: 1.6, margin: 0, fontFamily: fonts.body }}>{c.desc}</p>
          </div>
        ))}
      </Card>

      <h3 style={{ fontFamily: fonts.display, fontSize: 20, fontWeight: 700, color: C.text, margin: "0 0 14px" }}>Research for Bipolar Disorder Specifically</h3>
      <Card style={{ marginBottom: 20, background: "#faf8fc" }}>
        {[
          "A 2023 JAMA Psychiatry RCT (n=100 adolescents with bipolar) found DBT significantly reduced suicide attempts vs. standard psychotherapy. The effect was mediated by improved emotion regulation.",
          "A 12-week DBT skills group pilot (n=37) showed significant skill acquisition in mindfulness, emotion regulation, and distress tolerance, plus improved psychological well-being and decreased emotion reactivity.",
          "A 2023 systematic review (11 studies) found DBT-based interventions are feasible and acceptable for bipolar patients, with preliminary evidence of improving depression, mania symptoms, and emotional dysregulation.",
          "An RCT (n=60) showed DBT significantly improved executive functioning, mindfulness, emotion regulation, depression, and mania compared to pharmacotherapy alone.",
          "DBT has been effective in decreasing mania intensity and improving depression and executive function, though evidence for reducing emotional instability in bipolar is still building.",
          "A novel approach called DBSRT (Dialectical Behavior and Social Rhythm Therapy) combines DBT with circadian rhythm stabilization for patients with both bipolar and borderline personality disorder.",
        ].map((r, i) => (
          <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10, fontSize: 13, fontFamily: fonts.body }}>
            <span style={{ color: "#7c3aed", fontWeight: 700, flexShrink: 0 }}>▽</span>
            <span style={{ color: C.textMid, lineHeight: 1.6 }}>{r}</span>
          </div>
        ))}
        <p style={{ fontSize: 11, color: C.textLight, marginTop: 8, fontFamily: fonts.body }}>Sources: Goldstein et al., JAMA Psychiatry (2023); Van Dijk et al., PMC (2018); Zargar et al. (2019); Afshari et al. (2019); DBSRT: Am J Psychotherapy (2024)</p>
      </Card>

      <Card style={{ background: "#fef9f0", borderColor: "#f0d8a8" }}>
        <h4 style={{ fontSize: 14, fontWeight: 700, color: C.warm, margin: "0 0 6px", fontFamily: fonts.body }}>CBT vs. DBT: Which Do You Need?</h4>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 10 }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: C.teal, marginBottom: 6, fontFamily: fonts.body }}>Choose CBT if you...</div>
            {["Want practical tools for distorted thinking", "Are currently stable or mildly depressed", "Struggle with medication adherence", "Need relapse prevention strategies", "Want structured homework-based therapy"].map((t, i) => (
              <div key={i} style={{ fontSize: 12.5, color: C.textMid, marginBottom: 3, fontFamily: fonts.body }}>• {t}</div>
            ))}
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#7c3aed", marginBottom: 6, fontFamily: fonts.body }}>Choose DBT if you...</div>
            {["Have intense emotions that feel uncontrollable", "Struggle with suicidal thoughts or self-harm", "Have relationship chaos during episodes", "Need crisis survival skills RIGHT NOW", "Have been told you might also have BPD traits"].map((t, i) => (
              <div key={i} style={{ fontSize: 12.5, color: C.textMid, marginBottom: 3, fontFamily: fonts.body }}>• {t}</div>
            ))}
          </div>
        </div>
      </Card>
    </Section>
  );
}

// ═══════════════════════════════════════════════════════════════
// BODY / PHYSICAL ANXIETY PAGE
// ═══════════════════════════════════════════════════════════════
function BodyPage() {
  return (
    <Section style={{ paddingTop: 40, paddingBottom: 60 }}>
      <Badge color={C.accent}>Mind-Body Connection</Badge>
      <h2 style={{ fontFamily: fonts.display, fontSize: 30, fontWeight: 700, color: C.text, margin: "12px 0 8px" }}>Exercises for Physical Anxiety</h2>
      <p style={{ fontSize: 15, color: C.textMid, margin: "0 0 12px", maxWidth: 640, lineHeight: 1.65, fontFamily: fonts.body }}>When anxiety lives in your body — racing heart, tight chest, shaking hands, nausea, restlessness — no amount of thinking your way out will work. You need to talk to your <strong>nervous system</strong> directly.</p>
      <p style={{ fontSize: 15, color: C.textMid, margin: "0 0 28px", maxWidth: 640, lineHeight: 1.65, fontFamily: fonts.body }}>The key is your <strong>vagus nerve</strong> — the longest cranial nerve in your body, running from your brainstem to your gut. It controls the switch between fight-or-flight (sympathetic) and rest-and-digest (parasympathetic). These exercises activate it.</p>

      <h3 style={{ fontFamily: fonts.display, fontSize: 22, fontWeight: 700, color: C.accent, margin: "0 0 16px" }}>The Top 10 — Ranked by Speed and Evidence</h3>

      {[
        { rank: "1", name: "Extended Exhale Breathing", time: "2 min", evidence: "Strongest evidence", color: C.teal,
          how: "Inhale for 4 seconds through your nose. Exhale for 8 seconds through your mouth. Repeat 6–8 times.",
          why: "When you exhale longer than you inhale, the vagus nerve directly slows your heart rate via parasympathetic activation. This is the single most studied vagus nerve exercise. Research in the International Journal of Psychophysiology found this pattern reduces cortisol, lowers heart rate, and improves decision-making under stress — within minutes.",
          bipolar: "Especially useful during mixed episodes when anxiety and agitation coexist with mood instability. Can be done anywhere, anytime. Many CBT and DBT protocols include this." },

        { rank: "2", name: "Cold Water Face Dive (Dive Reflex)", time: "30 sec", evidence: "Strong evidence", color: C.blue,
          how: "Fill a bowl with ice water. Hold your breath, bend forward, and immerse your face for 15–30 seconds. Alternatively: hold a cold pack or bag of ice on your face (forehead and cheeks) for 30 seconds.",
          why: "Triggers the mammalian dive reflex — an involuntary parasympathetic response that immediately slows heart rate by up to 25%. Research from Cedars-Sinai confirms cold exposure activates vagal pathways and redirects blood flow to the brain.",
          bipolar: "This is a DBT TIPP skill (the 'T' stands for Temperature). It's the fastest way to interrupt a panic attack or acute agitation. Works even during manic agitation." },

        { rank: "3", name: "Progressive Muscle Relaxation (PMR)", time: "10–15 min", evidence: "Strong evidence", color: "#7c3aed",
          how: "Starting from your feet, systematically tense each muscle group for 5 seconds, then release for 30 seconds. Move up: calves, thighs, glutes, abdomen, chest, hands, arms, shoulders, neck, face. Focus on the contrast between tension and release.",
          why: "PMR forces your nervous system to practice the tension-release cycle, training it to recognize and let go of chronic holding patterns. Research shows it reduces cortisol, improves sleep, and lowers blood pressure. It's one of the oldest evidence-based anxiety interventions (Jacobson, 1930s).",
          bipolar: "Particularly helpful for the physical agitation of mixed episodes and the insomnia that precedes/accompanies both mania and depression. Can be done in bed before sleep." },

        { rank: "4", name: "Vigorous Exercise (20 min)", time: "20 min", evidence: "Very strong evidence", color: C.warm,
          how: "Any movement that elevates heart rate: brisk walking, jogging, cycling, swimming, dancing, jump rope. Aim for moderate-to-vigorous intensity for at least 20 minutes.",
          why: "Exercise stimulates the vagus nerve through hormonal responses, releases endorphins/serotonin/dopamine, and — per Cedars-Sinai research — endurance and interval training specifically improve vagal tone and parasympathetic control. There's even evidence exercise outperforms medication for depression and anxiety.",
          bipolar: "The challenge: motivation during depression, and safe channeling during mania. Even a 10-minute walk helps. Consistent exercise is a mood stabilizer. The key is regularity, not intensity." },

        { rank: "5", name: "Humming / Chanting / 'Om'", time: "3–5 min", evidence: "Moderate evidence", color: "#059669",
          how: "Hum a low, steady tone. Or chant 'Om' with a long, sustained vibration on the exhale. Or gargle water vigorously for 60 seconds. The vibration is what matters.",
          why: "Your vagus nerve passes directly through your vocal cords and throat muscles. Sustained vocalization creates vibrations that mechanically stimulate vagal fibers, signaling your brain to activate the parasympathetic response.",
          bipolar: "Low-barrier, can be done privately (shower, car). Humming while driving is particularly effective for commute anxiety. Gargling is recommended by some DBT therapists as a quick vagal stimulation." },

        { rank: "6", name: "5-4-3-2-1 Grounding", time: "3–5 min", evidence: "Moderate evidence", color: C.accent,
          how: "Name 5 things you can see. 4 things you can touch. 3 things you can hear. 2 things you can smell. 1 thing you can taste. Say each one out loud if possible.",
          why: "Redirects your brain from internal threat processing (amygdala) to external sensory processing (cortex). This interrupts the anxiety feedback loop and activates present-moment awareness. Used extensively in PTSD treatment and DBT.",
          bipolar: "Essential for dissociative episodes and the overwhelming sensory experience of mixed states. Takes no equipment. Teach it to support people too." },

        { rank: "7", name: "Gentle Yoga / Mindful Movement", time: "10–20 min", evidence: "Moderate evidence", color: "#2563eb",
          how: "Slow, flowing movements synchronized with breath. Forward folds and yin yoga poses are especially effective for vagal activation. Focus entirely on the sensation of movement and breath, not on achieving poses.",
          why: "Combines deep breathing, progressive muscle engagement/release, and mindfulness — all of which independently stimulate the vagus nerve. Research from Priory confirms mindful movement activates the body's calming mechanisms.",
          bipolar: "Beneficial in all mood states. During depression: the gentleness is more accessible than vigorous exercise. During hypomania: the slowness is a counterweight to the urge for speed." },

        { rank: "8", name: "Ear Massage", time: "2 min", evidence: "Emerging evidence", color: C.gold,
          how: "Gently massage the outer folds of your ears with thumb and index finger, paying special attention to the cymba concha (the hollow cup-shaped part of the upper ear). Apply gentle pressure and circular motions for 1–2 minutes.",
          why: "The ear contains a branch of the vagus nerve (auricular branch) specifically in the cymba concha. Gentle massage of this area triggers a calming parasympathetic response. This is the same principle behind clinical auricular vagus nerve stimulation devices.",
          bipolar: "Discreet enough to do in meetings, on the phone, or in public. Good for low-grade persistent anxiety that doesn't warrant a full intervention." },

        { rank: "9", name: "Cold Shower Finish", time: "30–90 sec", evidence: "Moderate evidence", color: C.teal,
          how: "At the end of your normal shower, switch to cold water for 30 seconds. Gradually increase to 60–90 seconds over time. Focus on breathing slowly through the shock.",
          why: "Whole-body cold exposure triggers a systemic vagal response, slowing heart rate and redirecting blood flow. Cleveland Clinic confirms cold water immersion helps reset the stress response. Regular practice improves vagal tone over time (long-term resilience building).",
          bipolar: "This is a daily resilience builder, not an acute intervention. Over 2–4 weeks of daily practice, research shows lasting improvements in vagal tone and anxiety baseline." },

        { rank: "10", name: "Laughter", time: "Variable", evidence: "Moderate evidence", color: C.warm,
          how: "Watch something genuinely funny. Aim for deep belly laughs, not just chuckles. Laughter yoga (forced laughter that becomes real) also works. Even smiling broadly for 60 seconds activates some of the same pathways.",
          why: "Belly laughter contracts the diaphragm rhythmically, mechanically stimulating the vagus nerve similarly to deep breathing. It also releases endorphins and reduces cortisol. The effect works even when the laughter starts forced.",
          bipolar: "Anhedonia (inability to feel pleasure) during depression makes this hard. During those times, mechanical approaches (breathing, cold, PMR) are more reliable. But when you CAN laugh, it's medicine." },
      ].map((ex, i) => (
        <Card key={i} hover style={{ marginBottom: 12, borderLeft: `3px solid ${ex.color}`, animation: `fadeUp 0.4s ease ${i * 0.04}s both` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontFamily: fonts.display, fontSize: 24, fontWeight: 800, color: ex.color, opacity: 0.4 }}>#{ex.rank}</span>
              <h4 style={{ fontFamily: fonts.display, fontSize: 17, fontWeight: 700, color: C.text, margin: 0 }}>{ex.name}</h4>
            </div>
            <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
              <Badge color={ex.color}>{ex.time}</Badge>
              <Badge color={C.textLight}>{ex.evidence}</Badge>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 12 }}>
            <div style={{ padding: "10px 12px", background: "#fafaf8", borderRadius: 8 }}>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: C.teal, marginBottom: 3, fontFamily: fonts.body }}>How To Do It</div>
              <p style={{ fontSize: 12.5, color: C.textMid, lineHeight: 1.55, margin: 0, fontFamily: fonts.body }}>{ex.how}</p>
            </div>
            <div style={{ padding: "10px 12px", background: "#fafaf8", borderRadius: 8 }}>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: C.blue, marginBottom: 3, fontFamily: fonts.body }}>Why It Works</div>
              <p style={{ fontSize: 12.5, color: C.textMid, lineHeight: 1.55, margin: 0, fontFamily: fonts.body }}>{ex.why}</p>
            </div>
          </div>
          <div style={{ marginTop: 8, padding: "8px 12px", background: `${C.accent}06`, borderRadius: 8 }}>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: C.accent, marginBottom: 2, fontFamily: fonts.body }}>Bipolar-Specific Note</div>
            <p style={{ fontSize: 12, color: C.textMid, lineHeight: 1.55, margin: 0, fontFamily: fonts.body }}>{ex.bipolar}</p>
          </div>
        </Card>
      ))}

      <Card style={{ background: "#f0f5f3", borderColor: "#d0ddd5", marginTop: 16 }}>
        <h4 style={{ fontSize: 15, fontWeight: 700, color: C.teal, margin: "0 0 8px", fontFamily: fonts.display }}>The 2-Minute Emergency Protocol</h4>
        <p style={{ fontSize: 13.5, color: C.textMid, lineHeight: 1.65, margin: "0 0 10px", fontFamily: fonts.body }}>When physical anxiety hits and you need to come down <em>now</em>, do these three things in sequence:</p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {[
            { n: "1", t: "Cold on face (30s)", d: "Ice pack or cold water splash" },
            { n: "2", t: "Extended exhale (60s)", d: "4-count in, 8-count out × 5" },
            { n: "3", t: "5-4-3-2-1 grounding (30s)", d: "Name what you sense around you" },
          ].map((s, i) => (
            <div key={i} style={{ flex: "1 1 160px", padding: "12px", background: C.card, borderRadius: 10, border: `1px solid ${C.border}`, textAlign: "center" }}>
              <div style={{ fontFamily: fonts.display, fontSize: 24, fontWeight: 800, color: C.teal }}>{s.n}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.text, fontFamily: fonts.body }}>{s.t}</div>
              <div style={{ fontSize: 11.5, color: C.textLight, fontFamily: fonts.body }}>{s.d}</div>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 11, color: C.textLight, marginTop: 10, fontFamily: fonts.body }}>Sources: Cleveland Clinic, Cedars-Sinai, Chateau Recovery, UVA Health, Charlie Health, Priory Group. Vagus nerve research: Feinstein Institute, Frontiers in Psychiatry, Int J Psychophysiology.</p>
      </Card>
    </Section>
  );
}

// ═══════════════════════════════════════════════════════════════
// SUBSTANCE USE PAGE
// ═══════════════════════════════════════════════════════════════
function SubstancePage() {
  return (
    <Section style={{ paddingTop: 40, paddingBottom: 60 }}>
      <Badge color={C.warm}>No Shame. Real Talk.</Badge>
      <h2 style={{ fontFamily: fonts.display, fontSize: 30, fontWeight: 700, color: C.text, margin: "12px 0 8px" }}>Substance Use & Bipolar Disorder</h2>
      <p style={{ fontSize: 15, color: C.textMid, margin: "0 0 10px", maxWidth: 640, lineHeight: 1.65, fontFamily: fonts.body }}>If you have bipolar disorder and you use substances, you are not weak, broken, or morally failing. You are part of the <strong>majority</strong>. Of all psychiatric diagnoses, bipolar disorder has the single highest rate of co-occurring substance use disorders. This is not a coincidence — it's neurobiology.</p>
      <p style={{ fontSize: 15, color: C.textMid, margin: "0 0 28px", maxWidth: 640, lineHeight: 1.65, fontFamily: fonts.body }}>Understanding why this happens — and why it makes everything worse even when it feels like it helps — is one of the most important things you can learn about your condition.</p>

      {/* The Numbers */}
      <h3 style={{ fontFamily: fonts.display, fontSize: 22, fontWeight: 700, color: C.text, margin: "0 0 14px" }}>The Numbers Are Staggering</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12, marginBottom: 28 }}>
        {[
          { num: "~60%", label: "of people with Bipolar I will have a substance use disorder in their lifetime", src: "ECA Study / NESARC" },
          { num: "42%", label: "alcohol use disorder prevalence among bipolar patients in clinical settings", src: "Meta-analysis, 151 studies" },
          { num: "20%", label: "problematic cannabis use among bipolar patients", src: "Clinical meta-analysis, 2016" },
          { num: "5×", label: "higher risk of illicit drug use disorder compared to the general population", src: "NESARC general population survey" },
          { num: "#1", label: "Bipolar disorder has the highest rate of comorbid SUD of ALL Axis I psychiatric diagnoses", src: "Regier et al., JAMA 1990" },
        ].map((s, i) => (
          <Card key={i} style={{ textAlign: "center", padding: "16px 14px", animation: `fadeUp 0.5s ease ${i * 0.06}s both` }}>
            <div style={{ fontFamily: fonts.display, fontSize: 26, fontWeight: 700, color: C.warm }}>{s.num}</div>
            <div style={{ fontSize: 12, color: C.textMid, lineHeight: 1.5, marginTop: 4, fontFamily: fonts.body }}>{s.label}</div>
            <div style={{ fontSize: 10, color: C.textLight, marginTop: 4, fontFamily: fonts.body }}>{s.src}</div>
          </Card>
        ))}
      </div>

      {/* Why it's normal */}
      <h3 style={{ fontFamily: fonts.display, fontSize: 22, fontWeight: 700, color: C.text, margin: "0 0 14px" }}>Why It's So Common (It's Not a Character Flaw)</h3>
      <Card style={{ marginBottom: 20, borderLeft: `3px solid ${C.warm}` }}>
        <p style={{ fontSize: 14, color: C.textMid, lineHeight: 1.65, margin: "0 0 14px", fontFamily: fonts.body }}>Research from Healey and colleagues found that people with bipolar disorder use substances for very specific, understandable reasons:</p>
        {[
          { reason: "To self-medicate", detail: "Alcohol to quiet racing thoughts during hypomania. Cannabis to sleep when sleep won't come. Stimulants to fight the crushing fatigue of depression. Opioids to numb the pain of a depressive episode that feels like it will never end. These aren't random choices — they're attempts to fix real neurobiological problems with the wrong tools." },
          { reason: "To feel normal", detail: "When your brain swings between extremes, substances can feel like the only thing that puts you in the middle. Alcohol during mania takes the edge off. Stimulants during depression create something that resembles functional energy. The tragedy is that this 'normal' is temporary and the rebound makes everything worse." },
          { reason: "To intensify the high", detail: "Mania feels good. Sometimes devastatingly, destructively good. Substances — especially stimulants, alcohol, and cannabis — can amplify that euphoria. The impulsivity of mania makes it nearly impossible to say no in the moment. This isn't weakness; it's a symptom of the illness driving the behavior." },
          { reason: "To cope with living with the disorder", detail: "The grief of diagnosis, the side effects of medication, the damage from past episodes, the fear of the next one, the loss of identity, the strain on relationships. Substances become a coping mechanism for the emotional weight of having a chronic, life-altering illness." },
          { reason: "To reject prescribed medication", detail: "Some people turn to substances partly because they've had bad experiences with psychiatric medication — side effects, emotional blunting, feeling like a different person. Substances feel like a choice; prescribed medication can feel like a sentence." },
          { reason: "Shared neurobiology", detail: "It's not just psychology. Research shows common neurobiological and genetic underpinnings between bipolar disorder and addiction. The same reward pathways, dopamine systems, and impulsivity circuits that are dysregulated in bipolar disorder also drive vulnerability to substance use. Your brain is literally wired for higher risk." },
        ].map((r, i) => (
          <div key={i} style={{ padding: "12px 0", borderBottom: i < 5 ? `1px solid ${C.border}` : "none" }}>
            <h4 style={{ fontSize: 14, fontWeight: 700, color: C.warm, margin: "0 0 4px", fontFamily: fonts.body }}>{r.reason}</h4>
            <p style={{ fontSize: 13, color: C.textMid, lineHeight: 1.6, margin: 0, fontFamily: fonts.body }}>{r.detail}</p>
          </div>
        ))}
      </Card>

      {/* Why it's harmful */}
      <h3 style={{ fontFamily: fonts.display, fontSize: 22, fontWeight: 700, color: C.text, margin: "0 0 14px" }}>Why It Makes Everything Worse (Even When It Feels Like It Helps)</h3>
      <Card style={{ marginBottom: 20, borderLeft: `3px solid ${C.red}` }}>
        <p style={{ fontSize: 14, color: C.textMid, lineHeight: 1.65, margin: "0 0 14px", fontFamily: fonts.body }}>Every major study on bipolar disorder and substance use finds the same thing: the short-term relief creates long-term devastation. Here's what the research actually shows:</p>
        {[
          { harm: "More frequent and severe episodes", detail: "Substance use destabilizes the course of bipolar illness, increasing the frequency of mood episodes and the number of hospitalizations. Cocaine, in particular, has been shown to worsen bipolar symptoms and contribute to disease progression. Cannabis increases mania, episode length, and suicide risk.", src: "NIDA Research Report; ScienceDirect meta-analysis" },
          { harm: "Earlier onset of illness", detail: "People with both bipolar disorder and SUD experience earlier onset of mood symptoms than those with bipolar alone. Adolescent-onset bipolar disorder confers an even greater risk of subsequent substance use disorder. The younger the onset, the more severe the long-term course.", src: "NESARC; PMC systematic review" },
          { harm: "Higher suicide risk", detail: "Comorbid substance use significantly increases suicide attempts and completions in bipolar disorder — a condition that already carries one of the highest suicide rates in psychiatry (25-50% attempt rate). Alcohol is particularly dangerous because it removes inhibitions while deepening depressive cognition.", src: "Dalton et al.; STEP-BD data" },
          { harm: "Treatment resistance", detail: "Substances interfere with mood-stabilizing medication by reducing efficacy or requiring higher doses. They also reduce treatment compliance — people using substances are significantly less likely to take prescribed medication consistently. This creates a vicious cycle: substance use worsens symptoms, worsened symptoms drive more substance use.", src: "Levin & Hennessy; Salloum & Thase" },
          { harm: "More rapid cycling", detail: "Substance use is associated with increased rates of rapid cycling (4+ mood episodes per year), which is one of the most difficult-to-treat presentations of bipolar disorder.", src: "MDedge Psychiatry review" },
          { harm: "Worse depressive episodes", detail: "While substances may temporarily numb depression, the rebound consistently worsens depressive features. Alcohol is a central nervous system depressant. Cannabis impairs motivation and cognitive function. The hangover/withdrawal from any substance looks and feels like depression — compounding the real thing.", src: "Baldassano; Ostacher et al., STEP-BD" },
          { harm: "Delayed and incorrect diagnosis", detail: "Substance use masks and mimics bipolar symptoms, making accurate diagnosis harder. Stimulant-induced euphoria looks like mania. Alcohol withdrawal looks like depression. Many people spend years being treated for addiction without anyone recognizing the underlying bipolar disorder.", src: "SAMHSA clinical guidelines" },
        ].map((h, i) => (
          <div key={i} style={{ padding: "12px 0", borderBottom: i < 6 ? `1px solid ${C.border}` : "none" }}>
            <h4 style={{ fontSize: 14, fontWeight: 700, color: C.red, margin: "0 0 4px", fontFamily: fonts.body }}>{h.harm}</h4>
            <p style={{ fontSize: 13, color: C.textMid, lineHeight: 1.6, margin: "0 0 3px", fontFamily: fonts.body }}>{h.detail}</p>
            <p style={{ fontSize: 10.5, color: C.textLight, margin: 0, fontFamily: fonts.body }}>{h.src}</p>
          </div>
        ))}
      </Card>

      {/* Substance-by-substance */}
      <h3 style={{ fontFamily: fonts.display, fontSize: 22, fontWeight: 700, color: C.text, margin: "0 0 14px" }}>Substance by Substance: What the Research Shows</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 14, marginBottom: 24 }}>
        {[
          { name: "Alcohol", prevalence: "40-70% comorbidity", color: C.warm, why: "Quiets racing thoughts, reduces social anxiety, numbs depressive pain. Feels like an off-switch for an overactive brain.", harm: "CNS depressant that worsens depression on rebound. Disrupts sleep architecture (critical for bipolar stability). Impairs judgment during hypomania. Interacts dangerously with lithium, valproate, and benzodiazepines. Dehydration affects lithium blood levels.", note: "Multiple patients in the research PDF reported losing interest in alcohol after starting lithium — suggesting the craving was partly driven by the untreated bipolar itself." },
          { name: "Cannabis", prevalence: "~20-25% problematic use", color: "#059669", why: "Sleep aid, anxiety relief, mood stabilization attempts. Increasingly normalized culturally, making it feel 'safe.'", harm: "Increases mania risk and episode duration. Impairs cognition and executive function. Contributes to treatment resistance. Can trigger psychotic symptoms in vulnerable individuals. Associated with increased suicide risk in bipolar populations.", note: "Some research shows limited benefit in specific contexts, but the overall evidence for bipolar is negative. The 'it helps me relax' feeling masks real neurological harm." },
          { name: "Stimulants (Cocaine, Amphetamines)", prevalence: "~17% illicit drug use", color: C.red, why: "Fights depressive fatigue and anhedonia. Amplifies manic euphoria. Creates temporary sense of energy and capability.", harm: "Directly triggers and worsens manic episodes. Evidence shows cocaine contributes to bipolar disease progression. Crashes mimic and worsen depression. Cardiovascular risk compounded by lithium and antipsychotics. Extremely high addiction potential in bipolar brains due to shared dopamine dysregulation.", note: "Stimulant use in bipolar is one of the most dangerous combinations. Even prescribed stimulants (for comorbid ADHD) require extremely careful monitoring." },
          { name: "Opioids", prevalence: "Growing concern", color: "#7c3aed", why: "Numbs emotional pain of depression. Creates artificial sense of well-being. Can feel like the only thing that makes the pain stop.", harm: "High addiction potential. Respiratory depression risk with benzodiazepines (Ativan). Withdrawal mimics and triggers depressive episodes. Overdose risk increases with impulsivity during mood episodes.", note: "If you're using opioids to manage emotional pain, this is one of the most critical things to tell your psychiatrist. There are safer alternatives." },
          { name: "Psychedelics (LSD, Psilocybin, Ketamine)", prevalence: "Emerging research area", color: C.blue, why: "Interest driven by psychedelic therapy research. Some seek spiritual or therapeutic experiences. Ketamine has clinical antidepressant evidence.", harm: "Can provoke psychotic symptoms in people with bipolar disorder. Risk of triggering manic episodes. Current evidence suggests more harm than good without medical supervision. Ketamine therapy is only appropriate under strict clinical protocols.", note: "Despite media hype about psychedelic therapy, bipolar disorder is generally a CONTRAINDICATION for unsupervised psychedelic use. Clinical ketamine for depression is a different context entirely." },
          { name: "Nicotine / Tobacco", prevalence: "Very high (often overlooked)", color: C.textMid, why: "Temporary cognitive boost, anxiety relief, social habit, stimulant effect during depression.", harm: "While less immediately destabilizing than other substances, nicotine addiction complicates overall health management, interacts with some psychiatric medications, and the health consequences compound the medical burden of long-term bipolar treatment.", note: "Often the last substance addressed in treatment. Harm reduction approaches are generally more realistic than cold-turkey cessation during active bipolar management." },
        ].map((s, i) => (
          <Card key={i} hover style={{ borderTop: `3px solid ${s.color}`, animation: `fadeUp 0.5s ease ${i * 0.06}s both` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
              <h4 style={{ fontFamily: fonts.display, fontSize: 17, fontWeight: 700, color: s.color, margin: 0 }}>{s.name}</h4>
              <Badge color={s.color}>{s.prevalence}</Badge>
            </div>
            <div style={{ padding: "8px 10px", background: `${s.color}06`, borderRadius: 8, marginBottom: 8 }}>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: s.color, marginBottom: 2, fontFamily: fonts.body }}>Why people with bipolar use it</div>
              <p style={{ fontSize: 12.5, color: C.textMid, lineHeight: 1.55, margin: 0, fontFamily: fonts.body }}>{s.why}</p>
            </div>
            <div style={{ padding: "8px 10px", background: `${C.red}06`, borderRadius: 8, marginBottom: 8 }}>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: C.red, marginBottom: 2, fontFamily: fonts.body }}>What the research shows</div>
              <p style={{ fontSize: 12.5, color: C.textMid, lineHeight: 1.55, margin: 0, fontFamily: fonts.body }}>{s.harm}</p>
            </div>
            <p style={{ fontSize: 12, color: C.textLight, lineHeight: 1.5, margin: 0, fontStyle: "italic", fontFamily: fonts.body }}>{s.note}</p>
          </Card>
        ))}
      </div>

      {/* What actually helps */}
      <h3 style={{ fontFamily: fonts.display, fontSize: 22, fontWeight: 700, color: C.teal, margin: "0 0 14px" }}>What Actually Helps</h3>
      <Card style={{ marginBottom: 20, borderLeft: `3px solid ${C.teal}` }}>
        {[
          { title: "Integrated treatment — not 'fix one, then the other'", desc: "The old approach was: get sober first, then treat bipolar. Research now shows this is wrong. Integrated therapies that address both disorders simultaneously are significantly more effective than treating either alone. Your psychiatrist and any addiction support should be communicating." },
          { title: "Honest disclosure to your treatment team", desc: "Your psychiatrist cannot help you if they don't know what you're using. Substance use changes which medications work, which are dangerous, and what your blood levels mean. This is medical information, not a confession. Many patients report that lithium itself reduced their alcohol cravings — suggesting the substance use was partially a symptom of the untreated bipolar." },
          { title: "Mood stabilization as the foundation", desc: "Limited evidence suggests lithium and valproate may be effective for mood symptoms in cannabis users and may also reduce substance use. Stabilizing the underlying bipolar disorder often reduces the drive to self-medicate. When your mood is managed, the pull toward substances weakens." },
          { title: "Integrated Group Therapy (IGT)", desc: "A CBT-based therapy designed specifically for people with both bipolar and substance use disorders. It addresses both problems simultaneously and has been tested in randomized trials. Ask your provider about it." },
          { title: "Harm reduction over perfectionism", desc: "Complete abstinence may be the ideal, but it's not always realistic — especially during active mood episodes. Harm reduction approaches (reducing use, avoiding the most dangerous substances, never mixing with medication) can save lives while you work toward stability. Progress is not all-or-nothing." },
          { title: "Peer support from people who get it", desc: "DBSA groups, NAMI groups, and Dual Recovery Anonymous (DRA) are specifically designed for people with co-occurring mental illness and substance use. Hearing from people who've been where you are is different from hearing from people who haven't." },
        ].map((h, i) => (
          <div key={i} style={{ padding: "12px 0", borderBottom: i < 5 ? `1px solid ${C.border}` : "none" }}>
            <h4 style={{ fontSize: 14, fontWeight: 700, color: C.teal, margin: "0 0 4px", fontFamily: fonts.body }}>{h.title}</h4>
            <p style={{ fontSize: 13, color: C.textMid, lineHeight: 1.6, margin: 0, fontFamily: fonts.body }}>{h.desc}</p>
          </div>
        ))}
      </Card>

      {/* The real message */}
      <Card style={{ background: "#faf5f0", borderColor: "#e8ddd2", marginBottom: 20 }}>
        <h3 style={{ fontFamily: fonts.display, fontSize: 18, fontWeight: 700, color: C.text, margin: "0 0 10px" }}>The Part Nobody Says Out Loud</h3>
        <p style={{ fontSize: 14.5, color: C.textMid, lineHeight: 1.7, margin: "0 0 12px", fontFamily: fonts.body }}>If you have bipolar disorder and you've used substances to cope, you were doing the best you could with what you had. The self-medication hypothesis isn't an excuse — it's an explanation. Your brain was trying to solve a real problem with the tools available to it.</p>
        <p style={{ fontSize: 14.5, color: C.textMid, lineHeight: 1.7, margin: "0 0 12px", fontFamily: fonts.body }}>But here's the hard truth: substances borrow from your future self. Every drink that quiets tonight's racing thoughts makes tomorrow's mood less stable. Every joint that helps you sleep tonight makes next week's mania more likely. Every line that lifts you out of depression today deepens the crash that follows.</p>
        <p style={{ fontSize: 14.5, color: C.text, lineHeight: 1.7, margin: 0, fontFamily: fonts.body, fontWeight: 600 }}>You deserve actual tools that work — medication that's properly dosed, therapy that teaches real skills, and a treatment team that knows the whole picture. Not because you're broken, but because your brain deserves better than a temporary fix that steals from tomorrow.</p>
      </Card>

      <Card style={{ background: "#fef9f0", borderColor: "#f0d8a8" }}>
        <p style={{ fontSize: 12.5, color: "#92400e", lineHeight: 1.6, margin: 0, fontFamily: fonts.body }}><strong>Sources:</strong> NESARC I-III (National Epidemiologic Survey on Alcohol and Related Conditions); Regier et al., JAMA 1990 (ECA Study); PMC meta-analysis of 151 studies (2016); Healey et al. (patient perspectives on BD-SUD); NIDA Common Comorbidities Research Report; SAMHSA clinical guidelines; MDedge Psychiatry evidence review; Ostacher et al., STEP-BD data; Cura Behavioral Health review (2025).</p>
      </Card>
    </Section>
  );
}

// ═══════════════════════════════════════════════════════════════
// ABOUT PAGE
// ═══════════════════════════════════════════════════════════════
function AboutPage() {
  return (
    <Section style={{ paddingTop: 60, paddingBottom: 60 }}>
      <div style={{ maxWidth: 600, margin: "0 auto" }}>

        {/* Under Construction Banner */}
        <div style={{ padding: "14px 20px", background: "#fef3c7", border: "1.5px solid #f59e0b40", borderRadius: 12, marginBottom: 28, display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 20 }}>🔨</span>
          <p style={{ fontSize: 13.5, color: "#92400e", lineHeight: 1.55, margin: 0, fontFamily: fonts.body }}>
            <strong>This site is under active development.</strong> New content, features, and improvements are being added regularly. If you notice anything that needs correcting, please reach out.
          </p>
        </div>

        <Badge color={C.accent}>Why This Exists</Badge>
        <h2 style={{ fontFamily: fonts.display, fontSize: 32, fontWeight: 700, color: C.text, margin: "14px 0 24px", lineHeight: 1.2 }}>About Two Weathers</h2>

        <div style={{ fontSize: 15.5, color: C.textMid, lineHeight: 1.75, fontFamily: fonts.body }}>
          <p style={{ marginBottom: 18 }}>
            Two Weathers was developed in collaboration with Maxine, a licensed therapist, over several years of research and conversation about what people affected by bipolar disorder actually need — and what most available resources fail to provide.
          </p>
          <p style={{ marginBottom: 18 }}>
            As someone with a family history of bipolar disorder, I have seen firsthand how a delayed or missed diagnosis changes the trajectory of a person's life. The earlier someone understands what they are experiencing, the better the outcomes. The research is clear on this. The problem is that the research is not accessible to the people who need it most.
          </p>
          <p style={{ marginBottom: 18 }}>
            This site brings together validated screening tools, peer-reviewed medication data, evidence-based therapy education, and practical resources for finding professional help — written in plain language for real people navigating a complex diagnosis.
          </p>
          <p style={{ marginBottom: 0, color: C.text, fontWeight: 500 }}>
            None of this replaces professional evaluation or treatment. But it can be the bridge that helps someone get there.
          </p>
        </div>

        <div style={{ marginTop: 32, padding: "24px", background: "#faf5f0", borderRadius: 14, border: "1px solid #e8ddd2" }}>
          <h3 style={{ fontFamily: fonts.display, fontSize: 18, fontWeight: 700, color: C.text, margin: "0 0 10px" }}>About the Name</h3>
          <p style={{ fontSize: 14, color: C.textMid, lineHeight: 1.7, margin: 0, fontFamily: fonts.body }}>
            The name refers to the experience of carrying two climates inside you — the shifts between states that define bipolar disorder. It also reflects the two perspectives this project aims to serve: the person living with the condition, and the person standing beside them.
          </p>
        </div>

        <div style={{ marginTop: 20, padding: "20px 24px", background: C.card, borderRadius: 14, border: `1px solid ${C.border}` }}>
          <h3 style={{ fontFamily: fonts.display, fontSize: 18, fontWeight: 700, color: C.text, margin: "0 0 10px" }}>Sources & Methodology</h3>
          <p style={{ fontSize: 13, color: C.textMid, lineHeight: 1.6, margin: "0 0 10px", fontFamily: fonts.body }}>
            All content is sourced from peer-reviewed research, clinical guidelines, and validated assessment tools:
          </p>
          {[
            "Mood Disorder Questionnaire (MDQ) — Hirschfeld et al., American Journal of Psychiatry, 2000",
            "CANMAT/ISBD 2018 and VA/DoD 2023 Bipolar Treatment Guidelines",
            "JAMA Psychiatry, PLOS One, Frontiers in Psychiatry, BMC Medicine",
            "FDA prescribing information for all medications referenced",
            "NIMH, NAMI, WHO, and SAMHSA clinical resources",
            "Patient experience databases (Drugs.com, WebMD — over 1,000 accounts reviewed)",
            "Cleveland Clinic, Cedars-Sinai, and Feinstein Institute (vagus nerve research)",
          ].map((s, i) => (
            <div key={i} style={{ display: "flex", gap: 8, marginBottom: 5, fontSize: 12.5, fontFamily: fonts.body }}>
              <span style={{ color: C.teal, fontWeight: 700, flexShrink: 0 }}>◈</span>
              <span style={{ color: C.textMid, lineHeight: 1.5 }}>{s}</span>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div style={{ marginTop: 20, padding: "20px 24px", background: "#fdf2f2", borderRadius: 14, border: "1.5px solid #e8c4c4" }}>
          <h3 style={{ fontFamily: fonts.display, fontSize: 16, fontWeight: 700, color: C.red, margin: "0 0 8px" }}>Medical Disclaimer</h3>
          <p style={{ fontSize: 12.5, color: "#7a3030", lineHeight: 1.65, margin: "0 0 8px", fontFamily: fonts.body }}>
            The information provided on this website is for educational and informational purposes only. It is not intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of a qualified healthcare provider with any questions you may have regarding a medical condition.
          </p>
          <p style={{ fontSize: 12.5, color: "#7a3030", lineHeight: 1.65, margin: "0 0 8px", fontFamily: fonts.body }}>
            The bipolar disorder screening tool on this site is based on the validated Mood Disorder Questionnaire (MDQ) and is intended for educational self-assessment only. A positive or negative screening result does not constitute a diagnosis. Only a licensed psychiatrist or psychologist can diagnose bipolar disorder through comprehensive clinical evaluation.
          </p>
          <p style={{ fontSize: 12.5, color: "#7a3030", lineHeight: 1.65, margin: "0 0 8px", fontFamily: fonts.body }}>
            Medication information is provided as a general reference and should not be used to make treatment decisions without consulting your prescribing physician. Individual responses to medication vary significantly.
          </p>
          <p style={{ fontSize: 12.5, color: "#7a3030", lineHeight: 1.65, margin: 0, fontFamily: fonts.body }}>
            If you are experiencing a mental health crisis, contact the <strong>988 Suicide & Crisis Lifeline</strong> by calling or texting <strong>988</strong>, or go to your nearest emergency room.
          </p>
        </div>

        <div style={{ marginTop: 24, textAlign: "center" }}>
          <p style={{ fontSize: 13, color: C.textLight, fontFamily: fonts.body }}>
            If this site helped you, share it with someone who might need it.
          </p>
          <p style={{ fontSize: 15, color: C.accent, fontWeight: 600, fontFamily: fonts.body, marginTop: 4 }}>
            twoweathers.com
          </p>
        </div>
      </div>
    </Section>
  );
}

// ═══════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════
export default function App() {
  const [active, setActive] = useState("home");
  const topRef = useRef(null);

  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [active]);

  return (
    <div ref={topRef} style={{ minHeight: "100vh", background: C.bg, fontFamily: fonts.body }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;0,800;1,400&family=Source+Sans+3:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap');
        @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        * { box-sizing: border-box; margin: 0; }
        a { color: ${C.accent}; }
        ::selection { background: ${C.accent}30; }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
        @media (min-width: 769px) {
          .mobile-menu-btn { display: none !important; }
          .mobile-dropdown { display: none !important; }
        }
      `}</style>
      <Nav active={active} setActive={setActive} />
      {active === "home" && <HomePage setActive={setActive} />}
      {active === "screening" && <ScreeningPage />}
      {active === "medications" && <MedicationsPage />}
      {active === "cbt" && <CBTPage />}
      {active === "dbt" && <DBTPage />}
      {active === "body" && <BodyPage />}
      {active === "substance" && <SubstancePage />}
      {active === "find-help" && <FindHelpPage />}
      {active === "about" && <AboutPage />}

      {/* Footer */}
      <footer style={{ borderTop: `1px solid ${C.border}`, padding: "24px 20px", textAlign: "center", marginTop: 40 }}>
        <p style={{ fontSize: 12, color: C.textLight, lineHeight: 1.6, maxWidth: 600, margin: "0 auto", fontFamily: fonts.body }}>
          This site is for educational and informational purposes only and does not provide medical advice, diagnosis, or treatment. Always seek the advice of a qualified healthcare provider. The screening tool incorporates the validated MDQ (Hirschfeld et al., Am J Psychiatry, 2000); type-differentiation scoring is educational, not independently validated. Medication information is sourced from FDA labels and peer-reviewed literature and should not be used to make treatment decisions without consulting your physician. This site is under active development.
        </p>
        <p style={{ fontSize: 11, color: C.textLight, marginTop: 8, fontFamily: fonts.body }}>© {new Date().getFullYear()} Two Weathers · twoweathers.com</p>
      </footer>
    </div>
  );
}
