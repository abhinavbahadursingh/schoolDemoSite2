import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useScroll, useInView, animate } from 'framer-motion'
import gsap from 'gsap'
import { MagneticButton, Reveal, SplitTitle } from './ui'

// Hero with mouse-parallax layers (framer), GSAP intro timeline, spring floaters
export function Hero() {
  const ref = useRef(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 60, damping: 18 })
  const sy = useSpring(my, { stiffness: 60, damping: 18 })

  const layerA_X = useTransform(sx, v => v * 34)
  const layerA_Y = useTransform(sy, v => v * 26)
  const layerB_X = useTransform(sx, v => v * -46)
  const layerB_Y = useTransform(sy, v => v * -34)
  const layerC_X = useTransform(sx, v => v * 18)
  const layerC_Y = useTransform(sy, v => v * 14)

  useEffect(() => {
    const el = ref.current
    const move = (e) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2
      const ny = (e.clientY / window.innerHeight - 0.5) * 2
      mx.set(nx); my.set(ny)
    }
    window.addEventListener('mousemove', move, { passive: true })
    // GSAP intro timeline — headline, pills, visual
    const ctx = gsap.context(() => {
      gsap.fromTo('.gs-hero-el', { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.12, ease: 'power3.out', delay: 0.15 })
      gsap.fromTo('.gs-orb', { scale: 0.6, opacity: 0, rotate: -20 }, { scale: 1, opacity: 1, rotate: 0, duration: 1.4, ease: 'elastic.out(1,0.55)', delay: 0.3 })
      gsap.to('.gs-float-1', { y: -16, duration: 2.2, yoyo: true, repeat: -1, ease: 'sine.inOut' })
      gsap.to('.gs-float-2', { y: 14, rotate: 4, duration: 2.8, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: 0.4 })
      gsap.to('.gs-float-3', { y: -12, x: 8, duration: 2.5, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: 0.8 })
    }, ref)
    return () => { window.removeEventListener('mousemove', move); ctx.revert() }
  }, [mx, my])

  return (
    <header className="hero" id="top" ref={ref}>
      <div className="hero-blob" style={{ width: 520, height: 520, background: '#7c3aed', top: -120, left: -140 }} />
      <div className="hero-blob" style={{ width: 460, height: 460, background: '#db2777', bottom: -140, right: -100, animationDelay: '-4s' }} />
      <div className="hero-blob" style={{ width: 340, height: 340, background: '#0891b2', top: '40%', left: '45%', opacity: 0.35, animationDelay: '-8s' }} />

      <span className="doodle" style={{ top: '16%', left: '6%' }}>🪐</span>
      <span className="doodle" style={{ top: '22%', right: '8%', animationDelay: '-2s' }}>🎈</span>
      <span className="doodle" style={{ bottom: '18%', left: '42%', animationDelay: '-3.5s' }}>📐</span>

      <div className="hero-grid">
        <div>
          <motion.div className="gs-hero-el">
            <span className="eyebrow"><i />ADMISSIONS OPEN • 2026–27</span>
          </motion.div>
          <h1 className="h-display gs-hero-el" style={{ marginTop: 18 }}>
            <SplitTitle text="Where curiosity" accentWords={[]} /><br />
            <SplitTitle text="takes flight" accentWords={['flight']} />
            <motion.span
              className="hand" style={{ display: 'block', fontSize: 'clamp(1.6rem,3.4vw,2.6rem)', marginTop: 6 }}
              initial={{ opacity: 0, scale: 0.8, rotate: -6 }} whileInView={{ opacity: 1, scale: 1, rotate: -3 }}
              transition={{ delay: 0.7, type: 'spring', stiffness: 200, damping: 12 }}
            >→ dream. build. become. ✏️</motion.span>
          </h1>
          <p className="lead gs-hero-el">
            Lumina Academy blends rigorous academics with art, sport & soul — 1,400 happy learners,
            120 world-class mentors, and a campus that feels alive. Every scroll, hover & heartbeat here is designed to inspire.
          </p>
          <div className="hero-badges gs-hero-el">
            <span className="pill"><b>NEW</b> AI & Robotics Lab 🤖</span>
            <span className="pill">🏆 #1 in State Olympiads</span>
            <span className="pill">🌍 22 Exchange Countries</span>
          </div>
          <div className="hero-ctas gs-hero-el">
            <MagneticButton href="#admissions">Book a Campus Tour 🚀</MagneticButton>
            <MagneticButton href="#programs" variant="ghost">Explore Programs ↓</MagneticButton>
          </div>
          <div className="hero-meta gs-hero-el">
            <div><strong>27<span style={{ color: '#e879f9' }}>yrs</span></strong><span>of joyful learning</span></div>
            <div><strong>98<span style={{ color: '#fbbf24' }}>%</span></strong><span>university placements</span></div>
            <div><strong>40<span style={{ color: '#22d3ee' }}>+</span></strong><span>clubs & societies</span></div>
          </div>
          <div className="scroll-hint gs-hero-el"><i />SCROLL TO FLOW</div>
        </div>

        <motion.div className="orb-stage gs-orb" style={{ x: layerA_X, y: layerA_Y }}>
          <div className="orbit-ring" style={{ width: 460, height: 460 }}><span className="orbit-dot" /></div>
          <div className="orbit-ring" style={{ width: 360, height: 360, animationDirection: 'reverse', animationDuration: '18s' }}>
            <span className="orbit-dot" style={{ background: '#22d3ee', boxShadow: '0 0 16px #22d3ee' }} />
          </div>
          <motion.div className="orb-core" style={{ x: layerB_X, y: layerB_Y }}>
            <div className="orb-photo">
              <img src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80&auto=format&fit=crop" alt="Students learning joyfully" />
            </div>
          </motion.div>

          <motion.div className="float-card gs-float-1" style={{ top: 20, left: 0, x: layerC_X, y: layerC_Y }} data-cursor="HI!">
            <span className="ico" style={{ background: 'linear-gradient(135deg,#a3e635,#22d3ee)' }}>🔬</span>
            <span><b>Science Fair Champs</b><br /><small style={{ color: '#b9aedd' }}>3 national golds this year</small></span>
          </motion.div>
          <motion.div className="float-card gs-float-2" style={{ bottom: 70, right: 0, x: layerB_X, y: layerB_Y }} data-cursor="ART">
            <span className="ico" style={{ background: 'linear-gradient(135deg,#fbbf24,#e879f9)' }}>🎨</span>
            <span><b>Art Week Live</b><br /><small style={{ color: '#b9aedd' }}>200+ student exhibits</small></span>
          </motion.div>
          <motion.div className="float-card gs-float-3" style={{ bottom: 6, left: 30, x: layerA_X }} data-cursor="GO">
            <span className="ico" style={{ background: 'linear-gradient(135deg,#8b5cf6,#22d3ee)' }}>⚽</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><b>4.9 ★ loved by parents</b> <span style={{ animation: 'wiggle 2s infinite' }}>💛</span></span>
          </motion.div>
        </motion.div>
      </div>
    </header>
  )
}

function Counter({ to, suffix = '', decimals = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  useEffect(() => {
    if (!inView || !ref.current) return
    const controls = animate(0, to, {
      duration: 2, ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => { if (ref.current) ref.current.textContent = v.toFixed(decimals) + suffix }
    })
    return () => controls.stop()
  }, [inView, to, suffix, decimals])
  return <span ref={ref}>0{suffix}</span>
}

export function Stats() {
  const cards = [
    { icon: '🎓', value: 1400, suffix: '+', label: 'Students thriving from KG to Grade 12' },
    { icon: '👩‍🏫', value: 120, suffix: '', label: 'Expert mentors, 60% with global degrees' },
    { icon: '🏅', value: 320, suffix: '+', label: 'Trophies in sports, arts & olympiads' },
    { icon: '🌱', value: 98, suffix: '%', label: 'Parents who recommend Lumina proudly' },
  ]
  return (
    <section style={{ paddingTop: 20 }}>
      <div className="wrap">
        <div className="grid-4">
          {cards.map((c, i) => (
            <motion.div
              key={c.label}
              className="stat-card spotlight"
              data-cursor={`${c.value}${c.suffix}`}
              initial={{ opacity: 0, y: 50, rotate: i % 2 ? 2 : -2 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <div className="stat-ico" style={{ animation: `float 3.5s ease-in-out infinite`, animationDelay: `${i * -0.7}s` }}>{c.icon}</div>
              <strong><Counter to={c.value} suffix={c.suffix} /></strong>
              <p>{c.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function About() {
  const secRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: secRef, offset: ['start end', 'end start'] })
  const imgY1 = useTransform(scrollYProgress, [0, 1], [60, -60])
  const imgY2 = useTransform(scrollYProgress, [0, 1], [100, -80])
  const imgR = useTransform(scrollYProgress, [0, 1], [-6, 6])

  const points = [
    ['Whole-child philosophy', 'Mind, body & heart grow together — mindfulness, sports & studios woven into every day.'],
    ['Future-ready labs', 'Robotics, bio-lab, media studio & maker-space open till 7pm for tinkerers.'],
    ['Kindness-first culture', 'House system, peer buddies & zero-bullying pledge keep every child seen.'],
  ]

  return (
    <section id="about" ref={secRef}>
      <div className="wrap about-grid">
        <div className="about-photos">
          <motion.img
            src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80&auto=format&fit=crop"
            alt="Classroom" style={{ y: imgY1, width: '68%', height: 380, top: 0, left: 0, rotate: imgR }}
          />
          <motion.img
            src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&q=80&auto=format&fit=crop"
            alt="Kids playing" style={{ y: imgY2, width: '58%', height: 300, bottom: 0, right: 0 }}
          />
          <motion.div
            className="float-card" style={{ top: '44%', left: '52%', y: imgY1 }}
            animate={{ rotate: [0, 3, -3, 0] }} transition={{ duration: 5, repeat: Infinity }}
          >
            <span className="ico" style={{ background: 'linear-gradient(135deg,#e879f9,#fbbf24)' }}>💡</span>
            <span><b>Since 1998</b><br /><small style={{ color: '#b9aedd' }}>27 yrs of firsts</small></span>
          </motion.div>
          <span className="doodle" style={{ top: -10, right: 20 }}>✏️</span>
        </div>
        <div>
          <Reveal><span className="eyebrow"><i />WHY LUMINA</span></Reveal>
          <h2 className="h-display" style={{ fontSize: 'clamp(2rem,4.4vw,3.2rem)' }}>
            <SplitTitle text="A campus that breathes with your child" accentWords={['breathes']} />
          </h2>
          <p className="lead">Sunlit studios, whisper-quiet libraries, noisy-with-joy playgrounds. Scroll — watch our story tilt, float and glow as you move.</p>
          <div style={{ marginTop: 18 }}>
            {points.map(([h, p], i) => (
              <Reveal key={h} delay={i * 0.1}>
                <div className="check">
                  <span className="tick">✓</span>
                  <div><b>{h}</b><br /><span style={{ color: '#b9aedd', fontSize: 14 }}>{p}</span></div>
                </div>
              </Reveal>
            ))}
          </div>
          <div style={{ marginTop: 24, display: 'flex', gap: 12 }}>
            <MagneticButton href="#campus" small>See campus life 🎥</MagneticButton>
            <MagneticButton href="#faculty" variant="ghost" small>Meet mentors →</MagneticButton>
          </div>
        </div>
      </div>
    </section>
  )
}
