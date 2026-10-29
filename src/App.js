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
              { step: "2", title: "Understand the Meds", desc: "See the main types of medication, what each is used for, and how long it usually takes to work.", action: "Medication Guide", page: "medications" },
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
      <p style={{ fontSize: 15, color: C.textMid, margin: "0 0 28px", maxWidth: 640, lineHeight: 1.65, fontFamily: fonts.body }}>CBT is one of the most studied psychotherapies for bipolar disorder: a 2017 meta-analysis pooled <strong>19 randomized controlled trials</strong>. It is used alongside medication, mainly between episodes and during or after depression, not during acute mania.</p>

      <Card style={{ marginBottom: 20, borderLeft: `3px solid ${C.teal}` }}>
        <h3 style={{ fontFamily: fonts.display, fontSize: 18, fontWeight: 700, color: C.teal, margin: "0 0 10px" }}>What CBT Actually Is</h3>
        <p style={{ fontSize: 14, color: C.textMid, lineHeight: 1.65, margin: "0 0 12px", fontFamily: fonts.body }}>CBT is based on a straightforward premise: your <strong>thoughts, feelings, and behaviors</strong> are interconnected, and shifts in one affect the others. In bipolar disorder, mood episodes distort thinking patterns (e.g., grandiosity during mania, hopelessness during depression), which drive behaviors that worsen the episode. CBT interrupts this cycle by teaching you to recognize and modify distorted thoughts before they spiral.</p>
        <p style={{ fontSize: 14, color: C.textMid, lineHeight: 1.65, margin: 0, fontFamily: fonts.body }}>In research studies, CBT for bipolar disorder has ranged from about <strong>8 to 30 sessions</strong>, individually or in groups. It is used <strong>alongside medication</strong>, not as a replacement.</p>
      </Card>

      <h3 style={{ fontFamily: fonts.display, fontSize: 20, fontWeight: 700, color: C.text, margin: "0 0 14px" }}>The Four Pillars of CBT for Bipolar</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 14, marginBottom: 24 }}>
        {[
          { n: "1", title: "Easing Episode Symptoms", desc: "Cognitive restructuring for depressive thinking (challenging 'nothing will ever get better'), behavioral activation during depression (scheduling pleasurable activities even when motivation is zero), and impulse control techniques during hypomania/mania (delay strategies, pro/con lists for risky decisions).", color: C.teal },
          { n: "2", title: "Medication Adherence", desc: "One of the biggest predictors of relapse is stopping medication. CBT directly addresses this by exploring beliefs about meds ('I don't need them when I feel fine'), weighing pros/cons collaboratively, and developing strategies to make adherence automatic.", color: C.blue },
          { n: "3", title: "Early Warning Signs & Relapse Prevention", desc: "You learn to identify YOUR personal early warning signs of mania (sleeping less, spending more, talking faster) and depression (withdrawing, oversleeping, negative self-talk). Then you build an action plan: what to do at the first sign, who to call, and how to intervene before a full episode develops.", color: C.accent },
          { n: "4", title: "Comorbid Conditions", desc: "Bipolar rarely travels alone. CBT addresses co-occurring anxiety (about 45% of people with bipolar disorder have an anxiety disorder at some point), substance use, insomnia, and PTSD using the same cognitive-behavioral framework, adapted for each condition.", color: C.warm },
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
          "A 2017 meta-analysis of 19 randomized trials (1,384 patients) found CBT reduced depressive symptoms (Hedges' g = −0.494, a moderate effect) and improved functioning compared with usual care.",
          "In the STEP-BD study (293 outpatients with bipolar depression), up to 30 sessions of intensive therapy (CBT, IPSRT or family-focused therapy) over 9 months led to a 64% recovery rate, versus 52% with three sessions of brief psychoeducation.",
          "CBT has been shown to improve medication adherence, extend time between episodes, and reduce hospitalization rates.",
                    "CBT is not a treatment for acute mania. It is studied mostly in people who are stable or depressed.",
        ].map((r, i) => (
          <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10, fontSize: 13, fontFamily: fonts.body }}>
            <span style={{ color: C.teal, fontWeight: 700, flexShrink: 0 }}>◈</span>
            <span style={{ color: C.textMid, lineHeight: 1.6 }}>{r}</span>
          </div>
        ))}
        <p style={{ fontSize: 11, color: C.textLight, marginTop: 8, fontFamily: fonts.body }}>Sources: Chiang et al., PLOS One (2017); Miklowitz et al., Arch Gen Psychiatry (2007), STEP-BD; Pavlova et al., Lancet Psychiatry (2015), anxiety in bipolar disorder</p>
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
      <p style={{ fontSize: 15, color: C.textMid, margin: "0 0 28px", maxWidth: 640, lineHeight: 1.65, fontFamily: fonts.body }}>Originally developed for borderline personality disorder, DBT targets <strong>emotional dysregulation</strong>, which is common in bipolar disorder too. Early evidence, including one randomized trial in teenagers, suggests it can reduce suicide attempts and build skills that medication alone does not.</p>

      <Card style={{ marginBottom: 20, borderLeft: "3px solid #7c3aed" }}>
        <h3 style={{ fontFamily: fonts.display, fontSize: 18, fontWeight: 700, color: "#7c3aed", margin: "0 0 10px" }}>Why DBT for Bipolar?</h3>
        <p style={{ fontSize: 14, color: C.textMid, lineHeight: 1.65, margin: "0 0 12px", fontFamily: fonts.body }}>Emotional dysregulation (strong sensitivity to emotional triggers, intense reactions and a slow return to baseline) is common in bipolar disorder, alongside the mood episodes that define it. DBT was built to treat it. Where CBT focuses on changing <em>thoughts</em>, DBT focuses on tolerating <em>emotions</em> and building the skills to survive intense feelings without making things worse.</p>
        <p style={{ fontSize: 14, color: C.textMid, lineHeight: 1.65, margin: 0, fontFamily: fonts.body }}>In a 2023 JAMA Psychiatry trial of 100 adolescents with bipolar disorder, those who received DBT had <strong>significantly fewer suicide attempts</strong> than those in standard therapy; mood symptoms improved similarly in both groups.</p>
      </Card>

      <h3 style={{ fontFamily: fonts.display, fontSize: 20, fontWeight: 700, color: C.text, margin: "0 0 14px" }}>The Four DBT Skill Modules</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 14, marginBottom: 24 }}>
        {[
          { title: "Mindfulness", color: "#2563eb", desc: "The foundation of all other skills. Learning to observe your thoughts and emotions without reacting to them. 'Wise Mind' — finding the overlap between emotional mind and rational mind. In bipolar: noticing mood shifts without being hijacked by them.", skills: "Observe, Describe, Participate, Non-judgmental stance, One-mindfully, Effectively" },
          { title: "Distress Tolerance", color: "#dc2626", desc: "Surviving crisis moments without making things worse. These are the skills for when you're in unbearable pain and the urge to act destructively is overwhelming. Not about fixing the problem — about getting through it.", skills: "TIPP (Temperature, Intense exercise, Paced breathing, Paired muscle relaxation), ACCEPTS (Activities, Contributing, Comparisons, Emotions, Pushing away, Thoughts, Sensations), Self-soothe with 5 senses, Radical Acceptance" },
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
          "A 2023 JAMA Psychiatry randomized trial (100 adolescents with bipolar disorder) found DBT cut suicide attempts by about two-thirds compared with standard psychotherapy; the authors linked the effect to better emotion regulation. Mood symptoms improved similarly in both groups.",
          "A 12-week DBT skills group pilot (37 adults, no control group, 25 completed) found people learned mindfulness, emotion-regulation and distress-tolerance skills, but depression and mania scores did not change.",
          "A 2023 systematic review found DBT-based programs are feasible and acceptable for people with bipolar disorder, with preliminary, mostly small-study evidence on mood and emotional dysregulation.",
          "Small trials disagree: one (60 adults, compared with a wait-list) reported better mood and executive function with DBT; another (49 adults) found no change in executive function or depression.",
          "A newer approach, DBSRT (Dialectical Behavior and Social Rhythm Therapy), combines DBT with daily-rhythm stabilization for people with both bipolar disorder and borderline personality disorder. It is still being studied.",
        ].map((r, i) => (
          <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10, fontSize: 13, fontFamily: fonts.body }}>
            <span style={{ color: "#7c3aed", fontWeight: 700, flexShrink: 0 }}>▽</span>
            <span style={{ color: C.textMid, lineHeight: 1.6 }}>{r}</span>
          </div>
        ))}
        <p style={{ fontSize: 11, color: C.textLight, marginTop: 8, fontFamily: fonts.body }}>Sources: Goldstein et al., JAMA Psychiatry (2023; print 2024); Eisner et al., Behavior Therapy (2017); Jones et al., systematic review (2023); Afshari et al. (2019); Zargar et al. (2019); DBSRT: Am J Psychotherapy (2024)</p>
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
