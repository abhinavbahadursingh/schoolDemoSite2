import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { SectionHeading, Reveal, MagneticButton } from './ui'

const TESTIS = [
  { n: 'Priya Sharma', r: 'Parent • Grade 5', t: 'My shy daughter now anchors the morning assembly. The teachers see every child — truly see them. ✨', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80&auto=format&fit=crop' },
  { n: 'Rahul Verma', r: 'Alumni • IIT Bombay', t: 'Robotics lab at Lumina sparked everything. I built my first drone in Grade 7. Now I build satellites! 🛰️', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80&auto=format&fit=crop' },
  { n: 'Ananya Iyer', r: 'Student • Grade 10', t: 'Art + physics + football — I never had to choose. School feels like a festival that teaches. 🎨⚽', img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80&auto=format&fit=crop' },
  { n: 'David D’Souza', r: 'Parent • Grade 2 & 8', t: 'Two kids, two totally different personalities — both bloom here. The kindness culture is real. 💛', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80&auto=format&fit=crop' },
]

export function Testimonials() {
  const [idx, setIdx] = useState(0)
  const [dotsRef] = useAutoAnimate()
  const x = useMotionValue(0)
  const bg = useTransform(x, [-300, 300], ['rgba(232,121,249,.08)', 'rgba(34,211,238,.08)'])

  useEffect(() => {
    const id = setInterval(() => setIdx(i => (i + 1) % TESTIS.length), 4200)
    return () => clearInterval(id)
  }, [])

  return (
    <section id="stories">
      <div className="wrap">
        <SectionHeading eyebrow="LOVE NOTES • DRAG ME ↔" align="center"
          title={<>Walls that <span className="hand">talk in smiles 😊</span></>}
          lead="Drag the cards sideways (Framer drag with spring snap) — or let them auto-flow. Dots re-flow with AutoAnimate." />
        <motion.div className="testi-viewport" style={{ background: bg, padding: 6, borderRadius: 26 }}>
          <motion.div
            className="testi-track"
            drag="x"
            style={{ x }}
            dragConstraints={{ left: -((TESTIS.length - 1) * 400), right: 0 }}
            dragElastic={0.12}
            onDragEnd={(e, info) => {
              if (info.offset.x < -60) setIdx(i => Math.min(i + 1, TESTIS.length - 1))
              else if (info.offset.x > 60) setIdx(i => Math.max(i - 1, 0))
            }}
            animate={{ x: -idx * 398 }}
            transition={{ type: 'spring', stiffness: 160, damping: 24 }}
          >
            {TESTIS.map((t, i) => (
              <motion.div key={t.n} className="testi-card spotlight"
                data-cursor="❤"
                whileHover={{ y: -8, rotate: i % 2 ? 1 : -1 }}
                style={{ opacity: i === idx ? 1 : 0.75 }}
              >
                <div className="stars">★★★★★</div>
                <p style={{ fontSize: 16, lineHeight: 1.7, margin: '12px 0 18px' }}>“{t.t}”</p>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <motion.img src={t.img} alt={t.n} style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover' }} whileHover={{ scale: 1.15, rotate: 8 }} />
                  <div><b>{t.n}</b><br /><small style={{ color: '#b9aedd' }}>{t.r}</small></div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
        <div ref={dotsRef} style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 20 }}>
          {TESTIS.map((_, i) => (
            <button key={i} data-magnetic onClick={() => setIdx(i)} aria-label={`go to ${i}`}
              style={{
                width: i === idx ? 34 : 12, height: 12, borderRadius: 99, border: 'none',
                background: i === idx ? 'linear-gradient(90deg,#fbbf24,#e879f9)' : 'rgba(255,255,255,.18)',
                transition: 'all .35s'
              }} />
          ))}
        </div>
      </div>
    </section>
  )
}

const STEPS = [
  ['01', '📝', 'Apply online', '5-min form + friendly chat. No exams till Grade 6.'],
  ['02', '🏫', 'Campus morning', 'Kids play & explore while parents sip chai with mentors.'],
  ['03', '🤝', 'Family meet', 'We learn your child’s dreams, quirks & superpowers.'],
  ['04', '🎉', 'Welcome aboard', 'Buddy assigned, kit delivered, confetti guaranteed.'],
]

export function Admissions() {
  const [confetti, setConfetti] = useState([])
  const burst = () => {
    const em = ['🎉', '✨', '🎈', '⭐', '💛', '📚']
    setConfetti(Array.from({ length: 26 }, (_, i) => ({
      id: Date.now() + i, e: em[i % em.length], left: Math.random() * 100, delay: Math.random() * 0.4, dur: 1.6 + Math.random() * 1.4
    })))
    setTimeout(() => setConfetti([]), 3200)
  }

  return (
    <section id="admissions" style={{ paddingTop: 40 }}>
      <div className="wrap">
        <Reveal>
          <div className="adm-box spotlight" onMouseEnter={burst} data-cursor="JOIN">
            {confetti.map(c => (
              <span key={c.id} style={{
                position: 'absolute', top: -30, left: `${c.left}%`, fontSize: 22, zIndex: 5,
                animation: `confetti-fall ${c.dur}s ease-in forwards`, animationDelay: `${c.delay}s`
              }}>{c.e}</span>
            ))}
            <motion.span className="eyebrow" animate={{ rotate: [0, 2, -2, 0] }} transition={{ duration: 3, repeat: Infinity }}>
              <i />LIMITED SEATS • 2026–27
            </motion.span>
            <h2 className="h-display">Ready to <span className="hand" style={{ fontSize: '1.1em' }}>join the magic?</span></h2>
            <p className="lead" style={{ margin: '0 auto', textAlign: 'center' }}>
              Hover this card for confetti 🎉 — every step below springs in as you scroll. Applications close soon; siblings get priority + scholarships up to 100%.
            </p>
            <div className="steps">
              {STEPS.map(([n, ico, h, p], i) => (
                <motion.div key={n} className="step-card"
                  initial={{ opacity: 0, y: 50, scale: 0.92 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1, type: 'spring', stiffness: 160, damping: 16 }}
                  whileHover={{ y: -8, rotate: i % 2 ? 1.5 : -1.5 }}
                >
                  <div className="step-num">{n}</div>
                  <div style={{ fontSize: 30 }}>{ico}</div>
                  <b>{h}</b>
                  <p style={{ color: '#b9aedd', fontSize: 13, marginTop: 6 }}>{p}</p>
                </motion.div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
              <MagneticButton href="#top" onClick={(e) => { e.preventDefault(); burst() }}>Apply now — it’s joyful 🚀</MagneticButton>
              <MagneticButton variant="ghost" href="#faq">Talk to us 💬</MagneticButton>
            </div>
            <motion.p
              style={{ marginTop: 18, color: '#b9aedd', fontSize: 13 }}
              animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 2.4, repeat: Infinity }}
            >📞 +91 98765 43210 • hello@lumina.edu • Open Mon–Sat, 8am–5pm</motion.p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

const FAQS = [
  ['What ages do you accept?', 'Nursery (3+) through Grade 12. No formal exam till Grade 6 — just a playful interaction to know your child.'],
  ['Do you offer transport & meals?', 'Yes! GPS-tracked buses across the city + farm-fresh veg meals cooked in-house. Jain / allergy menus available.'],
  ['Are scholarships available?', 'Merit, sports, arts & means-based scholarships up to 100% tuition. 1 in 6 students studies on aid.'],
  ['What is the class size?', 'Max 24 students with 2 educators till Grade 5, then 28 with mentor + TA. Every child has a personal growth plan.'],
  ['Can we visit the campus?', 'Every Saturday 10am — student-led tours, lab demos & chai with the principal. Just hit “Book a tour”.'],
]

export function FAQ() {
  const [open, setOpen] = useState(0)
  const [listRef] = useAutoAnimate({ duration: 350 })

  return (
    <section id="faq" style={{ paddingTop: 40 }}>
      <div className="wrap" style={{ maxWidth: 800 }}>
        <SectionHeading eyebrow="QUESTIONS • TAP TO EXPAND" align="center"
          title={<>Curious? <span className="hand">good — so are we.</span></>}
          lead="Accordion motion powered by AutoAnimate — buttery height transitions, zero jank." />
        <div ref={listRef}>
          {FAQS.map(([q, a], i) => (
            <div key={q} className="faq-item spotlight">
              <button className="faq-q" data-magnetic onClick={() => setOpen(open === i ? -1 : i)}>
                <span>{(open === i ? '▾ ' : '▸ ') + q}</span>
                <motion.span animate={{ rotate: open === i ? 180 : 0 }}>⌄</motion.span>
              </button>
              {open === i && (
                <motion.div className="faq-a" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  {a}
                  {i === 4 && <div style={{ marginTop: 12 }}><MagneticButton small href="#admissions">Book Saturday tour 🗓️</MagneticButton></div>}
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  const mx = useMotionValue(0)
  const springX = useSpring(mx, { stiffness: 50, damping: 20 })
  const bgX = useTransform(springX, [0, 1], ['0%', '-12%'])

  useEffect(() => {
    const fn = (e) => mx.set(e.clientX / window.innerWidth)
    window.addEventListener('mousemove', fn, { passive: true })
    return () => window.removeEventListener('mousemove', fn)
  }, [mx])

  return (
    <footer>
      <div className="wrap">
        <motion.div className="foot-big" style={{ x: bgX }}>
          ADMISSIONS <span style={{ color: 'transparent', WebkitTextStroke: '2px #e879f9' }}>OPEN</span> ’26 ✦
        </motion.div>
        <div className="foot-grid">
          <div>
            <a href="#top" className="brand" data-magnetic style={{ marginBottom: 12 }}><span className="brand-mark">◈</span><span>Lumina Academy</span></a>
            <p style={{ color: '#b9aedd', fontSize: 14, maxWidth: 34 + 'ch' }}>Where curiosity takes flight since 1998. 14 green acres, 1 big family.</p>
            <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
              {['📸', '▶️', '𝕏', '💼'].map(s => (
                <motion.a key={s} href="#top" data-magnetic whileHover={{ y: -5, rotate: 8, scale: 1.12 }}
                  style={{ width: 42, height: 42, display: 'grid', placeItems: 'center', border: '1px solid rgba(255,255,255,.15)', borderRadius: 14, background: 'rgba(255,255,255,.05)', fontSize: 18 }}>{s}</motion.a>
              ))}
            </div>
          </div>
          <div><b>Explore</b><a href="#about">About us</a><a href="#programs">Programs</a><a href="#campus">Campus life</a><a href="#faculty">Faculty</a></div>
          <div><b>Join</b><a href="#admissions">Apply 2026</a><a href="#events">Events</a><a href="#stories">Parent stories</a><a href="#faq">FAQs</a></div>
          <div><b>Visit</b><p style={{ color: '#b9aedd', fontSize: 14 }}>14 Rainbow Road,<br />Knowledge Park, Bengaluru<br />📞 +91 98765 43210<br />hello@lumina.edu</p></div>
        </div>
        <AnimatePresence>
          <motion.div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 26, paddingTop: 18, borderTop: '1px solid rgba(255,255,255,.1)', color: '#b9aedd', fontSize: 13, flexWrap: 'wrap', gap: 10 }}>
            <span>© 2026 Lumina Academy • Crafted with 💛 + Framer Motion • GSAP • React Spring • AutoAnimate</span>
            <span style={{ animation: 'blink 2s infinite' }}>● all systems joyful</span>
          </motion.div>
        </AnimatePresence>
      </div>
    </footer>
  )
}
