import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TiltCard, SectionHeading, Reveal, MagneticButton } from './ui'

gsap.registerPlugin(ScrollTrigger)

const PROGRAMS = [
  { cat: 'STEM', emoji: '🤖', title: 'Robotics & AI Lab', desc: 'Build bots, train tiny ML models & compete in national robo-leagues from Grade 4.', img: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=700&q=80&auto=format&fit=crop', meta: 'Grade 4–12 • 4×/week' },
  { cat: 'STEM', emoji: '🔬', title: 'Young Scientists', desc: 'Bio-chem labs, astronomy nights & olympiad coaching with IIT mentors.', img: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=700&q=80&auto=format&fit=crop', meta: 'Grade 3–12 • Lab daily' },
  { cat: 'Arts', emoji: '🎨', title: 'Visual Arts Studio', desc: 'Painting, sculpture, digital art & annual gallery night at the city museum.', img: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=700&q=80&auto=format&fit=crop', meta: 'All grades • Studio' },
  { cat: 'Arts', emoji: '🎭', title: 'Theatre & Music', desc: 'Orchestra, choir, Shakespeare society & two full productions every year.', img: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=700&q=80&auto=format&fit=crop', meta: 'Grade 1–12 • Stage' },
  { cat: 'Sports', emoji: '⚽', title: 'Football Academy', desc: 'UEFA-licensed coaches, 2 turfs & inter-school league champions 5 yrs running.', img: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=700&q=80&auto=format&fit=crop', meta: 'Grade 2–12 • Pro turf' },
  { cat: 'Sports', emoji: '🏊', title: 'Swim & Athletics', desc: 'Half-Olympic pool, 400m track & morning squads with physio support.', img: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=700&q=80&auto=format&fit=crop', meta: 'All levels • Pool+track' },
]

export function Programs() {
  const [filter, setFilter] = useState('All')
  const [open, setOpen] = useState(null)
  const [gridRef] = useAutoAnimate({ duration: 450, easing: 'ease-in-out' })
  const shown = PROGRAMS.filter(p => filter === 'All' || p.cat === filter)

  return (
    <section id="programs" style={{ background: 'linear-gradient(180deg, transparent, rgba(139,92,246,.08), transparent)' }}>
      <div className="wrap">
        <SectionHeading
          eyebrow="PROGRAMS • HOVER & TAP"
          title={<>Pick your <span className="hand">superpower ⚡</span></>}
          lead="Filter the grid — watch cards fluidly re-flow with AutoAnimate. Hover any card: it tilts in 3D, glares and follows your cursor."
        />
        <div className="tabs">
          {['All', 'STEM', 'Arts', 'Sports'].map(t => (
            <motion.button
              key={t} data-magnetic onClick={() => setFilter(t)}
              className={`tab ${filter === t ? 'active' : ''}`}
              whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }}
            >{t === 'All' ? '✨ All' : t}</motion.button>
          ))}
        </div>
        <div className="grid-3" ref={gridRef}>
          {shown.map((p) => (
            <TiltCard key={p.title} className="prog-card" data-cursor="OPEN">
              <div className="prog-top">
                <img src={p.img} alt={p.title} loading="lazy" />
                <span className="prog-tag">{p.emoji} {p.cat}</span>
              </div>
              <div className="prog-body">
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                <div className="prog-foot">
                  <small style={{ color: '#b9aedd' }}>{p.meta}</small>
                  <button
                    data-magnetic onClick={() => setOpen(open === p.title ? null : p.title)}
                    style={{ background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.15)', color: 'white', borderRadius: 99, padding: '8px 16px', fontWeight: 700, fontSize: 13 }}
                  >{open === p.title ? '− Less' : '+ More'}</button>
                </div>
                {open === p.title && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} style={{ overflow: 'hidden' }}>
                    <p style={{ marginTop: 12, background: 'rgba(251,191,36,.08)', border: '1px solid rgba(251,191,36,.25)', padding: 12, borderRadius: 12 }}>
                      ✅ Small batches of 15 • 🎒 All material included • 🏆 Showcase every term • <b>Scholarships available</b>
                    </p>
                  </motion.div>
                )}
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  )
}

const CAMPUS = [
  { img: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80&auto=format&fit=crop', t: 'Sunrise Library 📚', d: '12,000 books, bean-bag corners & silent pods.' },
  { img: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80&auto=format&fit=crop', t: 'Grand Campus 🏛️', d: '14 acres of green, murals & mango trees.' },
  { img: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=800&q=80&auto=format&fit=crop', t: 'Graduation Day 🎓', d: '98% placements, tears & throw-hat joy.' },
  { img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80&auto=format&fit=crop', t: 'Maker Fest 🛠️', d: 'Drones, pottery & code — all in one week.' },
  { img: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&q=80&auto=format&fit=crop', t: 'Sports Carnival 🏃', d: 'March-past, fireworks & house rivalries.' },
]

export function Campus() {
  const wrapRef = useRef(null)
  const trackRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current
      const getX = () => -(track.scrollWidth - window.innerWidth + 40)
      gsap.to(track, {
        x: getX,
        ease: 'none',
        scrollTrigger: {
          trigger: wrapRef.current,
          start: 'top top',
          end: () => `+=${track.scrollWidth - window.innerWidth + 400}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        }
      })
      gsap.utils.toArray('.h-card').forEach((card, i) => {
        gsap.fromTo(card, { y: i % 2 ? 60 : -40, rotate: i % 2 ? 3 : -3 }, {
          y: 0, rotate: 0, ease: 'none',
          scrollTrigger: { trigger: wrapRef.current, start: 'top bottom', end: 'center center', scrub: 1 }
        })
      })
    }, wrapRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="campus" ref={wrapRef} style={{ paddingLeft: 0, paddingRight: 0, overflow: 'hidden' }}>
      <div className="wrap">
        <SectionHeading
          eyebrow="CAMPUS LIFE • KEEP SCROLLING →"
          title={<>Scroll sideways <span className="grad" style={{ background: 'linear-gradient(90deg,#fbbf24,#e879f9)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>through joy →</span></>}
          lead="This section is pinned — your vertical scroll drives a horizontal journey (GSAP ScrollTrigger + Lenis). Cards straighten as you travel."
        />
      </div>
      <div className="h-wrap">
        <div className="h-track" ref={trackRef}>
          {CAMPUS.map((c, i) => (
            <div key={c.t} className="h-card spotlight" data-cursor="DRAG →">
              <div style={{ overflow: 'hidden' }}>
                <motion.img src={c.img} alt={c.t} loading="lazy"
                  whileHover={{ scale: 1.08, rotate: 1 }} transition={{ duration: 0.5 }} />
              </div>
              <div>
                <small style={{ color: '#fbbf24', fontWeight: 800, letterSpacing: '.15em' }}>0{i + 1} / 05</small>
                <h3>{c.t}</h3>
                <p>{c.d}</p>
              </div>
            </div>
          ))}
          <div className="h-card" style={{ display: 'grid', placeItems: 'center', background: 'linear-gradient(135deg,#8b5cf6,#e879f9)', border: 'none' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 48 }}>🚀</div>
              <h3 style={{ fontSize: 28 }}>Come see it live!</h3>
              <p style={{ color: '#fff' }}>Saturday open tours, 10am.</p>
              <div style={{ marginTop: 12 }}><MagneticButton href="#admissions" small>Book tour</MagneticButton></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const FACULTY = [
  { img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80&auto=format&fit=crop', n: 'Dr. Meera Rao', s: 'PRINCIPAL • PHYSICS', q: '“Every child is a question the universe asks.”' },
  { img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&auto=format&fit=crop', n: 'Arjun Malhotra', s: 'HEAD OF ROBOTICS', q: 'Ex-ISRO • built 40+ student satellites kits.' },
  { img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80&auto=format&fit=crop', n: 'Sana Kapoor', s: 'ARTS DIRECTOR', q: 'Turns corridors into galleries of courage.' },
  { img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80&auto=format&fit=crop', n: 'Coach Vikram', s: 'SPORTS HEAD', q: 'State champ • believes in sweat + smiles.' },
]

export function Faculty() {
  return (
    <section id="faculty">
      <div className="wrap">
        <SectionHeading eyebrow="MENTORS • SAY HELLO 👋" align="center"
          title={<>Guided by <span className="hand">giants with warm hearts</span></>}
          lead="Hover a mentor — the card lifts, glows and tilts toward your cursor (React Spring physics)."
        />
        <div className="grid-4">
          {FACULTY.map((f, i) => (
            <motion.div key={f.n}
              initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.7 }}
            >
              <TiltCard className="fac-card" max={16} data-cursor="HELLO">
                <motion.img src={f.img} alt={f.n} whileHover={{ scale: 1.1, rotate: 4 }} />
                <h3>{f.n}</h3>
                <small>{f.s}</small>
                <p style={{ color: '#b9aedd', fontSize: 13, marginTop: 10 }}>{f.q}</p>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const EVENTS = [
  { d: 'Oct 12', t: '🚀 Space Week & Night Sky Camp', p: 'Telescopes on the turf, ISRO guest talk, rocket launches at dusk.' },
  { d: 'Nov 03', t: '🎨 Lumina Art Biennale', p: 'Student works exhibited downtown + live mural jam with parents.' },
  { d: 'Dec 15', t: '⚽ Inter-House Winter Cup', p: 'Football, athletics & cheer squads. Lumos vs Orion — who lifts it?' },
  { d: 'Jan 26', t: '🤖 Robo Rumble Nationals', p: 'We host 60 schools. Line-followers, sumo bots & drone races.' },
]

export function Events() {
  const tlRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: tlRef, offset: ['start 75%', 'end 55%'] })
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section id="events" style={{ paddingTop: 40 }}>
      <div className="wrap events-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
        <div>
          <div style={{ position: 'sticky', top: 110 }}>
            <SectionHeading eyebrow="CALENDAR • DON'T MISS" title={<>Mark the <span className="hand">magic days ✨</span></>}
              lead="The glowing line draws itself as you scroll (Framer useScroll). Events slide in from alternating sides." />
            <Reveal delay={0.1}><MagneticButton href="#admissions" small>Get full calendar 📅</MagneticButton></Reveal>
          </div>
        </div>
        <div className="timeline" ref={tlRef}>
          <motion.div className="timeline-progress" style={{ scaleY }} />
          {EVENTS.map((e, i) => (
            <motion.div key={e.t} className="event-card spotlight t-item"
              initial={{ opacity: 0, x: i % 2 ? 60 : -60, rotate: i % 2 ? 1.5 : -1.5 }}
              whileInView={{ opacity: 1, x: 0, rotate: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.65, delay: 0.05 * i }}
              whileHover={{ scale: 1.02, y: -4 }}
            >
              <span className="pill" style={{ borderColor: 'rgba(251,191,36,.4)' }}>📅 {e.d}</span>
              <h3 style={{ fontFamily: 'Sora', margin: '12px 0 6px' }}>{e.t}</h3>
              <p style={{ color: '#b9aedd', fontSize: 14 }}>{e.p}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:900px){.events-grid{grid-template-columns:1fr !important;}}`}</style>
    </section>
  )
}
