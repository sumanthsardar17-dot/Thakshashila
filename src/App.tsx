import { useState, useEffect } from "react";

/* ═══════════════════════════════════════════════════
   DESIGN TOKENS — Navy · Teal · Molten Gold
═══════════════════════════════════════════════════ */
const C = {
  bg0: "#020d18",  bg1: "#041525",  bg2: "#071e33",
  teal0: "#042e22",teal1: "#0a5c43",teal2: "#0f7a58",
  gold0: "#7a5c10",gold1: "#c9a432",gold2: "#f0c94a",
  goldShine: "#ffe08a", white: "#eef4f9", muted: "#6b8fa8",
  dim: "#2a4a62",  glass: "rgba(10,28,48,0.72)",
  glassBorder: "rgba(201,164,50,0.18)", cardBg: "rgba(7,30,51,0.85)",
};

const PROGRAMS: any = {
  bpharm: {
    label:"B.Pharm", icon:"🎓", emoji:"📘",
    gradient:`linear-gradient(135deg,${C.teal1},${C.teal2})`,
    glow: C.teal2, years:"4 Years", code:"B.P",
    fullName:"Bachelor of Pharmacy",
    tagline:"Foundation of pharmaceutical sciences",
    subjects:[
      { sem:"Semester 1–2", topics:[
        {name:"Pharmaceutical Chemistry I", desc:"Inorganic & organic drug compounds, reactions, nomenclature, and preparation methods for medicinal use."},
        {name:"Pharmaceutics I", desc:"Introduction to dosage forms, dispensing pharmacy, prescription handling, and basic compounding."},
        {name:"Pharmacognosy I", desc:"Natural drugs, crude plant materials, biological sources, and classification of drugs of natural origin."},
        {name:"Human Anatomy & Physiology", desc:"Organ systems, cell biology, homeostasis, and fundamental physiological processes essential for pharmacy."},
        {name:"Remedial Mathematics/Biology", desc:"Pharmaceutical calculations, dimensional analysis, logarithms, and essential biology fundamentals."},
      ]},
      { sem:"Semester 3–4", topics:[
        {name:"Pharmaceutical Chemistry II", desc:"Aliphatic & aromatic compounds, stereochemistry, reaction mechanisms, and key drug synthesis pathways."},
        {name:"Pharmacology I", desc:"Drug-receptor interactions, pharmacokinetics, pharmacodynamics, drug classifications, and mechanisms."},
        {name:"Microbiology & Immunology", desc:"Pathogenic microorganisms, sterilization methods, vaccines, antibiotics, and immune response mechanisms."},
        {name:"Biochemistry", desc:"Metabolism, enzyme kinetics, vitamins, hormones, nucleic acids, and their significance in drug action."},
        {name:"Pathophysiology", desc:"Molecular basis of disease and its direct relevance to rational pharmacotherapy."},
      ]},
      { sem:"Semester 5–6", topics:[
        {name:"Industrial Pharmacy I", desc:"Tablet, capsule, and liquid manufacturing — from lab scale to industrial production with GMP principles."},
        {name:"Pharmaceutical Analysis", desc:"Titrimetry, UV-Vis, IR spectroscopy, HPLC, gas chromatography, and pharmacopoeial methods."},
        {name:"Pharmacology II", desc:"CNS, CVS, renal, and endocrine pharmacology; autacoids, drug interactions, and adverse effects."},
        {name:"Pharmacognosy II", desc:"Phytochemistry, plant-derived drugs, isolation techniques, and herbal formulation technology."},
        {name:"Hospital & Clinical Pharmacy", desc:"Ward rounds, drug information services, patient counseling, medication reconciliation basics."},
      ]},
      { sem:"Semester 7–8", topics:[
        {name:"Novel Drug Delivery Systems", desc:"Nanoparticles, liposomes, transdermal patches, implants, and targeted/controlled drug delivery."},
        {name:"Biopharmaceutics & Pharmacokinetics", desc:"ADME, bioavailability, plasma drug concentration modeling, one/two-compartment models."},
        {name:"Pharmaceutical Biotechnology", desc:"Recombinant proteins, monoclonal antibodies, biosimilars, vaccines, and gene therapy products."},
        {name:"Quality Assurance", desc:"GMP, GLP, GDP, ISO standards, validation, regulatory affairs, and ICH guidelines."},
        {name:"Project / Research Work", desc:"Final year research project with literature review, experimental work, and thesis submission."},
      ]},
    ],
  },
  dpharm: {
    label:"D.Pharm", icon:"💊", emoji:"📗",
    gradient:`linear-gradient(135deg,${C.gold0},${C.gold1})`,
    glow: C.gold1, years:"2 Years", code:"D.P",
    fullName:"Diploma in Pharmacy",
    tagline:"Gateway to pharmaceutical practice",
    subjects:[
      { sem:"Year 1", topics:[
        {name:"Pharmaceutics I", desc:"Dispensing, compounding, weights & measures, posology, and basic dosage form preparation."},
        {name:"Pharmaceutical Chemistry I", desc:"Inorganic pharmaceuticals, water purification, galenicals, and simple assay methods."},
        {name:"Pharmacognosy", desc:"Crude drugs, adulteration tests, collection, processing, and plant-based drug identification."},
        {name:"Biochemistry & Clinical Pathology", desc:"Metabolic tests, urine analysis, blood chemistry, clinical lab techniques and normal values."},
        {name:"Human Anatomy & Physiology", desc:"Fundamental body structures, organ systems, and basic physiological functions."},
        {name:"Health Education & Community Pharmacy", desc:"Public health principles, nutrition, first aid, immunization, and the community pharmacist's role."},
      ]},
      { sem:"Year 2", topics:[
        {name:"Pharmaceutics II", desc:"Advanced dosage forms: tablets, injectables, aerosols, suppositories, and sustained-release systems."},
        {name:"Pharmaceutical Chemistry II", desc:"Organic medicinal compounds, drug stability, incompatibility, storage conditions, and formulations."},
        {name:"Pharmacology & Toxicology", desc:"Drug action mechanisms, adverse effects, drug interactions, poisoning types, antidotes, and management."},
        {name:"Pharmaceutical Jurisprudence", desc:"Drugs & Cosmetics Act, Pharmacy Act 1948, Schedule H/X, NDPS Act, and ethical pharmacy practice."},
        {name:"Drug Store Management", desc:"Inventory control, purchasing, billing systems, record-keeping, store layout, and retail management."},
        {name:"Hospital & Clinical Pharmacy", desc:"Prescription handling, drug dispensing, patient counseling, and basic clinical pharmacy services."},
      ]},
    ],
  },
  pharmd: {
    label:"Pharm.D", icon:"⚕️", emoji:"📙",
    gradient:`linear-gradient(135deg,#1a3a6e,#2563b0)`,
    glow: "#4a90d9", years:"6 Years", code:"P.D",
    fullName:"Doctor of Pharmacy",
    tagline:"Elite clinical pharmacy practice",
    subjects:[
      { sem:"Year 1–2: Foundation", topics:[
        {name:"Human Anatomy & Physiology", desc:"Advanced physiological systems, clinical correlations, and pathological changes relevant to drug therapy."},
        {name:"Pharmaceutics", desc:"Advanced formulation science, dosage form technology, and pharmaceutical engineering principles."},
        {name:"Medicinal Biochemistry", desc:"Biochemical pathways, enzyme kinetics, and pharmacological significance of metabolic processes."},
        {name:"Pharmacognosy & Phytopharmaceuticals", desc:"Herbal drugs, standardization, evidence-based phytotherapy, and phytochemical analysis."},
        {name:"Pharmaceutical Organic Chemistry", desc:"Stereochemistry, reaction mechanisms, structure-activity relationships, and drug synthesis."},
      ]},
      { sem:"Year 3–4: Core Clinical", topics:[
        {name:"Pharmacology I & II", desc:"Comprehensive systemic pharmacology: ANS, CVS, CNS, endocrine, GI, and respiratory drug classes."},
        {name:"Pharmaceutical Analysis", desc:"Analytical instrumentation, method development, validation, and quality control in pharmacy."},
        {name:"Pathophysiology", desc:"Disease mechanisms of major organ systems forming the basis for rational pharmacotherapy."},
        {name:"Clinical Pharmacy I & II", desc:"Drug therapy monitoring, adverse drug reaction reporting, medication errors, and clinical outcomes."},
        {name:"Biopharmaceutics & Pharmacokinetics", desc:"Mathematical modeling of drug ADME, population PK, and bioequivalence studies."},
      ]},
      { sem:"Year 5–6: Clerkship & Residency", topics:[
        {name:"Clinical Pharmacokinetics", desc:"Therapeutic drug monitoring, individualized dosing regimens, and pharmacokinetic consultations."},
        {name:"Clinical Toxicology", desc:"Systematic approach to poisoning, antidote therapy, and emergency toxicology management."},
        {name:"Pharmacotherapy I–III", desc:"Evidence-based drug therapy for cardiovascular, respiratory, neurological, and infectious diseases."},
        {name:"Pharmacy Practice Management", desc:"Community, hospital, and ambulatory care pharmacy management, leadership, and ethics."},
        {name:"Research Methodology & Biostatistics", desc:"Clinical trial design, statistical methods, systematic reviews, and evidence-based practice."},
        {name:"Clinical Rotations", desc:"Supervised direct patient care: internal medicine, surgery, pediatrics, oncology, critical care, psychiatry."},
      ]},
    ],
  },
};

function Particles() {
  const icons = ["⬡","◈","✦","⬟","◇","✧","⬠","◆"];
  return (
    <div style={{position:"absolute",inset:0,overflow:"hidden",pointerEvents:"none",zIndex:0}}>
      {Array.from({length:22}).map((_,i)=>(
        <div key={i} style={{
          position:"absolute",
          left:`${(i*47+13)%97}%`,
          top:`${(i*31+7)%100}%`,
          fontSize: i%3===0?18:i%3===1?12:9,
          color: i%4===0 ? C.gold1+"55" : i%4===1 ? C.teal2+"40" : i%4===2 ? C.gold0+"30" : C.teal1+"25",
          animation:`float${i%4} ${6+i%5}s ease-in-out ${i*0.4}s infinite`,
          fontWeight:900,
        }}>{icons[i%icons.length]}</div>
      ))}
    </div>
  );
}

function SubjectCard({topic, accent, i}: any) {
  const [open,setOpen] = useState(false);
  return (
    <div onClick={()=>setOpen(!open)} style={{
      background: open ? `rgba(10,28,48,0.95)` : C.cardBg,
      border:`1px solid ${open?accent+"99":C.dim+"66"}`,
      borderRadius:12, padding:"14px 18px",
      cursor:"pointer", transition:"all 0.25s",
      marginBottom:8,
      boxShadow: open ? `0 4px 24px ${accent}22, inset 0 0 0 1px ${accent}22` : "none",
      animation:`fadeUp 0.4s ease ${i*0.06}s both`,
    }}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:12}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:6,height:6,borderRadius:"50%",background:accent,flexShrink:0,boxShadow:`0 0 8px ${accent}`}} />
          <span style={{color:C.white,fontWeight:700,fontSize:13.5,fontFamily:"'Nunito',sans-serif"}}>{topic.name}</span>
        </div>
        <div style={{
          width:22,height:22,borderRadius:"50%",
          border:`1.5px solid ${accent}55`,
          display:"flex",alignItems:"center",justifyContent:"center",
          color:accent,fontSize:10,flexShrink:0,
          transition:"transform 0.25s",
          transform: open?"rotate(180deg)":"none",
        }}>▼</div>
      </div>
      {open && (
        <p style={{color:C.muted,fontSize:13,marginTop:10,lineHeight:1.7,marginBottom:0,paddingLeft:16, borderLeft:`2px solid ${accent}44`,fontFamily:"'Nunito',sans-serif"}}>
          {topic.desc}
        </p>
      )}
    </div>
  );
}

function AiTutor({program}: any) {
  const prog = program ? PROGRAMS[program] : null;
  const accent = prog?.glow || C.gold1;
  return (
    <div style={{display:"flex",flexDirection:"column",height:"100%",background:C.bg0,alignItems:"center",justifyContent:"center",padding:40,textAlign:"center"}}>
      <div style={{fontSize:60,marginBottom:20}}>🚧</div>
      <h2 style={{fontFamily:"'Cinzel',serif",fontWeight:900,fontSize:24,color:accent,marginBottom:12}}>AI Tutor Coming Soon</h2>
      <p style={{color:C.muted,fontSize:16,maxWidth:400,lineHeight:1.6}}>
        We are fine-tuning our specialized pharmacy AI models to provide you with the most accurate and helpful guidance. The complete AI experience will be available shortly!
      </p>
    </div>
  );
}

export default function App() {
  const [page,setPage]=useState("home");
  const [prog,setProg]=useState<string | null>(null);
  const [progTab,setProgTab]=useState("subjects");
  const [scrolled,setScrolled]=useState(false);

  useEffect(()=>{
    const fn=()=>setScrolled(window.scrollY>30);
    window.addEventListener("scroll",fn); 
    return()=>window.removeEventListener("scroll",fn);
  },[]);

  const goProg=(key: string)=>{setProg(key);setProgTab("subjects");setPage("program");};
  const p=prog ? PROGRAMS[prog] : null;

  return (
    <div style={{fontFamily:"'Nunito',sans-serif",background:C.bg0,minHeight:"100vh",color:C.white,overflowX:"hidden"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700;900&family=Cinzel:wght@600;700;900&family=Nunito:wght@400;600;700;800;900&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes bounce{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-7px)}}
        @keyframes float0{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-18px) rotate(8deg)}}
        @keyframes float1{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-12px) rotate(-6deg)}}
        @keyframes float2{0%,100%{transform:translateY(0)}40%{transform:translateY(-22px)}}
        @keyframes float3{0%,100%{transform:translateY(0) rotate(0deg)}60%{transform:translateY(-10px) rotate(12deg)}}
        @keyframes goldShimmer{0%{background-position:-200% center}100%{background-position:200% center}}
        @keyframes pulseGlow{0%,100%{box-shadow:0 0 0px transparent}50%{box-shadow:0 0 28px ${C.gold1}55}}
        @keyframes rotateSlow{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        ::-webkit-scrollbar{width:5px;}
        ::-webkit-scrollbar-track{background:${C.bg0};}
        ::-webkit-scrollbar-thumb{background:${C.dim};border-radius:3px;}
        .prog-card{transition:all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)!important;}
        .prog-card:hover{transform:translateY(-4px) scale(1.02)!important;box-shadow:0 16px 48px rgba(0,0,0,0.5), 0 0 24px var(--card-shadow)!important;border-color:var(--card-glow)!important;}
        .nav-link{transition:all 0.2s;}
        .nav-link:hover{color:${C.gold2}!important;}
        .feat-card{transition:all 0.25s;}
        .feat-card:hover{border-color:${C.gold1}66!important;transform:translateY(-2px);box-shadow:0 8px 32px rgba(0,0,0,0.4)!important;}
        .nav-scroll::-webkit-scrollbar{display:none;}
      `}</style>

      {/* ═══ STICKY NAV ═══ */}
      <nav style={{
        position:"sticky",top:0,zIndex:200,
        background:scrolled?"rgba(2,13,24,0.97)":"transparent",
        backdropFilter:scrolled?"blur(20px)":"none",
        borderBottom:scrolled?`1px solid ${C.gold1}22`:"1px solid transparent",
        padding:"0 20px",height:60,
        display:"flex",alignItems:"center",justifyContent:"space-between",
        transition:"all 0.35s",
      }}>
        <div style={{display:"flex",alignItems:"center",gap:11,cursor:"pointer"}} onClick={()=>setPage("home")}>
          <img src="/logo.png" alt="Takshashila Logo" style={{width: 42, height: 42, objectFit: "contain", borderRadius: "50%"}} onError={(e: any)=>{e.currentTarget.style.display="none"; e.currentTarget.nextSibling.style.display="flex";}} />
          <div style={{
            display: "none", /* Fallback if logo not yet uploaded */
            width:42,height:42,borderRadius:"50%",
            background:`linear-gradient(135deg,${C.teal1},${C.teal2})`,
            alignItems:"center",justifyContent:"center",
            fontSize:20,boxShadow:`0 0 16px ${C.teal2}66`,
            border:`1.5px solid ${C.gold1}44`,
          }}>⚕️</div>
          <div>
            <div style={{fontFamily:"'Cinzel',serif",fontWeight:900,fontSize:16,
              background:`linear-gradient(90deg,${C.gold1},${C.gold2},${C.goldShine},${C.gold1})`,
              backgroundSize:"200% auto",
              WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",
              animation:"goldShimmer 3.5s linear infinite",
              letterSpacing:2,
            }}>TAKSHASHILA</div>
            <div style={{fontSize:8.5,color:C.muted,letterSpacing:2.5,textTransform:"uppercase",fontWeight:700}}>Pharmacy Knowledge Hub</div>
          </div>
        </div>

        <div className="nav-scroll" style={{
          display:"flex",gap:2,alignItems:"center",
          overflowX:"auto",scrollbarWidth:"none",msOverflowStyle:"none",
          WebkitOverflowScrolling:"touch",marginLeft:10
        }}>
          {[
            {id:"home",label:"Home"},
            {id:"bpharm",label:"B.Pharm",prog:true},
            {id:"dpharm",label:"D.Pharm",prog:true},
            {id:"pharmd",label:"Pharm.D",prog:true},
            {id:"ai-tutor",label:"🤖 AI Tutor"}
          ].map(item=>{
            const active=page===(item.prog?"program":item.id)&&(!item.prog||prog===item.id);
            return (
              <button key={item.id} className="nav-link"
                onClick={()=>item.prog?goProg(item.id):setPage(item.id)}
                style={{
                  background:"none",border:"none",
                  color:active?C.gold2:C.muted,
                  cursor:"pointer",padding:"6px 10px",borderRadius:6,
                  fontSize:12.5,fontWeight:800,
                  fontFamily:"'Nunito',sans-serif",letterSpacing:0.3,
                  position:"relative",flexShrink:0,whiteSpace:"nowrap"
                }}>
                {item.label}
                {active && <div style={{position:"absolute",bottom:-2,left:"50%",transform:"translateX(-50%)",width:"70%",height:2,background:`linear-gradient(90deg,transparent,${C.gold2},transparent)`,borderRadius:1}} />}
              </button>
            );
          })}
        </div>
      </nav>

      {/* ═══════════════ HOME PAGE ═══════════════ */}
      {page==="home" && (
        <div>
          {/* HERO */}
          <div style={{position:"relative",overflow:"hidden",minHeight:440,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"50px 24px 40px",
            background:`radial-gradient(ellipse 120% 80% at 50% 0%, ${C.teal0}cc 0%, transparent 65%), radial-gradient(ellipse 80% 60% at 80% 100%, ${C.bg2} 0%, transparent 60%), ${C.bg0}`,
          }}>
            <Particles/>
            
            {/* Outer glow ring */}
            <div style={{position:"absolute",width:360,height:360,borderRadius:"50%",border:`1px solid ${C.gold1}12`,top:"50%",left:"50%",transform:"translate(-50%,-50%)",animation:"rotateSlow 18s linear infinite",pointerEvents:"none"}} />
            <div style={{position:"absolute",width:280,height:280,borderRadius:"50%",border:`1px solid ${C.teal2}18`,top:"50%",left:"50%",transform:"translate(-50%,-50%)",animation:"rotateSlow 12s linear infinite reverse",pointerEvents:"none"}} />

            {/* Recruiting badge */}
            <div style={{
              position:"absolute",top:18,right:18,
              background:`linear-gradient(135deg,${C.gold0},${C.gold2})`,
              borderRadius:12,padding:"10px 14px",textAlign:"center",
              boxShadow:`0 6px 24px ${C.gold1}55`,
              animation:"pulseGlow 2.5s ease infinite",zIndex:10,maxWidth:140,
            }}>
              <div style={{fontSize:10,fontWeight:900,color:C.bg0,fontFamily:"'Nunito',sans-serif",lineHeight:1.4}}>
                 RECRUITING<br/>PHARMACY EXPERTS!</div>
              <div style={{fontSize:9,color:C.bg0+"cc",marginTop:5,fontWeight:800,background:C.bg0+"33",borderRadius:6,padding:"2px 6px"}}>JOIN OUR TEAM →</div>
            </div>

            <div style={{position:"relative",zIndex:5,textAlign:"center",animation:"fadeUp 0.7s ease both"}}>
              {/* Logo row */}
              <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:20,marginBottom:18}}>
                <img src="/logo.png" alt="Takshashila Logo" style={{width: 120, height: 120, objectFit: "contain", borderRadius: "50%", boxShadow: `0 8px 32px ${C.gold1}33`, border: `2px solid ${C.gold1}44`}} onError={(e: any)=>{e.currentTarget.style.display="none"; e.currentTarget.nextElementSibling?.setAttribute('style', 'display:flex; align-items:center; justify-content:center; gap:20px; margin-bottom:18px;');}} />
                
                <div style={{display:"none"}}> {/* Wrapper for fallback icons if image fails */ }
                  <div style={{
                    width:66,height:66,borderRadius:"50%",
                    background:`linear-gradient(135deg,${C.teal0},${C.teal1})`,
                    border:`2px solid ${C.gold1}55`,
                    display:"flex",alignItems:"center",justifyContent:"center",fontSize:30,
                    boxShadow:`0 8px 32px ${C.teal2}44, inset 0 1px 0 ${C.gold1}22`,
                  }}>👨‍⚕️</div>
                </div>

                <div>
                  <h1 style={{
                    fontFamily:"'Cinzel Decorative',serif",
                    fontWeight:900,fontSize:clamp(28,5,36),
                    background:`linear-gradient(90deg,${C.gold0},${C.gold2},${C.goldShine},${C.gold2},${C.gold0})`,
                    backgroundSize:"300% auto",
                    WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",
                    animation:"goldShimmer 4s linear infinite",
                    letterSpacing:3,lineHeight:1.1,
                    textShadow:"none",
                  }}>Takshashila</h1>
                  <div style={{
                    color:C.white,fontFamily:"'Nunito',sans-serif",fontWeight:700,
                    letterSpacing:4.5,fontSize:10,marginTop:6,
                    textTransform:"uppercase",opacity:0.85,
                  }}>Pharmacy Knowledge Hub</div>
                  <div style={{width:"100%",height:1,background:`linear-gradient(90deg,transparent,${C.gold1},transparent)`,marginTop:8}} />
                </div>
                
                <div style={{display:"none"}}> {/* Wrapper for fallback icons if image fails */}
                  <div style={{
                    width:66,height:66,borderRadius:"50%",
                    background:`linear-gradient(135deg,${C.teal0},${C.teal1})`,
                    border:`2px solid ${C.gold1}55`,
                    display:"flex",alignItems:"center",justifyContent:"center",fontSize:30,
                    boxShadow:`0 8px 32px ${C.teal2}44, inset 0 1px 0 ${C.gold1}22`,
                  }}>👩‍⚕️</div>
                </div>
              </div>
              <p style={{color:C.muted,fontSize:14,maxWidth:460,margin:"0 auto 28px",lineHeight:1.8,fontWeight:600}}>
                Free pharmacy education for <span style={{color:C.gold1}}>B.Pharm</span>, <span style={{color:C.teal2}}>D.Pharm</span> & <span style={{color:"#4a90d9"}}>Pharm.D</span> — with an AI tutor coming soon.
              </p>
              
              <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
                <button onClick={()=>setPage("ai-tutor")} style={{
                  background:`linear-gradient(135deg,${C.gold0},${C.gold2})`,
                  border:"none",color:C.bg0,padding:"13px 28px",borderRadius:32,
                  fontWeight:900,fontSize:14,cursor:"pointer",
                  fontFamily:"'Nunito',sans-serif",letterSpacing:0.5,
                  boxShadow:`0 6px 24px ${C.gold1}55`,transition:"all 0.25s",
                }}
                onMouseEnter={(e: any)=>e.currentTarget.style.transform="scale(1.05)"}
                onMouseLeave={(e: any)=>e.currentTarget.style.transform="scale(1)"}
                >🤖 Ask AI Tutor (Soon)</button>

                <button onClick={()=>goProg("bpharm")} style={{
                  background:"none",
                  border:`2px solid ${C.gold1}88`,color:C.gold1,
                  padding:"12px 28px",borderRadius:32,
                  fontWeight:900,fontSize:14,cursor:"pointer",
                  fontFamily:"'Nunito',sans-serif",
                  backdropFilter:"blur(10px)",
                  transition:"all 0.25s",
                }}
                onMouseEnter={(e: any)=>{e.currentTarget.style.background=C.gold1+"18";e.currentTarget.style.borderColor=C.gold2;}}
                onMouseLeave={(e: any)=>{e.currentTarget.style.background="none";e.currentTarget.style.borderColor=C.gold1+"88";}}
                >📚 Browse Programs</button>
              </div>
            </div>
          </div>

          {/* STATS BAR */}
          <div style={{background:`linear-gradient(90deg,${C.teal0},${C.bg2},${C.teal0})`,borderTop:`1px solid ${C.gold1}22`,borderBottom:`1px solid ${C.gold1}22`,padding:"18px 20px",display:"flex",justifyContent:"space-around",flexWrap:"wrap",gap:12}}>
            {[["3","Programs","🎓"],["100+","Topics","📚"],["Free","Forever","🆓"],["AI","Coming Soon","🤖"],["24/7","Support","⚡"]].map(([v,l,ic],i)=>(
              <div key={l as string} style={{textAlign:"center",animation:`fadeUp 0.4s ease ${i*0.08}s both`}}>
                <div style={{fontSize:9,marginBottom:2}}>{ic}</div>
                <div style={{fontFamily:"'Cinzel',serif",fontWeight:900,fontSize:20,color:C.gold2}}>{v}</div>
                <div style={{fontSize:9.5,color:C.muted,fontWeight:700,letterSpacing:1,textTransform:"uppercase"}}>{l}</div>
              </div>
            ))}
          </div>

          {/* PROGRAMS */}
          <div style={{padding:"28px 18px 10px"}}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:20}}>
              <div style={{width:3,height:28,background:`linear-gradient(180deg,${C.gold2},${C.teal2})`,borderRadius:2}} />
              <h2 style={{fontFamily:"'Cinzel',serif",fontWeight:900,fontSize:16,color:C.gold2,letterSpacing:1.5}}>CHOOSE YOUR PROGRAM</h2>
            </div>
            
            <div style={{display:"flex",flexDirection:"column",gap:14}}>
              {Object.entries(PROGRAMS).map(([key,pr]: any,i)=>(
                <div key={key} className="prog-card" onClick={()=>goProg(key)} style={{
                  background:C.cardBg,
                  border:`1px solid ${C.dim}66`,
                  borderRadius:18,overflow:"hidden",
                  cursor:"pointer",
                  animation:`fadeUp 0.5s ease ${i*0.12}s both`,
                  backdropFilter:"blur(10px)",
                  "--card-glow": pr.glow,
                  "--card-shadow": pr.glow + "44",
                } as React.CSSProperties}>
                  {/* accent top bar */}
                  <div style={{height:3,background:pr.gradient}} />
                  <div style={{padding:"18px 18px",display:"flex",alignItems:"center",gap:16}}>
                    <div style={{
                      width:58,height:58,borderRadius:16,
                      background:pr.gradient,
                      display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
                      boxShadow:`0 6px 20px ${pr.glow}44`,flexShrink:0,
                    }}>
                      <div style={{fontSize:22}}>{pr.icon}</div>
                      <div style={{fontSize:9,fontWeight:900,color:"rgba(255,255,255,0.9)",letterSpacing:1,fontFamily:"'Cinzel',serif"}}>{pr.code}</div>
                    </div>
                    
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:8}}>
                        <div>
                          <div style={{fontFamily:"'Cinzel',serif",fontWeight:900,fontSize:17,color:pr.glow,letterSpacing:0.5}}>{pr.label}</div>
                          <div style={{color:C.white,fontSize:12.5,marginTop:2,fontWeight:600}}>{pr.fullName}</div>
                        </div>
                        <div style={{background:`${pr.glow}22`,border:`1px solid ${pr.glow}44`,color:pr.glow,fontSize:10,padding:"3px 10px",borderRadius:12,fontWeight:800,flexShrink:0,fontFamily:"'Nunito',sans-serif"}}>{pr.years}</div>
                      </div>
                      
                      <div style={{color:C.muted,fontSize:12,marginTop:5,fontStyle:"italic"}}>{pr.tagline}</div>
                      
                      <div style={{display:"flex",alignItems:"center",gap:6,marginTop:8}}>
                        <div style={{fontSize:11,color:C.muted,fontWeight:600}}>{pr.subjects.reduce((a:any,s:any)=>a+s.topics.length,0)} subjects</div>
                        <div style={{width:3,height:3,borderRadius:"50%",background:C.dim}} />
                        <div style={{fontSize:11,color:pr.glow,fontWeight:700}}>Explore →</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI TUTOR TEASER */}
          <div style={{margin:"24px 18px",background:`linear-gradient(135deg,${C.teal0},${C.bg2})`,border:`1px solid ${C.teal2}44`,borderRadius:20,padding:"22px 18px",position:"relative",overflow:"hidden",animation:"fadeUp 0.5s ease 0.4s both"}}>
            <div style={{position:"absolute",right:-20,top:-20,fontSize:80,opacity:0.06,pointerEvents:"none"}}>🤖</div>
            <div style={{fontSize:12,color:C.teal2,fontWeight:800,letterSpacing:1.5,textTransform:"uppercase",marginBottom:8}}>✦ AI-POWERED</div>
            <h3 style={{fontFamily:"'Cinzel',serif",fontWeight:900,fontSize:17,color:C.white,marginBottom:8}}>Meet Your AI Tutor (Coming Soon)</h3>
            <p style={{color:C.muted,fontSize:13,lineHeight:1.7,marginBottom:16,fontWeight:600}}>Ask any pharmacy question — drug mechanisms, calculations, clinical cases, exam prep — and get instant expert answers soon.</p>
            <button onClick={()=>setPage("ai-tutor")} style={{
              background:`linear-gradient(135deg,${C.teal1},${C.teal2})`,
              border:"none",color:C.white,padding:"11px 24px",borderRadius:24,
              fontWeight:900,fontSize:13,cursor:"pointer",
              fontFamily:"'Nunito',sans-serif",boxShadow:`0 4px 16px ${C.teal2}44`,
            }}>Preview →</button>
          </div>

          {/* FEATURES */}
          <div style={{padding:"0 18px 16px"}}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}>
              <div style={{width:3,height:28,background:`linear-gradient(180deg,${C.gold2},${C.teal2})`,borderRadius:2}} />
              <h2 style={{fontFamily:"'Cinzel',serif",fontWeight:900,fontSize:16,color:C.gold2,letterSpacing:1.5}}>WHY TAKSHASHILA?</h2>
            </div>
            
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              {[
                ["🆓","100% Free","No subscription fees ever — quality pharmacy education for every student"],
                ["🤖","AI Tutor","Expert guide coming soon for instant answers"],
                ["📋","PCI Aligned","Follows official Pharmacy Council of India curriculum guidelines"],
                ["🏥","Clinical Focus","Real-world pharmacy practice, drug therapy, and patient care included"],
                ["🧬","All Programs","B.Pharm, D.Pharm & Pharm.D covered with complete subject listings"],
                ["⚡","Instant Access","No login required — start studying immediately, anytime, anywhere"],
              ].map(([icon,title,desc],i)=>(
                <div key={title} className="feat-card" style={{
                  background:C.cardBg,
                  border:`1px solid ${C.dim}55`,
                  borderRadius:14,padding:"16px 14px",
                  backdropFilter:"blur(10px)",
                  animation:`fadeUp 0.4s ease ${i*0.08}s both`,
                }}>
                  <div style={{fontSize:24,marginBottom:8}}>{icon}</div>
                  <div style={{fontWeight:800,fontSize:13,marginBottom:5,color:C.gold1,fontFamily:"'Nunito',sans-serif"}}>{title}</div>
                  <div style={{color:C.muted,fontSize:11.5,lineHeight:1.55,fontWeight:600}}>{desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* FOOTER */}
          <div style={{background:"#010913",borderTop:`1px solid ${C.gold1}1a`,padding:"20px",marginTop:8}}>
            <div style={{textAlign:"center"}}>
              <div style={{fontFamily:"'Cinzel',serif",
                background:`linear-gradient(90deg,${C.gold1},${C.gold2})`,
                WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",
                fontSize:14,fontWeight:900,letterSpacing:2,marginBottom:4,
              }}>⚕️ TAKSHASHILA</div>
              <div style={{color:C.muted,fontSize:11,fontWeight:600}}>Pharmacy Knowledge Hub · Free Education for All</div>
              
              <div style={{marginTop:12,display:"flex",justifyContent:"center",gap:16}}>
                {["B.Pharm","D.Pharm","Pharm.D","AI Tutor"].map(l=>(
                  <span key={l} style={{fontSize:11,color:C.dim,fontWeight:700,cursor:"pointer"}}
                    onClick={()=>l==="AI Tutor"?setPage("ai-tutor"):goProg(l.toLowerCase().replace(".","").replace(" ",""))}
                  >{l}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════ PROGRAM PAGE ═══════════════ */}
      {page==="program" && p && (
        <div style={{animation:"fadeIn 0.35s ease both"}}>
          {/* Hero header */}
          <div style={{
            background:`linear-gradient(160deg,${C.bg2} 0%, ${C.teal0} 60%, ${C.bg0} 100%)`,
            padding:"22px 20px 0",
            borderBottom:`1px solid ${C.dim}44`,
            position:"relative",overflow:"hidden",
          }}>
            <div style={{position:"absolute",right:-30,top:-30,width:160,height:160,borderRadius:"50%",background:p.glow+"0c",border:`1px solid ${p.glow}22`,pointerEvents:"none"}} />
            
            <button onClick={()=>setPage("home")}
              style={{background:"none",border:"none",color:C.muted,cursor:"pointer",fontSize:13,marginBottom:14,fontFamily:"'Nunito',sans-serif",fontWeight:700,display:"flex",alignItems:"center",gap:4}}>
              ← Back to Hub
            </button>
            
            <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:20}}>
              <div style={{width:60,height:60,borderRadius:16,background:p.gradient,display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,boxShadow:`0 8px 28px ${p.glow}55`,border:`1px solid ${C.gold1}22`}}>
                {p.icon}
              </div>
              <div>
                <div style={{display:"flex",alignItems:"center",gap:10}}>
                  <h1 style={{fontFamily:"'Cinzel',serif",fontWeight:900,fontSize:22,color:p.glow,letterSpacing:1}}>{p.label}</h1>
                  <span style={{background:`${p.glow}22`,border:`1px solid ${p.glow}44`,color:p.glow,fontSize:10,padding:"3px 10px",borderRadius:10,fontWeight:800}}>{p.years}</span>
                </div>
                <div style={{color:C.muted,fontSize:13,marginTop:2,fontWeight:600}}>{p.fullName}</div>
                <div style={{color:p.glow+"aa",fontSize:11.5,marginTop:3,fontStyle:"italic"}}>{p.tagline}</div>
              </div>
            </div>
            
            {/* Tabs */}
            <div style={{display:"flex",borderBottom:"none"}}>
              {["subjects","tutor"].map(tab=>(
                <button key={tab} onClick={()=>setProgTab(tab)} style={{
                  background:"none",border:"none",
                  color:progTab===tab?p.glow:C.muted,
                  cursor:"pointer",padding:"10px 18px 13px",fontSize:13.5,fontWeight:800,
                  fontFamily:"'Nunito',sans-serif",
                  borderBottom:progTab===tab?`3px solid ${p.glow}`:"3px solid transparent",
                  transition:"all 0.2s",
                }}>
                  {tab==="subjects"?"📚 Study Material":"🤖 AI Tutor"}
                </button>
              ))}
            </div>
          </div>

          {progTab==="subjects" && (
            <div style={{padding:"22px 18px",animation:"fadeUp 0.4s ease both"}}>
              {p.subjects.map((sem: any,si: number)=>(
                <div key={sem.sem} style={{marginBottom:28}}>
                  <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14,padding:"10px 14px",background:C.cardBg,borderRadius:12,border:`1px solid ${p.glow}33`}}>
                    <div style={{width:32,height:32,borderRadius:10,background:p.gradient,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:900,color:C.white,fontFamily:"'Cinzel',serif",flexShrink:0}}>{si+1}</div>
                    <h3 style={{fontSize:14,fontWeight:900,color:p.glow,fontFamily:"'Cinzel',serif",letterSpacing:0.5}}>{sem.sem}</h3>
                    <span style={{marginLeft:"auto",fontSize:10,color:C.muted,fontWeight:700}}>{sem.topics.length} subjects</span>
                  </div>
                  
                  {sem.topics.map((t: any,ti: number)=><SubjectCard key={t.name} topic={t} accent={p.glow} i={ti} />)}
                </div>
              ))}
              
              {/* CTA */}
              <div style={{background:`linear-gradient(135deg,${p.glow}15,${C.teal0})`,border:`1px solid ${p.glow}33`,borderRadius:16,padding:"22px 18px",textAlign:"center",marginTop:8}}>
                <div style={{fontSize:22,marginBottom:8}}>🤖</div>
                <div style={{fontFamily:"'Cinzel',serif",fontWeight:900,fontSize:15,color:p.glow,marginBottom:6}}>Struggling with a Topic?</div>
                <p style={{color:C.muted,fontSize:13,marginBottom:14,fontWeight:600,lineHeight:1.65}}>Ask our AI Tutor for instant explanations when it becomes available!</p>
                <button onClick={()=>setProgTab("tutor")}
                  style={{background:p.gradient,border:"none",color:C.white,padding:"11px 26px",borderRadius:24,fontWeight:900,fontSize:13,cursor:"pointer",fontFamily:"'Nunito',sans-serif",boxShadow:`0 6px 20px ${p.glow}44`}}>
                  Preview AI Tutor →
                </button>
              </div>
            </div>
          )}

          {progTab==="tutor" && (
            <div style={{height:"calc(100vh - 192px)"}}>
              <AiTutor program={prog} />
            </div>
          )}
        </div>
      )}

      {/* ═══════════════ AI TUTOR PAGE ═══════════════ */}
      {page==="ai-tutor" && (
        <div style={{animation:"fadeIn 0.35s ease both"}}>
          <div style={{padding:"18px 20px 14px",borderBottom:`1px solid ${C.dim}44`,background:`linear-gradient(135deg,${C.teal0},${C.bg2})`}}>
            <button onClick={()=>setPage("home")}
              style={{background:"none",border:"none",color:C.muted,cursor:"pointer",fontSize:13,marginBottom:10,fontFamily:"'Nunito',sans-serif",fontWeight:700}}>
              ← Back to Hub
            </button>
            <div style={{display:"flex",alignItems:"center",gap:12}}>
              <div style={{width:42,height:42,borderRadius:14,background:`linear-gradient(135deg,${C.teal1},${C.teal2})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,boxShadow:`0 6px 20px ${C.teal2}55`}}>🤖</div>
              <div>
                <h1 style={{fontFamily:"'Cinzel',serif",fontWeight:900,fontSize:18,color:C.gold2,letterSpacing:1}}>AI PHARMACY TUTOR</h1>
                <p style={{color:C.muted,fontSize:11.5,marginTop:2,fontWeight:600}}>Expert answers for all pharmacy programs (Coming Soon)</p>
              </div>
            </div>
          </div>

          <div style={{height:"calc(100vh - 166px)"}}>
            <AiTutor program={null} />
          </div>
        </div>
      )}
    </div>
  );
}

function clamp(min: number, mid: number, max: number){ return Math.max(min,Math.min(max,mid)); }
