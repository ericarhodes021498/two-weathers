import { useState, useEffect, useRef } from "react";

const C = {
  bg: "#fafaf8", card: "#ffffff", border: "#e8e5df",
  text: "#2a2520", textMid: "#5c564e", textLight: "#8a847a",
  accent: "#c25e30", accentLight: "#c25e3018",
  teal: "#2d6a4f", tealLight: "#2d6a4f12",
  blue: "#3563b0", blueLight: "#3563b010",
  warm: "#b8510d", warmLight: "#b8510d0e",
  red: "#c23030", redLight: "#c2303010",
  gold: "#a08030",
  shadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.03)",
  shadowHover: "0 2px 8px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.05)",
};
const fonts = { display: "'Playfair Display', Georgia, serif", body: "'Source Sans 3', 'Segoe UI', sans-serif" };

// ═══════════════════════════════════════════════════════════════
// SHARED
// ═══════════════════════════════════════════════════════════════
function Nav({ active, setActive }) {
  const [open, setOpen] = useState(false);
  const tabs = [
    { id: "home", label: "Home" }, { id: "depression", label: "Depression" },
    { id: "anxiety", label: "Anxiety" }, { id: "bipolar", label: "Bipolar" },
    { id: "meds", label: "Meds" }, { id: "cbt", label: "CBT" },
    { id: "dbt", label: "DBT" }, { id: "body", label: "Body" },
    { id: "substance", label: "Substance Use" }, { id: "find-help", label: "Find Help" },
    { id: "about", label: "About" },
  ];
  const pick = (id) => { setActive(id); setOpen(false); };
  return (
    <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(250,250,248,0.95)", backdropFilter: "blur(12px)", borderBottom: `1px solid ${C.border}` }}>
      <div style={{ maxWidth: 960, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 56, padding: "0 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }} onClick={() => pick("home")}>
          <span style={{ fontSize: 20 }}>⛅</span>
          <span style={{ fontFamily: fonts.display, fontSize: 17, fontWeight: 700, color: C.text }}>Brain Weather</span>
        </div>
        <div className="desktop-nav" style={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => pick(t.id)} style={{
              padding: "7px 9px", borderRadius: 8, border: "none", cursor: "pointer",
              background: active === t.id ? C.accentLight : "transparent",
              color: active === t.id ? C.accent : C.textMid,
              fontSize: 12, fontWeight: active === t.id ? 700 : 500,
              fontFamily: fonts.body, transition: "all 0.2s", whiteSpace: "nowrap",
            }}>{t.label}</button>
          ))}
        </div>
        <button className="mobile-menu-btn" onClick={() => setOpen(!open)} style={{ display: "none", background: "none", border: "none", cursor: "pointer", fontSize: 24, color: C.text }}>{open ? "✕" : "☰"}</button>
      </div>
      {open && <div className="mobile-dropdown" style={{ position: "absolute", top: 56, left: 0, right: 0, background: "rgba(250,250,248,0.98)", borderBottom: `1px solid ${C.border}`, padding: "8px 20px 16px", boxShadow: C.shadow }}>
        {tabs.map(t => <button key={t.id} onClick={() => pick(t.id)} style={{ display: "block", width: "100%", textAlign: "left", padding: "12px 14px", borderRadius: 8, border: "none", cursor: "pointer", background: active === t.id ? C.accentLight : "transparent", color: active === t.id ? C.accent : C.text, fontSize: 15, fontWeight: active === t.id ? 700 : 500, fontFamily: fonts.body, marginBottom: 2 }}>{t.label}</button>)}
      </div>}
    </nav>
  );
}
function Sec({ children, style }) { return <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 20px", ...style }}>{children}</div>; }
function Card({ children, style, hover }) {
  const [h, setH] = useState(false);
  return <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "24px", boxShadow: h && hover ? C.shadowHover : C.shadow, transition: "all 0.3s ease", ...style }}>{children}</div>;
}
function Badge({ children, color = C.accent }) { return <span style={{ display: "inline-block", padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color, background: `${color}14`, fontFamily: fonts.body }}>{children}</span>; }

// ═══════════════════════════════════════════════════════════════
// HOME
// ═══════════════════════════════════════════════════════════════
function HomePage({ setActive }) {
  return (<div>
    <div style={{ padding: "80px 20px 60px", textAlign: "center", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: -80, left: "50%", transform: "translateX(-50%)", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, #c25e3008 0%, transparent 70%)", pointerEvents: "none" }} />
      <Sec>
        <div style={{ animation: "fadeUp 0.8s ease both" }}>
          <Badge>Mental Health, Simplified</Badge>
          <h1 style={{ fontFamily: fonts.display, fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 700, color: C.text, margin: "20px 0 16px", lineHeight: 1.15, letterSpacing: "-0.025em" }}>
            Check your forecast.<br /><span style={{ color: C.accent }}>Understand your brain weather.</span>
          </h1>
          <p style={{ fontFamily: fonts.body, fontSize: 17, color: C.textMid, maxWidth: 580, margin: "0 auto 32px", lineHeight: 1.7 }}>
            Depression, anxiety, and bipolar disorder affect over <strong>1 billion people worldwide</strong>. Most wait years for the right diagnosis. This site brings together validated screening tools, medication guides, therapy education, and real resources — written in plain language, sourced from real research.
          </p>
          <p style={{ fontFamily: fonts.body, fontSize: 14, color: C.textLight, maxWidth: 480, margin: "0 auto 32px", lineHeight: 1.6 }}>
            Screening tools coming soon. Start by learning about the three most common conditions below.
          </p>
        </div>
      </Sec>
    </div>

    <Sec style={{ paddingBottom: 48 }}>
      <h2 style={{ fontFamily: fonts.display, fontSize: 28, fontWeight: 700, color: C.text, marginBottom: 8 }}>The Big Three</h2>
      <p style={{ fontFamily: fonts.body, fontSize: 15, color: C.textMid, marginBottom: 24, maxWidth: 600 }}>These three conditions account for the majority of mental health diagnoses worldwide. They frequently overlap, they're commonly misdiagnosed as each other, and understanding the differences changes everything about treatment.</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
        {[
          { title: "Depression", color: C.blue, id: "depression", stats: "280M+ affected globally", desc: "More than sadness. A neurobiological condition that affects how you think, feel, sleep, eat, and function. Highly treatable — but 60% of people never get treatment.", cta: "Learn More" },
          { title: "Anxiety", color: C.teal, id: "anxiety", stats: "301M+ affected globally", desc: "The most common mental health condition on earth. When your brain's threat detection system won't turn off. Ranges from generalized worry to full panic attacks.", cta: "Learn More" },
          { title: "Bipolar Disorder", color: C.accent, id: "bipolar", stats: "46M+ affected globally", desc: "Not just mood swings. A spectrum of conditions involving episodes of mania/hypomania and depression. Takes an average of 7-10 years to diagnose correctly. 69% are initially misdiagnosed.", cta: "Learn More" },
        ].map((c, i) => (
          <Card key={i} hover style={{ borderTop: `3px solid ${c.color}`, cursor: "pointer", animation: `fadeUp 0.6s ease ${0.1 + i * 0.1}s both` }} onClick={() => setActive(c.id)}>
            <Badge color={c.color}>{c.stats}</Badge>
            <h3 style={{ fontFamily: fonts.display, fontSize: 22, fontWeight: 700, color: c.color, margin: "10px 0 8px" }}>{c.title}</h3>
            <p style={{ fontSize: 14, color: C.textMid, lineHeight: 1.6, margin: "0 0 14px", fontFamily: fonts.body }}>{c.desc}</p>
            <span style={{ fontSize: 13, color: c.color, fontWeight: 600, fontFamily: fonts.body }}>{c.cta} →</span>
          </Card>
        ))}
      </div>
    </Sec>

    <Sec style={{ paddingBottom: 48 }}>
      <Card style={{ background: "#faf5f0", borderColor: "#e8ddd2" }}>
        <h2 style={{ fontFamily: fonts.display, fontSize: 22, fontWeight: 700, color: C.text, margin: "0 0 12px" }}>Also on This Site</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20 }}>
          {[
            { title: "Medication Guide", desc: "What each medication does, how long it takes to work, side effects, and what real patients say.", page: "meds" },
            { title: "CBT & DBT", desc: "The two most evidence-based therapies for mood disorders, explained in plain language with real research.", page: "cbt" },
            { title: "Physical Anxiety", desc: "10 vagus nerve exercises ranked by evidence for when anxiety lives in your body, not your head.", page: "body" },
            { title: "Substance Use", desc: "Why self-medication is so common with mental illness, and why it makes everything worse.", page: "substance" },
            { title: "Find Help", desc: "Provider directories, what to look for, what to say at your first appointment, and uninsured resources.", page: "find-help" },
          ].map((s, i) => (
            <div key={i} style={{ cursor: "pointer" }} onClick={() => setActive(s.page)}>
              <h3 style={{ fontFamily: fonts.display, fontSize: 15, fontWeight: 700, color: C.text, margin: "0 0 4px" }}>{s.title}</h3>
              <p style={{ fontSize: 13, color: C.textMid, lineHeight: 1.55, margin: "0 0 6px", fontFamily: fonts.body }}>{s.desc}</p>
              <span style={{ fontSize: 12, color: C.accent, fontWeight: 600, fontFamily: fonts.body }}>View →</span>
            </div>
          ))}
        </div>
      </Card>
    </Sec>

    <Sec style={{ paddingBottom: 60 }}>
      <Card style={{ background: "#fef9f0", borderColor: "#f0d8a8", textAlign: "center", padding: "28px" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: C.warm, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6, fontFamily: fonts.body }}>If you're in crisis right now</div>
        <div style={{ fontFamily: fonts.display, fontSize: 28, fontWeight: 700, color: C.text }}>988 Suicide & Crisis Lifeline</div>
        <p style={{ fontFamily: fonts.body, fontSize: 15, color: C.textMid, margin: "8px 0 0" }}>Call or text <strong>988</strong> — free, confidential, 24/7</p>
      </Card>
    </Sec>
  </div>);
}

// ═══════════════════════════════════════════════════════════════
// DEPRESSION PAGE
// ═══════════════════════════════════════════════════════════════
function DepressionPage() {
  return (<Sec style={{ paddingTop: 40, paddingBottom: 60 }}>
    <Badge color={C.blue}>Understanding Depression</Badge>
    <h2 style={{ fontFamily: fonts.display, fontSize: 30, fontWeight: 700, color: C.text, margin: "12px 0 8px" }}>Depression (Major Depressive Disorder)</h2>
    <p style={{ fontSize: 15, color: C.textMid, margin: "0 0 24px", maxWidth: 640, lineHeight: 1.65, fontFamily: fonts.body }}>Depression is not sadness. Sadness is a normal human emotion with a cause. Depression is a neurobiological condition that hijacks your brain's ability to feel pleasure, find motivation, think clearly, or imagine a future. It is the leading cause of disability worldwide.</p>

    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12, marginBottom: 28 }}>
      {[
        { num: "280M+", label: "People affected globally", src: "WHO, 2023" },
        { num: "~60%", label: "Never receive treatment", src: "NIMH" },
        { num: "2×", label: "More common in women than men", src: "Epidemiological data" },
        { num: "88%", label: "PHQ-9 sensitivity for major depression at score ≥10", src: "Kroenke et al., 2001" },
      ].map((s, i) => (
        <Card key={i} style={{ textAlign: "center", padding: "16px 14px", animation: `fadeUp 0.5s ease ${i * 0.06}s both` }}>
          <div style={{ fontFamily: fonts.display, fontSize: 24, fontWeight: 700, color: C.blue }}>{s.num}</div>
          <div style={{ fontSize: 12, color: C.textMid, lineHeight: 1.5, marginTop: 4, fontFamily: fonts.body }}>{s.label}</div>
          <div style={{ fontSize: 10, color: C.textLight, marginTop: 3, fontFamily: fonts.body }}>{s.src}</div>
        </Card>
      ))}
    </div>

    <h3 style={{ fontFamily: fonts.display, fontSize: 20, fontWeight: 700, color: C.text, margin: "0 0 14px" }}>The Nine Symptoms (DSM-5 Criteria)</h3>
    <Card style={{ marginBottom: 20 }}>
      <p style={{ fontSize: 13, color: C.textMid, lineHeight: 1.6, margin: "0 0 12px", fontFamily: fonts.body }}>Major depression is diagnosed when five or more of these symptoms are present for at least two weeks, with at least one being depressed mood or loss of interest:</p>
      {["Depressed mood most of the day, nearly every day", "Markedly diminished interest or pleasure in all or almost all activities", "Significant weight loss or gain, or decrease or increase in appetite", "Insomnia or hypersomnia nearly every day", "Psychomotor agitation or retardation observable by others", "Fatigue or loss of energy nearly every day", "Feelings of worthlessness or excessive guilt", "Diminished ability to think, concentrate, or make decisions", "Recurrent thoughts of death or suicidal ideation"].map((s, i) => (
        <div key={i} style={{ display: "flex", gap: 10, marginBottom: 6, fontSize: 13.5, fontFamily: fonts.body }}>
          <span style={{ color: C.blue, fontWeight: 700, flexShrink: 0 }}>{i + 1}.</span>
          <span style={{ color: C.textMid, lineHeight: 1.55 }}>{s}</span>
        </div>
      ))}
    </Card>

    <h3 style={{ fontFamily: fonts.display, fontSize: 20, fontWeight: 700, color: C.text, margin: "0 0 14px" }}>What Most People Get Wrong</h3>
    <Card style={{ marginBottom: 20 }}>
      {[
        { myth: "\"Everyone gets sad sometimes.\"", reality: "Depression is not proportional sadness. It can occur without any identifiable cause. The hallmark is anhedonia — the inability to feel pleasure — which is fundamentally different from sadness." },
        { myth: "\"You just need to exercise / think positive / try harder.\"", reality: "Depression involves measurable changes in brain chemistry, neural connectivity, and inflammatory markers. Telling someone to think their way out of it is like telling someone with a broken leg to walk it off." },
        { myth: "\"Antidepressants change who you are.\"", reality: "When properly prescribed, antidepressants restore baseline function. Many patients describe it as 'feeling like myself again' rather than feeling like a different person." },
        { myth: "\"If you can still function, it's not real depression.\"", reality: "High-functioning depression is extremely common and often more dangerous because it delays treatment. Someone can hold a job while being profoundly depressed." },
      ].map((m, i) => (
        <div key={i} style={{ padding: "12px 0", borderBottom: i < 3 ? `1px solid ${C.border}` : "none" }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: C.text, margin: "0 0 4px", fontFamily: fonts.body, fontStyle: "italic" }}>{m.myth}</p>
          <p style={{ fontSize: 13, color: C.textMid, lineHeight: 1.6, margin: 0, fontFamily: fonts.body }}>{m.reality}</p>
        </div>
      ))}
    </Card>

    <h3 style={{ fontFamily: fonts.display, fontSize: 20, fontWeight: 700, color: C.text, margin: "0 0 14px" }}>Treatment That Works</h3>
    <Card style={{ marginBottom: 20 }}>
      {[
        { name: "SSRIs / SNRIs", desc: "First-line medications. Sertraline (Zoloft), escitalopram (Lexapro), duloxetine (Cymbalta). Take 2-6 weeks to reach full effect. 60-70% of patients respond to the first medication tried." },
        { name: "CBT (Cognitive Behavioral Therapy)", desc: "As effective as medication for mild-to-moderate depression. Combines thought restructuring with behavioral activation. 12-20 sessions typical." },
        { name: "Combination therapy", desc: "Medication + therapy together consistently outperforms either alone, especially for moderate-to-severe depression." },
        { name: "Exercise", desc: "Research shows 30 minutes of moderate exercise 3-5 times per week has antidepressant effects comparable to medication for mild-to-moderate depression." },
      ].map((t, i) => (
        <div key={i} style={{ padding: "12px 0", borderBottom: i < 3 ? `1px solid ${C.border}` : "none" }}>
          <h4 style={{ fontSize: 14, fontWeight: 700, color: C.blue, margin: "0 0 4px", fontFamily: fonts.body }}>{t.name}</h4>
          <p style={{ fontSize: 13, color: C.textMid, lineHeight: 1.6, margin: 0, fontFamily: fonts.body }}>{t.desc}</p>
        </div>
      ))}
    </Card>

    <Card style={{ background: "#fef3c7", borderColor: "#f59e0b40" }}>
      <p style={{ fontSize: 13, color: "#92400e", lineHeight: 1.6, margin: 0, fontFamily: fonts.body }}><strong>Important:</strong> If antidepressants make you feel worse, more agitated, or trigger a period of unusually high energy, this may indicate bipolar disorder rather than unipolar depression. Tell your prescriber immediately — the treatment approach is fundamentally different.</p>
    </Card>

    <Card style={{ marginTop: 16, background: C.tealLight, borderColor: C.teal + "30" }}>
      <p style={{ fontSize: 13.5, color: C.teal, lineHeight: 1.6, margin: 0, fontFamily: fonts.body, fontWeight: 600 }}>PHQ-9 Depression Screening — Coming Soon</p>
      <p style={{ fontSize: 12.5, color: C.textMid, lineHeight: 1.6, margin: "6px 0 0", fontFamily: fonts.body }}>The Patient Health Questionnaire (PHQ-9) is the most widely used depression screening tool in the world. 9 questions, takes under 3 minutes, 88% sensitivity and specificity. We're adding it to this site soon.</p>
    </Card>
  </Sec>);
}

// ═══════════════════════════════════════════════════════════════
// ANXIETY PAGE
// ═══════════════════════════════════════════════════════════════
function AnxietyPage() {
  return (<Sec style={{ paddingTop: 40, paddingBottom: 60 }}>
    <Badge color={C.teal}>Understanding Anxiety</Badge>
    <h2 style={{ fontFamily: fonts.display, fontSize: 30, fontWeight: 700, color: C.text, margin: "12px 0 8px" }}>Anxiety Disorders</h2>
    <p style={{ fontSize: 15, color: C.textMid, margin: "0 0 24px", maxWidth: 640, lineHeight: 1.65, fontFamily: fonts.body }}>Anxiety is your brain's threat detection system stuck in the "on" position. Everyone feels anxious sometimes — that's healthy. Anxiety disorders are when the alarm keeps ringing after the danger has passed, or when there was never any danger to begin with. It is the most common mental health condition in the world.</p>

    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12, marginBottom: 28 }}>
      {[
        { num: "301M+", label: "People affected globally", src: "WHO, 2023" },
        { num: "31%", label: "Of U.S. adults will experience an anxiety disorder in their lifetime", src: "NIMH" },
        { num: "60%+", label: "Of people with anxiety also have depression", src: "Comorbidity research" },
        { num: "7", label: "Questions on the GAD-7 — takes under 2 minutes", src: "Spitzer et al., 2006" },
      ].map((s, i) => (
        <Card key={i} style={{ textAlign: "center", padding: "16px 14px", animation: `fadeUp 0.5s ease ${i * 0.06}s both` }}>
          <div style={{ fontFamily: fonts.display, fontSize: 24, fontWeight: 700, color: C.teal }}>{s.num}</div>
          <div style={{ fontSize: 12, color: C.textMid, lineHeight: 1.5, marginTop: 4, fontFamily: fonts.body }}>{s.label}</div>
          <div style={{ fontSize: 10, color: C.textLight, marginTop: 3, fontFamily: fonts.body }}>{s.src}</div>
        </Card>
      ))}
    </div>

    <h3 style={{ fontFamily: fonts.display, fontSize: 20, fontWeight: 700, color: C.text, margin: "0 0 14px" }}>Types of Anxiety Disorders</h3>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 14, marginBottom: 24 }}>
      {[
        { name: "Generalized Anxiety Disorder (GAD)", desc: "Persistent, excessive worry about multiple areas of life (work, health, family, money) that is difficult to control. The worry is disproportionate to the actual situation and occurs more days than not for at least 6 months.", symptoms: "Restlessness, fatigue, difficulty concentrating, irritability, muscle tension, sleep disturbance" },
        { name: "Panic Disorder", desc: "Recurrent, unexpected panic attacks — sudden surges of intense fear that peak within minutes. The fear of having another attack often becomes its own problem.", symptoms: "Racing heart, chest pain, shortness of breath, dizziness, tingling, feeling of unreality, fear of dying" },
        { name: "Social Anxiety Disorder", desc: "Intense fear of social situations where you might be scrutinized or judged. Goes far beyond shyness — it can be completely debilitating.", symptoms: "Avoidance of social situations, physical symptoms before/during social events, fear of embarrassment, difficulty speaking" },
        { name: "Specific Phobias", desc: "Intense, irrational fear of a specific object or situation (heights, flying, needles, animals). The fear is out of proportion to the actual danger.", symptoms: "Immediate anxiety response, avoidance behavior, recognition that the fear is excessive but inability to control it" },
      ].map((t, i) => (
        <Card key={i} hover style={{ borderLeft: `3px solid ${C.teal}`, animation: `fadeUp 0.5s ease ${i * 0.06}s both` }}>
          <h4 style={{ fontFamily: fonts.display, fontSize: 16, fontWeight: 700, color: C.teal, margin: "0 0 6px" }}>{t.name}</h4>
          <p style={{ fontSize: 13, color: C.textMid, lineHeight: 1.6, margin: "0 0 10px", fontFamily: fonts.body }}>{t.desc}</p>
          <div style={{ padding: "8px 10px", background: C.tealLight, borderRadius: 8 }}>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: C.teal, marginBottom: 2, fontFamily: fonts.body }}>Common Symptoms</div>
            <p style={{ fontSize: 12, color: C.textMid, lineHeight: 1.5, margin: 0, fontFamily: fonts.body }}>{t.symptoms}</p>
          </div>
        </Card>
      ))}
    </div>

    <h3 style={{ fontFamily: fonts.display, fontSize: 20, fontWeight: 700, color: C.text, margin: "0 0 14px" }}>The Mind-Body Connection</h3>
    <Card style={{ marginBottom: 20 }}>
      <p style={{ fontSize: 14, color: C.textMid, lineHeight: 1.65, margin: "0 0 12px", fontFamily: fonts.body }}>Anxiety is not just "in your head." It lives in your body. The physical symptoms are often what bring people to the emergency room thinking they're having a heart attack:</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
        {[
          { area: "Heart", symptoms: "Racing, pounding, skipping beats, chest tightness" },
          { area: "Lungs", symptoms: "Shortness of breath, hyperventilation, feeling of suffocation" },
          { area: "Stomach", symptoms: "Nausea, diarrhea, loss of appetite, 'butterflies'" },
          { area: "Muscles", symptoms: "Tension, trembling, shaking, jaw clenching, headaches" },
          { area: "Nervous System", symptoms: "Dizziness, tingling, numbness, hot flashes, sweating" },
          { area: "Brain", symptoms: "Racing thoughts, difficulty concentrating, derealization, insomnia" },
        ].map((b, i) => (
          <div key={i} style={{ padding: "10px 12px", background: "#fafaf8", borderRadius: 8 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: C.teal, fontFamily: fonts.body }}>{b.area}</div>
            <p style={{ fontSize: 12, color: C.textMid, lineHeight: 1.5, margin: "2px 0 0", fontFamily: fonts.body }}>{b.symptoms}</p>
          </div>
        ))}
      </div>
      <p style={{ fontSize: 13, color: C.textMid, lineHeight: 1.6, margin: "12px 0 0", fontFamily: fonts.body }}>This is why the <strong>Body</strong> page on this site exists — exercises that talk directly to your nervous system through the vagus nerve, because when anxiety is physical, cognitive techniques alone aren't enough.</p>
    </Card>

    <h3 style={{ fontFamily: fonts.display, fontSize: 20, fontWeight: 700, color: C.text, margin: "0 0 14px" }}>Treatment That Works</h3>
    <Card style={{ marginBottom: 20 }}>
      {[
        { name: "CBT (Cognitive Behavioral Therapy)", desc: "The gold standard for anxiety. Teaches you to identify distorted threat assessments and gradually face feared situations. Exposure therapy is a key component for phobias and panic." },
        { name: "SSRIs / SNRIs", desc: "First-line medications. Sertraline, escitalopram, venlafaxine, duloxetine. Take 2-4 weeks to work. Effective for GAD, panic, social anxiety, and PTSD." },
        { name: "Benzodiazepines (short-term only)", desc: "Lorazepam (Ativan), clonazepam (Klonopin). Fast-acting but carry dependence risk. Used as a bridge while SSRIs take effect, not as long-term treatment." },
        { name: "Vagus nerve exercises", desc: "Extended exhale breathing, cold water exposure, progressive muscle relaxation. These directly activate the parasympathetic nervous system to counteract the fight-or-flight response." },
      ].map((t, i) => (
        <div key={i} style={{ padding: "12px 0", borderBottom: i < 3 ? `1px solid ${C.border}` : "none" }}>
          <h4 style={{ fontSize: 14, fontWeight: 700, color: C.teal, margin: "0 0 4px", fontFamily: fonts.body }}>{t.name}</h4>
          <p style={{ fontSize: 13, color: C.textMid, lineHeight: 1.6, margin: 0, fontFamily: fonts.body }}>{t.desc}</p>
        </div>
      ))}
    </Card>

    <Card style={{ marginTop: 16, background: C.tealLight, borderColor: C.teal + "30" }}>
      <p style={{ fontSize: 13.5, color: C.teal, lineHeight: 1.6, margin: 0, fontFamily: fonts.body, fontWeight: 600 }}>GAD-7 Anxiety Screening — Coming Soon</p>
      <p style={{ fontSize: 12.5, color: C.textMid, lineHeight: 1.6, margin: "6px 0 0", fontFamily: fonts.body }}>The Generalized Anxiety Disorder 7-item scale (GAD-7) is the most widely used anxiety screening tool. 7 questions, under 2 minutes. We're adding it to this site soon.</p>
    </Card>
  </Sec>);
}

// ═══════════════════════════════════════════════════════════════
// BIPOLAR PAGE (condensed from original — no questionnaire)
// ═══════════════════════════════════════════════════════════════
function BipolarPage() {
  return (<Sec style={{ paddingTop: 40, paddingBottom: 60 }}>
    <Badge color={C.accent}>Understanding Bipolar Disorder</Badge>
    <h2 style={{ fontFamily: fonts.display, fontSize: 30, fontWeight: 700, color: C.text, margin: "12px 0 8px" }}>Bipolar Disorder</h2>
    <p style={{ fontSize: 15, color: C.textMid, margin: "0 0 24px", maxWidth: 640, lineHeight: 1.65, fontFamily: fonts.body }}>Bipolar disorder is not just mood swings. It is a spectrum of conditions involving distinct episodes of mania or hypomania and depression, with periods of stability in between. It has the highest rate of comorbid substance use of any psychiatric diagnosis and takes an average of 7-10 years to diagnose correctly.</p>

    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12, marginBottom: 28 }}>
      {[
        { num: "46M+", label: "People worldwide", src: "WHO, 2023" },
        { num: "25-50%", label: "Will attempt suicide in their lifetime", src: "APA" },
        { num: "69%", label: "Initially misdiagnosed (usually as depression)", src: "Hirschfeld, 2003" },
        { num: "7-10 yrs", label: "Average delay to correct diagnosis", src: "NIMH" },
      ].map((s, i) => (
        <Card key={i} style={{ textAlign: "center", padding: "16px 14px", animation: `fadeUp 0.5s ease ${i * 0.06}s both` }}>
          <div style={{ fontFamily: fonts.display, fontSize: 24, fontWeight: 700, color: C.accent }}>{s.num}</div>
          <div style={{ fontSize: 12, color: C.textMid, lineHeight: 1.5, marginTop: 4, fontFamily: fonts.body }}>{s.label}</div>
          <div style={{ fontSize: 10, color: C.textLight, marginTop: 3, fontFamily: fonts.body }}>{s.src}</div>
        </Card>
      ))}
    </div>

    <h3 style={{ fontFamily: fonts.display, fontSize: 20, fontWeight: 700, color: C.text, margin: "0 0 14px" }}>The Bipolar Spectrum</h3>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 14, marginBottom: 24 }}>
      {[
        { type: "Bipolar I", color: C.red, desc: "Full manic episodes lasting 7+ days (or any duration if hospitalized). May include psychotic features — hallucinations, delusions, grandiosity so extreme it disconnects from reality. Depressive episodes are common but not required for diagnosis.", treatment: "Lithium (gold standard), antipsychotics, mood stabilizers. Long-term maintenance is essential." },
        { type: "Bipolar II", color: C.warm, desc: "Hypomanic episodes (4+ days, less severe than full mania, no psychosis) alternating with major depressive episodes. Often misdiagnosed as unipolar depression because the hypomania feels 'good' and isn't reported. Depression is the dominant burden.", treatment: "Lithium, lamotrigine (especially for depression), quetiapine. Antidepressants alone can trigger hypomania." },
        { type: "Cyclothymia", color: C.blue, desc: "Chronic (2+ years) fluctuating mood with hypomanic and depressive symptoms that never meet full criteria for either pole. Often dismissed as 'just moody.' Can progress to Bipolar I or II.", treatment: "Mood stabilizers, CBT, lifestyle management. Early treatment may prevent progression." },
      ].map((t, i) => (
        <Card key={i} hover style={{ borderTop: `3px solid ${t.color}`, animation: `fadeUp 0.5s ease ${i * 0.08}s both` }}>
          <h3 style={{ fontFamily: fonts.display, fontSize: 18, fontWeight: 700, color: t.color, margin: "0 0 8px" }}>{t.type}</h3>
          <p style={{ fontSize: 13, color: C.textMid, lineHeight: 1.6, margin: "0 0 12px", fontFamily: fonts.body }}>{t.desc}</p>
          <div style={{ padding: "10px 12px", background: `${t.color}08`, borderRadius: 8 }}>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: t.color, marginBottom: 3, fontFamily: fonts.body }}>Treatment</div>
            <p style={{ fontSize: 12, color: C.textMid, lineHeight: 1.55, margin: 0, fontFamily: fonts.body }}>{t.treatment}</p>
          </div>
        </Card>
      ))}
    </div>

    <h3 style={{ fontFamily: fonts.display, fontSize: 20, fontWeight: 700, color: C.text, margin: "0 0 14px" }}>How It's Different from Depression</h3>
    <Card style={{ marginBottom: 20 }}>
      {[
        { q: "Why does it matter?", a: "Treatment is fundamentally different. Antidepressants alone can trigger mania or rapid cycling in bipolar patients. Mood stabilizers like lithium are the foundation of bipolar treatment but are not typically used for unipolar depression." },
        { q: "Why is it so often missed?", a: "Because people seek help during depressive episodes, not during mania. Hypomania especially goes unreported because it often feels productive and good. Clinicians who don't specifically ask about past highs will diagnose depression." },
        { q: "What should I watch for?", a: "If antidepressants make you agitated, energized, or 'wired' rather than calmer — or if you've had periods of distinctly elevated mood, decreased need for sleep, racing thoughts, or impulsive behavior — raise this with your provider. It changes everything." },
      ].map((item, i) => (
        <div key={i} style={{ padding: "12px 0", borderBottom: i < 2 ? `1px solid ${C.border}` : "none" }}>
          <h4 style={{ fontSize: 14, fontWeight: 700, color: C.accent, margin: "0 0 4px", fontFamily: fonts.body }}>{item.q}</h4>
          <p style={{ fontSize: 13, color: C.textMid, lineHeight: 1.6, margin: 0, fontFamily: fonts.body }}>{item.a}</p>
        </div>
      ))}
    </Card>

    <Card style={{ background: C.accentLight, borderColor: C.accent + "30" }}>
      <p style={{ fontSize: 13.5, color: C.accent, lineHeight: 1.6, margin: 0, fontFamily: fonts.body, fontWeight: 600 }}>MDQ Bipolar Screening — Coming Soon</p>
      <p style={{ fontSize: 12.5, color: C.textMid, lineHeight: 1.6, margin: "6px 0 0", fontFamily: fonts.body }}>The Mood Disorder Questionnaire (MDQ) differentiates between Bipolar I, II, and Cyclothymia. 13 core questions plus severity and history assessment. We're adding it to this site soon.</p>
    </Card>
  </Sec>);
}

// ═══════════════════════════════════════════════════════════════
// PLACEHOLDER — Meds, CBT, DBT, Body, Substance, Find Help, About
// (keeping existing content from the Two Weathers build)
// ═══════════════════════════════════════════════════════════════
function ComingSoonPage({ title, color = C.accent }) {
  return (<Sec style={{ paddingTop: 60, paddingBottom: 60, textAlign: "center" }}>
    <Badge color={color}>Content from Two Weathers</Badge>
    <h2 style={{ fontFamily: fonts.display, fontSize: 28, fontWeight: 700, color: C.text, margin: "14px 0 12px" }}>{title}</h2>
    <p style={{ fontSize: 15, color: C.textMid, lineHeight: 1.7, maxWidth: 480, margin: "0 auto", fontFamily: fonts.body }}>This page is being migrated from the Two Weathers build. Full content will be restored in the next update.</p>
  </Sec>);
}

function AboutPage() {
  return (<Sec style={{ paddingTop: 60, paddingBottom: 60 }}>
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <div style={{ padding: "14px 20px", background: "#fef3c7", border: "1.5px solid #f59e0b40", borderRadius: 12, marginBottom: 28, display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontSize: 20 }}>🔨</span>
        <p style={{ fontSize: 13.5, color: "#92400e", lineHeight: 1.55, margin: 0, fontFamily: fonts.body }}><strong>This site is under active development.</strong> Screening tools, additional content, and features are being added regularly.</p>
      </div>
      <Badge color={C.accent}>Why This Exists</Badge>
      <h2 style={{ fontFamily: fonts.display, fontSize: 32, fontWeight: 700, color: C.text, margin: "14px 0 24px", lineHeight: 1.2 }}>About Brain Weather</h2>
      <div style={{ fontSize: 15.5, color: C.textMid, lineHeight: 1.75, fontFamily: fonts.body }}>
        <p style={{ marginBottom: 18 }}>Brain Weather was developed in collaboration with Maxine, a licensed therapist, over several years of research and conversation about what people affected by mental illness actually need — and what most available resources fail to provide.</p>
        <p style={{ marginBottom: 18 }}>As someone with a family history of bipolar disorder, I have seen firsthand how a delayed or missed diagnosis changes the trajectory of a person's life. The earlier someone understands what they are experiencing, the better the outcomes. The research is clear on this. The problem is that the research is not accessible to the people who need it most.</p>
        <p style={{ marginBottom: 18 }}>This site brings together validated screening tools, peer-reviewed medication data, evidence-based therapy education, and practical resources for finding professional help — written in plain language for real people navigating complex diagnoses.</p>
        <p style={{ marginBottom: 0, color: C.text, fontWeight: 500 }}>None of this replaces professional evaluation or treatment. But it can be the bridge that helps someone get there.</p>
      </div>

      <div style={{ marginTop: 20, padding: "20px 24px", background: "#fdf2f2", borderRadius: 14, border: "1.5px solid #e8c4c4" }}>
        <h3 style={{ fontFamily: fonts.display, fontSize: 16, fontWeight: 700, color: C.red, margin: "0 0 8px" }}>Medical Disclaimer</h3>
        <p style={{ fontSize: 12.5, color: "#7a3030", lineHeight: 1.65, margin: "0 0 8px", fontFamily: fonts.body }}>The information provided on this website is for educational and informational purposes only. It is not intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of a qualified healthcare provider with any questions regarding a medical condition.</p>
        <p style={{ fontSize: 12.5, color: "#7a3030", lineHeight: 1.65, margin: "0 0 8px", fontFamily: fonts.body }}>Screening tools on this site are based on validated instruments and are intended for educational self-assessment only. They do not constitute a diagnosis. Only a licensed mental health professional can diagnose psychiatric conditions through comprehensive clinical evaluation.</p>
        <p style={{ fontSize: 12.5, color: "#7a3030", lineHeight: 1.65, margin: 0, fontFamily: fonts.body }}>If you are experiencing a mental health crisis, contact the <strong>988 Suicide & Crisis Lifeline</strong> by calling or texting <strong>988</strong>, or go to your nearest emergency room.</p>
      </div>
    </div>
  </Sec>);
}

// ═══════════════════════════════════════════════════════════════
// APP
// ═══════════════════════════════════════════════════════════════
export default function App() {
  const [active, setActive] = useState("home");
  const topRef = useRef(null);
  useEffect(() => { topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }); }, [active]);

  return (
    <div ref={topRef} style={{ minHeight: "100vh", background: C.bg, fontFamily: fonts.body }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;700;800&family=Source+Sans+3:wght@300;400;500;600;700;800&display=swap');
        @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        * { box-sizing: border-box; margin: 0; }
        a { color: ${C.accent}; }
        ::selection { background: ${C.accent}30; }
        @media (max-width: 768px) { .desktop-nav { display: none !important; } .mobile-menu-btn { display: block !important; } }
        @media (min-width: 769px) { .mobile-menu-btn { display: none !important; } .mobile-dropdown { display: none !important; } }
      `}</style>
      <Nav active={active} setActive={setActive} />
      {active === "home" && <HomePage setActive={setActive} />}
      {active === "depression" && <DepressionPage />}
      {active === "anxiety" && <AnxietyPage />}
      {active === "bipolar" && <BipolarPage />}
      {active === "meds" && <ComingSoonPage title="Medication Guide" color={C.teal} />}
      {active === "cbt" && <ComingSoonPage title="Cognitive Behavioral Therapy (CBT)" color={C.teal} />}
      {active === "dbt" && <ComingSoonPage title="Dialectical Behavior Therapy (DBT)" color="#7c3aed" />}
      {active === "body" && <ComingSoonPage title="Exercises for Physical Anxiety" color={C.accent} />}
      {active === "substance" && <ComingSoonPage title="Substance Use & Mental Health" color={C.warm} />}
      {active === "find-help" && <ComingSoonPage title="Find a Psychiatrist or Therapist" color={C.accent} />}
      {active === "about" && <AboutPage />}
      <footer style={{ borderTop: `1px solid ${C.border}`, padding: "24px 20px", textAlign: "center", marginTop: 40 }}>
        <p style={{ fontSize: 12, color: C.textLight, lineHeight: 1.6, maxWidth: 600, margin: "0 auto", fontFamily: fonts.body }}>This site is for educational and informational purposes only and does not provide medical advice, diagnosis, or treatment. Always seek the advice of a qualified healthcare provider. This site is under active development.</p>
        <p style={{ fontSize: 11, color: C.textLight, marginTop: 8, fontFamily: fonts.body }}>© {new Date().getFullYear()} Brain Weather</p>
      </footer>
    </div>
  );
}
