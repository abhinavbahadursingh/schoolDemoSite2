import { useRef, useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useSpring as useRSpring, animated } from '@react-spring/web'

// Scroll reveal wrapper (Framer Motion)
export function Reveal({ children, delay = 0, y = 40, className = '', once = true }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once, margin: '-80px' }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function SectionHeading({ eyebrow, title, lead, align = 'left' }) {
  return (
    <div style={{ textAlign: align, marginBottom: 34 }}>
      <Reveal><span className="eyebrow"><i />{eyebrow}</span></Reveal>
      <Reveal delay={0.08}>
        <h2 className="h-display" style={{ fontSize: 'clamp(2rem,4.6vw,3.4rem)' }}>{title}</h2>
      </Reveal>
      {lead && <Reveal delay={0.16}><p className="lead" style={align === 'center' ? { margin: '0 auto' } : {}}>{lead}</p></Reveal>}
    </div>
  )
}

// Magnetic button — follows cursor with react-spring, snaps back on leave
export function MagneticButton({ children, href = '#', variant = 'primary', className = '', onClick, small = false }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 250, damping: 15, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 250, damping: 15, mass: 0.4 })
  const Tag = href?.startsWith('#') || !href ? motion.a : motion.a
  return (
    <Tag
      href={href}
      onClick={onClick}
      data-magnetic
      className={`btn btn-${variant} ${small ? 'btn-sm' : ''} ${className}`}
      style={{ x: sx, y: sy, display: 'inline-flex' }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        x.set((e.clientX - (r.left + r.width / 2)) * 0.3)
        y.set((e.clientY - (r.top + r.height / 2)) * 0.35)
      }}
      onMouseLeave={() => { x.set(0); y.set(0) }}
    >
      {children}
    </Tag>
  )
}

// 3D tilt card — react-spring physics reacting to cursor
export function TiltCard({ children, className = '', max = 12, style = {} }) {
  const ref = useRef(null)
  const [spr, api] = useRSpring(() => ({ rotateX: 0, rotateY: 0, scale: 1, config: { mass: 0.8, tension: 280, friction: 22 } }))

  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    api.start({ rotateX: -py * max * 2, rotateY: px * max * 2, scale: 1.03 })
    el.style.setProperty('--mx', `${((px + 0.5) * 100).toFixed(1)}%`)
    el.style.setProperty('--my', `${((py + 0.5) * 100).toFixed(1)}%`)
  }
  const onLeave = () => api.start({ rotateX: 0, rotateY: 0, scale: 1 })

  return (
    <animated.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`spotlight ${className}`}
      style={{ ...spr, transformPerspective: 900, ...style }}
    >
      {children}
      <span className="glare" />
    </animated.div>
  )
}

// Spotlight handler for any card (sets --mx/--my CSS vars)
export function useSpotlightRef() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const move = (e) => {
      const r = el.getBoundingClientRect()
      el.style.setProperty('--mx', `${e.clientX - r.left}px`)
      el.style.setProperty('--my', `${e.clientY - r.top}px`)
    }
    el.addEventListener('mousemove', move)
    return () => el.removeEventListener('mousemove', move)
  }, [])
  return ref
}

// Animated flowing wave divider (SVG paths morph via CSS + framer)
export function WaveDivider({ flip = false, color = '#140b2e', bg = 'transparent' }) {
  return (
    <div style={{ background: bg, transform: flip ? 'rotate(180deg)' : 'none', lineHeight: 0 }}>
      <svg className="wave" viewBox="0 0 1440 90" preserveAspectRatio="none">
        <motion.path
          d="M0,50 C240,90 480,10 720,45 C960,80 1200,20 1440,50 L1440,90 L0,90 Z"
          fill={color}
          animate={{ d: [
            'M0,50 C240,90 480,10 720,45 C960,80 1200,20 1440,50 L1440,90 L0,90 Z',
            'M0,60 C260,20 500,80 730,40 C960,10 1220,85 1440,45 L1440,90 L0,90 Z',
            'M0,50 C240,90 480,10 720,45 C960,80 1200,20 1440,50 L1440,90 L0,90 Z'
          ]}}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </svg>
    </div>
  )
}

// Global flowing particle field reacting to cursor
export function FlowCanvas() {
  const ref = useRef(null)
  const mouse = useRef({ x: -999, y: -999 })

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    let raf, w, h
    const N = 90
    const P = Array.from({ length: N }, () => ({
      x: Math.random(), y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0009, vy: (Math.random() - 0.5) * 0.0009,
      r: 1 + Math.random() * 2.6, hue: 265 + Math.random() * 80, ph: Math.random() * Math.PI * 2
    }))
    const resize = () => {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)
    const onMove = (e) => { mouse.current = { x: e.clientX, y: e.clientY } }
    window.addEventListener('mousemove', onMove)
    let t = 0
    const tick = () => {
      t += 0.008
      ctx.clearRect(0, 0, w, h)
      // soft orbs
      const orbs = [
        { x: w * 0.15 + Math.sin(t * 1.2) * 60, y: h * 0.2 + Math.cos(t) * 50, r: 320, c: '139,92,246', a: 0.14 },
        { x: w * 0.85 + Math.cos(t * 0.9) * 70, y: h * 0.35 + Math.sin(t * 1.1) * 60, r: 300, c: '232,121,249', a: 0.11 },
        { x: w * 0.5 + Math.sin(t * 0.6) * 90, y: h * 0.85 + Math.cos(t * 0.7) * 40, r: 360, c: '34,211,238', a: 0.08 },
      ]
      orbs.forEach(o => {
        const g = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r)
        g.addColorStop(0, `rgba(${o.c},${o.a})`)
        g.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.fillStyle = g
        ctx.fillRect(o.x - o.r, o.y - o.r, o.r * 2, o.r * 2)
      })
      // particles flow + flee cursor
      P.forEach(p => {
        p.x += p.vx + Math.sin(t * 2 + p.ph) * 0.0004
        p.y += p.vy + Math.cos(t * 1.6 + p.ph) * 0.0004
        if (p.x < 0) p.x = 1; if (p.x > 1) p.x = 0
        if (p.y < 0) p.y = 1; if (p.y > 1) p.y = 0
        const px = p.x * w, py = p.y * h
        const dx = px - mouse.current.x, dy = py - mouse.current.y
        const d = Math.hypot(dx, dy)
        let ox = 0, oy = 0
        if (d < 160 && d > 1) { const f = (160 - d) / 160 * 22; ox = (dx / d) * f; oy = (dy / d) * f }
        ctx.beginPath()
        ctx.arc(px + ox, py + oy, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${p.hue}, 90%, 72%, ${0.25 + 0.4 * Math.abs(Math.sin(t * 3 + p.ph))})`
        ctx.fill()
      })
      // connect near lines
      ctx.lineWidth = 1
      for (let i = 0; i < P.length; i += 3) {
        for (let j = i + 1; j < P.length; j += 4) {
          const a = P[i], b = P[j]
          const dx = (a.x - b.x) * w, dy = (a.y - b.y) * h
          if (Math.hypot(dx, dy) < 130) {
            ctx.strokeStyle = 'rgba(180,140,255,0.08)'
            ctx.beginPath()
            ctx.moveTo(a.x * w, a.y * h)
            ctx.lineTo(b.x * w, b.y * h)
            ctx.stroke()
          }
        }
      }
      raf = requestAnimationFrame(tick)
    }
    tick()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); window.removeEventListener('mousemove', onMove) }
  }, [])

  return <canvas ref={ref} className="flow-canvas" />
}

// Character-stagger headline (Framer Motion)
export function SplitTitle({ text, className = '', accentWords = [] }) {
  const words = text.split(' ')
  return (
    <span className={className} style={{ display: 'inline-block' }}>
      {words.map((w, wi) => {
        const isAccent = accentWords.includes(w.replace(/[^A-Za-z]/g, ''))
        return (
          <span key={wi} className="reveal-mask" style={{ paddingRight: '.28em', paddingBottom: '.08em' }}>
            <motion.span
              style={{ display: 'inline-block', ...(isAccent ? { color: 'transparent', background: 'linear-gradient(90deg,#fbbf24,#e879f9,#22d3ee)', backgroundClip: 'text', WebkitBackgroundClip: 'text' } : {}) }}
              initial={{ y: '110%', rotate: 6 }}
              whileInView={{ y: '0%', rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: wi * 0.07, ease: [0.22, 1, 0.36, 1] }}
            >
              {w}
            </motion.span>
          </span>
        )
      })}
    </span>
  )
}
