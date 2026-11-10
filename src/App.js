import { useState, useEffect, useRef } from "react";

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
    { id: "episodes", label: "Episodes", icon: "◐" },
    { id: "body", label: "Body", icon: "◯" },
    { id: "substance", label: "Substance Use", icon: "◆" },
    { id: "family", label: "Family & Friends", icon: "◑" },
    { id: "find-help", label: "Find Help", icon: "◇" },
    { id: "about", label: "About", icon: "♡" },
  ];
  const pick = (id) => { setActive(id); setMenuOpen(false); };
  return (
    <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(250,250,248,0.95)", backdropFilter: "blur(12px)", borderBottom: `1px solid ${C.border}` }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 56, padding: "0 20px" }}>
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
              Bipolar disorder affects 2.8% of U.S. adults each year, yet many people wait <strong>years</strong> for a correct diagnosis: about 6 years on average between first symptoms and treatment in one large analysis. This site exists to close that gap. Simple tools. Real research. No judgment.
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
            { num: "40M", label: "People worldwide lived with bipolar disorder in 2019", src: "WHO" },
            { num: "25–50%", label: "Estimated share who attempt suicide at least once", src: "Marangell et al., 2006" },
            { num: "69%", label: "Of people surveyed said they were first misdiagnosed, most often with depression", src: "Hirschfeld et al., 2003 (DBSA survey)" },
            { num: "4.4%", label: "Of U.S. adults experience bipolar disorder at some point in their lives", src: "NIMH" },
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
        <p style={{ fontFamily: fonts.body, fontSize: 15, color: C.textMid, marginBottom: 24, maxWidth: 600 }}>Bipolar disorder isn't one thing. The type matters for treatment, and only a clinician can tell which one applies.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
          {[
            { type: "Bipolar I", color: "#c23030", desc: "At least one manic episode lasting 7 days or more (or any length if it leads to hospitalization). May include psychotic features. Depressive episodes are common but not required for diagnosis.", symptoms: "Extreme euphoria or irritability, little need for sleep, racing thoughts, grandiosity, reckless behavior, possible hallucinations or delusions", treatment: "Lithium (a first-line, long-established treatment), certain antipsychotics, and valproate. Long-term treatment to prevent new episodes is the norm." },
            { type: "Bipolar II", color: "#b8510d", desc: "At least one hypomanic episode (lasting 4 or more days in a row, milder than mania) and at least one major depressive episode, with no full manic episode. Often misdiagnosed as depression. In long-term studies, people with bipolar II spent more time with depressive symptoms than people with bipolar I.", symptoms: "More energy, less need for sleep, elevated mood, talking more, while still able to function. Depressive episodes are often the main problem.", treatment: "Quetiapine is a first-line treatment for bipolar II depression; lithium and lamotrigine help prevent relapse. Antidepressants are used cautiously, if at all, because they can trigger hypomania." },
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
        <p style={{ fontFamily: fonts.body, fontSize: 13, color: C.textLight, margin: "14px 0 0", maxWidth: 640, lineHeight: 1.6 }}>The diagnostic manual (DSM-5-TR) also includes cyclothymic disorder and other specified bipolar disorders, for mood changes that don't fit bipolar I or II. A clinician sorts out which, if any, applies.</p>
      </Section>

      {/* What to do */}
      <Section style={{ paddingBottom: 48 }}>
        <Card style={{ background: "#faf5f0", borderColor: "#e8ddd2" }}>
          <h2 style={{ fontFamily: fonts.display, fontSize: 22, fontWeight: 700, color: C.text, margin: "0 0 12px" }}>Where to Start</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20 }}>
            {[
              { step: "1", title: "Screen Yourself", desc: "Take the MDQ, a validated 5-minute questionnaire. It can't diagnose you and it misses some people, but a positive result is a good reason to see a professional.", action: "Take Screening", page: "screening" },
              { step: "2", title: "Understand the Meds", desc: "See the main types of medication, what each is used for, and how long it takes to work: weeks for the fastest, months for the protective effect. Give each one a real trial.", action: "Medication Guide", page: "medications" },
              { step: "3", title: "Add Therapy That Works", desc: "CBT and DBT teach skills medication cannot: catching an episode early, riding out an emotional storm, keeping a routine. Both take months, like the medicines.", action: "CBT and DBT", page: "cbt" },
              { step: "4", title: "Find a Professional", desc: "Use our directory links to find a psychiatrist or therapist near you who specializes in bipolar disorder.", action: "Find Help", page: "find-help" },
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
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 14, marginTop: 14 }}>
          {[
            { title: "Know the episodes", desc: "Mania, hypomania, depression and mixed features: what each looks like, early warning signs, and a quick self-check for what kind of help to reach for.", action: "Episodes", page: "episodes", color: C.warm },
            { title: "Supporting someone?", desc: "What helps and what hurts to say, what to do during highs and lows, planning ahead for a crisis, and support for yourself.", action: "Family & Friends", page: "family", color: C.blue },
          ].map((s, i) => (
            <Card key={i} hover style={{ cursor: "pointer", borderLeft: `3px solid ${s.color}` }}>
              <div onClick={() => setActive(s.page)}>
                <h3 style={{ fontFamily: fonts.display, fontSize: 16, fontWeight: 700, color: C.text, margin: "0 0 6px" }}>{s.title}</h3>
                <p style={{ fontSize: 13, color: C.textMid, lineHeight: 1.55, margin: "0 0 8px", fontFamily: fonts.body }}>{s.desc}</p>
                <span style={{ fontSize: 13, color: s.color, fontWeight: 600, fontFamily: fonts.body }}>{s.action} →</span>
              </div>
            </Card>
          ))}
        </div>
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

function ScreeningPage() {
  // The Mood Disorder Questionnaire (Hirschfeld et al., Am J Psychiatry, 2000), scored the standard way:
  // positive when 7+ of the 13 items are "yes", several happened during the same period, and they caused
  // moderate or serious problems. Questions 4 and 5 are asked on the original form but are not scored.
  const [step, setStep] = useState(0); // 0=intro, 1=13 items, 2=same period, 3=problems, 4=history, 5=results
  const [ma, setMa] = useState({});
  const [clustering, setClustering] = useState(null);
  const [impact, setImpact] = useState(null);
  const [family, setFamily] = useState(null);
  const [told, setTold] = useState(null);
  const ref = useRef(null);

  useEffect(() => { ref.current?.scrollIntoView({ behavior: "smooth", block: "start" }); }, [step]);

  const maCount = Object.values(ma).filter(Boolean).length;
  const allMa = Object.keys(ma).length === 13;
  const canNext = [true, allMa, clustering !== null, impact !== null, family !== null && told !== null, false][step];
  const impSig = impact === "moderate" || impact === "serious";
  const positive = maCount >= 7 && clustering === true && impSig;

  function result() {
    if (positive) return { type: "Positive screen", color: C.accent,
      desc: `You answered yes to ${maCount} of the 13 questions, said several happened during the same period, and said they caused ${impact} problems. That meets all three parts of the MDQ's standard scoring. A positive screen is not a diagnosis: it means a full evaluation by a psychiatrist or psychologist is worth doing.` };
    if (maCount >= 7) return { type: "Did not meet all three parts", color: C.warm,
      desc: `You answered yes to ${maCount} of the 13 questions, but ${clustering !== true ? "did not say they happened during the same period" : "rated the problems they caused as " + impact}. The standard MDQ scoring needs all three parts, so this is not a positive screen. If mood changes like these are affecting your life, they are still worth raising with a clinician.` };
    return { type: "Negative screen", color: C.teal,
      desc: `You answered yes to ${maCount} of the 13 questions. That is below the MDQ's threshold of 7. A negative screen does not rule out bipolar disorder: the MDQ misses some people, especially those with milder highs (hypomania). If your mood worries you, talk with a clinician.` };
  }
  const r = step === 5 ? result() : null;
  const pct = step === 0 ? 0 : Math.round((step / 5) * 100);

  function YesNo({ value, onPick }) {
    return (
      <div style={{ display: "flex", gap: 10 }}>
        {[true, false].map(v => (
          <button key={String(v)} onClick={() => onPick(v)} style={{
            flex: 1, padding: "14px", borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: fonts.body, transition: "all 0.2s",
            border: value === v ? `2px solid ${v ? C.teal : "#6b7280"}` : `1.5px solid ${C.border}`,
            background: value === v ? (v ? C.teal : "#6b7280") : C.card, color: value === v ? "#fff" : C.textMid,
          }}>{v ? "Yes" : "No"}</button>
        ))}
      </div>
    );
  }

  return (
    <Section style={{ paddingTop: 40, paddingBottom: 60 }}>
      <div ref={ref} />
      {step > 0 && step < 5 && (
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: C.textLight, fontFamily: fonts.body, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>
            <span>Step {step} of 4</span><span>{pct}%</span>
          </div>
          <div style={{ height: 4, background: C.border, borderRadius: 4, overflow: "hidden" }}>
            <div style={{ width: `${pct}%`, height: "100%", background: `linear-gradient(90deg, ${C.teal}, ${C.accent})`, borderRadius: 4, transition: "width 0.5s ease" }} />
          </div>
        </div>
      )}

      {step === 0 && (
        <div style={{ textAlign: "center", maxWidth: 560, margin: "0 auto" }}>
          <Badge color={C.teal}>Educational Screening Tool</Badge>
          <h2 style={{ fontFamily: fonts.display, fontSize: 30, fontWeight: 700, color: C.text, margin: "16px 0 12px" }}>Mood Disorder Questionnaire</h2>
          <p style={{ fontSize: 15, color: C.textMid, lineHeight: 1.7, margin: "0 0 12px", fontFamily: fonts.body }}>This is the <strong>Mood Disorder Questionnaire (MDQ)</strong>, a validated screening questionnaire for bipolar spectrum disorders developed by Dr. Robert Hirschfeld and colleagues. It is scored here exactly the way the published version is scored.</p>
          <Card style={{ textAlign: "left", margin: "20px 0" }}>
            <p style={{ fontSize: 13.5, color: C.textMid, lineHeight: 1.6, margin: 0, fontFamily: fonts.body }}>It takes about <strong>5 minutes</strong>. Answer about your <strong>whole life</strong>, not just how you feel today. Nothing you enter leaves your browser.</p>
          </Card>
          <Card style={{ textAlign: "left", background: "#fdf2f2", borderColor: "#e8c4c4" }}>
            <p style={{ fontSize: 13, color: "#7a3030", lineHeight: 1.6, margin: "0 0 8px", fontFamily: fonts.body, fontWeight: 700 }}>Please read before you start</p>
            <p style={{ fontSize: 12.5, color: "#7a3030", lineHeight: 1.6, margin: "0 0 6px", fontFamily: fonts.body }}>A screening questionnaire <strong>cannot diagnose</strong> bipolar disorder or tell which type someone has. Only a clinician can, after a full evaluation that rules out other causes such as thyroid problems, medications, substances, ADHD and other conditions.</p>
            <p style={{ fontSize: 12.5, color: "#7a3030", lineHeight: 1.6, margin: 0, fontFamily: fonts.body }}>A positive screen means an evaluation is worth doing. A negative screen does not rule bipolar disorder out.</p>
          </Card>
        </div>
      )}

      {step === 1 && (
        <div>
          <h3 style={{ fontFamily: fonts.display, fontSize: 20, fontWeight: 700, color: C.text, margin: "0 0 4px" }}>Question 1</h3>
          <p style={{ fontSize: 13, color: C.textMid, margin: "0 0 18px", fontFamily: fonts.body }}>Has there ever been a period of time when you were not your usual self and...</p>
          {MANIA_QS.map((q, i) => (
            <div key={i} style={{ background: ma[i] === true ? `${C.teal}08` : ma[i] === false ? "#fafaf8" : C.card, border: `1.5px solid ${ma[i] === true ? C.teal + "40" : C.border}`, borderRadius: 12, padding: "14px 18px", marginBottom: 8, transition: "all 0.2s" }}>
              <p style={{ fontSize: 14, lineHeight: 1.55, color: C.text, margin: "0 0 10px", fontFamily: fonts.body }}>{q}</p>
              <div style={{ display: "flex", gap: 6 }}>
                {[true, false].map(v => (
                  <button key={String(v)} onClick={() => setMa(p => ({ ...p, [i]: v }))} style={{
                    padding: "6px 18px", borderRadius: 7, fontSize: 12.5, fontWeight: 600, cursor: "pointer", fontFamily: fonts.body, transition: "all 0.15s",
                    border: ma[i] === v ? `1.5px solid ${v ? C.teal : "#8a919e"}` : `1.5px solid ${C.border}`,
                    background: ma[i] === v ? (v ? C.teal : "#6b7280") : "transparent",
                    color: ma[i] === v ? "#fff" : C.textMid,
                  }}>{v ? "Yes" : "No"}</button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {step === 2 && (
        <div>
          <h3 style={{ fontFamily: fonts.display, fontSize: 20, fontWeight: 700, color: C.text, margin: "0 0 8px" }}>Question 2</h3>
          <Card style={{ marginTop: 12 }}>
            <p style={{ fontSize: 15, lineHeight: 1.65, color: C.text, margin: "0 0 16px", fontFamily: fonts.body }}>If you answered yes to more than one of those, have several of them ever happened <strong>during the same period of time</strong>?</p>
            <YesNo value={clustering} onPick={setClustering} />
          </Card>
        </div>
      )}

      {step === 3 && (
        <div>
          <h3 style={{ fontFamily: fonts.display, fontSize: 20, fontWeight: 700, color: C.text, margin: "0 0 8px" }}>Question 3</h3>
          <Card style={{ marginTop: 12 }}>
            <p style={{ fontSize: 15, lineHeight: 1.6, color: C.text, margin: "0 0 16px", fontFamily: fonts.body }}>How much of a problem did any of these cause you, such as being unable to work; having family, money or legal troubles; or getting into arguments or fights?</p>
            {["none", "minor", "moderate", "serious"].map(v => (
              <button key={v} onClick={() => setImpact(v)} style={{
                display: "block", width: "100%", textAlign: "left", padding: "13px 18px", borderRadius: 10, marginBottom: 8, cursor: "pointer", fontFamily: fonts.body, fontSize: 14.5, fontWeight: impact === v ? 700 : 500, transition: "all 0.2s",
                border: impact === v ? `2px solid ${v === "serious" ? C.red : v === "moderate" ? C.warm : v === "minor" ? C.blue : C.textLight}` : `1.5px solid ${C.border}`,
                background: impact === v ? (v === "serious" ? C.redLight : v === "moderate" ? C.warmLight : v === "minor" ? C.blueLight : "#f5f5f3") : C.card,
                color: impact === v ? (v === "serious" ? C.red : v === "moderate" ? C.warm : v === "minor" ? C.blue : C.textMid) : C.textMid,
              }}>{v === "none" ? "No problem" : v === "minor" ? "Minor problem" : v === "moderate" ? "Moderate problem" : "Serious problem"}</button>
            ))}
          </Card>
        </div>
      )}

      {step === 4 && (
        <div>
          <h3 style={{ fontFamily: fonts.display, fontSize: 20, fontWeight: 700, color: C.text, margin: "0 0 4px" }}>Questions 4 and 5</h3>
          <p style={{ fontSize: 13, color: C.textMid, margin: "0 0 14px", fontFamily: fonts.body }}>These are on the original questionnaire but are not part of the score. They are useful to bring to an appointment.</p>
          <Card style={{ marginBottom: 12 }}>
            <p style={{ fontSize: 15, lineHeight: 1.6, color: C.text, margin: "0 0 16px", fontFamily: fonts.body }}>Have any of your blood relatives (children, siblings, parents, grandparents, aunts, uncles) had bipolar disorder (manic-depressive illness)?</p>
            <YesNo value={family} onPick={setFamily} />
          </Card>
          <Card>
            <p style={{ fontSize: 15, lineHeight: 1.6, color: C.text, margin: "0 0 16px", fontFamily: fonts.body }}>Has a health professional ever told you that you have bipolar disorder (manic-depressive illness)?</p>
            <YesNo value={told} onPick={setTold} />
          </Card>
        </div>
      )}

      {step === 5 && r && (
        <div>
          <Card style={{ borderTop: `3px solid ${r.color}`, marginBottom: 20 }}>
            <Badge color={r.color}>Screening result, not a diagnosis</Badge>
            <h2 style={{ fontFamily: fonts.display, fontSize: 24, fontWeight: 700, color: r.color, margin: "10px 0 10px" }}>{r.type}</h2>
            <p style={{ fontSize: 14.5, color: C.textMid, lineHeight: 1.65, margin: 0, fontFamily: fonts.body }}>{r.desc}</p>
          </Card>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12, marginBottom: 20 }}>
            {[
              { v: `${maCount}/13`, l: "Questions answered yes", ok: maCount >= 7, need: "7 or more" },
              { v: clustering ? "Yes" : "No", l: "Same period of time", ok: clustering === true, need: "Yes" },
              { v: impact ? impact[0].toUpperCase() + impact.slice(1) : "", l: "Problems caused", ok: impSig, need: "Moderate or serious" },
            ].map((x, i) => (
              <Card key={i} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: fonts.display, fontSize: 26, fontWeight: 700, color: x.ok ? C.accent : C.teal }}>{x.v}</div>
                <div style={{ fontSize: 11, color: C.textLight, textTransform: "uppercase", letterSpacing: "0.06em", fontFamily: fonts.body }}>{x.l}</div>
                <div style={{ fontSize: 11, color: C.textMid, marginTop: 2, fontFamily: fonts.body }}>Part of a positive screen: {x.need}</div>
              </Card>
            ))}
          </div>
          {(family || told) && (
            <Card style={{ marginBottom: 20 }}>
              <p style={{ fontSize: 13.5, color: C.textMid, lineHeight: 1.6, margin: 0, fontFamily: fonts.body }}>{family ? "You said a blood relative has had bipolar disorder. Family history is one of the strongest known risk factors, so mention it at any appointment. " : ""}{told ? "You said a health professional has told you that you have bipolar disorder. If you are not in care now, the Find Help page lists ways to reconnect." : ""}</p>
            </Card>
          )}
          <Card style={{ background: "#fdf2f2", borderColor: "#e8c4c4" }}>
            <p style={{ fontSize: 12.5, color: "#7a3030", lineHeight: 1.6, margin: "0 0 8px", fontFamily: fonts.body }}><strong>This is not a diagnosis.</strong> The MDQ (Hirschfeld et al., Am J Psychiatry, 2000) was designed to flag who should be evaluated. It works best in people already seeing a mental-health clinician and misses more people in the general population. Only a licensed clinician can diagnose bipolar disorder and tell which type it is.</p>
            <p style={{ fontSize: 12.5, color: "#7a3030", lineHeight: 1.6, margin: 0, fontFamily: fonts.body }}>If you are in crisis, call or text <strong>988</strong> (Suicide & Crisis Lifeline), or go to the nearest emergency room.</p>
          </Card>
        </div>
      )}

      <div style={{ display: "flex", justifyContent: step === 0 ? "center" : "space-between", marginTop: 28, gap: 12 }}>
        {step > 0 && step < 5 && <Btn variant="outline" onClick={() => setStep(s => s - 1)}>← Back</Btn>}
        {step < 5 && <Btn variant={step === 0 ? "accent" : "primary"} disabled={!canNext} onClick={() => setStep(s => s + 1)} style={step === 0 ? { fontSize: 16, padding: "14px 36px" } : {}}>
          {step === 0 ? "Begin Screening →" : step === 4 ? "View Results →" : "Continue →"}
        </Btn>}
        {step === 5 && <Btn variant="outline" onClick={() => { setStep(0); setMa({}); setClustering(null); setImpact(null); setFamily(null); setTold(null); }} style={{ margin: "0 auto" }}>Retake</Btn>}
      </div>
    </Section>
  );
}

// ═══════════════════════════════════════════════════════════════
// MEDICATION GUIDE
// ═══════════════════════════════════════════════════════════════
const MED_TYPES = [
  { type: "Lithium", kind: "Mood stabilizer", color: C.teal,
    usedFor: "Treating mania and preventing future manic and depressive episodes. A first-line treatment for bipolar I, including bipolar depression. Research suggests it may also lower the risk of suicide.",
    onset: "Mania usually starts to improve within 1–3 weeks. The protective effect against new episodes builds over months.",
    know: "Needs regular blood tests (lithium level, kidney and thyroid). Dehydration and some common medicines, such as ibuprofen, can raise lithium levels." },
  { type: "Anticonvulsant mood stabilizers for mania", kind: "for example divalproex (valproate) or carbamazepine", color: "#059669",
    usedFor: "Treating mania; also used to prevent new episodes.",
    onset: "Mania often improves within several days to 2 weeks.",
    know: "Needs blood tests (drug level, liver, blood counts). Valproate can cause serious birth defects and lower a child's IQ; it is avoided in or before pregnancy unless other options have failed, with reliable birth control. Carbamazepine can cause a serious rash and weakens hormonal birth control." },
  { type: "Anticonvulsant mood stabilizer for preventing depression", kind: "lamotrigine", color: C.blue,
    usedFor: "Preventing future episodes in bipolar I, especially depressive ones. It does not treat acute mania.",
    onset: "The dose has to be raised slowly over about 6 weeks to lower the risk of a serious rash, so the benefit builds over weeks to months.",
    know: "Any new rash needs medical attention right away. Other medicines, including valproate, change how it must be dosed." },
  { type: "Atypical (second-generation) antipsychotics", kind: "several are FDA-approved for bipolar disorder", color: C.warm,
    usedFor: "Treating mania and mixed features; some are approved for bipolar depression; several are used to prevent new episodes, often together with lithium or valproate.",
    onset: "Agitation and mania often ease within days to 1–2 weeks. When used for bipolar depression, improvement often starts within the first few weeks.",
    know: "Can cause weight gain and raise blood sugar and cholesterol, so these are checked regularly. Sleepiness and movement side effects can occur." },
  { type: "Antidepressants", kind: "for example SSRIs or bupropion", color: "#6b7280",
    usedFor: "Sometimes added to a mood stabilizer or antipsychotic for bipolar depression, though studies show limited added benefit. Guidelines advise against using them alone in bipolar I.",
    onset: "Usually 2–6 weeks.",
    know: "On their own they can trigger mania or more frequent mood swings in some people. Use is a careful, case-by-case decision with a prescriber." },
  { type: "Benzodiazepines", kind: "for example lorazepam or clonazepam", color: "#6366f1",
    usedFor: "Short-term help with agitation, anxiety or sleep during an episode, while other medicines start working. They do not stabilize mood or prevent episodes.",
    onset: "Effects usually start within an hour; by mouth, lorazepam peaks at about 2 hours.",
    know: "Physical dependence can develop after taking them steadily for several days to weeks, even as prescribed; stopping suddenly can cause dangerous withdrawal. They can also lead to misuse and addiction. Dangerous with alcohol or opioids." },
];

function MedicationsPage() {
  const th = { textAlign: "left", padding: "10px 12px", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: C.textLight, fontFamily: fonts.body, borderBottom: `2px solid ${C.border}`, verticalAlign: "bottom" };
  const td = { padding: "14px 12px", fontSize: 13, color: C.textMid, lineHeight: 1.55, fontFamily: fonts.body, borderBottom: `1px solid ${C.border}`, verticalAlign: "top" };
  return (
    <Section style={{ paddingTop: 40, paddingBottom: 60 }}>
      <Badge color={C.teal}>Evidence-Based</Badge>
      <h2 style={{ fontFamily: fonts.display, fontSize: 30, fontWeight: 700, color: C.text, margin: "12px 0 8px" }}>Medications for Bipolar Disorder</h2>
      <p style={{ fontSize: 15, color: C.textMid, margin: "0 0 12px", maxWidth: 640, lineHeight: 1.65, fontFamily: fonts.body }}>The main types of medication used for bipolar disorder, what each is used for, and how long it usually takes to work. Times are typical; everyone responds differently. Doses are set by your prescriber, so they are not listed here.</p>
      <Card style={{ background: "#fdf2f2", borderColor: "#e8c4c4", marginBottom: 20, padding: "14px 20px" }}>
        <p style={{ fontSize: 12.5, color: "#7a3030", lineHeight: 1.6, margin: 0, fontFamily: fonts.body }}><strong>Medical disclaimer:</strong> for education only. Never start, stop, or change a medication without your prescriber. Many people need more than one medication, and finding the right combination can take time.</p>
      </Card>

      <TimeBox>
        <strong>Bipolar medications take weeks to months to work, and the preventive effect takes longest of all.</strong> Mania medicines are the quickest, often days to two weeks; medicines for bipolar depression usually need several weeks; lamotrigine has to be raised slowly over about six weeks before it is even at a working dose; and lithium's protection against mania appears within weeks while its protection against depression builds over months.<Cite k="canmat2018" n={1} /> It is normal to feel side effects before you feel benefit, normal to need a dose change, and common to try more than one medicine before finding the right one. Judge a medicine at the end of its trial period, with your prescriber, not in the first two weeks, and never stop one on your own.<Cite k="nimhMeds" n={2} />
      </TimeBox>

      <SubHead>What to Expect, Month by Month</SubHead>
      <Card style={{ marginBottom: 24 }}>
        {[
          { when: "Weeks 1–2", what: "Side effects usually show up before benefits: nausea, sleepiness, tremor or restlessness depending on the medicine. Many fade. For mania, antipsychotics and valproate often start to help in this window; lithium begins to work on mania. Blood tests are drawn to set the dose." },
          { when: "Weeks 2–6", what: "Antidepressants and antipsychotics used for bipolar depression typically start to show benefit. Lamotrigine is still being raised toward its target dose. Your prescriber adjusts doses based on effect, side effects and blood levels." },
          { when: "Weeks 6–12", what: "The usual point to judge a medicine for bipolar depression at an adequate dose; if it has not helped by now, the usual next step is a change, not more waiting. Mania medicines are judged sooner: guidelines suggest a change if there is no response within about two weeks at therapeutic doses. Lamotrigine reaches its working dose." },
          { when: "Months 3–12", what: "Prevention is the long game. Lithium's protection against depressive relapse builds over this period (it also appears to lower suicide risk; how quickly that develops is not well established). Maintenance treatment is judged over many months: CANMAT advises reassessing after six months of sustained response, and most people need ongoing treatment. Stopping medication when you feel well is a common cause of relapse: 50–90% of people who stop lithium relapse within three to five months." },
        ].map((s, i) => (
          <div key={i} style={{ display: "flex", gap: 16, padding: "12px 0", borderBottom: i < 3 ? `1px solid ${C.border}` : "none" }}>
            <div style={{ flex: "0 0 100px", fontSize: 12, fontWeight: 700, color: C.accent, textTransform: "uppercase", letterSpacing: "0.04em", paddingTop: 2, fontFamily: fonts.body }}>{s.when}</div>
            <p style={{ fontSize: 13, color: C.textMid, lineHeight: 1.6, margin: 0, fontFamily: fonts.body }}>{s.what}</p>
          </div>
        ))}
        <p style={{ fontSize: 11.5, color: C.textLight, marginTop: 10, lineHeight: 1.5, fontFamily: fonts.body }}>Timelines summarize the CANMAT/ISBD 2018 guideline and the FDA prescribing information for each medicine;<Cite k="canmat2018" n={1} /> the exact course depends on the medicine, the dose and the person. Details by type are in the table below.</p>
      </Card>

      <div style={{ overflowX: "auto", background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, boxShadow: C.shadow }}>
        <table style={{ width: "100%", minWidth: 760, borderCollapse: "collapse" }}>
          <thead><tr><th style={{ ...th, width: "22%" }}>Type</th><th style={{ ...th, width: "30%" }}>What it's used for</th><th style={{ ...th, width: "20%" }}>Typical time to work</th><th style={th}>Good to know</th></tr></thead>
          <tbody>
            {MED_TYPES.map((m, i) => (
              <tr key={i}>
                <td style={{ ...td, borderLeft: `3px solid ${m.color}` }}>
                  <div style={{ fontFamily: fonts.display, fontSize: 15.5, fontWeight: 700, color: C.text }}>{m.type}</div>
                  <div style={{ fontSize: 12, color: C.textLight, marginTop: 2 }}>{m.kind}</div>
                </td>
                <td style={td}>{m.usedFor}</td>
                <td style={{ ...td, color: C.text, fontWeight: 600 }}>{m.onset}</td>
                <td style={td}>{m.know}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p style={{ fontSize: 11, color: C.textLight, marginTop: 10, lineHeight: 1.55, fontFamily: fonts.body }}>Sources: CANMAT/ISBD guidelines for bipolar disorder (Yatham et al., Bipolar Disorders, 2018); U.S. FDA prescribing information for lithium, divalproex, carbamazepine (Equetro), lamotrigine, quetiapine and lorazepam; ISBD task force on antidepressants (Pacchiarotti et al., Am J Psychiatry, 2013); FDA boxed warning for benzodiazepines (2020).</p>

      <Card style={{ background: "#fef9f0", borderColor: "#f0d8a8", marginTop: 20 }}>
        <p style={{ fontSize: 12.5, color: "#92400e", lineHeight: 1.6, margin: 0, fontFamily: fonts.body }}><strong>Questions worth asking your prescriber:</strong> What is this medicine for in my case? How long before we know if it is working? Which blood tests do I need, and how often? What side effects should make me call you? What happens if I miss a dose? Is it safe if I might become pregnant?</p>
      </Card>
    </Section>
  );
}

// ═══════════════════════════════════════════════════════════════
// FIND HELP
// ═══════════════════════════════════════════════════════════════
function FindHelpPage() {
  const refs = ["emtala", "lifeline988Get", "vcl", "samhsaCrisis", "namiInpatient", "samhsa", "samhsaHelpline", "nasmhpd", "cmsIpfqr", "dolParity", "fdaGenerics", "singlecare", "goodrx", "costplus", "rxassist", "hrsaSliding", "hrsa340b", "oigCoupons", "medicareDrugCosts", "medicarePPP"];
  const n = (k) => refs.indexOf(k) + 1;
  return (
    <Section style={{ paddingTop: 40, paddingBottom: 60 }}>
      <Badge color={C.accent}>Take the Next Step</Badge>
      <h2 style={{ fontFamily: fonts.display, fontSize: 30, fontWeight: 700, color: C.text, margin: "12px 0 8px" }}>Find a Psychiatrist or Therapist</h2>
      <p style={{ fontSize: 15, color: C.textMid, margin: "0 0 28px", maxWidth: 620, lineHeight: 1.65, fontFamily: fonts.body }}>Bipolar disorder usually needs specialized care. A psychiatrist (MD or DO) or psychiatric nurse practitioner prescribes medication; a therapist provides talk therapy. Most people with bipolar disorder benefit from both.</p>

      {/* Provider directories */}
      <h3 style={{ fontFamily: fonts.display, fontSize: 20, fontWeight: 700, color: C.text, margin: "0 0 14px" }}>Provider Search Directories</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 14, marginBottom: 32 }}>
        {[
          { name: "Psychology Today", url: "https://www.psychologytoday.com/us/psychiatrists", desc: "Large directory of therapists and psychiatrists. Filter by insurance, specialty (bipolar), location, and telehealth.", tags: ["Psychiatrists", "Therapists", "Insurance Filter"] },
          { name: "SAMHSA Treatment Locator", url: "https://findtreatment.gov", desc: "Free locator from SAMHSA for licensed mental health and substance use treatment facilities, with filters for payment options such as sliding-scale fees.", tags: ["Free", "Government", "All Providers"] },
          { name: "NAMI Helpline", url: "https://www.nami.org/help", desc: "Call 1-800-950-NAMI (6264) or text \"helpline\" to 62640, Monday to Friday, 10 a.m. to 10 p.m. ET. Free information, referrals and support groups. Not a crisis line: in a crisis, call or text 988.", tags: ["Phone Support", "Referrals", "Free"] },
          { name: "Zocdoc", url: "https://www.zocdoc.com", desc: "Book psychiatrist appointments online. Shows real-time availability, insurance accepted, and patient reviews.", tags: ["Online Booking", "Reviews", "Insurance"] },
          { name: "DBSA Support Groups", url: "https://www.dbsalliance.org/support/chapters-and-support-groups/", desc: "Depression and Bipolar Support Alliance. Find peer-led support groups (in-person and online) specifically for bipolar disorder.", tags: ["Peer Support", "Free", "Bipolar-Specific"] },
          { name: "Open Path Collective", url: "https://openpathcollective.org", desc: "Lower-cost therapy for people without insurance or with high deductibles: about $40–$70 per individual session ($30 with student interns) after a one-time $65 membership fee. Check the site for current rates.", tags: ["Affordable", "No Insurance Needed", "Therapists"] },
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
            {["Board-certified in psychiatry", "Experience treating bipolar disorder specifically", "Comfortable prescribing and monitoring lithium, a first-line bipolar treatment", "Willing to explain medication choices and involve you in decisions", "Available for follow-up within 2–4 weeks of starting new medication", "Monitors labs (lithium levels, metabolic panels, thyroid)"].map((t, i) => (
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
            { title: "Community Mental Health Centers", desc: "Many areas have community mental health centers or clinics with sliding-scale fees. Search findtreatment.gov or call your state or county mental health agency." },
            { title: "University Training Clinics", desc: "Psychiatry residency programs offer supervised care at reduced rates. Quality is often excellent — residents are closely supervised by attending psychiatrists." },
            { title: "Patient Assistance Programs", desc: "Many manufacturers run free or discounted medication programs; NeedyMeds.org and RxAssist.org list them by medication. Generic lithium and many other generics are low-cost with pharmacy discount cards." },
            { title: "Telehealth Options", desc: "Some telehealth services offer psychiatric care. Before signing up, check that they treat bipolar disorder, take your insurance, offer ongoing follow-up with the same prescriber, and can arrange lab tests such as lithium levels." },
          ].map((t, i) => (
            <div key={i}>
              <h4 style={{ fontSize: 14, fontWeight: 700, color: C.text, margin: "0 0 4px", fontFamily: fonts.body }}>{t.title}</h4>
              <p style={{ fontSize: 12.5, color: C.textMid, lineHeight: 1.55, margin: 0, fontFamily: fonts.body }}>{t.desc}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Hospital and crisis care */}
      <h3 style={{ fontFamily: fonts.display, fontSize: 20, fontWeight: 700, color: C.text, margin: "8px 0 8px" }}>Finding a Psychiatric Hospital or Crisis Care</h3>
      <p style={{ fontSize: 14, color: C.textMid, margin: "0 0 14px", maxWidth: 680, lineHeight: 1.65, fontFamily: fonts.body }}>If you or someone you care about may need more than an outpatient visit, these are the official ways to find care. Availability varies by area, so call ahead when there's time.</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 14, marginBottom: 14 }}>
        {[
          { t: "In an emergency: any hospital ER", d: "Federal law (EMTALA) requires hospital emergency departments to check you for an emergency medical condition, including a psychiatric one, and to stabilize you or arrange a transfer, even if you have no insurance or can't pay.", k: "emtala" },
          { t: "988 Suicide & Crisis Lifeline", d: "Free, 24/7 call, text or chat for anyone in crisis, or worried about someone. Spanish: press 2 or text AYUDA to 988. Veterans: press 1, or text 838255. Deaf and hard-of-hearing callers can use 988 Videophone.", k: "lifeline988Get", k2: "vcl" },
          { t: "Mobile crisis teams and crisis centers", d: "SAMHSA's crisis-care model is someone to contact (988), someone to respond (a mobile crisis team that comes to you) and a safe place to go (crisis stabilization or receiving centers). Ask 988 or your county mental health line what serves your area.", k: "samhsaCrisis" },
          { t: "Inpatient or residential treatment", d: "NAMI suggests starting with your psychiatrist or therapist, then calling 2-1-1 or your local NAMI affiliate, asking ERs or crisis centers for referrals, and using SAMHSA's locator at findtreatment.gov. Check coverage with your insurer before admission when you can.", k: "namiInpatient", k2: "samhsa" },
          { t: "SAMHSA National Helpline", d: "1-800-662-4357: free, confidential, 24/7 referrals to local treatment, support groups and state-funded programs, in English and Spanish. It refers; it doesn't provide counseling. Or text your ZIP code to 435748 (English only).", k: "samhsaHelpline" },
          { t: "Your state's mental health agency", d: "Every state has a public mental health authority that runs or funds crisis lines, state hospitals and public clinics. NASMHPD lists each state's agency.", k: "nasmhpd" },
        ].map((x, i) => (
          <Card key={i}>
            <h4 style={{ fontFamily: fonts.display, fontSize: 16, fontWeight: 700, color: C.text, margin: "0 0 6px" }}>{x.t}</h4>
            <p style={{ fontSize: 13, color: C.textMid, lineHeight: 1.55, margin: 0, fontFamily: fonts.body }}>{x.d}<Cite k={x.k} n={n(x.k)} />{x.k2 && <Cite k={x.k2} n={n(x.k2)} />}</p>
          </Card>
        ))}
      </div>
      <Card style={{ marginBottom: 28, background: "#faf8f5" }}>
        <p style={{ fontSize: 13, color: C.textMid, lineHeight: 1.6, margin: "0 0 8px", fontFamily: fonts.body }}><strong>Checking a hospital:</strong> Medicare requires inpatient psychiatric facilities to report quality measures, which CMS publishes in its Provider Data Catalog (data.cms.gov). Care Compare's star ratings don't cover psychiatric hospitals.<Cite k="cmsIpfqr" n={n("cmsIpfqr")} /></p>
        <p style={{ fontSize: 13, color: C.textMid, lineHeight: 1.6, margin: 0, fontFamily: fonts.body }}><strong>If insurance denies care:</strong> the federal parity law generally requires mental health benefits to be no more restrictive than medical ones. Ask for the reason in writing; for employer plans, the Department of Labor helps at 1-866-444-3272.<Cite k="dolParity" n={n("dolParity")} /></p>
      </Card>

      {/* Medication costs */}
      <h3 style={{ fontFamily: fonts.display, fontSize: 20, fontWeight: 700, color: C.text, margin: "0 0 8px" }}>Paying Less for Medication</h3>
      <p style={{ fontSize: 14, color: C.textMid, margin: "0 0 14px", maxWidth: 680, lineHeight: 1.65, fontFamily: fonts.body }}>We don't list coupon codes: they expire, change by pharmacy, and fake ones circulate. These are the legitimate programs behind them. Prices change often, so compare before each refill.</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 14, marginBottom: 14 }}>
        {[
          { t: "Ask for the generic", d: "Generics have the same active ingredient and work the same way as the brand, and usually cost much less. Most mood stabilizers and many antipsychotics used for bipolar disorder come as generics. Ask your prescriber or pharmacist.", k: "fdaGenerics" },
          { t: "Free discount cards (GoodRx, SingleCare)", d: "Free coupons accepted at many pharmacies. You pay either the coupon price or your insurance price for a fill, not both, and coupon fills may not count toward your deductible. Ask the pharmacist which is cheaper.", k: "singlecare", k2: "goodrx" },
          { t: "Cost Plus Drugs", d: "Online pharmacy that charges its cost plus a 15% markup, a pharmacy fee and shipping. Search your drug; if it's listed, your prescriber sends the prescription there. Insurance is accepted only from some plans.", k: "costplus" },
          { t: "Free-drug programs from manufacturers", d: "Drug companies run patient assistance programs that give free or low-cost medicine to eligible people, usually uninsured or underinsured with income under a limit. RxAssist lists them by drug; your prescriber fills in part of the form.", k: "rxassist" },
          { t: "Community health centers", d: "Federally funded health centers must offer a sliding fee based on income and family size and can't turn you away for inability to pay. Many buy drugs at discounted 340B prices; ask the pharmacy whether those savings reach patients. Find one at findahealthcenter.hrsa.gov.", k: "hrsaSliding", k2: "hrsa340b" },
        ].map((x, i) => (
          <Card key={i}>
            <h4 style={{ fontFamily: fonts.display, fontSize: 16, fontWeight: 700, color: C.text, margin: "0 0 6px" }}>{x.t}</h4>
            <p style={{ fontSize: 13, color: C.textMid, lineHeight: 1.55, margin: 0, fontFamily: fonts.body }}>{x.d}<Cite k={x.k} n={n(x.k)} />{x.k2 && <Cite k={x.k2} n={n(x.k2)} />}</p>
          </Card>
        ))}
      </div>
      <Card style={{ marginBottom: 20, borderLeft: `3px solid ${C.blue}` }}>
        <h4 style={{ fontFamily: fonts.display, fontSize: 16, fontWeight: 700, color: C.blue, margin: "0 0 8px" }}>If you have Medicare or Medicaid</h4>
        <ul style={{ margin: 0, paddingLeft: 18 }}>
          <li style={{ fontSize: 13, color: C.textMid, lineHeight: 1.6, marginBottom: 6, fontFamily: fonts.body }}>Manufacturer copay cards generally can't be used when Medicare Part D or another federal program pays.<Cite k="oigCoupons" n={n("oigCoupons")} /> Free-drug programs, Extra Help and state programs follow different rules.</li>
          <li style={{ fontSize: 13, color: C.textMid, lineHeight: 1.6, marginBottom: 6, fontFamily: fonts.body }}><strong>Extra Help</strong> lowers Part D premiums, deductibles and copays for people with limited income and resources; it's automatic with full Medicaid, a Medicare Savings Program or SSI. Apply through Social Security or get free counseling from your state's SHIP.<Cite k="medicareDrugCosts" n={n("medicareDrugCosts")} /></li>
          <li style={{ fontSize: 13, color: C.textMid, lineHeight: 1.6, marginBottom: 6, fontFamily: fonts.body }}>Out-of-pocket costs for covered Part D drugs are capped at <strong>$2,100 in 2026</strong>. The Medicare Prescription Payment Plan can spread those costs into monthly bills (it doesn't lower the total).<Cite k="medicarePPP" n={n("medicarePPP")} /></li>
          <li style={{ fontSize: 13, color: C.textMid, lineHeight: 1.6, margin: 0, fontFamily: fonts.body }}>Some states run their own drug-cost programs; Medicare's Plan Finder lists them by state. Medicaid questions go to your state Medicaid office.<Cite k="medicareDrugCosts" n={n("medicareDrugCosts")} /></li>
        </ul>
      </Card>

      {/* Crisis */}
      <Card style={{ background: "#fef9f0", borderColor: "#f0d8a8", textAlign: "center" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: C.warm, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6, fontFamily: fonts.body }}>Crisis Resources — Available 24/7</div>
        <div style={{ fontFamily: fonts.display, fontSize: 24, fontWeight: 700, color: C.text }}>988 Suicide & Crisis Lifeline</div>
        <p style={{ fontFamily: fonts.body, fontSize: 14, color: C.textMid, margin: "6px 0 0" }}>Call or text <strong>988</strong> · Chat: <strong>988lifeline.org</strong> · Crisis Text Line: text <strong>HOME</strong> to <strong>741741</strong></p>
      </Card>
      <div style={{ marginTop: 20 }}><Sources keys={refs} /></div>
    </Section>
  );
}

// ═══════════════════════════════════════════════════════════════
// CITATIONS (shared by the therapy and medication pages)
// Every research claim on these pages links to the paper or agency page it comes from. Links go to PubMed
// (which carries the abstract and a link to the journal), to the FDA, NIMH or the professional body itself.
// ═══════════════════════════════════════════════════════════════
const REFS = {
  chiang2017: { t: "Chiang et al., PLOS One, 2017: meta-analysis of 19 RCTs of CBT for bipolar disorder", u: "https://pubmed.ncbi.nlm.nih.gov/28472082/" },
  miklowitz2007: { t: "Miklowitz et al., Arch Gen Psychiatry, 2007: STEP-BD psychotherapy trial", u: "https://pubmed.ncbi.nlm.nih.gov/17404119/" },
  lam2003: { t: "Lam et al., Arch Gen Psychiatry, 2003: CBT relapse-prevention RCT, 103 patients", u: "https://pubmed.ncbi.nlm.nih.gov/12578431/" },
  scott2006: { t: "Scott et al., Br J Psychiatry, 2006: multicentre CBT RCT, 253 patients", u: "https://pubmed.ncbi.nlm.nih.gov/16582056/" },
  pavlova2015: { t: "Pavlova et al., Lancet Psychiatry, 2015: anxiety disorders in bipolar disorder, meta-analysis", u: "https://pubmed.ncbi.nlm.nih.gov/26249302/" },
  goldstein2024: { t: "Goldstein et al., JAMA Psychiatry, 2024 (online Sept. 2023): DBT for adolescents with bipolar disorder, RCT", u: "https://pubmed.ncbi.nlm.nih.gov/37755816/" },
  eisner2017: { t: "Eisner et al., Behavior Therapy, 2017: DBT skills group for bipolar disorder, open pilot", u: "https://pubmed.ncbi.nlm.nih.gov/28577590/" },
  vandijk2013: { t: "Van Dijk et al., J Affect Disord, 2013: DBT-based psychoeducational group for bipolar I and II, pilot RCT", u: "https://pubmed.ncbi.nlm.nih.gov/23021820/" },
  linehan2015: { t: "Linehan, DBT Skills Training Manual, 2nd ed. (2015; revised ed. 2025), Guilford Press", u: "https://www.guilford.com/books/DBT-Skills-Training-Manual/Marsha-Linehan/9781462516995" },
  linehanHandouts: { t: "Linehan, DBT Skills Training Handouts and Worksheets, 2nd ed., Guilford Press, 2015", u: "https://www.guilford.com/books/DBT-Skills-Training-Handouts-and-Worksheets/Marsha-Linehan/9781572307810" },
  basco: { t: "Basco, The Bipolar Workbook, 2nd ed., Guilford Press, 2015", u: "https://www.guilford.com/books/The-Bipolar-Workbook/Monica-Ramirez-Basco/9781462520237" },
  padesky: { t: "Greenberger & Padesky, Mind Over Mood, 2nd ed., Guilford Press, 2015", u: "https://www.guilford.com/books/Mind-Over-Mood/Greenberger-Padesky/9781462520428" },
  nimhBipolar: { t: "NIMH, Bipolar Disorder: treatments and therapies", u: "https://www.nimh.nih.gov/health/topics/bipolar-disorder" },
  nimhMeds: { t: "NIMH, Mental Health Medications", u: "https://www.nimh.nih.gov/health/topics/mental-health-medications" },
  canmat2018: { t: "Yatham et al., CANMAT/ISBD 2018 guidelines for bipolar disorder, Bipolar Disorders", u: "https://pubmed.ncbi.nlm.nih.gov/29536616/" },
  abct: { t: "Association for Behavioral and Cognitive Therapies: Find a CBT Therapist", u: "https://services.abct.org/find-a-therapist/" },
  dbtlbc: { t: "DBT-Linehan Board of Certification: certified clinicians and programs", u: "https://dbt-lbc.org/" },
  btech: { t: "Behavioral Tech Institute (founded by Marsha Linehan): find a DBT provider", u: "https://behavioraltech.org/find-a-therapist-app" },
  dbsa: { t: "Depression and Bipolar Support Alliance: free peer support groups", u: "https://www.dbsalliance.org/support/chapters-and-support-groups/" },
  nami: { t: "NAMI: free peer-led programs and support groups", u: "https://www.nami.org/Support-Education/Mental-Health-Education" },
  samhsa: { t: "SAMHSA FindTreatment.gov: locate treatment, including sliding-scale programs", u: "https://findtreatment.gov/" },
  // Family & Friends page
  dbsaHelp: { t: "DBSA, Helping a Friend or Family Member with Depression or Bipolar Disorder (2018)", u: "https://www.dbsalliance.org/wp-content/uploads/2019/02/HelpingFriendsFamily2018.pdf" },
  dbsaWhatHelps: { t: "DBSA, What Helps and What Hurts", u: "https://www.dbsalliance.org/wp-content/uploads/2019/02/what_helps_what_hurts.pdf" },
  namiParenting: { t: "NAMI, 10 Questions on Parenting a Grown Child with Bipolar Disorder", u: "https://www.nami.org/in-the-news/10-questions-on-parenting-a-grown-child-with-bipolar-disorder/" },
  namiFamily: { t: "NAMI, Family Members and Caregivers", u: "https://nami.org/find-support/family-members-and-caregivers" },
  namiCrisisGuide: { t: "NAMI, Navigating a Mental Health Crisis", u: "https://nami.org/Support-Education/Publications-Reports/Guides/Navigating-a-Mental-Health-Crisis" },
  apaPad: { t: "American Psychiatric Association, Psychiatric Advance Directives", u: "https://www.psychiatry.org/patients-families/psychiatric-advance-directives-1" },
  hhsHipaa: { t: "HHS, HIPAA Privacy Rule and Sharing Information Related to Mental Health", u: "https://www.hhs.gov/sites/default/files/hipaa-privacy-rule-and-sharing-info-related-to-mental-health.pdf" },
  lifeline988Help: { t: "988 Lifeline, Help Someone Else", u: "https://988lifeline.org/help-someone-else/" },
  lifeline988Signs: { t: "988 Lifeline, Know the Warning Signs", u: "https://988lifeline.org/learn/warning-signs/" },
  nimh5Steps: { t: "NIMH, 5 Action Steps to Help Someone Having Thoughts of Suicide", u: "https://www.nimh.nih.gov/health/publications/5-action-steps-to-help-someone-having-thoughts-of-suicide" },
  namiF2F: { t: "NAMI Family-to-Family education program", u: "https://www.nami.org/familytofamily" },
  namiFSG: { t: "NAMI Family Support Group", u: "https://www.nami.org/?p=1004" },
  alanon: { t: "Al-Anon Family Groups", u: "https://al-anon.org/" },
  miklowitz2003: { t: "Miklowitz et al., Arch Gen Psychiatry, 2003: family-focused therapy plus medication, 2-year RCT", u: "https://www.epistemonikos.org/en/documents/3808de2902d36fb9288e01885470d736f9dedf93" },
  nimhFFT2007: { t: "NIMH, Intensive Psychotherapy More Effective Than Brief Therapy for Treating Bipolar Depression (2007)", u: "https://www.nimh.nih.gov/news/science-updates/2007/intensive-psychotherapy-more-effective-than-brief-therapy-for-treating-bipolar-depression" },
  // Episodes page
  aafp2021: { t: "Marzani & Neff, Bipolar Disorders: Evaluation and Treatment, American Family Physician, 2021", u: "https://www.aafp.org/afp/2021/0215/p227" },
  statpearlsBipolar: { t: "StatPearls (NCBI Bookshelf), Bipolar Disorder", u: "https://www.ncbi.nlm.nih.gov/books/NBK558998/" },
  nimhPub: { t: "NIMH, Bipolar Disorder (publication)", u: "https://www.nimh.nih.gov/health/publications/bipolar-disorder" },
  hu2014: { t: "Hu et al., 2014: mixed features in bipolar disorder (DSM-5 specifier) and suicidality, review", u: "https://pmc.ncbi.nlm.nih.gov/articles/PMC4116292/" },
  dbsaMania: { t: "DBSA, Understanding Mania (handout)", u: "https://www.dbsalliance.org/wp-content/uploads/2026/05/Understanding-Mania-HandoutV2-Optum-rightweb-1.pdf" },
  jackson2003: { t: "Jackson et al., J Affect Disord, 2003: systematic review of manic and depressive prodromes", u: "https://kclpure.kcl.ac.uk/portal/en/publications/a-systematic-review-of-manic-and-depressive-prodromes/" },
  morriss2004: { t: "Morriss, Advances in Psychiatric Treatment: early warning symptom intervention in bipolar disorder", u: "https://www.cambridge.org/core/journals/advances-in-psychiatric-treatment/article/early-warning-symptom-intervention-for-patients-with-bipolar-affective-disorder/FD9FFC214870996B310EE68F120F3781" },
  dbsaTracker: { t: "DBSA Wellness Tracker (symptoms). Its printed crisis number is retired; use 988.", u: "https://www.dbsalliance.org/wp-content/uploads/2020/07/DBSA-WellnessTracker-Symptoms.pdf" },
  medlineplusBipolar: { t: "MedlinePlus, Bipolar disorder: when to contact a provider", u: "https://medlineplus.gov/ency/article/000926.htm" },
  // Find Help: hospital and crisis care
  emtala: { t: "CMS, Emergency room rights (EMTALA)", u: "https://www.cms.gov/Priorities/your-patient-rights/emergency-room-rights" },
  lifeline988Get: { t: "988 Suicide & Crisis Lifeline, Get Help", u: "https://988lifeline.org/get-help/" },
  vcl: { t: "Veterans Crisis Line, What is 988", u: "https://veteranscrisisline.net/about/what-is-988/" },
  samhsaCrisis: { t: "SAMHSA, National Behavioral Health Crisis Care", u: "https://www.samhsa.gov/mental-health/national-behavioral-health-crisis-care" },
  namiInpatient: { t: "NAMI HelpLine, How can I find an inpatient or residential treatment facility?", u: "https://helplinefaqs.nami.org/article/64-how-can-i-find-an-inpatient-or-residential-treatment-facility" },
  samhsaHelpline: { t: "SAMHSA National Helpline", u: "https://www.samhsa.gov/find-help/helplines/national-helpline" },
  nasmhpd: { t: "NASMHPD, state mental health commissioners", u: "https://nasmhpd.org/commisioners_edit" },
  cmsIpfqr: { t: "CMS, Inpatient Psychiatric Facility Quality Reporting (IPFQR) Program", u: "https://www.cms.gov/medicare/quality/initiatives/hospital-quality-initiative/inpatient-psychiatric-facility-quality-reporting-ipfqr-program" },
  dolParity: { t: "U.S. Department of Labor, consumer guide to mental health parity", u: "https://dol.gov/sites/dolgov/files/EBSA/laws-and-regulations/laws/mental-health-parity/consumer-guide-mental-health-benefits.pdf" },
  // Find Help: medication costs
  fdaGenerics: { t: "FDA, Generic Drug Facts", u: "https://www.fda.gov/drugs/generic-drugs/generic-drug-facts" },
  singlecare: { t: "SingleCare, How to get cheap prescriptions", u: "https://www.singlecare.com/resources/cheap-prescriptions" },
  goodrx: { t: "GoodRx, Will my insurance pay for GoodRx?", u: "https://www.goodrx.com/blog/will-my-insurance-pay-for-goodrx/" },
  costplus: { t: "Mark Cuban Cost Plus Drug Company, FAQ", u: "https://costplusdrugs.com/faq/" },
  rxassist: { t: "RxAssist, patient assistance programs FAQ", u: "https://rxassist.org/faqs" },
  hrsaSliding: { t: "HRSA Health Center Program Compliance Manual, sliding fee discount program", u: "https://bphc.hrsa.gov/compliance/compliance-manual/chapter9" },
  hrsa340b: { t: "HRSA, 340B Drug Pricing Program", u: "https://www.hrsa.gov/opa" },
  oigCoupons: { t: "HHS Office of Inspector General, 2014: manufacturer copay coupons and Part D", u: "https://oig.hhs.gov/reports/all/2014/manufacturer-safeguards-may-not-prevent-copayment-coupon-use-for-part-d-drugs/" },
  medicareDrugCosts: { t: "Medicare.gov, Help with drug costs (Extra Help, state programs)", u: "https://www.medicare.gov/basics/costs/help/drug-costs" },
  medicarePPP: { t: "Medicare.gov, Medicare Prescription Payment Plan", u: "https://medicare.gov/prescription-payment-plan/before-payment-option" },
};
function Cite({ k, n }) {
  const r = REFS[k];
  if (!r) return null;
  return <a href={r.u} target="_blank" rel="noopener noreferrer" title={r.t} style={{ fontSize: 10.5, verticalAlign: "super", textDecoration: "none", color: C.accent, marginLeft: 2, fontFamily: fonts.body }}>[{n}]</a>;
}
function Sources({ keys }) {
  return (
    <Card style={{ background: "#f6f5f1", marginBottom: 20, padding: "14px 18px" }}>
      <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: C.textLight, marginBottom: 6, fontFamily: fonts.body }}>Sources on this page</div>
      <ol style={{ margin: 0, paddingLeft: 20, fontSize: 12, color: C.textMid, lineHeight: 1.6, fontFamily: fonts.body }}>
        {keys.map((k, i) => <li key={k} id={`ref-${k}`}><a href={REFS[k].u} target="_blank" rel="noopener noreferrer" style={{ color: C.textMid }}>{REFS[k].t}</a></li>)}
      </ol>
    </Card>
  );
}
// Months, not days: the one message every page about treatment repeats.
function TimeBox({ children, color = C.accent }) {
  return (
    <Card style={{ marginBottom: 24, borderLeft: `4px solid ${color}`, background: `${color}0d`, padding: "16px 20px" }}>
      <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color, marginBottom: 4, fontFamily: fonts.body }}>Give it time</div>
      <div style={{ fontSize: 14, color: C.text, lineHeight: 1.65, fontFamily: fonts.body }}>{children}</div>
    </Card>
  );
}
const SubHead = ({ children }) => <h3 style={{ fontFamily: fonts.display, fontSize: 20, fontWeight: 700, color: C.text, margin: "0 0 14px" }}>{children}</h3>;
const Para = ({ children, style }) => <p style={{ fontSize: 14, color: C.textMid, lineHeight: 1.65, margin: "0 0 12px", fontFamily: fonts.body, ...style }}>{children}</p>;

// ═══════════════════════════════════════════════════════════════
// FAMILY & FRIENDS PAGE
// ═══════════════════════════════════════════════════════════════
function FamilyPage() {
  const refs = ["dbsaHelp", "dbsaWhatHelps", "namiParenting", "namiFamily", "namiCrisisGuide", "apaPad", "hhsHipaa", "lifeline988Help", "lifeline988Signs", "nimh5Steps", "namiF2F", "namiFSG", "alanon", "miklowitz2003", "nimhFFT2007", "dbsa"];
  const n = (k) => refs.indexOf(k) + 1;
  const Item = ({ children, k, k2 }) => (
    <li style={{ fontSize: 14, color: C.textMid, lineHeight: 1.65, marginBottom: 8, fontFamily: fonts.body }}>{children}<Cite k={k} n={n(k)} />{k2 && <Cite k={k2} n={n(k2)} />}</li>
  );
  const List = ({ children }) => <ul style={{ margin: 0, paddingLeft: 20 }}>{children}</ul>;
  return (
    <Section style={{ paddingTop: 40, paddingBottom: 60 }}>
      <Badge color={C.blue}>For Family & Friends</Badge>
      <h2 style={{ fontFamily: fonts.display, fontSize: 30, fontWeight: 700, color: C.text, margin: "12px 0 8px" }}>Supporting Someone With Bipolar Disorder</h2>
      <p style={{ fontSize: 15, color: C.textMid, margin: "0 0 20px", maxWidth: 680, lineHeight: 1.65, fontFamily: fonts.body }}>Practical guidance for partners, parents, friends and anyone close to someone with bipolar disorder, drawn from the Depression and Bipolar Support Alliance (DBSA), NAMI, NIMH and the 988 Lifeline. Bipolar disorder is nobody's fault, not yours and not your loved one's.<Cite k="dbsaHelp" n={n("dbsaHelp")} /></p>

      <Card style={{ background: "#fdf2f2", borderColor: "#e8c4c4", marginBottom: 24, padding: "14px 20px" }}>
        <p style={{ fontSize: 13.5, color: "#7a3030", lineHeight: 1.6, margin: 0, fontFamily: fonts.body }}><strong>If someone may be in danger right now:</strong> call or text <strong>988</strong>, the Suicide & Crisis Lifeline (you can call for help supporting someone else, too),<Cite k="lifeline988Help" n={n("lifeline988Help")} /> or call <strong>911</strong> or go to the nearest emergency room.<Cite k="dbsaHelp" n={n("dbsaHelp")} /></p>
      </Card>

      <Card style={{ marginBottom: 20, borderLeft: `3px solid ${C.teal}` }}>
        <SubHead>Day to day</SubHead>
        <List>
          <Item k="dbsaHelp">Learn about the illness, its symptoms and its treatments. Understanding it makes it easier to respond helpfully.</Item>
          <Item k="dbsaHelp">Encourage treatment without forcing it. You can explain that treatment doesn't change who someone is, and it can ease symptoms a great deal.</Item>
          <Item k="dbsaHelp">Offer practical help, such as going with them to appointments if they'd like you to.</Item>
          <Item k="namiParenting">Respect their independence. For an adult, treatment decisions are ultimately theirs, even when you would choose differently.</Item>
          <Item k="dbsaWhatHelps">Ask what would help instead of guessing, and let them tell you what they need right now.</Item>
        </List>
      </Card>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 14, marginBottom: 20 }}>
        <Card style={{ borderTop: `3px solid ${C.teal}` }}>
          <SubHead>What can help to say</SubHead>
          <List>
            <Item k="dbsaWhatHelps">Acknowledge that what they're feeling comes from a real illness.</Item>
            <Item k="dbsaWhatHelps">"What would help right now?"</Item>
            <Item k="dbsaWhatHelps">During depression: remind them that feelings change, even if they can't believe it yet.</Item>
          </List>
        </Card>
        <Card style={{ borderTop: `3px solid ${C.red}` }}>
          <SubHead>What tends to hurt</SubHead>
          <List>
            <Item k="dbsaWhatHelps">"It's all in your head."</Item>
            <Item k="dbsaWhatHelps">"We all go through times like this."</Item>
            <Item k="dbsaWhatHelps">"Look on the bright side."</Item>
            <Item k="dbsaWhatHelps">"Snap out of it." Mood episodes are symptoms of an illness, not a choice.</Item>
          </List>
        </Card>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 14, marginBottom: 20 }}>
        <Card style={{ borderLeft: `3px solid ${C.blue}` }}>
          <SubHead>During depression</SubHead>
          <List>
            <Item k="dbsaHelp">Help them keep some kind of daily routine, even if they'd rather stay in bed.</Item>
            <Item k="dbsaWhatHelps">Remind them that this will change.</Item>
            <Item k="lifeline988Signs">Watch for suicide warning signs (below), especially if they are new or getting worse.</Item>
          </List>
        </Card>
        <Card style={{ borderLeft: `3px solid ${C.warm}` }}>
          <SubHead>During mania or hypomania</SubHead>
          <List>
            <Item k="dbsaHelp">Calmly tell them you're concerned and what, specifically, you've noticed.</Item>
            <Item k="dbsaHelp">Where it fits, gently ask whether they've missed any doses of medication.</Item>
            <Item k="dbsaHelp">Urge them to put off big projects, large purchases and long drives until they're well.</Item>
            <Item k="dbsaHelp">Set limits that protect you both; DBSA's example is not lending money when manic symptoms appear.</Item>
            <Item k="dbsaHelp">Your safety matters too. If they become abusive, get help from someone you trust, a mental health professional, or 911.</Item>
          </List>
        </Card>
      </div>

      <Card style={{ marginBottom: 20, borderLeft: `3px solid #7c3aed` }}>
        <SubHead>Plan ahead together while things are stable</SubHead>
        <List>
          <Item k="dbsaHelp">Write a plan together for mania and for suicide prevention, and give copies to trusted friends and relatives. List their own early warning signs and what people can do when they see them.</Item>
          <Item k="namiFamily" k2="namiCrisisGuide">Many clinicians ask patients to make a crisis plan; NAMI suggests sharing it with family. NAMI's free Crisis Guide includes a Portable Treatment Record to start one.</Item>
          <Item k="apaPad">A <strong>psychiatric advance directive</strong> is a legal document that records the treatments a person does or doesn't want, in case they can't decide during a crisis, and can name a trusted person to decide for them. Most states have their own form.</Item>
          <Item k="hhsHipaa">Privacy law (HIPAA) lets clinicians talk with family and friends involved in care when the patient agrees or doesn't object, and it never stops a clinician from listening to what you tell them. Signing a release while well makes this easier.</Item>
        </List>
      </Card>

      <Card style={{ marginBottom: 20, borderLeft: `3px solid ${C.red}` }}>
        <SubHead>Suicide warning signs and what to do</SubHead>
        <Para>Warning signs matter most when they're new, increasing, or seem linked to a painful event, loss or change.<Cite k="lifeline988Help" n={n("lifeline988Help")} /> They include talking about wanting to die, feeling hopeless, trapped or like a burden; drinking or using more; agitation or reckless behavior; sleeping too little or too much; withdrawing; rage; and extreme mood swings.<Cite k="lifeline988Signs" n={n("lifeline988Signs")} /></Para>
        <ol style={{ margin: "0 0 0 0", paddingLeft: 20 }}>
          <Item k="nimh5Steps"><strong>Ask directly</strong> whether they're thinking about suicide. Asking does not make suicidal thoughts or behavior more likely.</Item>
          <Item k="nimh5Steps"><strong>Be there and listen</strong> without judgment.</Item>
          <Item k="nimh5Steps"><strong>Help keep them safe</strong> by reducing access to highly lethal items, such as securing or removing firearms and medications.</Item>
          <Item k="nimh5Steps" k2="lifeline988Help"><strong>Help them connect:</strong> call or text 988 together, or contact 988 yourself for advice.</Item>
          <Item k="nimh5Steps"><strong>Follow up</strong> after a crisis or a hospital stay. Ongoing contact helps.</Item>
        </ol>
        <Para style={{ marginTop: 8, marginBottom: 0 }}>Don't promise to keep suicidal thoughts secret, and don't handle an emergency alone: call 911, or go to a crisis center or emergency room.<Cite k="dbsaHelp" n={n("dbsaHelp")} /></Para>
      </Card>

      <Card style={{ marginBottom: 20, borderLeft: `3px solid ${C.teal}` }}>
        <SubHead>Take care of yourself, too</SubHead>
        <List>
          <Item k="namiFamily">You can care for the people you love better when you look after yourself.</Item>
          <Item k="dbsaHelp">It's common for family members to feel stressed, anxious or depressed. You deserve help and comfort too.</Item>
          <Item k="namiF2F"><strong>NAMI Family-to-Family</strong>: a free 8-session class for family, partners and friends, taught by trained family members.</Item>
          <Item k="namiFSG"><strong>NAMI Family Support Groups</strong>: free, peer-led groups for adult loved ones.</Item>
          <Item k="dbsa"><strong>DBSA support groups</strong>, in person and online, including groups for families and friends.</Item>
          <Item k="alanon"><strong>Al-Anon</strong>, if you're worried about someone's drinking.</Item>
        </List>
      </Card>

      <Card style={{ marginBottom: 20, borderLeft: `3px solid ${C.accent}` }}>
        <SubHead>Family-focused therapy: what the research shows</SubHead>
        <Para>Family-focused therapy (FFT) brings the family into treatment, alongside medication: learning about the illness together, communication training, and problem-solving.<Cite k="miklowitz2003" n={n("miklowitz2003")} /></Para>
        <List>
          <Item k="miklowitz2003">In a 2003 randomized trial of 101 patients, 35% of those receiving FFT relapsed, compared with 54% receiving crisis management.</Item>
          <Item k="nimhFFT2007">In an NIMH-funded study of 293 people with bipolar depression, 64% of those in intensive therapy (including FFT) recovered within a year, versus 52% in a brief three-session program, and they recovered sooner.</Item>
        </List>
        <Para style={{ marginTop: 8, marginBottom: 0 }}>Ask the treating clinician whether family sessions are available.</Para>
      </Card>

      <Sources keys={refs} />
    </Section>
  );
}


// ═══════════════════════════════════════════════════════════════
// EPISODES PAGE
// ═══════════════════════════════════════════════════════════════
const EPISODES = [
  { name: "Manic episode", color: "#c23030", duration: "At least 1 week, most of the day, nearly every day (or any length if hospitalization is needed)",
    core: "An unusually high, expansive or irritable mood together with unusually increased activity or energy, plus at least 3 of the symptoms below (4 if the mood is only irritable).",
    severity: "Serious enough to cause marked problems at work, school or in relationships, or to need hospitalization, or there are psychotic symptoms. A manic episode is what defines bipolar I." },
  { name: "Hypomanic episode", color: "#b8510d", duration: "At least 4 days in a row, most of the day, nearly every day",
    core: "The same kind of mood and energy change and the same symptoms as mania, clearly different from the person's usual self and noticeable to others.",
    severity: "Not severe enough to cause marked problems or need hospitalization, and no psychosis (psychosis makes it mania). It can feel productive or pleasant, so the person may not see a problem while others do." },
  { name: "Major depressive episode", color: C.blue, duration: "At least 2 weeks, nearly every day",
    core: "At least 5 of 9 depressive symptoms, including depressed mood or loss of interest or pleasure.",
    severity: "Causes real distress or gets in the way of work, school, relationships or daily life." },
];
const MANIA_SX = ["Feeling unusually important, talented or powerful (grandiosity)", "Needing much less sleep and still feeling rested", "Talking more than usual, or feeling pressure to keep talking", "Racing thoughts or jumping between ideas", "Being easily distracted", "Much more activity (social, work, school or sexual), or restless, purposeless activity", "Risky activities with painful consequences, such as spending sprees or reckless decisions"];
const DEP_SX = ["Depressed mood most of the day", "Loss of interest or pleasure in most activities", "Big change in appetite or weight", "Sleeping too little or too much", "Moving or speaking noticeably slower, or restlessness others can see", "Fatigue or loss of energy", "Feeling worthless or excessively guilty", "Trouble concentrating or deciding", "Recurring thoughts of death or suicide"];
const URGENT = ["Thoughts of suicide or of hurting someone", "Seeing or hearing things others don't, or beliefs others find impossible", "Hardly sleeping for several days", "Behaving in ways that are unsafe or reckless", "Unable to leave the house or take care of basic needs"];

function EpisodesPage() {
  const refs = ["aafp2021", "statpearlsBipolar", "nimhPub", "hu2014", "dbsaMania", "jackson2003", "morriss2004", "dbsaTracker", "medlineplusBipolar", "nimhBipolar"];
  const n = (k) => refs.indexOf(k) + 1;
  const [hi, setHi] = useState({});
  const [lo, setLo] = useState({});
  const [ur, setUr] = useState({});
  const [done, setDone] = useState(false);
  const hiN = Object.values(hi).filter(Boolean).length, loN = Object.values(lo).filter(Boolean).length, urN = Object.values(ur).filter(Boolean).length;
  const Check = ({ label, on, flip, color }) => (
    <button onClick={flip} style={{ display: "flex", gap: 10, alignItems: "flex-start", width: "100%", textAlign: "left", padding: "9px 12px", marginBottom: 6, borderRadius: 9, cursor: "pointer", fontFamily: fonts.body, fontSize: 13.5, lineHeight: 1.45,
      border: on ? `1.5px solid ${color}` : `1px solid ${C.border}`, background: on ? `${color}10` : C.card, color: C.text }}>
      <span style={{ flexShrink: 0, width: 18, height: 18, borderRadius: 5, border: `1.5px solid ${on ? color : C.border}`, background: on ? color : "transparent", color: "#fff", fontSize: 12, lineHeight: "16px", textAlign: "center" }}>{on ? "✓" : ""}</span>{label}
    </button>
  );
  let verdict = null;
  if (done) {
    if (urN > 0) verdict = { color: C.red, title: "Get help now", text: "You checked something that sources say needs help right away. Call or text 988, call 911, or go to the nearest emergency room. If you can, tell someone you trust what's happening." };
    else if (hiN >= 3 && loN >= 3) verdict = { color: "#7c3aed", title: "Highs and lows at the same time: contact your prescriber soon", text: "You checked several signs from both lists. When high and low symptoms happen together (called mixed features), episodes tend to be harder to treat and riskier, so this is worth a call to your prescriber or clinician in the next day or two, not at the next routine visit." };
    else if (hiN >= 3 || loN >= 3) verdict = { color: C.warm, title: "Worth telling your prescriber about", text: `You checked several signs from the ${hiN >= 3 ? "high (manic or hypomanic)" : "low (depressive)"} list. Only a clinician can say whether this is an episode, but changes like these are exactly what to report early. If they get worse, or you aren't taking medication as prescribed, call sooner.` };
    else if (hiN + loN > 0) verdict = { color: C.teal, title: "Keep an eye on it", text: "You checked a few signs. Write them down with today's date, and watch whether they last or grow over the next days. Your own early warning signs are worth knowing: tell your clinician if they persist." };
    else verdict = { color: C.teal, title: "Nothing checked", text: "Stable stretches are the best time to write down your personal early warning signs and make a plan with the people you trust." };
  }
  return (
    <Section style={{ paddingTop: 40, paddingBottom: 60 }}>
      <Badge color={C.warm}>Understanding Episodes</Badge>
      <h2 style={{ fontFamily: fonts.display, fontSize: 30, fontWeight: 700, color: C.text, margin: "12px 0 8px" }}>Types of Mood Episodes</h2>
      <p style={{ fontSize: 15, color: C.textMid, margin: "0 0 20px", maxWidth: 680, lineHeight: 1.65, fontFamily: fonts.body }}>Bipolar disorder moves through distinct periods called episodes. Knowing what each looks like, and your own early warning signs, helps you and the people around you act early. The descriptions follow the DSM-5 criteria clinicians use.<Cite k="aafp2021" n={n("aafp2021")} /><Cite k="statpearlsBipolar" n={n("statpearlsBipolar")} /> Only a clinician can say which episode, if any, someone is in.</p>

      {EPISODES.map((e, i) => (
        <Card key={i} style={{ marginBottom: 14, borderLeft: `4px solid ${e.color}` }}>
          <h3 style={{ fontFamily: fonts.display, fontSize: 20, fontWeight: 700, color: e.color, margin: "0 0 6px" }}>{e.name}</h3>
          <div style={{ fontSize: 12, fontWeight: 700, color: C.textLight, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8, fontFamily: fonts.body }}>{e.duration}</div>
          <Para>{e.core}<Cite k="aafp2021" n={n("aafp2021")} /></Para>
          <Para style={{ margin: 0 }}>{e.severity}<Cite k="aafp2021" n={n("aafp2021")} />{i === 1 && <Cite k="nimhPub" n={n("nimhPub")} />}</Para>
        </Card>
      ))}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 14, margin: "6px 0 20px" }}>
        <Card style={{ borderTop: `3px solid #c23030` }}>
          <SubHead>Symptoms of mania and hypomania</SubHead>
          <ul style={{ margin: 0, paddingLeft: 18 }}>{MANIA_SX.map((s, i) => <li key={i} style={{ fontSize: 13.5, color: C.textMid, lineHeight: 1.6, marginBottom: 4, fontFamily: fonts.body }}>{s}</li>)}</ul>
          <p style={{ fontSize: 11.5, color: C.textLight, margin: "8px 0 0", fontFamily: fonts.body }}>DSM-5 criterion B, in plain English.<Cite k="aafp2021" n={n("aafp2021")} /></p>
        </Card>
        <Card style={{ borderTop: `3px solid ${C.blue}` }}>
          <SubHead>Symptoms of a depressive episode</SubHead>
          <ul style={{ margin: 0, paddingLeft: 18 }}>{DEP_SX.map((s, i) => <li key={i} style={{ fontSize: 13.5, color: C.textMid, lineHeight: 1.6, marginBottom: 4, fontFamily: fonts.body }}>{s}</li>)}</ul>
          <p style={{ fontSize: 11.5, color: C.textLight, margin: "8px 0 0", fontFamily: fonts.body }}>The nine DSM-5 symptoms, in plain English.<Cite k="statpearlsBipolar" n={n("statpearlsBipolar")} /></p>
        </Card>
      </div>

      <SubHead>Patterns clinicians also look for</SubHead>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 12, marginBottom: 24 }}>
        <Card><h4 style={{ fontSize: 15, fontWeight: 700, color: "#7c3aed", margin: "0 0 6px", fontFamily: fonts.body }}>Mixed features</h4><Para style={{ margin: 0, fontSize: 13.5 }}>Not a separate episode: a manic or hypomanic episode with at least 3 depressive symptoms, or a depressive episode with at least 3 manic ones. It can feel agitated or "wired" while low. It is linked to more suicidal thinking and a harder course, so it needs prompt attention.<Cite k="hu2014" n={n("hu2014")} /></Para></Card>
        <Card><h4 style={{ fontSize: 15, fontWeight: 700, color: C.warm, margin: "0 0 6px", fontFamily: fonts.body }}>Rapid cycling</h4><Para style={{ margin: 0, fontSize: 13.5 }}>Four or more episodes (of any kind) within 12 months. It describes a course, not a single episode.<Cite k="statpearlsBipolar" n={n("statpearlsBipolar")} /></Para></Card>
        <Card><h4 style={{ fontSize: 15, fontWeight: 700, color: C.red, margin: "0 0 6px", fontFamily: fonts.body }}>Psychotic features</h4><Para style={{ margin: 0, fontSize: 13.5 }}>Hallucinations or delusions during a severe manic or depressive episode, often matching the mood. They signal a severe episode that usually needs urgent care.<Cite k="statpearlsBipolar" n={n("statpearlsBipolar")} /><Cite k="dbsaMania" n={n("dbsaMania")} /></Para></Card>
        <Card><h4 style={{ fontSize: 15, fontWeight: 700, color: C.teal, margin: "0 0 6px", fontFamily: fonts.body }}>Stable periods</h4><Para style={{ margin: 0, fontSize: 13.5 }}>Between episodes, mood usually returns to a person's baseline, though some people keep milder symptoms. This is the best time to build a warning-sign plan.<Cite k="nimhPub" n={n("nimhPub")} /></Para></Card>
      </div>

      <Card style={{ marginBottom: 24, borderLeft: `3px solid ${C.accent}` }}>
        <SubHead>Early warning signs: your "relapse signature"</SubHead>
        <Para>In a review of 17 studies, at least 80% of people with a mood disorder could name at least one early symptom before an episode, and sleep disturbance was the most consistent early sign of mania. Early signs of depression were noticed less often.<Cite k="jackson2003" n={n("jackson2003")} /></Para>
        <Para>Early signs of mania people commonly notice: needing less sleep, more energy, faster speech or racing thoughts, impulsive spending, irritability, overconfidence, and a restless or "bubbling" feeling.<Cite k="dbsaMania" n={n("dbsaMania")} /> Family members often notice hypomania before the person does.<Cite k="nimhPub" n={n("nimhPub")} /></Para>
        <Para>Early signs of depression are harder to catch because they often look like everyday symptoms slowly getting stronger.<Cite k="morriss2004" n={n("morriss2004")} /></Para>
        <Para style={{ margin: 0 }}>Everyone's signs are different. Clinicians help people list 4 to 6 personal early signs from past episodes and a mood diary, then write an action plan with named contacts. There is often a window of 2 to 4 weeks between the first signs and losing insight, though some people get only days.<Cite k="morriss2004" n={n("morriss2004")} /> Free tools: the DBSA Wellness Tracker<Cite k="dbsaTracker" n={n("dbsaTracker")} /> or any daily mood journal.<Cite k="nimhPub" n={n("nimhPub")} /></Para>
      </Card>

      <Card style={{ marginBottom: 20, borderTop: `3px solid ${C.teal}` }}>
        <Badge color={C.teal}>Self-check, not a diagnosis</Badge>
        <h3 style={{ fontFamily: fonts.display, fontSize: 21, fontWeight: 700, color: C.text, margin: "10px 0 6px" }}>What am I noticing right now?</h3>
        <Para>Tick anything that's been true over the past week or two. This doesn't tell you which episode you're in; it suggests what kind of help to reach for. Nothing you tick leaves your browser.</Para>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
          <div><div style={{ fontSize: 12, fontWeight: 700, color: "#c23030", textTransform: "uppercase", letterSpacing: "0.05em", margin: "4px 0 8px", fontFamily: fonts.body }}>Highs</div>
            {MANIA_SX.map((s, i) => <Check key={i} label={s} on={!!hi[i]} color="#c23030" flip={() => { setHi(p => ({ ...p, [i]: !p[i] })); setDone(false); }} />)}</div>
          <div><div style={{ fontSize: 12, fontWeight: 700, color: C.blue, textTransform: "uppercase", letterSpacing: "0.05em", margin: "4px 0 8px", fontFamily: fonts.body }}>Lows</div>
            {DEP_SX.map((s, i) => <Check key={i} label={s} on={!!lo[i]} color={C.blue} flip={() => { setLo(p => ({ ...p, [i]: !p[i] })); setDone(false); }} />)}</div>
        </div>
        <div style={{ fontSize: 12, fontWeight: 700, color: C.red, textTransform: "uppercase", letterSpacing: "0.05em", margin: "12px 0 8px", fontFamily: fonts.body }}>Any of these?</div>
        {URGENT.map((s, i) => <Check key={i} label={s} on={!!ur[i]} color={C.red} flip={() => { setUr(p => ({ ...p, [i]: !p[i] })); setDone(false); }} />)}
        <div style={{ display: "flex", gap: 10, marginTop: 12, flexWrap: "wrap" }}>
          <Btn onClick={() => setDone(true)}>See what to do</Btn>
          <Btn variant="outline" onClick={() => { setHi({}); setLo({}); setUr({}); setDone(false); }}>Clear</Btn>
        </div>
        {verdict && (
          <Card style={{ marginTop: 16, borderLeft: `4px solid ${verdict.color}`, background: `${verdict.color}0c` }}>
            <div style={{ fontFamily: fonts.display, fontSize: 18, fontWeight: 700, color: verdict.color, marginBottom: 6 }}>{verdict.title}</div>
            <Para style={{ margin: 0 }}>{verdict.text}</Para>
          </Card>
        )}
        <p style={{ fontSize: 11.5, color: C.textLight, margin: "12px 0 0", lineHeight: 1.55, fontFamily: fonts.body }}>Based on when MedlinePlus, DBSA and NIMH advise getting help: call your provider if symptoms get worse, you have side effects, or you aren't taking medication as prescribed; get help right away for mania, thoughts of self-harm, hopelessness, hallucinations, or being unable to care for yourself.<Cite k="medlineplusBipolar" n={n("medlineplusBipolar")} /><Cite k="dbsaMania" n={n("dbsaMania")} /><Cite k="nimhBipolar" n={n("nimhBipolar")} /></p>
      </Card>

      <Card style={{ background: "#fdf2f2", borderColor: "#e8c4c4", marginBottom: 20 }}>
        <p style={{ fontSize: 13, color: "#7a3030", lineHeight: 1.6, margin: 0, fontFamily: fonts.body }}><strong>In a crisis:</strong> call or text <strong>988</strong> or chat at 988lifeline.org; DBSA also lists texting "DBSA" to 741741. In a life-threatening situation, call <strong>911</strong> or go to the nearest emergency room.<Cite k="nimhBipolar" n={n("nimhBipolar")} /></p>
      </Card>
      <Sources keys={refs} />
    </Section>
  );
}


// ═══════════════════════════════════════════════════════════════
// CBT PAGE
// ═══════════════════════════════════════════════════════════════
function CBTPage() {
  const refs = ["chiang2017", "miklowitz2007", "lam2003", "scott2006", "pavlova2015", "nimhBipolar", "canmat2018", "abct", "basco", "padesky", "dbsa", "nami", "samhsa"];
  const n = (k) => refs.indexOf(k) + 1;
  return (
    <Section style={{ paddingTop: 40, paddingBottom: 60 }}>
      <Badge color={C.teal}>Evidence-Based Therapy</Badge>
      <h2 style={{ fontFamily: fonts.display, fontSize: 30, fontWeight: 700, color: C.text, margin: "12px 0 8px" }}>Cognitive Behavioral Therapy (CBT)</h2>
      <p style={{ fontSize: 15, color: C.textMid, margin: "0 0 20px", maxWidth: 680, lineHeight: 1.65, fontFamily: fonts.body }}>CBT is one of the most studied psychotherapies for bipolar disorder: a 2017 meta-analysis pooled <strong>19 randomized controlled trials</strong> with 1,384 patients.<Cite k="chiang2017" n={n("chiang2017")} /> It is used alongside medication, mainly between episodes and during or after depression, not during acute mania.<Cite k="canmat2018" n={n("canmat2018")} /> Guidelines and NIMH list it, with psychoeducation, family-focused therapy and interpersonal and social rhythm therapy, as a standard part of treatment, not an extra.<Cite k="nimhBipolar" n={n("nimhBipolar")} /><Cite k="canmat2018" n={n("canmat2018")} /></p>

      <TimeBox color={C.teal}>
        CBT works on the same clock as medication: <strong>months, not weeks</strong>. The trials that showed a benefit ran 12 to 18 sessions over six months with booster sessions,<Cite k="lam2003" n={n("lam2003")} /> or up to 30 sessions over nine months.<Cite k="miklowitz2007" n={n("miklowitz2007")} /> The first few sessions are assessment and learning the tools; the gains come from practicing them week after week. If you stop after three sessions because nothing has changed yet, you have not tried CBT.
      </TimeBox>

      <Card style={{ marginBottom: 20, borderLeft: `3px solid ${C.teal}` }}>
        <h3 style={{ fontFamily: fonts.display, fontSize: 18, fontWeight: 700, color: C.teal, margin: "0 0 10px" }}>What CBT Actually Is</h3>
        <Para>CBT is based on a straightforward premise: your <strong>thoughts, feelings, and behaviors</strong> are interconnected, and shifts in one affect the others. In bipolar disorder, mood episodes distort thinking (grandiosity during mania, hopelessness during depression), and the distorted thinking drives behavior that deepens the episode. CBT interrupts that cycle by teaching you to notice and test the thought before you act on it.</Para>
        <Para style={{ margin: 0 }}>In research studies, CBT for bipolar disorder has ranged from about <strong>8 to 30 sessions</strong>, individually or in groups.<Cite k="chiang2017" n={n("chiang2017")} /><Cite k="miklowitz2007" n={n("miklowitz2007")} /> It is used <strong>alongside medication</strong>, not as a replacement.<Cite k="canmat2018" n={n("canmat2018")} /></Para>
      </Card>

      <SubHead>What a Course of CBT Looks Like</SubHead>
      <Card style={{ marginBottom: 24 }}>
        {[
          { when: "Sessions 1–2", title: "Assessment and your own map", desc: "Your history of episodes, what tends to set them off, what early signs look like for you, and what you want to be different. You agree on goals and on homework, which is where most of the change happens." },
          { when: "Sessions 3–8", title: "The core skills", desc: "Mood monitoring every day, thought records when a strong feeling hits, behavioral activation if you are depressed, and a regular daily rhythm (wake time, meals, sleep). You practice each one between sessions and bring it back." },
          { when: "Sessions 9–16", title: "Applying them to your life", desc: "Beliefs about medication and about the illness itself, the situations that trip you up, and the thinking that shows up on the way into mania (\"I don't need sleep\", \"this is the real me\") as well as into depression." },
          { when: "Last sessions", title: "Your relapse-prevention plan", desc: "A written document: your personal early warning signs for both directions, what you will do at each stage, and who you will call. Booster sessions months later check how it is holding up. In the Lam trial the plan was the point of the whole treatment, and the group that had it relapsed less over the following year." },
        ].map((s, i) => (
          <div key={i} style={{ display: "flex", gap: 16, padding: "12px 0", borderBottom: i < 3 ? `1px solid ${C.border}` : "none" }}>
            <div style={{ flex: "0 0 110px", fontSize: 12, fontWeight: 700, color: C.teal, textTransform: "uppercase", letterSpacing: "0.04em", paddingTop: 2, fontFamily: fonts.body }}>{s.when}</div>
            <div>
              <h4 style={{ fontSize: 14.5, fontWeight: 700, color: C.text, margin: "0 0 4px", fontFamily: fonts.body }}>{s.title}</h4>
              <p style={{ fontSize: 13, color: C.textMid, lineHeight: 1.6, margin: 0, fontFamily: fonts.body }}>{s.desc}</p>
            </div>
          </div>
        ))}
        <p style={{ fontSize: 11.5, color: C.textLight, marginTop: 10, lineHeight: 1.5, fontFamily: fonts.body }}>Session counts are the range used in the published trials;<Cite k="lam2003" n={n("lam2003")} /><Cite k="miklowitz2007" n={n("miklowitz2007")} /> your therapist will set the pace with you.</p>
      </Card>

      <SubHead>The Four Pillars of CBT for Bipolar</SubHead>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 14, marginBottom: 24 }}>
        {[
          { n: "1", title: "Easing Episode Symptoms", desc: "Cognitive restructuring for depressive thinking (testing \"nothing will ever get better\" against the evidence), behavioral activation during depression (scheduling activities even when motivation is zero), and impulse control during hypomania (for example an agreed waiting period, often 48 hours, and a pro/con list before major decisions).", color: C.teal },
          { n: "2", title: "Medication Adherence", desc: "Stopping medication is one of the strongest predictors of relapse. CBT addresses it directly: the beliefs behind stopping (\"I don't need them when I feel fine\"), an honest pro/con list, and routines that make taking them automatic.", color: C.blue },
          { n: "3", title: "Early Warning Signs & Relapse Prevention", desc: "You identify YOUR early signs of mania (sleeping less, spending more, talking faster) and depression (withdrawing, oversleeping, negative self-talk), then build the plan: what to do at the first sign, who to call, how to step in before a full episode.", color: C.accent },
          { n: "4", title: "Comorbid Conditions", desc: "Bipolar rarely travels alone: about 45% of people with bipolar disorder meet criteria for an anxiety disorder at some point. CBT addresses co-occurring anxiety, substance use, insomnia and PTSD with the same framework, adapted for each.", color: C.warm, cite: "pavlova2015" },
        ].map((p, i) => (
          <Card key={i} hover style={{ borderTop: `3px solid ${p.color}`, animation: `fadeUp 0.5s ease ${i * 0.08}s both` }}>
            <div style={{ fontFamily: fonts.display, fontSize: 28, fontWeight: 700, color: p.color, opacity: 0.3 }}>{p.n}</div>
            <h4 style={{ fontFamily: fonts.display, fontSize: 16, fontWeight: 700, color: C.text, margin: "2px 0 8px" }}>{p.title}</h4>
            <p style={{ fontSize: 13, color: C.textMid, lineHeight: 1.6, margin: 0, fontFamily: fonts.body }}>{p.desc}{p.cite && <Cite k={p.cite} n={n(p.cite)} />}</p>
          </Card>
        ))}
      </div>

      <SubHead>Core CBT Techniques You'll Learn</SubHead>
      <Card style={{ marginBottom: 20 }}>
        {[
          { name: "Mood Monitoring", desc: "Daily tracking of mood (0–10), sleep hours, medication taken, and notable events. This is foundational to almost every bipolar CBT protocol: it makes patterns visible that are invisible day to day, and it gives your prescriber real information instead of a memory." },
          { name: "Thought Records", desc: "When you notice a strong emotion, you write down the situation, the automatic thought, the emotion and how strong it is, the evidence for and against the thought, and a balanced alternative. Over time you learn to catch distortions in real time." },
          { name: "Behavioral Activation", desc: "During depression you schedule activities that give mastery (accomplishment) and pleasure, even in small doses. The principle: behavior change drives mood change, not the other way around." },
          { name: "Activity Scheduling and Daily Rhythm", desc: "Consistent wake times, meal times and activity blocks. Routine is a mood stabilizer in itself, and sleep loss is one of the most consistently reported triggers of mania. This overlaps with Social Rhythm Therapy (IPSRT)." },
          { name: "Cognitive Restructuring", desc: "Identifying and testing cognitive distortions: all-or-nothing thinking, catastrophizing, mind-reading, emotional reasoning. In hypomania: testing grandiose plans. In depression: testing hopeless conclusions." },
          { name: "Relapse Signature & Action Plan", desc: "A personalized document listing your specific early warning signs for mania and depression, with pre-planned actions for each stage: green (stable), yellow (warning), red (crisis)." },
          { name: "Sleep Protocol", desc: "Sleep disruption is both a trigger and a symptom. CBT includes a sleep plan: a fixed schedule in both directions, a dark cool room, no screens late, and getting out of bed when you cannot sleep rather than lying there." },
        ].map((t, i) => (
          <div key={i} style={{ padding: "12px 0", borderBottom: i < 6 ? `1px solid ${C.border}` : "none" }}>
            <h4 style={{ fontSize: 14, fontWeight: 700, color: C.text, margin: "0 0 4px", fontFamily: fonts.body }}>{t.name}</h4>
            <p style={{ fontSize: 13, color: C.textMid, lineHeight: 1.6, margin: 0, fontFamily: fonts.body }}>{t.desc}</p>
          </div>
        ))}
      </Card>

      <SubHead>Try One Tonight: a Thought Record</SubHead>
      <Card style={{ marginBottom: 24, background: "#f8faf9" }}>
        <Para>The thought record is the single most used CBT tool, and you do not need a therapist to try the shape of it. This is a condensed version of the seven-column record in <em>Mind Over Mood</em> (situation; moods rated 0–100; automatic thoughts; evidence for; evidence against; balanced thought; re-rate the moods), filled in when a feeling spikes. A worked example, the kind of thought depression produces:</Para>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", minWidth: 560, borderCollapse: "collapse", fontSize: 13, fontFamily: fonts.body }}>
            <thead><tr>{["Situation", "Automatic thought", "Feeling (0–100)", "Evidence for / against", "Balanced thought"].map(h => <th key={h} style={{ textAlign: "left", padding: "8px 10px", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.05em", color: C.textLight, borderBottom: `2px solid ${C.border}` }}>{h}</th>)}</tr></thead>
            <tbody><tr>
              {["Friend didn't text back for two days.", "\"Everyone is pulling away. I've burned every bridge.\"", "Hopeless 85, ashamed 70", "For: she was quiet last month too. Against: she replied warmly last week; she said work was slammed; two other people texted me today.", "\"She's busy. One quiet friend isn't everyone, and I'm reading a depressive thought as a fact.\" Hopeless 40."].map((c, i) => <td key={i} style={{ padding: "10px", verticalAlign: "top", color: C.textMid, lineHeight: 1.55, borderBottom: `1px solid ${C.border}` }}>{c}</td>)}
            </tr></tbody>
          </table>
        </div>
        <p style={{ fontSize: 12, color: C.textLight, marginTop: 10, lineHeight: 1.55, fontFamily: fonts.body }}>The format is from <em>Mind Over Mood</em>, the standard CBT self-help workbook;<Cite k="padesky" n={n("padesky")} /> <em>The Bipolar Workbook</em> adapts the same tools to mania as well as depression.<Cite k="basco" n={n("basco")} /> A workbook is a good companion to therapy and a reasonable start while you wait for an appointment; it is not a substitute for a therapist when you are unwell.</p>
      </Card>

      <SubHead>What the Research Says</SubHead>
      <Card style={{ marginBottom: 20, background: "#f8faf9" }}>
        {[
          { t: "A 2017 meta-analysis of 19 randomized trials (1,384 patients) found CBT reduced depressive symptoms (Hedges' g = −0.494, a moderate effect), lowered relapse rates and improved functioning compared with usual care.", k: "chiang2017" },
          { t: "In the STEP-BD study (293 outpatients with bipolar depression), up to 30 sessions of intensive therapy (CBT, IPSRT or family-focused therapy) over 9 months led to a 64% recovery rate, versus 52% with three sessions of brief psychoeducation.", k: "miklowitz2007" },
          { t: "A 2003 British trial (103 patients) of 12–18 CBT sessions plus boosters, focused on relapse prevention, found fewer bipolar episodes and fewer days in episode over the following year than medication alone.", k: "lam2003" },
          { t: "Not every trial is positive: a larger 2006 trial (253 patients) found no overall benefit of CBT over usual care, though people with fewer than 12 prior episodes did better with CBT. Earlier in the illness may be the best time to start.", k: "scott2006" },
          { t: "CBT is not a treatment for acute mania. It is studied mostly in people who are stable or depressed, and guidelines position it as an add-on to medication.", k: "canmat2018" },
        ].map((r, i) => (
          <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10, fontSize: 13, fontFamily: fonts.body }}>
            <span style={{ color: C.teal, fontWeight: 700, flexShrink: 0 }}>◈</span>
            <span style={{ color: C.textMid, lineHeight: 1.6 }}>{r.t}<Cite k={r.k} n={n(r.k)} /></span>
          </div>
        ))}
      </Card>

      <SubHead>Finding a CBT Therapist</SubHead>
      <Card style={{ marginBottom: 20 }}>
        <Para>Many therapists say they "use CBT." For bipolar disorder you want someone who has treated it before and works from a bipolar-specific protocol, with your prescriber in the loop.</Para>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: C.teal, marginBottom: 6, fontFamily: fonts.body }}>Where to look</div>
            {[
              <span key="a">The <a href={REFS.abct.u} target="_blank" rel="noopener noreferrer">ABCT Find a CBT Therapist</a> directory, run by the professional body for CBT; filter by bipolar disorder.<Cite k="abct" n={n("abct")} /></span>,
              <span key="b">Your prescriber: psychiatrists usually know which local therapists take bipolar patients.</span>,
              <span key="c">Community mental health centers and <a href={REFS.samhsa.u} target="_blank" rel="noopener noreferrer">FindTreatment.gov</a> for sliding-scale options.<Cite k="samhsa" n={n("samhsa")} /></span>,
              <span key="d">Free peer groups from <a href={REFS.dbsa.u} target="_blank" rel="noopener noreferrer">DBSA</a> and <a href={REFS.nami.u} target="_blank" rel="noopener noreferrer">NAMI</a> are not therapy, but members know who the good therapists are.<Cite k="dbsa" n={n("dbsa")} /><Cite k="nami" n={n("nami")} /></span>,
            ].map((t, i) => <div key={i} style={{ fontSize: 13, color: C.textMid, lineHeight: 1.55, marginBottom: 6, fontFamily: fonts.body }}>• {t}</div>)}
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: C.teal, marginBottom: 6, fontFamily: fonts.body }}>What to ask in the first call</div>
            {["How many people with bipolar disorder have you treated with CBT?", "Do you follow a bipolar-specific protocol, and will we write a relapse-prevention plan?", "How many sessions do you expect, and how will we know it is working?", "Will you coordinate with my prescriber?", "Is there homework? (The answer should be yes.)"].map((t, i) => <div key={i} style={{ fontSize: 13, color: C.textMid, lineHeight: 1.55, marginBottom: 6, fontFamily: fonts.body }}>• {t}</div>)}
          </div>
        </div>
      </Card>

      <Card style={{ background: "#fef9f0", borderColor: "#f0d8a8", marginBottom: 20 }}>
        <h4 style={{ fontSize: 14, fontWeight: 700, color: C.warm, margin: "0 0 6px", fontFamily: fonts.body }}>Is CBT Right for You?</h4>
        <p style={{ fontSize: 13, color: C.textMid, lineHeight: 1.6, margin: 0, fontFamily: fonts.body }}>CBT fits best if you are currently stable or mildly depressed, willing to do homework between sessions, and want concrete, practical tools. If emotional intensity and interpersonal chaos are your main struggles, DBT (next page) may be the better fit. Many therapists integrate both.</p>
      </Card>

      <Sources keys={refs} />
    </Section>
  );
}

// ═══════════════════════════════════════════════════════════════
// DBT PAGE
// ═══════════════════════════════════════════════════════════════
function DBTPage() {
  const refs = ["goldstein2024", "eisner2017", "vandijk2013", "linehan2015", "linehanHandouts", "dbtlbc", "btech", "samhsa", "dbsa"];
  const n = (k) => refs.indexOf(k) + 1;
  const purple = "#7c3aed";
  return (
    <Section style={{ paddingTop: 40, paddingBottom: 60 }}>
      <Badge color={purple}>Third-Wave Therapy</Badge>
      <h2 style={{ fontFamily: fonts.display, fontSize: 30, fontWeight: 700, color: C.text, margin: "12px 0 8px" }}>Dialectical Behavior Therapy (DBT)</h2>
      <p style={{ fontSize: 15, color: C.textMid, margin: "0 0 20px", maxWidth: 680, lineHeight: 1.65, fontFamily: fonts.body }}>Originally developed for borderline personality disorder, DBT targets <strong>emotional dysregulation</strong>, which is common in bipolar disorder too.<Cite k="linehan2015" n={n("linehan2015")} /> Early evidence, including one randomized trial in teenagers, suggests it can reduce suicide attempts and build skills that medication alone does not.<Cite k="goldstein2024" n={n("goldstein2024")} /></p>

      <TimeBox color={purple}>
        A full DBT program is a <strong>six-month to one-year commitment</strong>: the skills group alone takes about 24 weeks to work through all four modules once, and standard programs run the cycle twice.<Cite k="linehan2015" n={n("linehan2015")} /> The trial that cut suicide attempts in teenagers delivered DBT over a full year.<Cite k="goldstein2024" n={n("goldstein2024")} /> The skills feel awkward and mechanical for the first weeks; they start to feel like yours somewhere in the second or third month. That is the normal course, not a sign it is failing.
      </TimeBox>

      <Card style={{ marginBottom: 20, borderLeft: `3px solid ${purple}` }}>
        <h3 style={{ fontFamily: fonts.display, fontSize: 18, fontWeight: 700, color: purple, margin: "0 0 10px" }}>Why DBT for Bipolar?</h3>
        <Para>Emotional dysregulation (strong sensitivity to emotional triggers, intense reactions and a slow return to baseline) is common in bipolar disorder, alongside the mood episodes that define it. DBT was built to treat it.<Cite k="linehan2015" n={n("linehan2015")} /> Where CBT focuses on changing <em>thoughts</em>, DBT focuses on tolerating <em>emotions</em> and building the skills to get through intense feelings without making things worse. The "dialectic" is holding two true things at once: <em>I am doing the best I can</em>, and <em>I need to do better</em>.</Para>
        <Para style={{ margin: 0 }}>In a 2023 JAMA Psychiatry trial of 100 adolescents with bipolar disorder, those who received a year of DBT had <strong>significantly fewer suicide attempts</strong> than those in standard therapy; mood symptoms improved similarly in both groups.<Cite k="goldstein2024" n={n("goldstein2024")} /></Para>
      </Card>

      <SubHead>The Four DBT Skill Modules</SubHead>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 14, marginBottom: 24 }}>
        {[
          { title: "Mindfulness", color: "#2563eb", desc: "The foundation of all other skills. Observing your thoughts and emotions without reacting to them. \"Wise Mind\" is the overlap between emotional mind and rational mind. In bipolar: noticing a mood shift without being hijacked by it.", skills: "Observe, Describe, Participate, Non-judgmental stance, One-mindfully, Effectively" },
          { title: "Distress Tolerance", color: "#dc2626", desc: "Surviving a crisis without making it worse. These are the skills for when you are in unbearable pain and the urge to act destructively is overwhelming. Not about fixing the problem: about getting through the next hour.", skills: "TIPP (Temperature, Intense exercise, Paced breathing, Paired muscle relaxation), ACCEPTS (Activities, Contributing, Comparisons, Emotions, Pushing away, Thoughts, Sensations), Self-soothe with the five senses, Radical Acceptance" },
          { title: "Emotion Regulation", color: purple, desc: "Understanding and managing emotions rather than being controlled by them: naming what you feel, reducing vulnerability to negative emotion, and building positive experience on purpose.", skills: "ABC PLEASE (Accumulate positive emotions, Build mastery, Cope ahead; treat PhysicaL illness, balance Eating, avoid mood-Altering substances, balance Sleep, get Exercise), Opposite Action, Check the Facts" },
          { title: "Interpersonal Effectiveness", color: "#059669", desc: "Getting what you need from relationships while keeping your self-respect and the relationship. Critical in bipolar disorder because episodes strain relationships, and relationship stress triggers episodes.", skills: "DEAR MAN (Describe, Express, Assert, Reinforce, Mindful, Appear confident, Negotiate), GIVE (Gentle, Interested, Validate, Easy manner), FAST (Fair, no Apologies, Stick to values, Truthful)" },
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
      <p style={{ fontSize: 11.5, color: C.textLight, margin: "-12px 0 24px", lineHeight: 1.5, fontFamily: fonts.body }}>Module names, skills and acronyms as taught in Linehan's skills training manual and handouts.<Cite k="linehan2015" n={n("linehan2015")} /><Cite k="linehanHandouts" n={n("linehanHandouts")} /></p>

      <SubHead>Skills You Can Start This Week</SubHead>
      <Card style={{ marginBottom: 24, background: "#faf8fc" }}>
        <Para>Four skills from the manual, chosen because they map onto what bipolar disorder actually does to a week. Learning them properly takes a group and a therapist; trying the shape of them now costs nothing.</Para>
        {[
          { name: "PLEASE: protect the body that carries the mood", how: "Treat physical illness, eat regularly, avoid alcohol and drugs, sleep on a schedule, move every day. In bipolar disorder the S is the one that matters most: a fixed wake time, seven days a week, because lost sleep is one of the most consistently reported triggers of mania. The handout suggests choosing a fixed wake time and keeping it all week, weekends included." },
          { name: "Check the Facts", how: "When an emotion spikes, ask: what exactly happened (not what it meant)? What am I assuming? Does the intensity of this feeling fit the facts? On the way into hypomania the facts to check are the plan and the risk; on the way into depression they are the conclusions you have drawn about yourself." },
          { name: "Opposite Action", how: "When an emotion's urge does not fit the facts, do the opposite of the urge, all the way. Depression says isolate: text one person and go. Anger says attack: step away and speak gently. Hypomania says more: do less, slow down, go to bed. The feeling follows the action, not the other way round." },
          { name: "TIPP: when you are at a 9 out of 10", how: "Temperature: the handout describes cold water on the face, or holding ice, for about 30 seconds to slow the heart rate. Intense exercise for a short burst. Paced breathing: exhaling longer than you inhale for a few minutes. Paired muscle relaxation: tensing each muscle group as you breathe in and letting go as you breathe out. These lower arousal fast and buy the time to use the other skills. Because the cold-water skill affects heart rate, the handouts advise checking with a doctor first if you have a heart condition, low blood pressure or an eating disorder; see the Body page." },
        ].map((s, i) => (
          <div key={i} style={{ padding: "12px 0", borderBottom: i < 3 ? `1px solid ${C.border}` : "none" }}>
            <h4 style={{ fontSize: 14, fontWeight: 700, color: C.text, margin: "0 0 4px", fontFamily: fonts.body }}>{s.name}</h4>
            <p style={{ fontSize: 13, color: C.textMid, lineHeight: 1.6, margin: 0, fontFamily: fonts.body }}>{s.how}</p>
          </div>
        ))}
        <p style={{ fontSize: 11.5, color: C.textLight, marginTop: 10, lineHeight: 1.5, fontFamily: fonts.body }}>Skills as described in the DBT skills handouts;<Cite k="linehanHandouts" n={n("linehanHandouts")} /> the handouts and worksheets are sold as a workbook you can use alongside a group.</p>
      </Card>

      <SubHead>DBT Structure: The Four Components</SubHead>
      <Card style={{ marginBottom: 20 }}>
        {[
          { name: "Individual Therapy (Weekly)", desc: "One-on-one sessions applying the skills to your life. Targets are ranked: life-threatening behavior first, then behavior that interferes with therapy, then quality of life. You bring a diary card each week: mood, urges, sleep, medication, and which skills you used." },
          { name: "Group Skills Training (Weekly, about two to two-and-a-half hours)", desc: "Where you learn the four modules, in a class format with homework. One pass through all four modules takes about 24 weeks; standard programs run it twice. This is the component most often adapted on its own for bipolar disorder." },
          { name: "Phone Coaching (As Needed)", desc: "Brief calls to your therapist between sessions, for coaching on using a skill in the moment. This is the bridge between learning a skill in the room and using it at 2 a.m." },
          { name: "Therapist Consultation Team", desc: "Your therapist meets weekly with other DBT therapists to stay on model and avoid burnout. A program without a consultation team is not comprehensive DBT." },
        ].map((c, i) => (
          <div key={i} style={{ padding: "12px 0", borderBottom: i < 3 ? `1px solid ${C.border}` : "none" }}>
            <h4 style={{ fontSize: 14, fontWeight: 700, color: C.text, margin: "0 0 4px", fontFamily: fonts.body }}>{c.name}</h4>
            <p style={{ fontSize: 13, color: C.textMid, lineHeight: 1.6, margin: 0, fontFamily: fonts.body }}>{c.desc}</p>
          </div>
        ))}
        <p style={{ fontSize: 11.5, color: C.textLight, marginTop: 10, lineHeight: 1.5, fontFamily: fonts.body }}>The four components and the skills-group schedule are as specified in Linehan's manual.<Cite k="linehan2015" n={n("linehan2015")} /></p>
      </Card>

      <SubHead>Research for Bipolar Disorder Specifically</SubHead>
      <Card style={{ marginBottom: 20, background: "#faf8fc" }}>
        {[
          { t: "A 2023 JAMA Psychiatry randomized trial (100 adolescents with bipolar disorder) found the DBT group had roughly two-thirds fewer suicide attempts than the standard-psychotherapy group on the main measure, most clearly in teens with prior attempts; the authors linked the effect to better emotion regulation. Mood symptoms improved similarly in both groups.", k: "goldstein2024" },
          { t: "A 12-week DBT skills group pilot (37 adults, no control group, 25 completed) found people learned mindfulness, emotion-regulation and distress-tolerance skills, but depression and mania scores did not change.", k: "eisner2017" },
          { t: "A small 2013 randomized pilot (26 adults with bipolar I or II) of a 12-week DBT-based group found a trend toward less depression, better emotional control, and fewer emergency visits and admissions in the six months after; the small size makes it preliminary.", k: "vandijk2013" },
          { t: "The evidence base is young: DBT for bipolar disorder rests on one strong adolescent trial and a handful of small adult studies. It is reasonable to try, especially when suicidal thoughts, self-harm or emotional storms are the main problem; it is not yet proven to prevent mood episodes.", k: "goldstein2024" },
        ].map((r, i) => (
          <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10, fontSize: 13, fontFamily: fonts.body }}>
            <span style={{ color: purple, fontWeight: 700, flexShrink: 0 }}>▽</span>
            <span style={{ color: C.textMid, lineHeight: 1.6 }}>{r.t}<Cite k={r.k} n={n(r.k)} /></span>
          </div>
        ))}
      </Card>

      <SubHead>Finding DBT</SubHead>
      <Card style={{ marginBottom: 20 }}>
        <Para>"DBT-informed" is not the same as DBT. Many therapists teach some skills; a comprehensive program has all four components above. Both can help; know which one you are being offered.</Para>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: purple, marginBottom: 6, fontFamily: fonts.body }}>Where to look</div>
            {[
              <span key="a">The <a href={REFS.dbtlbc.u} target="_blank" rel="noopener noreferrer">DBT-Linehan Board of Certification</a> directory lists clinicians and programs that passed a certification exam and adherence review.<Cite k="dbtlbc" n={n("dbtlbc")} /></span>,
              <span key="b"><a href={REFS.btech.u} target="_blank" rel="noopener noreferrer">Behavioral Tech</a>, the training institute Linehan founded, keeps a provider directory; it describes the list as a resource, not an endorsement.<Cite k="btech" n={n("btech")} /></span>,
              <span key="c">Community mental health centers often run skills groups at low cost; <a href={REFS.samhsa.u} target="_blank" rel="noopener noreferrer">FindTreatment.gov</a> lists them.<Cite k="samhsa" n={n("samhsa")} /></span>,
              <span key="d"><a href={REFS.dbsa.u} target="_blank" rel="noopener noreferrer">DBSA</a> peer groups are free and members know the local programs.<Cite k="dbsa" n={n("dbsa")} /></span>,
            ].map((t, i) => <div key={i} style={{ fontSize: 13, color: C.textMid, lineHeight: 1.55, marginBottom: 6, fontFamily: fonts.body }}>• {t}</div>)}
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: purple, marginBottom: 6, fontFamily: fonts.body }}>What to ask</div>
            {["Is this comprehensive DBT (individual + group + coaching + consultation team) or a skills group only?", "Have you worked with people who have bipolar disorder, and how do you coordinate with the prescriber?", "How long is the program, and what does it cost per week?", "What happens if I have a manic episode partway through?", "Is there a waitlist, and what can I start with while I wait?"].map((t, i) => <div key={i} style={{ fontSize: 13, color: C.textMid, lineHeight: 1.55, marginBottom: 6, fontFamily: fonts.body }}>• {t}</div>)}
          </div>
        </div>
      </Card>

      <Card style={{ background: "#fef9f0", borderColor: "#f0d8a8", marginBottom: 20 }}>
        <h4 style={{ fontSize: 14, fontWeight: 700, color: C.warm, margin: "0 0 6px", fontFamily: fonts.body }}>CBT vs. DBT: Which Do You Need?</h4>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16, marginTop: 10 }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: C.teal, marginBottom: 6, fontFamily: fonts.body }}>Choose CBT if you...</div>
            {["Want practical tools for distorted thinking", "Are currently stable or mildly depressed", "Struggle with medication adherence", "Need relapse prevention strategies", "Want structured homework-based therapy"].map((t, i) => (
              <div key={i} style={{ fontSize: 12.5, color: C.textMid, marginBottom: 3, fontFamily: fonts.body }}>• {t}</div>
            ))}
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: purple, marginBottom: 6, fontFamily: fonts.body }}>Choose DBT if you...</div>
            {["Have intense emotions that feel uncontrollable", "Struggle with suicidal thoughts or self-harm", "Have relationship chaos during episodes", "Need crisis survival skills right now", "Have been told you might also have BPD traits"].map((t, i) => (
              <div key={i} style={{ fontSize: 12.5, color: C.textMid, marginBottom: 3, fontFamily: fonts.body }}>• {t}</div>
            ))}
          </div>
        </div>
        <p style={{ fontSize: 12.5, color: C.textMid, lineHeight: 1.6, margin: "12px 0 0", fontFamily: fonts.body }}>Either way: <strong>both are add-ons to medication, and both take months.</strong> Pick one, give it a real course, and judge it at the end, not at week three.</p>
      </Card>

      <Sources keys={refs} />
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
      <p style={{ fontSize: 15, color: C.textMid, margin: "0 0 12px", maxWidth: 640, lineHeight: 1.65, fontFamily: fonts.body }}>When anxiety lives in your body (racing heart, tight chest, shaking hands, nausea, restlessness), thinking your way out is hard. Body-based techniques give your <strong>nervous system</strong> something to work with directly.</p>
      <p style={{ fontSize: 15, color: C.textMid, margin: "0 0 28px", maxWidth: 640, lineHeight: 1.65, fontFamily: fonts.body }}>Several of these are thought to work partly through the <strong>vagus nerve</strong>, a major nerve of the rest-and-digest (parasympathetic) system running from the brainstem to the gut. The evidence for each technique differs, and the labels below say how strong it is.</p>

      <h3 style={{ fontFamily: fonts.display, fontSize: 22, fontWeight: 700, color: C.accent, margin: "0 0 16px" }}>Seven Techniques, With How Strong the Evidence Is</h3>

      {[
        { rank: "1", name: "Slow Breathing With a Longer Exhale", time: "2 min", evidence: "Some evidence", color: C.teal,
          how: "Breathe in through your nose for about 4 seconds and out slowly for about 6–8 seconds. Repeat for a couple of minutes.",
          why: "Slow breathing raises heart-rate variability, a sign of parasympathetic activity. In studies it also lowered self-rated stress. Breathing slowly matters most; a longer exhale is a common way to slow down.",
          bipolar: "Can be done anywhere, in any mood state. Paced breathing is part of the TIPP skill in DBT." },
        { rank: "2", name: "Cold Water on the Face", time: "30 sec", evidence: "Limited evidence", color: C.blue,
          how: "Hold your breath and put your face in a bowl of cold water, or hold a cold pack over your eyes and cheeks, for up to about 30 seconds.",
          why: "Cold on the face triggers the dive reflex, which slows the heart. DBT uses it as the 'T' (Temperature) in its TIPP skill for intense distress. Direct research on it for anxiety is limited.",
          bipolar: "Check with your doctor first if you have a heart condition, a slow heart rate, an eating disorder, or take a beta blocker: slowing the heart further can be risky." },
        { rank: "3", name: "Progressive or Paired Muscle Relaxation", time: "10–15 min", evidence: "Some evidence", color: "#7c3aed",
          how: "Working up from your feet, tense each muscle group for about 5 seconds, then release and notice the difference for 20–30 seconds. In DBT's version, you pair the release with a slow exhale.",
          why: "One of the oldest relaxation methods (Jacobson, 1930s), with research support for reducing anxiety and improving sleep.",
          bipolar: "Useful for physical restlessness and for winding down at night, when sleep problems can come before or with mood episodes." },
        { rank: "4", name: "Regular Exercise", time: "20–30 min", evidence: "Good evidence", color: C.warm,
          how: "Brisk walking, jogging, cycling, swimming or dancing, most days of the week. Even 10 minutes helps.",
          why: "A large 2024 BMJ review found exercise reduced depression about as much as therapy or antidepressants, though the evidence was low-certainty and the trials were in unipolar depression, not bipolar disorder. Exercise also reduces anxiety symptoms.",
          bipolar: "Regularity matters more than intensity. During a high, very intense exercise late in the day can make sleep harder, so keep a steady routine." },
        { rank: "5", name: "Gentle Yoga or Mindful Movement", time: "10–20 min", evidence: "Some evidence", color: "#2563eb",
          how: "Slow movements in time with your breath. Pay attention to the feeling of moving and breathing, not to achieving a pose.",
          why: "Combines slow breathing, muscle release and attention to the present. Trials suggest yoga can modestly reduce anxiety.",
          bipolar: "More approachable than vigorous exercise during low periods, and a counterweight to restlessness during highs." },
        { rank: "6", name: "5-4-3-2-1 Grounding", time: "3–5 min", evidence: "Limited evidence", color: C.accent,
          how: "Name 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell and 1 you can taste. Say them out loud if you can.",
          why: "Shifts attention from inner alarm to what is around you. Widely taught by clinicians for panic and dissociation, though it has little formal research.",
          bipolar: "Needs no equipment; a support person can talk you through it." },
        { rank: "7", name: "Humming or Slow Chanting", time: "3–5 min", evidence: "Limited evidence", color: "#059669",
          how: "Hum a low, steady tone, or chant slowly on a long exhale.",
          why: "Humming naturally slows and lengthens the exhale, which likely accounts for most of its calming effect. Claims that it directly stimulates the vagus nerve are not well tested.",
          bipolar: "Easy to do privately, in the car or the shower." },
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
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: C.accent, marginBottom: 2, fontFamily: fonts.body }}>Good to Know</div>
            <p style={{ fontSize: 12, color: C.textMid, lineHeight: 1.55, margin: 0, fontFamily: fonts.body }}>{ex.bipolar}</p>
          </div>
        </Card>
      ))}

      <Card style={{ background: "#f0f5f3", borderColor: "#d0ddd5", marginTop: 16 }}>
        <h4 style={{ fontSize: 15, fontWeight: 700, color: C.teal, margin: "0 0 8px", fontFamily: fonts.display }}>The 2-Minute Emergency Protocol</h4>
        <p style={{ fontSize: 13.5, color: C.textMid, lineHeight: 1.65, margin: "0 0 10px", fontFamily: fonts.body }}>When physical anxiety hits and you need to come down <em>now</em>, try these in order (skip the cold step if it isn't safe for you):</p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {[
            { n: "1", t: "Cold on face (30s)", d: "Ice pack or cold water splash" },
            { n: "2", t: "Slow breathing (60s)", d: "In for 4, out for 6–8" },
            { n: "3", t: "5-4-3-2-1 grounding (30s)", d: "Name what you sense around you" },
          ].map((s, i) => (
            <div key={i} style={{ flex: "1 1 160px", padding: "12px", background: C.card, borderRadius: 10, border: `1px solid ${C.border}`, textAlign: "center" }}>
              <div style={{ fontFamily: fonts.display, fontSize: 24, fontWeight: 800, color: C.teal }}>{s.n}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.text, fontFamily: fonts.body }}>{s.t}</div>
              <div style={{ fontSize: 11.5, color: C.textLight, fontFamily: fonts.body }}>{s.d}</div>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 11, color: C.textLight, marginTop: 10, fontFamily: fonts.body }}>Sources: De Couck et al., Int J Psychophysiology (2019), slow breathing; StatPearls, Diving Reflex (NCBI); Noetel et al., BMJ (2024), exercise for depression; Linehan's DBT skills (TIPP). These techniques help many people but do not replace treatment.</p>
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
      <p style={{ fontSize: 15, color: C.textMid, margin: "0 0 10px", maxWidth: 640, lineHeight: 1.65, fontFamily: fonts.body }}>If you have bipolar disorder and you use substances, you are not weak, broken, or morally failing, and you are <strong>far from alone</strong>. Bipolar disorder has one of the highest rates of co-occurring substance use disorders of any mental health condition. Researchers think shared biology, genetics and life stress all contribute.</p>
      <p style={{ fontSize: 15, color: C.textMid, margin: "0 0 28px", maxWidth: 640, lineHeight: 1.65, fontFamily: fonts.body }}>Understanding why this happens — and why it makes everything worse even when it feels like it helps — is one of the most important things you can learn about your condition.</p>

      {/* The Numbers */}
      <h3 style={{ fontFamily: fonts.display, fontSize: 22, fontWeight: 700, color: C.text, margin: "0 0 14px" }}>The Numbers</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12, marginBottom: 28 }}>
        {[
          { num: "~60%", label: "of people with bipolar I had a substance use disorder at some point in their lives", src: "ECA study, Regier et al., JAMA 1990" },
          { num: "42%", label: "had an alcohol use disorder, among people being treated for bipolar disorder", src: "Hunt et al., J Affect Disord 2016 (151 studies)" },
          { num: "20%", label: "had a cannabis use disorder, in the same treatment settings", src: "Hunt et al., J Affect Disord 2016" },
          { num: "~5×", label: "the odds of an illicit drug use disorder compared with people without bipolar disorder", src: "Hunt et al. 2016, 9 national surveys" },
          { num: "Highest", label: "lifetime substance use disorder rate among the major mental disorders in the ECA study, apart from antisocial personality disorder", src: "Regier et al., JAMA 1990" },
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
        <p style={{ fontSize: 14, color: C.textMid, lineHeight: 1.65, margin: "0 0 14px", fontFamily: fonts.body }}>A small interview study (Healey et al., 2009, 15 people) found the reasons people with bipolar disorder gave for using substances varied widely. Common themes, along with what other research adds:</p>
        {[
          { reason: "To self-medicate", detail: "Alcohol to quiet racing thoughts during hypomania. Cannabis to sleep when sleep won't come. Stimulants to fight the crushing fatigue of depression. Opioids to numb the pain of a depressive episode that feels like it will never end. These aren't random choices — they're attempts to fix real neurobiological problems with the wrong tools." },
          { reason: "To feel normal", detail: "When your brain swings between extremes, substances can feel like the only thing that puts you in the middle. Alcohol during mania takes the edge off. Stimulants during depression create something that resembles functional energy. The tragedy is that this 'normal' is temporary and the rebound makes everything worse." },
          { reason: "To intensify the high", detail: "Mania feels good. Sometimes devastatingly, destructively good. Substances — especially stimulants, alcohol, and cannabis — can amplify that euphoria. The impulsivity of mania makes it nearly impossible to say no in the moment. This isn't weakness; it's a symptom of the illness driving the behavior." },
          { reason: "To cope with living with the disorder", detail: "The grief of diagnosis, the side effects of medication, the damage from past episodes, the fear of the next one, the loss of identity, the strain on relationships. Substances become a coping mechanism for the emotional weight of having a chronic, life-altering illness." },
                    { reason: "Shared biology (separate research)", detail: "Research suggests bipolar disorder and addiction share some genetic and brain-reward factors, which may raise vulnerability. That is part of why it is so common, and why it is not a character flaw." },
        ].map((r, i) => (
          <div key={i} style={{ padding: "12px 0", borderBottom: i < 4 ? `1px solid ${C.border}` : "none" }}>
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
          { harm: "More frequent and severe episodes", detail: "Substance use is linked to more frequent mood episodes and more hospitalizations. Cannabis use is linked to worse manic symptoms and higher odds of new mania, and cannabis use disorder is associated with suicide attempts in bipolar disorder. Cocaine can trigger and worsen mood episodes.", src: "Gibbs et al., J Affect Disord 2015; Tolliver, Current Psychiatry 2010" },
          { harm: "Earlier onset of illness", detail: "People with both bipolar disorder and SUD experience earlier onset of mood symptoms than those with bipolar alone. Adolescent-onset bipolar disorder confers an even greater risk of subsequent substance use disorder. The younger the onset, the more severe the long-term course.", src: "NESARC; PMC systematic review" },
          { harm: "Higher suicide risk", detail: "Comorbid substance use significantly increases suicide attempts and completions in bipolar disorder — a condition that already carries one of the highest suicide rates in psychiatry (25-50% attempt rate). Alcohol is particularly dangerous because it removes inhibitions while deepening depressive cognition.", src: "Dalton et al.; STEP-BD data" },
          { harm: "Treatment resistance", detail: "Substances interfere with mood-stabilizing medication by reducing efficacy or requiring higher doses. They also reduce treatment compliance — people using substances are significantly less likely to take prescribed medication consistently. This creates a vicious cycle: substance use worsens symptoms, worsened symptoms drive more substance use.", src: "Levin & Hennessy; Salloum & Thase" },
          { harm: "More rapid cycling", detail: "Substance use is associated with increased rates of rapid cycling (4+ mood episodes per year), which is one of the most difficult-to-treat presentations of bipolar disorder.", src: "MDedge Psychiatry review" },
          { harm: "Worse depressive episodes", detail: "While substances may temporarily numb depression, the rebound consistently worsens depressive features. Alcohol is a central nervous system depressant. Cannabis impairs motivation and cognitive function. The hangover/withdrawal from any substance looks and feels like depression — compounding the real thing.", src: "Baldassano; Ostacher et al., STEP-BD" },
          { harm: "Delayed and incorrect diagnosis", detail: "Substance use masks and mimics bipolar symptoms, making accurate diagnosis harder. Stimulant-induced euphoria looks like mania. Alcohol withdrawal looks like depression. Many people spend years being treated for addiction without anyone recognizing the underlying bipolar disorder.", src: "Tolliver, Current Psychiatry 2010" },
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
          { name: "Alcohol", prevalence: "~42% in treatment settings", color: C.warm, why: "Quiets racing thoughts, reduces social anxiety, numbs depressive pain. Feels like an off-switch for an overactive brain.", harm: "CNS depressant that worsens depression on rebound. Disrupts sleep architecture (critical for bipolar stability). Impairs judgment during hypomania. Interacts dangerously with lithium, valproate, and benzodiazepines. Dehydration affects lithium blood levels.", note: "If you drink while taking lithium, tell your prescriber: dehydration and heavy drinking can change lithium levels." },
          { name: "Cannabis", prevalence: "~20% in treatment settings", color: "#059669", why: "Sleep aid, anxiety relief, mood stabilization attempts. Increasingly normalized culturally, making it feel 'safe.'", harm: "Linked to more manic symptoms and higher odds of new mania. May worsen psychosis and thinking. Cannabis use disorder is associated with suicide attempts in bipolar disorder. Most of this evidence is observational.", note: "The relaxing effect can be real in the moment; the research suggests it costs stability over time." },
          { name: "Stimulants (Cocaine, Amphetamines)", prevalence: "Part of ~17% other drug use", color: C.red, why: "Fights depressive fatigue and anhedonia. Amplifies manic euphoria. Creates temporary sense of energy and capability.", harm: "Can trigger mania and are strongly linked with bipolar disorder. The crash can deepen depression. They also strain the heart.", note: "Stimulant use in bipolar is one of the most dangerous combinations. Even prescribed stimulants (for comorbid ADHD) require extremely careful monitoring." },
          { name: "Opioids", prevalence: "Growing concern", color: "#7c3aed", why: "Numbs emotional pain of depression. Creates artificial sense of well-being. Can feel like the only thing that makes the pain stop.", harm: "High addiction potential. Combining opioids with benzodiazepines (such as Ativan) or alcohol can stop breathing. Withdrawal can feel like, and worsen, depression. Overdose risk rises with impulsivity during mood episodes.", note: "Keep naloxone (Narcan) on hand and never use alone. Medications for opioid use disorder (buprenorphine, methadone) work, and your psychiatrist needs to know what you use." },
          { name: "Psychedelics (LSD, Psilocybin, Ketamine)", prevalence: "Emerging research area", color: C.blue, why: "Interest driven by psychedelic therapy research. Some seek spiritual or therapeutic experiences.", harm: "Can provoke psychotic symptoms in people with bipolar disorder. Risk of triggering manic episodes. Current evidence suggests more harm than good without medical supervision. Ketamine therapy is only appropriate under strict clinical protocols.", note: "Psychedelic therapy trials usually exclude people with bipolar disorder because of the risk of mania and psychosis. Esketamine is FDA-approved for treatment-resistant major depression, not for bipolar disorder." },
          { name: "Nicotine / Tobacco", prevalence: "Very high (often overlooked)", color: C.textMid, why: "Temporary cognitive boost, anxiety relief, social habit, stimulant effect during depression.", harm: "While less immediately destabilizing than other substances, nicotine addiction complicates overall health management, interacts with some psychiatric medications, and the health consequences compound the medical burden of long-term bipolar treatment.", note: "Quitting is worthwhile and possible. Ask about nicotine replacement, varenicline or bupropion, and tell your psychiatrist, since smoking changes the levels of some medications." },
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
          { title: "Integrated treatment — not 'fix one, then the other'", desc: "The old approach was: get sober first, then treat bipolar disorder. Early trials suggest that treatment addressing both together works better than treating substance use alone, especially for cutting down use. Your psychiatrist and any addiction support should be talking to each other." },
          { title: "Honest disclosure to your treatment team", desc: "Your psychiatrist cannot help you if they don't know what you're using. Substance use changes which medications work, which are dangerous, and what your blood levels mean. This is medical information, not a confession." },
          { title: "Mood stabilization as the foundation", desc: "Treating the bipolar disorder is the foundation. Small trials of mood stabilizers in people with both conditions show mixed results, though in one, adding valproate to lithium reduced heavy-drinking days." },
          { title: "Integrated Group Therapy (IGT)", desc: "A group therapy designed for people with both bipolar disorder and a substance use disorder (Weiss et al.). In randomized trials it reduced substance use; mood outcomes were similar to comparison groups. Ask your provider about it." },
          { title: "Safer use if you are not ready to stop", desc: "Cutting down still helps. Keep taking your prescribed medication, never use alone, avoid mixing alcohol or opioids with sedatives, keep naloxone nearby, and tell your prescriber what you use. Progress is not all-or-nothing." },
          { title: "Peer support from people who get it", desc: "Dual Recovery Anonymous (DRA) is a 12-step fellowship for people with both a mental illness and substance use. DBSA and NAMI groups offer mental health peer support. Hearing from people who have been where you are is different from hearing from people who have not." },
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
        <p style={{ fontSize: 14.5, color: C.textMid, lineHeight: 1.7, margin: "0 0 12px", fontFamily: fonts.body }}>But here's the hard truth: substances borrow from your future self. Every drink that quiets tonight's racing thoughts makes tomorrow's mood less stable. Cannabis that helps you sleep tonight is linked to more manic symptoms later. Stimulants that lift you out of depression today deepen the crash that follows.</p>
        <p style={{ fontSize: 14.5, color: C.text, lineHeight: 1.7, margin: 0, fontFamily: fonts.body, fontWeight: 600 }}>You deserve actual tools that work — medication that's properly dosed, therapy that teaches real skills, and a treatment team that knows the whole picture. Not because you're broken, but because your brain deserves better than a temporary fix that steals from tomorrow.</p>
      </Card>

      <Card style={{ background: "#fef9f0", borderColor: "#f0d8a8" }}>
        <p style={{ fontSize: 12.5, color: "#92400e", lineHeight: 1.6, margin: 0, fontFamily: fonts.body }}><strong>Sources:</strong> Regier et al., JAMA 1990 (ECA study); Hunt et al., J Affect Disord 2016 (meta-analyses of treatment-setting studies and of national surveys); Healey et al., J Affect Disord 2009; Weiss et al., Am J Psychiatry 2007 (Integrated Group Therapy); Gibbs et al., J Affect Disord 2015 (cannabis and mania); Tolliver, Current Psychiatry 2010; Ostacher et al., STEP-BD.</p>
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
            This site brings together a validated screening questionnaire, guideline-based medication information, evidence-based therapy education, and practical resources for finding professional help — written in plain language for real people navigating a complex diagnosis.
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
            "Mood Disorder Questionnaire (MDQ) — Hirschfeld et al., American Journal of Psychiatry, 2000; general-population performance: Hirschfeld et al., 2003",
            "CANMAT/ISBD 2018 and VA/DoD 2023 Bipolar Treatment Guidelines",
            "JAMA Psychiatry, PLOS One, Frontiers in Psychiatry, BMC Medicine",
            "FDA prescribing information for all medications referenced",
            "NIMH, NAMI, WHO, and SAMHSA clinical resources",
                        "Body techniques: De Couck et al. 2019 (slow breathing), Noetel et al., BMJ 2024 (exercise), StatPearls (dive reflex)",
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
            The bipolar disorder screening tool on this site is based on the validated Mood Disorder Questionnaire (MDQ) and is intended for educational self-assessment only. A positive or negative screening result does not constitute a diagnosis. Only a qualified clinician, such as a psychiatrist, psychologist or other licensed mental health or medical professional, can diagnose bipolar disorder after a full evaluation.
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
      {active === "episodes" && <EpisodesPage />}
      {active === "family" && <FamilyPage />}
      {active === "find-help" && <FindHelpPage />}
      {active === "about" && <AboutPage />}

      {/* Footer */}
      <footer style={{ borderTop: `1px solid ${C.border}`, padding: "24px 20px", textAlign: "center", marginTop: 40 }}>
        <p style={{ fontSize: 12, color: C.textLight, lineHeight: 1.6, maxWidth: 600, margin: "0 auto", fontFamily: fonts.body }}>
          This site is for educational and informational purposes only and does not provide medical advice, diagnosis, or treatment. Always seek the advice of a qualified healthcare provider. The screening tool is the validated MDQ (Hirschfeld et al., Am J Psychiatry, 2000), scored as published. Medication information comes from FDA labels and the CANMAT/ISBD 2018 guidelines and should not be used to make treatment decisions without consulting your physician. This site is under active development.
        </p>
        <p style={{ fontSize: 11, color: C.textLight, marginTop: 8, fontFamily: fonts.body }}>© {new Date().getFullYear()} Two Weathers · twoweathers.com</p>
      </footer>
    </div>
  );
}
