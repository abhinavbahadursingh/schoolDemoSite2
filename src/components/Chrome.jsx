import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useScroll, useSpring, useMotionValue } from 'framer-motion'
import { useSpring as useRSpring, animated } from '@react-spring/web'

// ---- Custom cursor: dot (fast) + ring (springy), grows on interactive hover ----
export function Cursor() {
  const mx = useMotionValue(-100)
  const my = useMotionValue(-100)
  const rx = useSpring(mx, { stiffness: 260, damping: 24, mass: 0.6 })
  const ry = useSpring(my, { stiffness: 260, damping: 24, mass: 0.6 })
  const [hover, setHover] = useState(false)
  const [label, setLabel] = useState('')

  useEffect(() => {
    const move = (e) => {
      mx.set(e.clientX); my.set(e.clientY)
      const t = e.target.closest?.('[data-magnetic], a, button, .prog-card, .fac-card, .h-card')
      setHover(!!t)
      setLabel(t?.closest?.('[data-cursor]')?.getAttribute?.('data-cursor') || (t ? '•' : ''))
      // spotlight vars for any hovered card
      const card = e.target.closest?.('.spotlight')
      if (card) {
        const r = card.getBoundingClientRect()
        card.style.setProperty('--mx', `${e.clientX - r.left}px`)
        card.style.setProperty('--my', `${e.clientY - r.top}px`)
      }
    }
    window.addEventListener('mousemove', move, { passive: true })
    return () => window.removeEventListener('mousemove', move)
  }, [mx, my])

  return (
    <>
      <motion.div className="cursor-dot" style={{ x: mx, y: my, translateX: '-50%', translateY: '-50%' }} />
      <motion.div className={`cursor-ring ${hover ? 'is-hover' : ''}`} style={{ x: rx, y: ry, translateX: '-50%', translateY: '-50%' }}>
        <span>{label === '•' ? 'GO' : label}</span>
      </motion.div>
    </>
  )
}

// ---- Preloader with GSAP-like counting + flowing bar ----
export function Preloader({ done }) {
  const [n, setN] = useState(0)
  useEffect(() => {
    let v = 0
    const id = setInterval(() => {
      v += Math.floor(Math.random() * 12) + 4
      if (v >= 100) { v = 100; clearInterval(id); setTimeout(done, 350) }
      setN(v)
    }, 110)
    return () => clearInterval(id)
  }, [done])

  return (
    <motion.div className="preloader" exit={{ y: '-100%', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}>
      <div className="pre-inner">
        <motion.div
          className="pre-logo"
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          ✨ Lumina <span className="hand" style={{ fontSize: '1.1em' }}>Academy</span>
        </motion.div>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ color: '#b9aedd', letterSpacing: '.3em', fontSize: 12, fontWeight: 700 }}>
          WHERE CURIOSITY TAKES FLIGHT
        </motion.p>
        <div className="pre-bar"><i style={{ width: `${n}%`, transition: 'width .2s' }} /></div>
        <div style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 28 }}>{n}%</div>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 14, fontSize: 20 }}>
          {['📚', '🎨', '🔬', '⚽', '🎭'].map((e, i) => (
            <motion.span key={e} animate={{ y: [0, -10, 0], rotate: [0, 10, -10, 0] }} transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.12 }}>{e}</motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

// ---- Navbar with hide-on-scroll + blur + mobile menu (AutoAnimate-like via framer) ----
export function Navbar() {
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25 })

  useEffect(() => {
    let last = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 40)
      setHidden(y > last && y > 300 && !open)
      last = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [open ])

  const links = [
    ['About', '#about'], ['Programs', '#programs'], ['Campus', '#campus'],
    ['Faculty', '#faculty'], ['Events', '#events'], ['FAQ', '#faq'],
  ]

  return (
    <>
      <div className="progress"><motion.i style={{ scaleX }} /></div>
      <motion.nav
        className="nav"
        animate={{ y: hidden ? -90 : 0, opacity: hidden ? 0 : 1 }}
        transition={{ duration: 0.35 }}
        style={{ boxShadow: scrolled ? '0 20px 60px rgba(0,0,0,.5)' : 'none' }}
      >
        <a href="#top" className="brand" data-magnetic>
          <span className="brand-mark">◈</span>
          <span>Lumina<span style={{ color: '#e879f9' }}> Academy</span><br /><small style={{ fontWeight: 400, fontSize: 10, letterSpacing: '.25em', color: '#b9aedd' }}>EST. 1998 • K-12</small></span>
        </a>
        <div className={`nav-links ${open ? 'open' : ''}`}>
          {links.map(([label, href], i) => (
            <motion.a
              key={href} href={href} data-magnetic
              initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i }}
              onClick={() => setOpen(false)}
            >{label}</motion.a>
          ))}
        </div>
        <div className="nav-cta">
          <motion.a
            href="#admissions" data-magnetic className="btn btn-primary btn-sm"
            whileHover={{ scale: 1.06, rotate: -1 }} whileTap={{ scale: 0.94 }}
            style={{ animation: 'pulse-glow 2.4s infinite' }}
          >Apply 2026 ✨</motion.a>
          <button className="burger" onClick={() => setOpen(!open)} aria-label="menu">{open ? '✕' : '☰'}</button>
        </div>
      </motion.nav>
    </>
  )
}

// ---- Floating back-to-top, appears after scroll, springy ----
export function ToTop() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const fn = () => setShow(window.scrollY > 700)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])
  const [spr, api] = useRSpring(() => ({ y: 0, config: { tension: 200, friction: 14 } }))
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          className="to-top" data-magnetic
          initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0 }}
          onMouseEnter={() => api.start({ y: -6 })} onMouseLeave={() => api.start({ y: 0 })}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="back to top"
        ><animated.span style={spr}>↑</animated.span></motion.button>
      )}
    </AnimatePresence>
  )
}

export function Ribbon({ items, amber = false, reverse = false }) {
  const row = [...items, ...items, ...items]
  return (
    <div className={`marquee ${amber ? 'amber' : ''} ${reverse ? 'rev' : ''}`}>
      <div className="marquee-track">
        {[0, 1].map(half => (
          <span key={half} style={{ display: 'inline-flex' }}>
            {row.map((t, i) => <span key={i}>{t}</span>)}
          </span>
        ))}
      </div>
    </div>
  )
}
