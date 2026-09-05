import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FlowCanvas, WaveDivider } from './components/ui'
import { Cursor, Preloader, Navbar, ToTop, Ribbon } from './components/Chrome'
import { Hero, Stats, About } from './components/Hero'
import { Programs, Campus, Faculty, Events } from './components/ProgramsCampus'
import { Testimonials, Admissions, FAQ, Footer } from './components/Closing'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [loading, setLoading] = useState(true)

  // Lenis smooth scroll + GSAP ticker sync = buttery continuous flow
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.25, smoothWheel: true })
    lenis.on('scroll', ScrollTrigger.update)
    const raf = (t) => lenis.raf(t * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)
    // anchor links via lenis
    const onClick = (e) => {
      const a = e.target.closest?.('a[href^="#"]')
      if (!a) return
      const id = a.getAttribute('href')
      if (id.length > 1 && document.querySelector(id)) {
        e.preventDefault()
        lenis.scrollTo(id, { offset: -90, duration: 1.4 })
      }
    }
    document.addEventListener('click', onClick)
    return () => { document.removeEventListener('click', onClick); gsap.ticker.remove(raf); lenis.destroy() }
  }, [])

  useEffect(() => {
    document.body.style.overflow = loading ? 'hidden' : ''
  }, [loading])

  return (
    <div className="grain">
      <FlowCanvas />
      <Cursor />
      <AnimatePresence>{loading && <Preloader done={() => setLoading(false)} />}</AnimatePresence>

      <Navbar />
      <main>
        <Hero />
        <Ribbon amber items={['ADMISSIONS OPEN 2026', 'BOOK A TOUR', 'SCHOLARSHIPS UP TO 100%', 'KG → GRADE 12', 'ROBOTICS • ARTS • SPORTS']} />
        <Stats />
        <About />
        <WaveDivider color="rgba(139,92,246,.10)" />
        <Programs />
        <Ribbon reverse items={['🔬 SCIENCE FAIR CHAMPS', '🎨 ART BIENNALE', '⚽ WINTER CUP', '🤖 ROBO RUMBLE', '🎭 ANNUAL DAY']} />
        <Campus />
        <Faculty />
        <WaveDivider color="rgba(232,121,249,.08)" />
        <Events />
        <Testimonials />
        <Admissions />
        <FAQ />
      </main>
      <Footer />
      <ToTop />
    </div>
  )
}
